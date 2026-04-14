"use client";

import { FileText, X } from "lucide-react";
import { ButtonPrimary } from "./button-primary";

interface BrochureModalProps {
  open: boolean;
  onClose: () => void;
}

export function BrochureModal({ open, onClose }: BrochureModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-[600px] p-10 lg:p-12 flex flex-col items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-text transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <FileText className="w-12 h-12 text-gold" />

        <h2 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[32px] font-bold text-text text-center">
          Conference Brochure
        </h2>

        <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary text-center leading-[1.6] max-w-[480px]">
          Download the official brochure for the 42nd ABA General Meeting &
          Conference with full program details, speaker profiles, and venue
          information.
        </p>

        {/* Brochure preview placeholder */}
        <div className="w-[200px] h-[260px] bg-navy flex flex-col items-center justify-center gap-3 p-5">
          <FileText className="w-10 h-10 text-gold" />
          <span className="font-[family-name:var(--font-heading)] text-[14px] font-bold text-white text-center leading-tight">
            42nd ABA{"\n"}Conference{"\n"}Brochure
          </span>
        </div>

        <span className="font-[family-name:var(--font-body)] text-[13px] text-text-secondary">
          PDF  &middot;  4.2 MB
        </span>

        <ButtonPrimary onClick={onClose} fullWidth>
          DOWNLOAD BROCHURE
        </ButtonPrimary>
      </div>
    </div>
  );
}
