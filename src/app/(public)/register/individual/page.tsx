"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { ArrowLeft, Loader2, Clock, User, Briefcase, CreditCard } from "lucide-react";

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

const formSchema = z.object({
  salutation: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  organization: z.string().optional(),
  country: z.string().optional(),
  membershipType: z.enum(["MEMBER", "NON_MEMBER"], {
    message: "Please select a membership type",
  }),
  dietaryRequirements: z.string().optional(),
  specialRequests: z.string().optional(),
  termsAccepted: z.literal(true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface PricingInfo {
  memberIndividual: number;
  memberIndividualEarlyBird: number;
  nonMemberIndividual: number;
  nonMemberIndividualEarlyBird: number;
  earlyBirdDeadline: string;
  currency: string;
  earlyBird: boolean;
}

export default function IndividualRegistrationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pricing, setPricing] = useState<PricingInfo | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      membershipType: "MEMBER",
    },
  });

  const membershipType = watch("membershipType");

  useEffect(() => {
    fetch("/api/register/individual", { method: "OPTIONS" })
      .catch(() => null);

    // Fetch pricing info from the pricing endpoint
    async function loadPricing() {
      try {
        const res = await fetch("/api/register/individual?pricing=true");
        if (res.ok) {
          const data = await res.json();
          setPricing(data);
        }
      } catch {
        // Pricing display is best-effort on the client
      }
    }
    loadPricing();
  }, []);

  function getDisplayPrice(type: "MEMBER" | "NON_MEMBER"): string {
    if (!pricing) return "...";
    const amount =
      type === "MEMBER"
        ? pricing.earlyBird
          ? pricing.memberIndividualEarlyBird
          : pricing.memberIndividual
        : pricing.earlyBird
        ? pricing.nonMemberIndividualEarlyBird
        : pricing.nonMemberIndividual;
    return `${pricing.currency} ${amount.toLocaleString()}`;
  }

  function getRegularPrice(type: "MEMBER" | "NON_MEMBER"): string | null {
    if (!pricing || !pricing.earlyBird) return null;
    const amount =
      type === "MEMBER"
        ? pricing.memberIndividual
        : pricing.nonMemberIndividual;
    return `${pricing.currency} ${amount.toLocaleString()}`;
  }

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const body = {
        contactName: `${data.firstName} ${data.lastName}`,
        contactEmail: data.email,
        contactPhone: data.phone || undefined,
        country: data.country || undefined,
        membershipType: data.membershipType,
        delegate: {
          salutation: data.salutation || undefined,
          firstName: data.firstName,
          middleName: data.middleName || undefined,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || undefined,
          jobTitle: data.jobTitle || undefined,
          organization: data.organization || undefined,
          country: data.country || undefined,
          dietaryRequirements: data.dietaryRequirements || undefined,
          specialRequests: data.specialRequests || undefined,
        },
      };

      const res = await fetch("/api/register/individual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Registration failed. Please try again.");
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
            Individual Registration
          </h1>
          <p className="mt-3 text-lg text-white/70 max-w-2xl">
            Register as an individual delegate for the 42nd ABA Conference
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16 bg-coral-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Details */}
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2 text-deep-blue">
                      <User className="h-5 w-5" />
                      Personal Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="salutation">Salutation</Label>
                        <select
                          id="salutation"
                          {...register("salutation")}
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
                        <Label htmlFor="firstName">
                          First Name <span className="text-bml-red">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          className="mt-1.5"
                          aria-invalid={!!errors.firstName}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs text-bml-red">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="middleName">Middle Name</Label>
                        <Input
                          id="middleName"
                          {...register("middleName")}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">
                          Last Name <span className="text-bml-red">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          className="mt-1.5"
                          aria-invalid={!!errors.lastName}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs text-bml-red">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">
                          Email Address <span className="text-bml-red">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="mt-1.5"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-bml-red">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Details */}
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2 text-deep-blue">
                      <Briefcase className="h-5 w-5" />
                      Professional Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                          id="jobTitle"
                          {...register("jobTitle")}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          {...register("organization")}
                          className="mt-1.5"
                        />
                      </div>
                      <div className="md:col-span-2">
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
                  </CardContent>
                </Card>

                {/* Membership Type */}
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2 text-deep-blue">
                      <CreditCard className="h-5 w-5" />
                      Membership &amp; Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
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
                              {getDisplayPrice("MEMBER")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            For delegates from ABA member banks and institutions
                          </p>
                          {getRegularPrice("MEMBER") && (
                            <p className="text-xs text-muted-foreground line-through mt-1">
                              Regular: {getRegularPrice("MEMBER")}
                            </p>
                          )}
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
                              {getDisplayPrice("NON_MEMBER")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            For delegates from non-member organizations
                          </p>
                          {getRegularPrice("NON_MEMBER") && (
                            <p className="text-xs text-muted-foreground line-through mt-1">
                              Regular: {getRegularPrice("NON_MEMBER")}
                            </p>
                          )}
                        </div>
                      </label>
                    </div>
                    {errors.membershipType && (
                      <p className="mt-2 text-xs text-bml-red">
                        {errors.membershipType.message}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader className="border-b">
                    <CardTitle className="text-deep-blue">
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <Label htmlFor="dietaryRequirements">
                        Dietary Requirements
                      </Label>
                      <Textarea
                        id="dietaryRequirements"
                        {...register("dietaryRequirements")}
                        className="mt-1.5"
                        placeholder="e.g., Vegetarian, Halal, Gluten-free, Allergies..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        {...register("specialRequests")}
                        className="mt-1.5"
                        placeholder="Any special arrangements or accessibility requirements..."
                        rows={2}
                      />
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
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-deep-blue underline hover:text-aba-gold"
                          target="_blank"
                        >
                          terms and conditions
                        </Link>{" "}
                        and the{" "}
                        <Link
                          href="/privacy"
                          className="text-deep-blue underline hover:text-aba-gold"
                          target="_blank"
                        >
                          privacy policy
                        </Link>{" "}
                        of the 42nd ABA Conference.{" "}
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

                {/* Submit Error */}
                {submitError && (
                  <div className="rounded-lg bg-bml-red/10 border border-bml-red/20 p-4">
                    <p className="text-sm text-bml-red">{submitError}</p>
                  </div>
                )}

                {/* Submit Button (mobile) */}
                <div className="lg:hidden">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-lg bg-bml-red text-white font-medium transition-colors hover:bg-bml-red/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

              {/* Pricing Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
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
                          Individual
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
                        {pricing?.earlyBird && (
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">
                              Regular rate
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {getRegularPrice(membershipType)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-deep-blue">
                            Total
                          </span>
                          <span className="text-2xl font-bold text-deep-blue">
                            {getDisplayPrice(membershipType)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submit Button (desktop) */}
                  <div className="hidden lg:block">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-lg bg-bml-red text-white font-medium transition-colors hover:bg-bml-red/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                  <p className="text-xs text-center text-muted-foreground">
                    Payment instructions will be sent to your email after
                    registration.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
