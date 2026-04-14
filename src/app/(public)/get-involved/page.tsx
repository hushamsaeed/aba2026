import { Metadata } from "next";
import Link from "next/link";
import { Mic, Handshake, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Involved",
};

const actions = [
  {
    icon: Mic,
    title: "Apply to Speak",
    description:
      "Share your expertise with banking leaders from across Asia. Submit your topic proposal for a plenary session or workshop.",
    href: "/get-involved/apply",
    cta: "SUBMIT APPLICATION",
  },
  {
    icon: Handshake,
    title: "Be a Sponsor",
    description:
      "Position your organisation at the forefront of regional banking dialogue. Multiple sponsorship packages available.",
    href: "/get-involved/sponsor",
    cta: "VIEW PACKAGES",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description:
      "Find answers to common questions about registration, accommodation, travel, and the conference program.",
    href: "/get-involved/faq",
    cta: "VIEW FAQ",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-25 flex flex-col items-center gap-12">
        {/* Header */}
        <span className="section-label">GET INVOLVED</span>
        <h1 className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-text text-center">
          Be Part of the Conversation
        </h1>
        <div className="w-[60px] h-[2px] bg-gold" />

        {/* Action cards */}
        <div className="flex flex-col lg:flex-row gap-10 w-full">
          {actions.map((action) => (
            <div
              key={action.title}
              className="flex flex-col gap-6 flex-1 bg-white p-10 border border-border-light"
            >
              <action.icon className="w-10 h-10 text-gold" />
              <h2 className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-text">
                {action.title}
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
                {action.description}
              </p>
              <Link
                href={action.href}
                className="inline-flex items-center justify-center bg-gold text-navy px-10 py-4 font-[family-name:var(--font-body)] text-[14px] font-semibold uppercase tracking-[1.5px] hover:bg-gold-hover transition-colors mt-auto"
              >
                {action.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
