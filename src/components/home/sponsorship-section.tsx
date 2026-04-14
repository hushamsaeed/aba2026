import { ButtonPrimary } from "@/components/shared/button-primary";

const tiers = [
  {
    name: "PLATINUM SPONSOR",
    price: "USD 50,000",
    benefits: [
      "10 complimentary registrations",
      "Keynote speaking slot (45 mins)",
      "Logo on all conference materials",
      "Logo on website with hyperlink",
      "Stall space at conference venue",
      "VIP networking dinner seating",
    ],
  },
  {
    name: "GOLD CO-SPONSOR",
    price: "USD 25,000",
    benefits: [
      "6 complimentary registrations",
      "30-minute presentation slot",
      "Logo on all conference materials",
      "Logo on website",
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

export function SponsorshipSection() {
  return (
    <section className="w-full bg-navy">
      <div className="max-w-[1440px] mx-auto px-30 py-25 md:px-6 md:py-12 flex flex-col items-center gap-12">
        {/* Header */}
        <span className="section-label">BECOME A SPONSOR</span>
        <h2 className="font-[family-name:var(--font-heading)] text-[48px] md:text-[32px] font-bold text-white text-center">
          Sponsorship Packages
        </h2>
        <p className="font-[family-name:var(--font-body)] text-[16px] font-light text-white/60 text-center leading-[1.7] max-w-[700px]">
          Position your organisation at the forefront of regional banking
          dialogue. Engage directly with senior banking leaders, policymakers,
          and industry experts from across Asia.
        </p>

        {/* Tier cards */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col flex-1 bg-white/[0.04] border border-white/10"
            >
              {/* Card header */}
              <div className="flex flex-col gap-2 bg-gradient-to-br from-navy-dark to-navy p-9 px-8">
                <span className="font-[family-name:var(--font-body)] text-[12px] font-bold tracking-[2px] text-gold uppercase">
                  {tier.name}
                </span>
                <span className="font-[family-name:var(--font-heading)] text-[32px] font-bold text-white">
                  {tier.price}
                </span>
              </div>

              {/* Benefits */}
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

              {/* CTA */}
              <div className="px-8 pb-8">
                <ButtonPrimary href="/get-involved/sponsor" fullWidth>
                  LEARN MORE
                </ButtonPrimary>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
