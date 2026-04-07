"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  speakerApplicationSchema,
  type SpeakerApplicationInput,
} from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

      if (!response.ok) {
        throw new Error("Failed to submit application. Please try again.");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-palm-green/10 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-palm-green"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-deep-blue mb-2">
          Application Submitted
        </h3>
        <p className="text-muted-foreground">
          Thank you for your interest in speaking at the 42nd ABA Conference.
          Our programme committee will review your proposal and respond within
          two weeks.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-ocean-teal hover:text-ocean-teal-dark text-sm font-medium underline underline-offset-2"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-bml-red/5 border border-bml-red/20 p-4 text-sm text-bml-red">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Your full name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-bml-red">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@organization.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-bml-red">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="organization">Organization *</Label>
          <Input
            id="organization"
            placeholder="Your organization"
            {...register("organization")}
          />
          {errors.organization && (
            <p className="text-xs text-bml-red">
              {errors.organization.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            placeholder="Your position or title"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-bml-red">{errors.title.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio *</Label>
        <Textarea
          id="bio"
          rows={4}
          placeholder="Please provide a brief professional biography (minimum 50 characters)"
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-xs text-bml-red">{errors.bio.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="topicProposal">Topic Proposal *</Label>
        <Textarea
          id="topicProposal"
          rows={4}
          placeholder="Describe your proposed topic, its relevance to the Asian banking industry, and key takeaways for the audience (minimum 50 characters)"
          {...register("topicProposal")}
        />
        {errors.topicProposal && (
          <p className="text-xs text-bml-red">
            {errors.topicProposal.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-ocean-teal hover:bg-ocean-teal-dark text-white py-3"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        All fields marked with * are required. Applications are reviewed by the
        programme committee on a rolling basis.
      </p>
    </form>
  );
}
