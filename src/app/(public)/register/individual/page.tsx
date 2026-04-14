"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FormInput } from "@/components/shared/form-input";
import { FormSelect } from "@/components/shared/form-select";
import { FormTextarea } from "@/components/shared/form-textarea";
import { ButtonPrimary } from "@/components/shared/button-primary";

const salutations = [
  { value: "Mr", label: "Mr." },
  { value: "Ms", label: "Ms." },
  { value: "Mrs", label: "Mrs." },
  { value: "Dr", label: "Dr." },
  { value: "Prof", label: "Prof." },
];

const membershipOptions = [
  { value: "MEMBER", label: "ABA Member — $800 ($640 Early Bird)" },
  { value: "NON_MEMBER", label: "Non-ABA Member — $1,000 ($800 Early Bird)" },
];

function IndividualRegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier");
  const initialTier = tierParam === "NON_MEMBER" ? "NON_MEMBER" : "MEMBER";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [membership, setMembership] = useState(initialTier);

  const isEarlyBird = new Date() < new Date("2026-06-01");
  const price = membership === "MEMBER"
    ? isEarlyBird ? 640 : 800
    : isEarlyBird ? 800 : 1000;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const data = {
      type: "INDIVIDUAL",
      membershipType: formData.get("membershipType"),
      contactName: `${formData.get("firstName")} ${formData.get("lastName")}`,
      contactEmail: formData.get("email"),
      contactPhone: formData.get("phone"),
      organizationName: formData.get("organization"),
      country: formData.get("country"),
      delegates: [
        {
          salutation: formData.get("salutation"),
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          jobTitle: formData.get("jobTitle"),
          organization: formData.get("organization"),
          country: formData.get("country"),
          dietaryRequirements: formData.get("dietary"),
          specialRequests: formData.get("special"),
        },
      ],
      paymentMethod: "BANK_TRANSFER",
    };

    try {
      const res = await fetch("/api/register/individual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Registration failed");
      }

      const result = await res.json();
      router.push(`/register/success?ref=${result.referenceNumber}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto px-6 py-10 lg:px-30 lg:py-20">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <span className="section-label">INDIVIDUAL REGISTRATION</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[42px] font-bold text-text text-center">
            Register as Individual
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary text-center leading-[1.6] max-w-[600px]">
            Secure your place at the 42nd ABA General Meeting & Conference, 1–3 September 2026, Kurumba Maldives.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left — Form */}
            <div className="flex flex-col gap-10 flex-1">
              {/* Personal Info */}
              <div className="flex flex-col gap-6">
                <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-text">
                  Personal Information
                </h2>
                <FormSelect
                  label="Salutation"
                  name="salutation"
                  options={salutations}
                  placeholder="Select..."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormInput label="First Name" name="firstName" placeholder="First name" required />
                  <FormInput label="Last Name" name="lastName" placeholder="Last name" required />
                </div>
                <FormInput label="Email" name="email" type="email" placeholder="Email address" required />
                <FormInput label="Phone" name="phone" placeholder="+1 234 567 8900" />
                <FormInput label="Job Title" name="jobTitle" placeholder="Your position" />
                <FormInput label="Organization" name="organization" placeholder="Company or institution" required />
                <FormInput label="Country" name="country" placeholder="Country of residence" />
              </div>

              {/* Membership tier */}
              <div className="flex flex-col gap-6">
                <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-text">
                  Registration Tier
                </h2>
                <FormSelect
                  label="Membership Type"
                  name="membershipType"
                  options={membershipOptions}
                  defaultValue="MEMBER"
                  onChange={(e) => setMembership(e.target.value)}
                />
              </div>

              {/* Additional info */}
              <div className="flex flex-col gap-6">
                <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-text">
                  Additional Information
                </h2>
                <FormInput label="Dietary Requirements" name="dietary" placeholder="Any dietary needs" />
                <FormTextarea label="Special Requests" name="special" placeholder="Any special requirements" />
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className="w-full lg:w-[400px] shrink-0">
              <div className="sticky top-24 flex flex-col gap-6 bg-navy p-9 text-white">
                <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-bold">
                  Order Summary
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="font-[family-name:var(--font-body)] text-[14px] text-white/60">
                      Registration Tier
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[14px] text-white">
                      {membership === "MEMBER" ? "ABA Member" : "Non-ABA Member"}
                    </span>
                  </div>
                  {isEarlyBird && (
                    <div className="flex justify-between">
                      <span className="font-[family-name:var(--font-body)] text-[14px] text-gold">
                        Early Bird Discount
                      </span>
                      <span className="font-[family-name:var(--font-body)] text-[14px] text-gold">
                        -20%
                      </span>
                    </div>
                  )}
                  <div className="w-full h-px bg-white/10 my-2" />
                  <div className="flex justify-between">
                    <span className="font-[family-name:var(--font-body)] text-[16px] font-semibold text-white">
                      Total
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-white">
                      ${price}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 accent-gold"
                  />
                  <span className="font-[family-name:var(--font-body)] text-[13px] text-white/60 leading-[1.5]">
                    I agree to the terms and conditions, including the
                    cancellation policy.
                  </span>
                </label>

                {error && (
                  <p className="font-[family-name:var(--font-body)] text-[14px] text-red-400">
                    {error}
                  </p>
                )}

                <ButtonPrimary type="submit" loading={loading} fullWidth>
                  COMPLETE REGISTRATION
                </ButtonPrimary>

                <p className="font-[family-name:var(--font-body)] text-[12px] text-white/40 text-center">
                  Payment via bank transfer. Details will be provided after
                  registration.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function IndividualRegistrationPage() {
  return (
    <Suspense>
      <IndividualRegistrationForm />
    </Suspense>
  );
}
