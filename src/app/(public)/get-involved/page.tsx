import { Metadata } from "next";
import { Mic, Award } from "lucide-react";
import { ButtonPrimary } from "@/components/shared/button-primary";
import { ButtonSecondary } from "@/components/shared/button-secondary";

export const metadata: Metadata = {
  title: "Get Involved",
};

const sponsorTiers = [
  { name: "Platinum", price: "$50K" },
  { name: "Gold", price: "$25K" },
  { name: "Bronze", price: "$15K" },
];

export default function GetInvolvedPage() {
  return (
    <div className="w-full bg-parchment">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-20 flex flex-col items-center gap-4">
        <span className="section-label">GET INVOLVED</span>
        <h1 className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-text text-center leading-[1.1]">
          Shape the Future of{"\n"}Asian Banking
        </h1>
        <p className="font-[family-name:var(--font-body)] text-[16px] font-light text-text-secondary text-center leading-[1.6] max-w-[650px]">
          Join us as a speaker or sponsor and contribute to the region&apos;s
          most influential banking dialogue.
        </p>
      </div>

      {/* Two cards */}
      <div className="max-w-[1440px] mx-auto px-6 pb-20 lg:px-30 lg:pb-20 flex flex-col lg:flex-row gap-10">
        {/* Apply to Speak — navy bg */}
        <div className="flex flex-col gap-6 flex-1 bg-navy p-10 lg:p-12">
          <Mic className="w-10 h-10 text-gold" />
          <h2 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[32px] font-bold text-white">
            Apply to Speak
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 leading-[1.7]">
            Share your expertise with senior banking leaders from across Asia.
            We&apos;re looking for speakers with deep knowledge in digital
            banking, sustainability, risk management, and financial regulation.
          </p>
          <ul className="flex flex-col gap-2.5">
            <li className="font-[family-name:var(--font-body)] text-[14px] text-white/50">
              &bull;  Present during plenary sessions
            </li>
            <li className="font-[family-name:var(--font-body)] text-[14px] text-white/50">
              &bull;  Engage with 200+ senior decision-makers
            </li>
            <li className="font-[family-name:var(--font-body)] text-[14px] text-white/50">
              &bull;  Complimentary conference registration
            </li>
          </ul>
          <ButtonPrimary href="/get-involved/apply">APPLY TO SPEAK</ButtonPrimary>
        </div>

        {/* Become a Sponsor — white bg */}
        <div className="flex flex-col gap-6 flex-1 bg-white p-10 lg:p-12 border border-border-light">
          <Award className="w-10 h-10 text-gold" />
          <h2 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[32px] font-bold text-text">
            Become a Sponsor
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
            Position your organisation at the forefront of regional banking
            dialogue. Engage directly with senior banking leaders, policymakers,
            and industry experts from across Asia.
          </p>
          <div className="flex flex-wrap gap-4">
            {sponsorTiers.map((tier) => (
              <span
                key={tier.name}
                className="font-[family-name:var(--font-body)] text-[12px] font-semibold text-navy bg-navy/[0.03] px-4 py-2"
              >
                {tier.name} {tier.price}
              </span>
            ))}
          </div>
          <ButtonSecondary href="/get-involved/sponsor" className="text-navy border-navy hover:bg-navy/5">
            VIEW PACKAGES
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
