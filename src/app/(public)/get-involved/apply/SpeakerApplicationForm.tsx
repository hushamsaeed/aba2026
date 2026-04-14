"use client";

import { useState } from "react";
import { FormInput } from "@/components/shared/form-input";
import { FormTextarea } from "@/components/shared/form-textarea";
import { ButtonPrimary } from "@/components/shared/button-primary";

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
      title: formData.get("title") as string,
      bio: formData.get("bio") as string,
      topicProposal: formData.get("topicProposal") as string,
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
        <h2 className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-text text-center">
          Application Submitted
        </h2>
        <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary text-center max-w-[500px]">
          Thank you for your interest in speaking at the 42nd ABA Conference.
          Our team will review your proposal and get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FormInput label="Full Name" name="name" placeholder="Enter your full name" required />
      <FormInput label="Email" name="email" type="email" placeholder="Enter your email" required />
      <FormInput label="Organization" name="organization" placeholder="Company or institution" required />
      <FormInput label="Job Title" name="title" placeholder="Your current position" required />
      <FormTextarea label="Short Bio" name="bio" placeholder="Brief biography (150-200 words)" required />
      <FormTextarea label="Topic Proposal" name="topicProposal" placeholder="Describe your proposed topic and key takeaways" required />

      {error && (
        <p className="font-[family-name:var(--font-body)] text-[14px] text-red-600">
          {error}
        </p>
      )}

      <ButtonPrimary type="submit" loading={loading}>
        SUBMIT APPLICATION
      </ButtonPrimary>
    </form>
  );
}
