"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/shared/form-input";
import { FormSelect } from "@/components/shared/form-select";
import { ButtonPrimary } from "@/components/shared/button-primary";
import { Plus, X } from "lucide-react";

const membershipOptions = [
  { value: "MEMBER", label: "ABA Member — $700/person ($560 Early Bird)" },
  { value: "NON_MEMBER", label: "Non-ABA Member — $900/person ($720 Early Bird)" },
];

interface Delegate {
  firstName: string;
  lastName: string;
  email: string;
}

export default function GroupRegistrationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [membership, setMembership] = useState("MEMBER");
  const [delegates, setDelegates] = useState<Delegate[]>([
    { firstName: "", lastName: "", email: "" },
    { firstName: "", lastName: "", email: "" },
    { firstName: "", lastName: "", email: "" },
  ]);

  const isEarlyBird = new Date() < new Date("2026-06-01");
  const pricePerPerson = membership === "MEMBER"
    ? isEarlyBird ? 560 : 700
    : isEarlyBird ? 720 : 900;
  const total = pricePerPerson * delegates.length;

  function addDelegate() {
    setDelegates([...delegates, { firstName: "", lastName: "", email: "" }]);
  }

  function removeDelegate(index: number) {
    if (delegates.length <= 3) return;
    setDelegates(delegates.filter((_, i) => i !== index));
  }

  function updateDelegate(index: number, field: keyof Delegate, value: string) {
    const updated = [...delegates];
    updated[index] = { ...updated[index], [field]: value };
    setDelegates(updated);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const data = {
      type: "GROUP",
      membershipType: formData.get("membershipType"),
      contactName: formData.get("contactName"),
      contactEmail: formData.get("contactEmail"),
      contactPhone: formData.get("contactPhone"),
      organizationName: formData.get("organization"),
      country: formData.get("country"),
      delegates: delegates.map((d) => ({
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        organization: formData.get("organization") as string,
        country: formData.get("country") as string,
      })),
      paymentMethod: "BANK_TRANSFER",
    };

    try {
      const res = await fetch("/api/register/group", {
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
          <span className="section-label">GROUP REGISTRATION</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[26px] lg:text-[42px] font-bold text-text text-center">
            Register Your Organization
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary text-center leading-[1.6] max-w-[600px]">
            Register multiple delegates from your organization and benefit from group pricing.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left — Form */}
            <div className="flex flex-col gap-10 flex-1">
              {/* Organization Info */}
              <div className="flex flex-col gap-6">
                <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-text">
                  Organization Details
                </h2>
                <FormInput label="Organization Name" name="organization" placeholder="Company or institution" required />
                <FormInput label="Contact Person" name="contactName" placeholder="Primary contact name" required />
                <FormInput label="Contact Email" name="contactEmail" type="email" placeholder="Email address" required />
                <FormInput label="Contact Phone" name="contactPhone" placeholder="+1 234 567 8900" />
                <FormInput label="Country" name="country" placeholder="Country" />
                <FormSelect
                  label="Membership Type"
                  name="membershipType"
                  options={membershipOptions}
                  defaultValue="MEMBER"
                  onChange={(e) => setMembership(e.target.value)}
                />
              </div>

              {/* Delegates */}
              <div className="flex flex-col gap-6">
                <h2 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-text">
                  Delegates ({delegates.length})
                </h2>
                <div className="flex flex-col gap-4">
                  {delegates.map((delegate, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white p-4 border border-border-light"
                    >
                      <span className="font-[family-name:var(--font-body)] text-[14px] font-semibold text-gold w-8 shrink-0">
                        {idx + 1}.
                      </span>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={delegate.firstName}
                        onChange={(e) => updateDelegate(idx, "firstName", e.target.value)}
                        required
                        className="h-10 flex-1 px-3 border border-border font-[family-name:var(--font-body)] text-[14px] text-text placeholder:text-[#9A9590] focus:outline-none focus:border-gold focus:border-2"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={delegate.lastName}
                        onChange={(e) => updateDelegate(idx, "lastName", e.target.value)}
                        required
                        className="h-10 flex-1 px-3 border border-border font-[family-name:var(--font-body)] text-[14px] text-text placeholder:text-[#9A9590] focus:outline-none focus:border-gold focus:border-2"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={delegate.email}
                        onChange={(e) => updateDelegate(idx, "email", e.target.value)}
                        required
                        className="h-10 flex-1 px-3 border border-border font-[family-name:var(--font-body)] text-[14px] text-text placeholder:text-[#9A9590] focus:outline-none focus:border-gold focus:border-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeDelegate(idx)}
                        disabled={delegates.length <= 3}
                        className="p-1 text-text-secondary hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label={`Remove delegate ${idx + 1}`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addDelegate}
                  className="flex items-center gap-2 text-gold font-[family-name:var(--font-body)] text-[14px] font-semibold hover:text-gold-hover transition-colors"
                >
                  <Plus className="w-5 h-5" /> Add Delegate
                </button>
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
                      Tier
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[14px] text-white">
                      {membership === "MEMBER" ? "ABA Member" : "Non-ABA Member"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-[family-name:var(--font-body)] text-[14px] text-white/60">
                      Delegates
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[14px] text-white">
                      {delegates.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-[family-name:var(--font-body)] text-[14px] text-white/60">
                      Per Person
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[14px] text-white">
                      ${pricePerPerson}
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
                      ${total}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-white/10" />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-4 h-4 accent-gold" />
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
                  Payment via bank transfer. Details provided after registration.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
