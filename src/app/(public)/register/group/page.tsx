"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Clock,
  Building2,
  Users,
  ClipboardCheck,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

const SALUTATIONS = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Hon.", "H.E."];

const COUNTRIES = [
  "Afghanistan", "Australia", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia",
  "China", "Fiji", "Hong Kong SAR", "India", "Indonesia", "Iran", "Iraq", "Japan",
  "Jordan", "Kazakhstan", "Kuwait", "Laos", "Lebanon", "Macau SAR", "Malaysia",
  "Maldives", "Mongolia", "Myanmar", "Nepal", "New Zealand", "Oman", "Pakistan",
  "Palestine", "Papua New Guinea", "Philippines", "Qatar", "Saudi Arabia",
  "Singapore", "South Korea", "Sri Lanka", "Taiwan", "Thailand", "Timor-Leste",
  "Turkey", "UAE", "Uzbekistan", "Vietnam",
  "---",
  "Algeria", "Angola", "Argentina", "Austria", "Belgium", "Botswana", "Brazil",
  "Canada", "Chile", "Colombia", "Czech Republic", "Denmark", "Egypt", "Ethiopia",
  "Finland", "France", "Germany", "Ghana", "Greece", "Hungary", "Iceland", "Ireland",
  "Israel", "Italy", "Kenya", "Luxembourg", "Mexico", "Morocco", "Netherlands",
  "Nigeria", "Norway", "Peru", "Poland", "Portugal", "Romania", "Russia",
  "South Africa", "Spain", "Sweden", "Switzerland", "Tanzania", "Tunisia",
  "Uganda", "Ukraine", "United Kingdom", "United States", "Zimbabwe",
];

const delegateItemSchema = z.object({
  salutation: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  jobTitle: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  specialRequests: z.string().optional(),
});

const step1Schema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  organizationUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().optional(),
  country: z.string().optional(),
  membershipType: z.enum(["MEMBER", "NON_MEMBER"], {
    message: "Please select a membership type",
  }),
});

const fullSchema = step1Schema.extend({
  delegates: z.array(delegateItemSchema).min(1, "At least one delegate is required"),
  termsAccepted: z.literal(true, {
    message: "You must accept the terms and conditions",
  }),
});

type FullFormData = z.infer<typeof fullSchema>;

interface PricingInfo {
  memberGroup: number;
  memberGroupEarlyBird: number;
  nonMemberGroup: number;
  nonMemberGroupEarlyBird: number;
  earlyBirdDeadline: string;
  currency: string;
  earlyBird: boolean;
  groupMinimum: number;
}

const STEPS = [
  { label: "Organization", icon: Building2 },
  { label: "Delegates", icon: Users },
  { label: "Review", icon: ClipboardCheck },
];

export default function GroupRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pricing, setPricing] = useState<PricingInfo | null>(null);
  const [expandedDelegates, setExpandedDelegates] = useState<Set<number>>(
    new Set()
  );

  const groupMinimum = pricing?.groupMinimum ?? 3;

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors },
    control,
  } = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      membershipType: "MEMBER",
      delegates: [
        { salutation: "", firstName: "", lastName: "", email: "", jobTitle: "" },
      ],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "delegates",
  });

  const membershipType = watch("membershipType");
  const delegates = watch("delegates");

  useEffect(() => {
    async function loadPricing() {
      try {
        const res = await fetch("/api/register/group?pricing=true");
        if (res.ok) {
          const data = await res.json();
          setPricing(data);
        }
      } catch {
        // best-effort
      }
    }
    loadPricing();
  }, []);

  function getPerPersonPrice(type: "MEMBER" | "NON_MEMBER"): number {
    if (!pricing) return 0;
    if (type === "MEMBER") {
      return pricing.earlyBird
        ? pricing.memberGroupEarlyBird
        : pricing.memberGroup;
    }
    return pricing.earlyBird
      ? pricing.nonMemberGroupEarlyBird
      : pricing.nonMemberGroup;
  }

  function formatCurrency(amount: number): string {
    return `${pricing?.currency ?? "USD"} ${amount.toLocaleString()}`;
  }

  function toggleDelegateExpanded(index: number) {
    setExpandedDelegates((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  async function goToStep(step: number) {
    if (step > currentStep) {
      // Validate current step before advancing
      if (currentStep === 0) {
        const valid = await trigger([
          "organizationName",
          "contactName",
          "contactEmail",
          "contactPhone",
          "country",
          "membershipType",
          "organizationUrl",
        ]);
        if (!valid) return;
      }
      if (currentStep === 1) {
        if (fields.length < groupMinimum) {
          setSubmitError(
            `A minimum of ${groupMinimum} delegates is required for group registration.`
          );
          return;
        }
        setSubmitError(null);
        const valid = await trigger("delegates");
        if (!valid) return;
      }
    }
    setSubmitError(null);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(data: FullFormData) {
    if (data.delegates.length < groupMinimum) {
      setSubmitError(
        `A minimum of ${groupMinimum} delegates is required.`
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const body = {
        organizationName: data.organizationName,
        organizationUrl: data.organizationUrl || undefined,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone || undefined,
        country: data.country || undefined,
        membershipType: data.membershipType,
        delegates: data.delegates.map((d) => ({
          salutation: d.salutation || undefined,
          firstName: d.firstName,
          lastName: d.lastName,
          email: d.email,
          jobTitle: d.jobTitle || undefined,
          dietaryRequirements: d.dietaryRequirements || undefined,
          specialRequests: d.specialRequests || undefined,
        })),
      };

      const res = await fetch("/api/register/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || "Registration failed. Please try again."
        );
      }

      router.push(`/register/success?ref=${result.referenceNumber}`);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const perPerson = getPerPersonPrice(membershipType);
  const total = perPerson * (delegates?.length ?? 0);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep-blue py-14 md:py-20 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.06} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Registration Options
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Group Registration
          </h1>
          <p className="mt-3 text-lg text-white/70 max-w-2xl">
            Register multiple delegates from your organization
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === currentStep;
              const isComplete = i < currentStep;
              return (
                <div key={step.label} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (i < currentStep) goToStep(i);
                    }}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-deep-blue"
                        : isComplete
                        ? "text-ocean-teal cursor-pointer hover:text-deep-blue"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-deep-blue text-white"
                          : isComplete
                          ? "bg-ocean-teal text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`mx-3 h-px w-12 sm:w-20 md:w-32 ${
                        isComplete ? "bg-ocean-teal" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form */}
      <section className="py-12 md:py-16 bg-coral-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Step 1: Organization Details */}
                {currentStep === 0 && (
                  <Card>
                    <CardHeader className="border-b">
                      <CardTitle className="flex items-center gap-2 text-deep-blue">
                        <Building2 className="h-5 w-5" />
                        Organization Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="organizationName">
                            Organization Name{" "}
                            <span className="text-bml-red">*</span>
                          </Label>
                          <Input
                            id="organizationName"
                            {...register("organizationName")}
                            className="mt-1.5"
                            aria-invalid={!!errors.organizationName}
                          />
                          {errors.organizationName && (
                            <p className="mt-1 text-xs text-bml-red">
                              {errors.organizationName.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="organizationUrl">Website URL</Label>
                          <Input
                            id="organizationUrl"
                            type="url"
                            {...register("organizationUrl")}
                            className="mt-1.5"
                            placeholder="https://..."
                          />
                          {errors.organizationUrl && (
                            <p className="mt-1 text-xs text-bml-red">
                              {errors.organizationUrl.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="contactName">
                            Contact Person Name{" "}
                            <span className="text-bml-red">*</span>
                          </Label>
                          <Input
                            id="contactName"
                            {...register("contactName")}
                            className="mt-1.5"
                            aria-invalid={!!errors.contactName}
                          />
                          {errors.contactName && (
                            <p className="mt-1 text-xs text-bml-red">
                              {errors.contactName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="contactEmail">
                            Contact Email{" "}
                            <span className="text-bml-red">*</span>
                          </Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            {...register("contactEmail")}
                            className="mt-1.5"
                            aria-invalid={!!errors.contactEmail}
                          />
                          {errors.contactEmail && (
                            <p className="mt-1 text-xs text-bml-red">
                              {errors.contactEmail.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="contactPhone">Contact Phone</Label>
                          <Input
                            id="contactPhone"
                            type="tel"
                            {...register("contactPhone")}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <select
                            id="country"
                            {...register("country")}
                            className="mt-1.5 h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                          >
                            <option value="">Select your country...</option>
                            {COUNTRIES.map((c) =>
                              c === "---" ? (
                                <option key="sep" disabled>
                                  ────────────
                                </option>
                              ) : (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>

                      {/* Membership Type */}
                      <div>
                        <Label className="mb-3">
                          Membership Type{" "}
                          <span className="text-bml-red">*</span>
                        </Label>
                        <div className="space-y-3">
                          <label className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer has-[:checked]:border-aba-gold has-[:checked]:bg-aba-gold/5 transition-colors">
                            <input
                              type="radio"
                              value="MEMBER"
                              {...register("membershipType")}
                              className="mt-0.5 h-4 w-4 accent-aba-gold"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-deep-blue">
                                  ABA Member
                                </span>
                                <span className="font-bold text-deep-blue">
                                  {formatCurrency(
                                    getPerPersonPrice("MEMBER")
                                  )}{" "}
                                  <span className="text-xs font-normal text-muted-foreground">
                                    /person
                                  </span>
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                Member bank or institution of the Asian Bankers
                                Association
                              </p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer has-[:checked]:border-aba-gold has-[:checked]:bg-aba-gold/5 transition-colors">
                            <input
                              type="radio"
                              value="NON_MEMBER"
                              {...register("membershipType")}
                              className="mt-0.5 h-4 w-4 accent-aba-gold"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-deep-blue">
                                  Non-Member
                                </span>
                                <span className="font-bold text-deep-blue">
                                  {formatCurrency(
                                    getPerPersonPrice("NON_MEMBER")
                                  )}{" "}
                                  <span className="text-xs font-normal text-muted-foreground">
                                    /person
                                  </span>
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                Non-member organization
                              </p>
                            </div>
                          </label>
                        </div>
                        {errors.membershipType && (
                          <p className="mt-2 text-xs text-bml-red">
                            {errors.membershipType.message}
                          </p>
                        )}
                      </div>

                      {/* Next Button */}
                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => goToStep(1)}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-deep-blue px-6 text-sm font-medium text-white transition-colors hover:bg-deep-blue/90"
                        >
                          Next: Add Delegates
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Delegates */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold text-deep-blue">
                        Delegates ({fields.length})
                      </h3>
                      {fields.length < groupMinimum && (
                        <Badge
                          variant="outline"
                          className="text-bml-red border-bml-red/30"
                        >
                          Minimum {groupMinimum} required
                        </Badge>
                      )}
                    </div>

                    {fields.map((field, index) => (
                      <Card key={field.id}>
                        <CardHeader className="border-b py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base text-deep-blue">
                              Delegate {index + 1}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleDelegateExpanded(index)}
                                className="text-muted-foreground hover:text-deep-blue p-1"
                              >
                                {expandedDelegates.has(index) ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </button>
                              {fields.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-muted-foreground hover:text-bml-red p-1"
                                  title="Remove delegate"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Salutation</Label>
                              <select
                                {...register(
                                  `delegates.${index}.salutation`
                                )}
                                className="mt-1.5 h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                              >
                                <option value="">Select...</option>
                                {SALUTATIONS.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <Label>
                                First Name{" "}
                                <span className="text-bml-red">*</span>
                              </Label>
                              <Input
                                {...register(
                                  `delegates.${index}.firstName`
                                )}
                                className="mt-1.5"
                                aria-invalid={
                                  !!errors.delegates?.[index]?.firstName
                                }
                              />
                              {errors.delegates?.[index]?.firstName && (
                                <p className="mt-1 text-xs text-bml-red">
                                  {
                                    errors.delegates[index].firstName
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>
                                Last Name{" "}
                                <span className="text-bml-red">*</span>
                              </Label>
                              <Input
                                {...register(
                                  `delegates.${index}.lastName`
                                )}
                                className="mt-1.5"
                                aria-invalid={
                                  !!errors.delegates?.[index]?.lastName
                                }
                              />
                              {errors.delegates?.[index]?.lastName && (
                                <p className="mt-1 text-xs text-bml-red">
                                  {
                                    errors.delegates[index].lastName
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>
                                Email{" "}
                                <span className="text-bml-red">*</span>
                              </Label>
                              <Input
                                type="email"
                                {...register(
                                  `delegates.${index}.email`
                                )}
                                className="mt-1.5"
                                aria-invalid={
                                  !!errors.delegates?.[index]?.email
                                }
                              />
                              {errors.delegates?.[index]?.email && (
                                <p className="mt-1 text-xs text-bml-red">
                                  {errors.delegates[index].email?.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Job Title</Label>
                              <Input
                                {...register(
                                  `delegates.${index}.jobTitle`
                                )}
                                className="mt-1.5"
                              />
                            </div>
                          </div>

                          {/* Expandable dietary/special */}
                          {expandedDelegates.has(index) && (
                            <div className="mt-4 pt-4 border-t space-y-4">
                              <div>
                                <Label>Dietary Requirements</Label>
                                <Textarea
                                  {...register(
                                    `delegates.${index}.dietaryRequirements`
                                  )}
                                  className="mt-1.5"
                                  placeholder="e.g., Vegetarian, Halal, Allergies..."
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label>Special Requests</Label>
                                <Textarea
                                  {...register(
                                    `delegates.${index}.specialRequests`
                                  )}
                                  className="mt-1.5"
                                  placeholder="Accessibility needs or other requests..."
                                  rows={2}
                                />
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        append({
                          salutation: "",
                          firstName: "",
                          lastName: "",
                          email: "",
                          jobTitle: "",
                        })
                      }
                      className="w-full h-12 rounded-lg border-2 border-dashed border-deep-blue/20 text-deep-blue text-sm font-medium hover:border-deep-blue/40 hover:bg-deep-blue/5 transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Delegate
                    </button>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => goToStep(0)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-deep-blue/20 px-6 text-sm font-medium text-deep-blue transition-colors hover:bg-deep-blue/5"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-deep-blue px-6 text-sm font-medium text-white transition-colors hover:bg-deep-blue/90"
                      >
                        Review &amp; Submit
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    {/* Organization Summary */}
                    <Card>
                      <CardHeader className="border-b">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-deep-blue">
                            <Building2 className="h-5 w-5" />
                            Organization
                          </CardTitle>
                          <button
                            type="button"
                            onClick={() => goToStep(0)}
                            className="text-xs text-ocean-teal hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                          <div>
                            <dt className="text-muted-foreground">
                              Organization
                            </dt>
                            <dd className="font-medium">
                              {getValues("organizationName")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">
                              Contact Person
                            </dt>
                            <dd className="font-medium">
                              {getValues("contactName")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Email</dt>
                            <dd className="font-medium">
                              {getValues("contactEmail")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">
                              Membership
                            </dt>
                            <dd className="font-medium">
                              {getValues("membershipType") === "MEMBER"
                                ? "ABA Member"
                                : "Non-Member"}
                            </dd>
                          </div>
                          {getValues("country") && (
                            <div>
                              <dt className="text-muted-foreground">
                                Country
                              </dt>
                              <dd className="font-medium">
                                {getValues("country")}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </CardContent>
                    </Card>

                    {/* Delegates Summary */}
                    <Card>
                      <CardHeader className="border-b">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-deep-blue">
                            <Users className="h-5 w-5" />
                            Delegates ({fields.length})
                          </CardTitle>
                          <button
                            type="button"
                            onClick={() => goToStep(1)}
                            className="text-xs text-ocean-teal hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="divide-y">
                          {delegates?.map((d, i) => (
                            <div
                              key={i}
                              className="py-3 first:pt-0 last:pb-0"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm">
                                    {d.salutation && `${d.salutation} `}
                                    {d.firstName} {d.lastName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {d.email}
                                    {d.jobTitle && ` - ${d.jobTitle}`}
                                  </p>
                                </div>
                                <span className="text-sm font-medium text-deep-blue">
                                  {formatCurrency(perPerson)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pricing Breakdown */}
                    <Card>
                      <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2 text-deep-blue">
                          <CreditCard className="h-5 w-5" />
                          Pricing Breakdown
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Rate per delegate
                          </span>
                          <span>{formatCurrency(perPerson)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Number of delegates
                          </span>
                          <span>{delegates?.length ?? 0}</span>
                        </div>
                        {pricing?.earlyBird && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Discount
                            </span>
                            <Badge className="bg-green-50 text-green-700 text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              Early Bird
                            </Badge>
                          </div>
                        )}
                        <div className="border-t pt-3 flex justify-between">
                          <span className="font-semibold text-deep-blue">
                            Total
                          </span>
                          <span className="text-xl font-bold text-deep-blue">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Terms */}
                    <Card>
                      <CardContent className="pt-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            {...register("termsAccepted")}
                            className="mt-0.5 h-4 w-4 rounded accent-deep-blue"
                          />
                          <span className="text-sm text-muted-foreground">
                            I confirm that the above information is correct and
                            agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-deep-blue underline hover:text-aba-gold"
                              target="_blank"
                            >
                              terms and conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-deep-blue underline hover:text-aba-gold"
                              target="_blank"
                            >
                              privacy policy
                            </Link>
                            .{" "}
                            <span className="text-bml-red">*</span>
                          </span>
                        </label>
                        {errors.termsAccepted && (
                          <p className="mt-2 text-xs text-bml-red">
                            {errors.termsAccepted.message}
                          </p>
                        )}
                      </CardContent>
                    </Card>

                    {submitError && (
                      <div className="rounded-lg bg-bml-red/10 border border-bml-red/20 p-4">
                        <p className="text-sm text-bml-red">{submitError}</p>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-deep-blue/20 px-6 text-sm font-medium text-deep-blue transition-colors hover:bg-deep-blue/5"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-bml-red px-8 text-sm font-medium text-white transition-colors hover:bg-bml-red/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Complete Registration"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardHeader className="border-b bg-deep-blue/5">
                      <CardTitle className="text-deep-blue">
                        Pricing Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Registration Type
                        </span>
                        <Badge
                          variant="outline"
                          className="text-deep-blue border-deep-blue/30"
                        >
                          Group
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Membership
                        </span>
                        <span className="text-sm font-medium">
                          {membershipType === "MEMBER"
                            ? "ABA Member"
                            : "Non-Member"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Per delegate
                        </span>
                        <span className="text-sm font-medium">
                          {formatCurrency(perPerson)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Delegates
                        </span>
                        <span className="text-sm font-medium">
                          {delegates?.length ?? 0}
                        </span>
                      </div>
                      {pricing?.earlyBird && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Discount
                          </span>
                          <Badge className="bg-green-50 text-green-700 text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Early Bird
                          </Badge>
                        </div>
                      )}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-deep-blue">
                            Total
                          </span>
                          <span className="text-2xl font-bold text-deep-blue">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </div>
                      {fields.length < groupMinimum && (
                        <p className="text-xs text-bml-red">
                          Minimum {groupMinimum} delegates required
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
