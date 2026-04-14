"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col border-t border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-6 w-full text-left"
        aria-expanded={isOpen}
      >
        <span className="font-[family-name:var(--font-body)] text-[16px] font-semibold text-text pr-4">
          {question}
        </span>
        {isOpen ? (
          <Minus className="w-6 h-6 text-gold shrink-0" />
        ) : (
          <Plus className="w-6 h-6 text-gold shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6">
              <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
