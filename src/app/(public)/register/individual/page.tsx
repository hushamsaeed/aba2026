"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Clock, User, Briefcase, CreditCard, ArrowUpRight } from "lucide-react";

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
          <p className="text-editorial text-aba-gold mb-4">Individual</p>
          <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-white">
            Individual Registration
          </h1>
          <p className="mt-3 text-lg text-white/50 max-w-2xl">
            Register as an individual delegate for the 42nd ABA Conference
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="relative py-12 md:py-16 bg-dark-surface">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Details */}
                <div className="bg-dark-card border border-white/10">
                  <div className="border-b border-white/10 p-6">
                    <h2 className="flex items-center gap-2 text-white font-bold">
                      <User className="h-5 w-5 text-aba-gold" />
                      Personal Details
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="salutation" className="text-white/50">Salutation</Label>
                        <select
                          id="salutation"
                          {...register("salutation")}
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
                        <Label htmlFor="firstName" className="text-white/50">
                          First Name <span className="text-aba-gold">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                          aria-invalid={!!errors.firstName}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="middleName" className="text-white/50">Middle Name</Label>
                        <Input
                          id="middleName"
                          {...register("middleName")}
                          className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white/50">
                          Last Name <span className="text-aba-gold">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                          aria-invalid={!!errors.lastName}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white/50">
                          Email Address <span className="text-aba-gold">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-400">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white/50">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="bg-dark-card border border-white/10">
                  <div className="border-b border-white/10 p-6">
                    <h2 className="flex items-center gap-2 text-white font-bold">
                      <Briefcase className="h-5 w-5 text-aba-gold" />
                      Professional Details
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="jobTitle" className="text-white/50">Job Title</Label>
                        <Input
                          id="jobTitle"
                          {...register("jobTitle")}
                          className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                        />
                      </div>
                      <div>
                        <Label htmlFor="organization" className="text-white/50">Organization</Label>
                        <Input
                          id="organization"
                          {...register("organization")}
                          className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                        />
                      </div>
                      <div className="md:col-span-2">
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
                  </div>
                </div>

                {/* Membership Type */}
                <div className="bg-dark-card border border-white/10">
                  <div className="border-b border-white/10 p-6">
                    <h2 className="flex items-center gap-2 text-white font-bold">
                      <CreditCard className="h-5 w-5 text-aba-gold" />
                      Membership &amp; Rate
                    </h2>
                  </div>
                  <div className="p-6">
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
                              {getDisplayPrice("MEMBER")}
                            </span>
                          </div>
                          <p className="text-sm text-white/40 mt-0.5">
                            For delegates from ABA member banks and institutions
                          </p>
                          {getRegularPrice("MEMBER") && (
                            <p className="text-xs text-white/40 line-through mt-1">
                              Regular: {getRegularPrice("MEMBER")}
                            </p>
                          )}
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
                              {getDisplayPrice("NON_MEMBER")}
                            </span>
                          </div>
                          <p className="text-sm text-white/40 mt-0.5">
                            For delegates from non-member organizations
                          </p>
                          {getRegularPrice("NON_MEMBER") && (
                            <p className="text-xs text-white/40 line-through mt-1">
                              Regular: {getRegularPrice("NON_MEMBER")}
                            </p>
                          )}
                        </div>
                      </label>
                    </div>
                    {errors.membershipType && (
                      <p className="mt-2 text-xs text-red-400">
                        {errors.membershipType.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-dark-card border border-white/10">
                  <div className="border-b border-white/10 p-6">
                    <h2 className="text-white font-bold">
                      Additional Information
                    </h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <Label htmlFor="dietaryRequirements" className="text-white/50">
                        Dietary Requirements
                      </Label>
                      <Textarea
                        id="dietaryRequirements"
                        {...register("dietaryRequirements")}
                        className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                        placeholder="e.g., Vegetarian, Halal, Gluten-free, Allergies..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialRequests" className="text-white/50">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        {...register("specialRequests")}
                        className="mt-1.5 bg-dark-card border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold"
                        placeholder="Any special arrangements or accessibility requirements..."
                        rows={2}
                      />
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
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-aba-gold underline hover:text-aba-gold/80"
                        target="_blank"
                      >
                        terms and conditions
                      </Link>{" "}
                      and the{" "}
                      <Link
                        href="/privacy"
                        className="text-aba-gold underline hover:text-aba-gold/80"
                        target="_blank"
                      >
                        privacy policy
                      </Link>{" "}
                      of the 42nd ABA Conference.{" "}
                      <span className="text-aba-gold">*</span>
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4">
                    <p className="text-sm text-red-400">{submitError}</p>
                  </div>
                )}

                {/* Submit Button (mobile) */}
                <div className="lg:hidden">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-sharp gradient-red w-full h-12 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

              {/* Pricing Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
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
                          Individual
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
                        {pricing?.earlyBird && (
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-white/40">
                              Regular rate
                            </span>
                            <span className="text-sm text-white/40 line-through">
                              {getRegularPrice(membershipType)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">
                            Total
                          </span>
                          <span className="text-2xl font-bold gradient-gold-text">
                            {getDisplayPrice(membershipType)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button (desktop) */}
                  <div className="hidden lg:block">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-sharp gradient-red w-full h-12 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                  <p className="text-xs text-center text-white/40">
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
