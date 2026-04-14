import { Metadata } from "next";
import Image from "next/image";
import { SpeakerApplicationForm } from "./SpeakerApplicationForm";

export const metadata: Metadata = {
  title: "Apply to Speak",
};

export default function ApplyToSpeakPage() {
  return (
    <div className="w-full bg-parchment">
      {/* Two-column body: info left, form right — matches design 9lgSS */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col lg:flex-row gap-10 lg:gap-15">
        {/* Left — Info column */}
        <div className="flex flex-col gap-6 flex-1">
          <span className="section-label">CALL FOR SPEAKERS</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-text leading-[1.1]">
            Share Your{"\n"}Expertise
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
            The 42nd ABA Conference brings together senior banking leaders,
            policymakers, and industry experts from across Asia. We invite
            professionals with deep expertise in digital banking,
            sustainability, risk management, and financial regulation to share
            their insights.
          </p>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
            Selected speakers will present during one of four plenary sessions,
            engaging with an audience of senior decision-makers from leading
            financial institutions across the region.
          </p>
          {/* Conference photo — 300px tall, full width */}
          <div className="relative w-full h-[300px] overflow-hidden">
            <Image
              src="/images/venue-kurumba.png"
              alt="Conference venue"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </div>

        {/* Right — Form column */}
        <div className="flex flex-col gap-6 flex-1">
          <span className="section-label">SPEAKER APPLICATION</span>
          <SpeakerApplicationForm />
        </div>
      </div>
    </div>
  );
}
