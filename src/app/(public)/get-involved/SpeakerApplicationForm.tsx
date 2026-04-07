"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  speakerApplicationSchema,
  type SpeakerApplicationInput,
} from "@/lib/validations";

export function SpeakerApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SpeakerApplicationInput>({
    resolver: zodResolver(speakerApplicationSchema),
  });

  const onSubmit = async (data: SpeakerApplicationInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/apply-speaker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit application.");
      setSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 bg-aba-gold/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-aba-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-white mb-2">Application Submitted</h3>
        <p className="text-white/50 text-sm">
          Our programme committee will review your proposal and respond within two weeks.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-aba-gold hover:text-white text-editorial text-[10px] underline underline-offset-4">
          Submit another
        </button>
      </div>
    );
  }

  const inputClass = "w-full bg-dark-surface border border-white/10 text-white placeholder:text-white/30 focus:border-aba-gold focus:outline-none px-4 py-3 text-sm";
  const labelClass = "text-editorial text-white/60 text-[10px]";
  const errorClass = "text-xs text-red-400 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input id="name" placeholder="Your full name" {...register("name")} className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" type="email" placeholder="your@organization.com" {...register("email")} className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="organization" className={labelClass}>Organization *</label>
          <input id="organization" placeholder="Your organization" {...register("organization")} className={inputClass} />
          {errors.organization && <p className={errorClass}>{errors.organization.message}</p>}
        </div>
        <div>
          <label htmlFor="title" className={labelClass}>Job Title *</label>
          <input id="title" placeholder="Your position" {...register("title")} className={inputClass} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="bio" className={labelClass}>Professional Bio *</label>
        <textarea id="bio" rows={4} placeholder="Brief professional biography (min 50 characters)" {...register("bio")} className={inputClass} />
        {errors.bio && <p className={errorClass}>{errors.bio.message}</p>}
      </div>

      <div>
        <label htmlFor="topicProposal" className={labelClass}>Topic Proposal *</label>
        <textarea id="topicProposal" rows={4} placeholder="Describe your proposed topic and key takeaways (min 50 characters)" {...register("topicProposal")} className={inputClass} />
        {errors.topicProposal && <p className={errorClass}>{errors.topicProposal.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full gradient-gold text-black py-4 btn-sharp text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50">
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>

      <p className="text-white/30 text-[10px] text-center text-editorial">
        All fields marked * are required. Applications reviewed on a rolling basis.
      </p>
    </form>
  );
}
