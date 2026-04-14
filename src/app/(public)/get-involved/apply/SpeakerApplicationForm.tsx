"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { FormInput } from "@/components/shared/form-input";
import { FormTextarea } from "@/components/shared/form-textarea";
import { FormSelect } from "@/components/shared/form-select";
import { ButtonPrimary } from "@/components/shared/button-primary";

const sessionOptions = [
  { value: "plenary1", label: "Plenary 1: Digital First for the Digital Era" },
  { value: "plenary2", label: "Plenary 2: Sustainability — Building Resilience" },
  { value: "plenary3", label: "Plenary 3: Technology for Risk Management" },
  { value: "plenary4", label: "Plenary 4: Governors' Roundtable" },
];

export function SpeakerApplicationForm() {
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
      organization: formData.get("organization") as string,
      title: formData.get("organization") as string,
      bio: formData.get("bio") as string,
      topicProposal: `${formData.get("topic")}\n\nPreferred Session: ${formData.get("session")}\n\nAbstract: ${formData.get("abstract")}`,
    };

    try {
      const res = await fetch("/api/apply-speaker", {
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
          Application Submitted
        </h2>
        <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary text-center max-w-[400px]">
          Thank you for your interest in speaking at the 42nd ABA Conference.
          Our team will review your proposal and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FormInput
        label="Full Name"
        name="name"
        placeholder="Your full name"
        required
      />
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="your.email@example.com"
        required
      />
      <FormInput
        label="Organization & Title"
        name="organization"
        placeholder="Company, Role"
        required
      />
      <FormTextarea
        label="Professional Bio"
        name="bio"
        placeholder="Brief biography (250 words max)..."
        required
      />

      {/* Headshot upload placeholder */}
      <div className="flex flex-col gap-2">
        <label className="font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-[0.5px] text-text">
          Professional Headshot
        </label>
        <div className="flex flex-col items-center justify-center gap-2 h-[120px] border-2 border-dashed border-border bg-white">
          <Upload className="w-6 h-6 text-text-secondary" />
          <span className="font-[family-name:var(--font-body)] text-[13px] text-text-secondary">
            Upload photo (JPG or PNG)
          </span>
        </div>
      </div>

      <FormInput
        label="Proposed Topic"
        name="topic"
        placeholder="Title of your proposed presentation"
        required
      />
      <FormSelect
        label="Preferred Session"
        name="session"
        options={sessionOptions}
        placeholder="Select plenary session"
        required
      />
      <FormTextarea
        label="Abstract"
        name="abstract"
        placeholder="Describe your proposed presentation (500 words max)..."
        required
      />

      {error && (
        <p className="font-[family-name:var(--font-body)] text-[14px] text-red-600">
          {error}
        </p>
      )}

      <ButtonPrimary type="submit" loading={loading} fullWidth>
        SUBMIT APPLICATION
      </ButtonPrimary>
    </form>
  );
}
