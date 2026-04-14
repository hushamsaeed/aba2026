"use client";

import { useState } from "react";
import { FormInput } from "@/components/shared/form-input";
import { FormTextarea } from "@/components/shared/form-textarea";
import { FormSelect } from "@/components/shared/form-select";
import { ButtonPrimary } from "@/components/shared/button-primary";

const tierOptions = [
  { value: "platinum", label: "Platinum Sponsor — USD 50,000" },
  { value: "gold", label: "Gold Co-Sponsor — USD 25,000" },
  { value: "bronze", label: "Bronze Partner — USD 15,000" },
];

export function SponsorInquiryForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: `Sponsorship Inquiry — ${formData.get("tier")}`,
      message: `Organization: ${formData.get("organization")}\nPhone: ${formData.get("phone")}\nPreferred Tier: ${formData.get("tier")}\n\n${formData.get("message")}`,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Submission failed");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 py-20">
        <div className="text-gold text-[48px]">✓</div>
        <h2 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-text text-center">
          Inquiry Submitted
        </h2>
        <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary text-center max-w-[400px]">
          Thank you for your interest in sponsoring the 42nd ABA Conference.
          Our team will be in touch with a detailed sponsorship prospectus.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FormInput label="Contact Name" name="name" placeholder="Your full name" required />
      <FormInput label="Email Address" name="email" type="email" placeholder="your.email@company.com" required />
      <FormInput label="Organization" name="organization" placeholder="Company name" required />
      <FormInput label="Phone Number" name="phone" placeholder="+960 ..." />
      <FormSelect
        label="Preferred Tier"
        name="tier"
        options={tierOptions}
        placeholder="Select sponsorship tier"
        required
      />
      <FormTextarea
        label="Message (Optional)"
        name="message"
        placeholder="Tell us about your organization and sponsorship goals..."
      />

      {error && (
        <p className="font-[family-name:var(--font-body)] text-[14px] text-red-600">{error}</p>
      )}

      <ButtonPrimary type="submit" loading={loading} fullWidth>
        SUBMIT INQUIRY
      </ButtonPrimary>
    </form>
  );
}
