"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  ArrowUpRight,
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
      <section className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-aba-gold text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Registration Options
          </Link>
          <p className="text-editorial text-aba-gold mb-4">Group</p>
          <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-white">
            Group Registration
          </h1>
          <p className="mt-3 text-lg text-white/50 max-w-2xl">
            Register multiple delegates from your organization
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="bg-dark-card border-b border-white/10">
        <div className="w-[90%] max-w-[800px] mx-auto py-4">
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
                        ? "text-aba-gold"
                        : isComplete
                        ? "text-aba-gold/60 cursor-pointer hover:text-aba-gold"
                        : "text-white/20"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-aba-gold text-black"
                          : isComplete
                          ? "bg-aba-gold/20 text-aba-gold"
                          : "bg-white/5 text-white/20"
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
                        isComplete ? "bg-aba-gold/40" : "bg-white/10"
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
      <section className="relative py-12 md:py-16 bg-dark-surface">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Step 1: Organization Details */}
                {currentStep === 0 && (
                  <div className="bg-dark-card border border-white/10">
                    <div className="border-b border-white/10 p-6">
                      <h2 className="flex items-center gap-2 text-white font-bold">
                        <Building2 className="h-5 w-5 text-aba-gold" />
                        Organization Details
                      </h2>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="organizationName" className="text-white/50">
                            Organization Name{" "}
                            <span className="text-aba-gold">*</span>
                          </Label>
                          <Input
                            id="organizationName"
                            {...register("organizationName")}
                            className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                            aria-invalid={!!errors.organizationName}
                          />
                          {errors.organizationName && (
                            <p className="mt-1 text-xs text-red-400">
                              {errors.organizationName.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="organizationUrl" className="text-white/50">Website URL</Label>
                          <Input
                            id="organizationUrl"
                            type="url"
                            {...register("organizationUrl")}
                            className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                            placeholder="https://..."
                          />
                          {errors.organizationUrl && (
                            <p className="mt-1 text-xs text-red-400">
                              {errors.organizationUrl.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="contactName" className="text-white/50">
                            Contact Person Name{" "}
                            <span className="text-aba-gold">*</span>
                          </Label>
                          <Input
                            id="contactName"
                            {...register("contactName")}
                            className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                            aria-invalid={!!errors.contactName}
                          />
                          {errors.contactName && (
                            <p className="mt-1 text-xs text-red-400">
                              {errors.contactName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="contactEmail" className="text-white/50">
                            Contact Email{" "}
                            <span className="text-aba-gold">*</span>
                          </Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            {...register("contactEmail")}
                            className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                            aria-invalid={!!errors.contactEmail}
                          />
                          {errors.contactEmail && (
                            <p className="mt-1 text-xs text-red-400">
                              {errors.contactEmail.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="contactPhone" className="text-white/50">Contact Phone</Label>
                          <Input
                            id="contactPhone"
                            type="tel"
                            {...register("contactPhone")}
                            className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                          />
                        </div>
                        <div>
                          <Label htmlFor="country" className="text-white/50">Country</Label>
                          <select
                            id="country"
                            {...register("country")}
                            className="mt-1.5 h-10 w-full bg-dark-card border border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold px-3 text-sm outline-none"
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
                        <Label className="mb-3 text-white/50">
                          Membership Type{" "}
                          <span className="text-aba-gold">*</span>
                        </Label>
                        <div className="space-y-3">
                          <label className="flex items-start gap-3 border border-white/10 p-4 cursor-pointer has-[:checked]:border-aba-gold has-[:checked]:bg-aba-gold/5 transition-colors">
                            <input
                              type="radio"
                              value="MEMBER"
                              {...register("membershipType")}
                              className="mt-0.5 h-4 w-4 accent-aba-gold"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-white">
                                  ABA Member
                                </span>
                                <span className="font-bold gradient-gold-text">
                                  {formatCurrency(
                                    getPerPersonPrice("MEMBER")
                                  )}{" "}
                                  <span className="text-xs font-normal text-white/40">
                                    /person
                                  </span>
                                </span>
                              </div>
                              <p className="text-sm text-white/40 mt-0.5">
                                Member bank or institution of the Asian Bankers
                                Association
                              </p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 border border-white/10 p-4 cursor-pointer has-[:checked]:border-aba-gold has-[:checked]:bg-aba-gold/5 transition-colors">
                            <input
                              type="radio"
                              value="NON_MEMBER"
                              {...register("membershipType")}
                              className="mt-0.5 h-4 w-4 accent-aba-gold"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-white">
                                  Non-Member
                                </span>
                                <span className="font-bold gradient-gold-text">
                                  {formatCurrency(
                                    getPerPersonPrice("NON_MEMBER")
                                  )}{" "}
                                  <span className="text-xs font-normal text-white/40">
                                    /person
                                  </span>
                                </span>
                              </div>
                              <p className="text-sm text-white/40 mt-0.5">
                                Non-member organization
                              </p>
                            </div>
                          </label>
                        </div>
                        {errors.membershipType && (
                          <p className="mt-2 text-xs text-red-400">
                            {errors.membershipType.message}
                          </p>
                        )}
                      </div>

                      {/* Next Button */}
                      <div className="flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => goToStep(1)}
                          className="btn-sharp gradient-gold inline-flex h-10 items-center justify-center gap-2 px-6 text-sm font-medium text-white"
                        >
                          Next: Add Delegates
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Delegates */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-display text-lg text-white">
                        Delegates ({fields.length})
                      </h3>
                      {fields.length < groupMinimum && (
                        <span className="gradient-red text-white text-xs px-2 py-1 font-medium">
                          Minimum {groupMinimum} required
                        </span>
                      )}
                    </div>

                    {fields.map((field, index) => (
                      <div key={field.id} className="bg-dark-card border border-white/10">
                        <div className="border-b border-white/10 px-6 py-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-bold text-white">
                              Delegate {index + 1}
                            </h4>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => toggleDelegateExpanded(index)}
                                className="text-white/40 hover:text-aba-gold p-1"
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
                                  className="text-white/40 hover:text-red-400 p-1"
                                  title="Remove delegate"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white/50">Salutation</Label>
                              <select
                                {...register(
                                  `delegates.${index}.salutation`
                                )}
                                className="mt-1.5 h-10 w-full bg-dark-card border border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold px-3 text-sm outline-none"
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
                              <Label className="text-white/50">
                                First Name{" "}
                                <span className="text-aba-gold">*</span>
                              </Label>
                              <Input
                                {...register(
                                  `delegates.${index}.firstName`
                                )}
                                className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                                aria-invalid={
                                  !!errors.delegates?.[index]?.firstName
                                }
                              />
                              {errors.delegates?.[index]?.firstName && (
                                <p className="mt-1 text-xs text-red-400">
                                  {
                                    errors.delegates[index].firstName
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                            <div>
                              <Label className="text-white/50">
                                Last Name{" "}
                                <span className="text-aba-gold">*</span>
                              </Label>
                              <Input
                                {...register(
                                  `delegates.${index}.lastName`
                                )}
                                className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                                aria-invalid={
                                  !!errors.delegates?.[index]?.lastName
                                }
                              />
                              {errors.delegates?.[index]?.lastName && (
                                <p className="mt-1 text-xs text-red-400">
                                  {
                                    errors.delegates[index].lastName
                                      ?.message
                                  }
                                </p>
                              )}
                            </div>
                            <div>
                              <Label className="text-white/50">
                                Email{" "}
                                <span className="text-aba-gold">*</span>
                              </Label>
                              <Input
                                type="email"
                                {...register(
                                  `delegates.${index}.email`
                                )}
                                className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                                aria-invalid={
                                  !!errors.delegates?.[index]?.email
                                }
                              />
                              {errors.delegates?.[index]?.email && (
                                <p className="mt-1 text-xs text-red-400">
                                  {errors.delegates[index].email?.message}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label className="text-white/50">Job Title</Label>
                              <Input
                                {...register(
                                  `delegates.${index}.jobTitle`
                                )}
                                className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                              />
                            </div>
                          </div>

                          {/* Expandable dietary/special */}
                          {expandedDelegates.has(index) && (
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                              <div>
                                <Label className="text-white/50">Dietary Requirements</Label>
                                <Textarea
                                  {...register(
                                    `delegates.${index}.dietaryRequirements`
                                  )}
                                  className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                                  placeholder="e.g., Vegetarian, Halal, Allergies..."
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label className="text-white/50">Special Requests</Label>
                                <Textarea
                                  {...register(
                                    `delegates.${index}.specialRequests`
                                  )}
                                  className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                                  placeholder="Accessibility needs or other requests..."
                                  rows={2}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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
                      className="w-full h-12 border-2 border-dashed border-white/10 text-white/50 text-sm font-medium hover:border-aba-gold/40 hover:text-aba-gold transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Delegate
                    </button>

                    {/* Navigation */}
                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => goToStep(0)}
                        className="btn-sharp inline-flex h-10 items-center justify-center gap-2 border border-white/10 bg-dark-card px-6 text-sm font-medium text-white transition-colors hover:border-aba-gold/40"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="btn-sharp gradient-gold inline-flex h-10 items-center justify-center gap-2 px-6 text-sm font-medium text-white"
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
                    <div className="bg-dark-card border border-white/10">
                      <div className="border-b border-white/10 p-6">
                        <div className="flex items-center justify-between">
                          <h2 className="flex items-center gap-2 text-white font-bold">
                            <Building2 className="h-5 w-5 text-aba-gold" />
                            Organization
                          </h2>
                          <button
                            type="button"
                            onClick={() => goToStep(0)}
                            className="text-xs text-aba-gold hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                          <div>
                            <dt className="text-white/40">
                              Organization
                            </dt>
                            <dd className="font-medium text-white">
                              {getValues("organizationName")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-white/40">
                              Contact Person
                            </dt>
                            <dd className="font-medium text-white">
                              {getValues("contactName")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-white/40">Email</dt>
                            <dd className="font-medium text-white">
                              {getValues("contactEmail")}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-white/40">
                              Membership
                            </dt>
                            <dd className="font-medium text-white">
                              {getValues("membershipType") === "MEMBER"
                                ? "ABA Member"
                                : "Non-Member"}
                            </dd>
                          </div>
                          {getValues("country") && (
                            <div>
                              <dt className="text-white/40">
                                Country
                              </dt>
                              <dd className="font-medium text-white">
                                {getValues("country")}
                              </dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    </div>

                    {/* Delegates Summary */}
                    <div className="bg-dark-card border border-white/10">
                      <div className="border-b border-white/10 p-6">
                        <div className="flex items-center justify-between">
                          <h2 className="flex items-center gap-2 text-white font-bold">
                            <Users className="h-5 w-5 text-aba-gold" />
                            Delegates ({fields.length})
                          </h2>
                          <button
                            type="button"
                            onClick={() => goToStep(1)}
                            className="text-xs text-aba-gold hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="divide-y divide-white/10">
                          {delegates?.map((d, i) => (
                            <div
                              key={i}
                              className="py-3 first:pt-0 last:pb-0"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-sm text-white">
                                    {d.salutation && `${d.salutation} `}
                                    {d.firstName} {d.lastName}
                                  </p>
                                  <p className="text-xs text-white/40">
                                    {d.email}
                                    {d.jobTitle && ` - ${d.jobTitle}`}
                                  </p>
                                </div>
                                <span className="text-sm font-medium gradient-gold-text">
                                  {formatCurrency(perPerson)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="bg-dark-card border border-white/10">
                      <div className="border-b border-white/10 p-6">
                        <h2 className="flex items-center gap-2 text-white font-bold">
                          <CreditCard className="h-5 w-5 text-aba-gold" />
                          Pricing Breakdown
                        </h2>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/40">
                            Rate per delegate
                          </span>
                          <span className="text-white">{formatCurrency(perPerson)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/40">
                            Number of delegates
                          </span>
                          <span className="text-white">{delegates?.length ?? 0}</span>
                        </div>
                        {pricing?.earlyBird && (
                          <div className="flex justify-between text-sm">
                            <span className="text-white/40">
                              Discount
                            </span>
                            <span className="gradient-red text-white text-xs px-2 py-0.5 font-medium inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Early Bird
                            </span>
                          </div>
                        )}
                        <div className="border-t border-white/10 pt-3 flex justify-between">
                          <span className="font-semibold text-white">
                            Total
                          </span>
                          <span className="text-xl font-bold gradient-gold-text">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="bg-dark-card border border-white/10 p-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("termsAccepted")}
                          className="mt-0.5 h-4 w-4 rounded accent-aba-gold"
                        />
                        <span className="text-sm text-white/50">
                          I confirm that the above information is correct and
                          agree to the{" "}
                          <Link
                            href="/terms"
                            className="text-aba-gold underline hover:text-aba-gold/80"
                            target="_blank"
                          >
                            terms and conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy"
                            className="text-aba-gold underline hover:text-aba-gold/80"
                            target="_blank"
                          >
                            privacy policy
                          </Link>
                          .{" "}
                          <span className="text-aba-gold">*</span>
                        </span>
                      </label>
                      {errors.termsAccepted && (
                        <p className="mt-2 text-xs text-red-400">
                          {errors.termsAccepted.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div className="bg-red-500/10 border border-red-500/20 p-4">
                        <p className="text-sm text-red-400">{submitError}</p>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="btn-sharp inline-flex h-10 items-center justify-center gap-2 border border-white/10 bg-dark-card px-6 text-sm font-medium text-white transition-colors hover:border-aba-gold/40"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-sharp gradient-red inline-flex h-12 items-center justify-center gap-2 px-8 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Complete Registration
                            <ArrowUpRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-dark-card border border-white/10">
                    <div className="border-b border-white/10 bg-black/30 p-6">
                      <h3 className="text-white font-bold">
                        Pricing Summary
                      </h3>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/40">
                          Registration Type
                        </span>
                        <span className="text-editorial text-aba-gold text-xs">
                          Group
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/40">
                          Membership
                        </span>
                        <span className="text-sm font-medium text-white">
                          {membershipType === "MEMBER"
                            ? "ABA Member"
                            : "Non-Member"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/40">
                          Per delegate
                        </span>
                        <span className="text-sm font-medium text-white">
                          {formatCurrency(perPerson)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/40">
                          Delegates
                        </span>
                        <span className="text-sm font-medium text-white">
                          {delegates?.length ?? 0}
                        </span>
                      </div>
                      {pricing?.earlyBird && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/40">
                            Discount
                          </span>
                          <span className="gradient-red text-white text-xs px-2 py-0.5 font-medium inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Early Bird
                          </span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">
                            Total
                          </span>
                          <span className="text-2xl font-bold gradient-gold-text">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </div>
                      {fields.length < groupMinimum && (
                        <p className="text-xs text-red-400">
                          Minimum {groupMinimum} delegates required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
