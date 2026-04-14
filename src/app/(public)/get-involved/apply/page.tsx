import { Metadata } from "next";
import { SpeakerApplicationForm } from "./SpeakerApplicationForm";

export const metadata: Metadata = {
  title: "Apply to Speak",
};

export default function ApplyToSpeakPage() {
  return (
    <div className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto px-30 py-25 md:px-6 md:py-12 flex flex-col items-center gap-12">
        {/* Header */}
        <span className="section-label">APPLY TO SPEAK</span>
        <h1 className="font-[family-name:var(--font-heading)] text-[48px] md:text-[32px] font-bold text-text text-center">
          Share Your Expertise
        </h1>
        <div className="w-[60px] h-[2px] bg-gold" />

        {/* Two columns */}
        <div className="flex flex-col lg:flex-row gap-15 w-full">
          {/* Form */}
          <div className="flex-1">
            <SpeakerApplicationForm />
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="flex flex-col gap-8 bg-navy p-10 text-white">
              <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-bold">
                Why Speak?
              </h3>
              <ul className="flex flex-col gap-4">
                {[
                  "Share your insights with 500+ banking leaders from across Asia",
                  "Gain visibility for your organisation and expertise",
                  "Network with senior executives, regulators, and policymakers",
                  "Contribute to shaping the future of banking in the region",
                  "Complimentary conference registration for accepted speakers",
                ].map((item) => (
                  <li
                    key={item}
                    className="font-[family-name:var(--font-body)] text-[14px] text-white/70 leading-[1.6] flex items-start gap-3"
                  >
                    <span className="text-gold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="w-full h-px bg-white/10" />
              <div className="flex flex-col gap-2">
                <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[2px] text-gold uppercase">
                  Questions?
                </span>
                <a
                  href="mailto:maldivesaba@maldivesaba.com"
                  className="font-[family-name:var(--font-body)] text-[14px] text-white/70 hover:text-white transition-colors"
                >
                  maldivesaba@maldivesaba.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
