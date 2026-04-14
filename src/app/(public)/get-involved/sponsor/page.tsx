import { Metadata } from "next";
import { ButtonPrimary } from "@/components/shared/button-primary";

export const metadata: Metadata = {
  title: "Be a Sponsor",
};

const tiers = [
  {
    name: "PLATINUM SPONSOR",
    price: "USD 50,000",
    benefits: [
      "10 complimentary registrations",
      "Keynote speaking slot (45 minutes)",
      "Logo on all conference materials",
      "Logo on website with hyperlink",
      "Stall space at conference venue",
      "VIP networking dinner seating",
      "Full-page ad in conference brochure",
    ],
  },
  {
    name: "GOLD CO-SPONSOR",
    price: "USD 25,000",
    benefits: [
      "6 complimentary registrations",
      "30-minute presentation slot",
      "Logo on all conference materials",
      "Logo on website with hyperlink",
      "Stall space at conference venue",
    ],
  },
  {
    name: "BRONZE PARTNER",
    price: "USD 15,000",
    benefits: [
      "3 complimentary registrations",
      "15-minute presentation slot",
      "Logo on website",
    ],
  },
];

export default function BeASponsorPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-30 py-25 md:px-6 md:py-12 flex flex-col items-center gap-8">
          <span className="section-label">SPONSORSHIP</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[48px] md:text-[32px] font-bold text-text text-center">
            Partner with Us
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary text-center leading-[1.7] max-w-[700px]">
            Position your organisation at the forefront of regional banking
            dialogue. Engage directly with senior banking leaders, policymakers,
            and industry experts from across Asia.
          </p>
          <div className="w-[60px] h-[2px] bg-gold" />
        </div>
      </div>

      {/* Tiers */}
      <div className="w-full bg-navy">
        <div className="max-w-[1440px] mx-auto px-30 py-20 md:px-6 md:py-12 flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col flex-1 bg-white/[0.04] border border-white/10"
              >
                <div className="flex flex-col gap-2 bg-gradient-to-br from-navy-dark to-navy p-9 px-8">
                  <span className="font-[family-name:var(--font-body)] text-[12px] font-bold tracking-[2px] text-gold uppercase">
                    {tier.name}
                  </span>
                  <span className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-white">
                    {tier.price}
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-8 flex-1">
                  {tier.benefits.map((benefit) => (
                    <p
                      key={benefit}
                      className="font-[family-name:var(--font-body)] text-[14px] text-white/60"
                    >
                      ✓  {benefit}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-30 py-20 md:px-6 md:py-12 flex flex-col items-center gap-6">
          <h2 className="font-[family-name:var(--font-heading)] text-[36px] md:text-[28px] font-bold text-text text-center">
            Interested in Sponsoring?
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary text-center max-w-[600px]">
            Contact us to discuss sponsorship opportunities and receive a
            detailed prospectus with full package details.
          </p>
          <ButtonPrimary href="mailto:conference@bankofmaldives.com.mv">
            GET IN TOUCH
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
