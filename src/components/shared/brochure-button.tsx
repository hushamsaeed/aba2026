"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { BrochureModal } from "./brochure-modal";

export function BrochureButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 font-[family-name:var(--font-body)] text-[14px] font-semibold text-gold hover:text-gold-hover transition-colors"
      >
        <FileText className="w-4 h-4" />
        Download Conference Brochure →
      </button>
      <BrochureModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
