import { Metadata } from "next";
import { SponsorInquiryForm } from "./SponsorInquiryForm";

export const metadata: Metadata = {
  title: "Be a Sponsor",
};

const tiers = [
  { name: "Platinum Sponsor", price: "USD 50,000" },
  { name: "Gold Co-Sponsor", price: "USD 25,000" },
  { name: "Bronze Partner", price: "USD 15,000" },
];

export default function BeASponsorPage() {
  return (
    <div className="w-full bg-parchment">
      {/* Two-column body — matches design 16-Be-a-Sponsor */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col lg:flex-row gap-10 lg:gap-15">
        {/* Left — Info column */}
        <div className="flex flex-col gap-6 flex-1">
          <span className="section-label">SPONSORSHIP</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[42px] font-bold text-text">
            Partner With Us
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
            Sponsoring the ABA Conference offers a distinctive opportunity to
            position your organisation at the forefront of regional banking
            dialogue. The conference brings together senior banking leaders,
            policymakers, and industry experts from across Asia.
          </p>

          {/* Sponsorship tiers */}
          <div className="flex flex-col gap-4">
            <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[3px] text-gold uppercase">
              SPONSORSHIP TIERS
            </span>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="flex items-center justify-between bg-navy px-5 py-4"
              >
                <span className="font-[family-name:var(--font-body)] text-[15px] font-semibold text-white">
                  {tier.name}
                </span>
                <span className="font-[family-name:var(--font-heading)] text-[20px] font-bold text-gold">
                  {tier.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Inquiry form */}
        <div className="flex flex-col gap-6 flex-1">
          <span className="section-label">SPONSORSHIP INQUIRY</span>
          <SponsorInquiryForm />
        </div>
      </div>
    </div>
  );
}
