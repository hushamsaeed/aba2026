import { ButtonPrimary } from "@/components/shared/button-primary";

const tiers = [
  {
    name: "PLATINUM SPONSOR",
    price: "USD 50,000",
    seats: "10 complimentary registrations",
    benefits: [
      "Remarks at Opening Ceremony",
      "30-minute presentation slot",
      "VIP seating during event",
      "Stall space at conference venue",
      "Logo on all conference materials",
      "Logo on website",
    ],
  },
  {
    name: "GOLD CO-SPONSOR",
    price: "USD 25,000",
    seats: "6 complimentary registrations",
    benefits: [
      "30-minute presentation slot",
      "Stall space at conference venue",
      "Logo on all conference materials",
      "Logo on website",
    ],
  },
  {
    name: "BRONZE PARTNER",
    price: "USD 15,000",
    seats: "3 complimentary registrations",
    benefits: [
      "15-minute presentation slot",
      "Logo on website",
    ],
  },
];

export function SponsorshipSection() {
  return (
    <section className="w-full bg-navy">
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-25 flex flex-col items-center gap-12">
        {/* Header */}
        <span data-animate className="section-label">BECOME A SPONSOR</span>
        <h2 data-animate className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-white text-center">
          Sponsorship Packages
        </h2>
        <p data-animate className="font-[family-name:var(--font-body)] text-[16px] font-light text-white/60 text-center leading-[1.7] max-w-[700px]">
          Position your organisation at the forefront of regional banking
          dialogue. Engage directly with senior banking leaders, policymakers,
          and industry experts from across Asia.
        </p>

        {/* Tier cards — white bg with border, matching SponsorTierCard design */}
        <div data-stagger className="flex flex-col lg:flex-row gap-6 w-full">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col flex-1 bg-white border border-border-light"
            >
              {/* Card header — navy gradient, padding 36 32, gap 12 */}
              <div
                className="flex flex-col gap-3 px-8 py-9"
                style={{
                  background: "linear-gradient(180deg, #1B2A4A 0%, #243556 100%)",
                }}
              >
                <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[3px] text-gold uppercase">
                  {tier.name}
                </span>
                <span className="font-[family-name:var(--font-heading)] text-[36px] font-bold text-white">
                  {tier.price}
                </span>
                <span className="font-[family-name:var(--font-body)] text-[14px] text-white/60">
                  {tier.seats}
                </span>
              </div>

              {/* Benefits — dark text on white bg, padding 28 32, gap 14 */}
              <div className="flex flex-col gap-3.5 px-8 py-7 flex-1">
                {tier.benefits.map((benefit) => (
                  <p
                    key={benefit}
                    className="font-[family-name:var(--font-body)] text-[14px] text-text"
                  >
                    ✓  {benefit}
                  </p>
                ))}
              </div>

              {/* CTA — padding 0 32 32 32 */}
              <div className="px-8 pb-8">
                <ButtonPrimary href="/get-involved/sponsor" fullWidth>
                  BECOME A SPONSOR
                </ButtonPrimary>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
