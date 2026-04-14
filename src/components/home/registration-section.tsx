import Image from "next/image";
import { Timer } from "lucide-react";
import { PricingCard } from "@/components/shared/pricing-card";

const pricingTiers = [
  {
    tierLabel: "ABA MEMBER",
    price: "$800",
    earlyBirdPrice: "$640",
    ctaHref: "/register/individual?tier=MEMBER",
  },
  {
    tierLabel: "ABA MEMBER — GROUP",
    price: "$700",
    earlyBirdPrice: "$560",
    ctaHref: "/register/group?tier=MEMBER",
  },
  {
    tierLabel: "NON-ABA MEMBER",
    price: "$1,000",
    earlyBirdPrice: "$800",
    ctaHref: "/register/individual?tier=NON_MEMBER",
  },
  {
    tierLabel: "NON-ABA MEMBER — GROUP",
    price: "$900",
    earlyBirdPrice: "$720",
    ctaHref: "/register/group?tier=NON_MEMBER",
  },
];

const features = [
  "✓  Full conference access (3 days)",
  "✓  All plenary sessions",
  "✓  Networking & B2B sessions",
  "✓  Welcome & Farewell dinners",
  "✓  Conference materials",
];

export function RegistrationSection() {
  return (
    <section className="relative w-full bg-parchment overflow-hidden">
      {/* Reed mat woven texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <Image src="/images/cultural/reed-mat-texture.jpg" alt="" fill className="object-cover" sizes="1440px" />
      </div>
      <div className="relative max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-25 flex flex-col items-center gap-12">
        {/* Header */}
        <span data-animate className="section-label">REGISTRATION</span>
        <h2 data-animate className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-text text-center">
          Get Your Pass
        </h2>

        {/* Early bird badge */}
        <div data-animate className="flex items-center gap-2 bg-gold/[0.08] px-6 py-3">
          <Timer className="w-[18px] h-[18px] text-gold" />
          <span className="font-[family-name:var(--font-body)] text-[14px] font-medium text-gold">
            Early bird pricing ends 1 June 2026 — Save 20%
          </span>
        </div>

        {/* Pricing cards */}
        <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier.tierLabel}
              tierLabel={tier.tierLabel}
              price={tier.price}
              earlyBirdPrice={tier.earlyBirdPrice}
              features={features}
              ctaHref={tier.ctaHref}
              className="w-full"
            />
          ))}
        </div>

        {/* Notes */}
        <div className="flex flex-col items-center gap-3 max-w-[700px]">
          <p className="font-[family-name:var(--font-body)] text-[13px] text-text-secondary text-center leading-[1.6]">
            Full payment is required for registration to be completed. Delegates
            will receive a confirmation email upon successful registration.
          </p>
          <p className="font-[family-name:var(--font-body)] text-[13px] text-text-secondary text-center leading-[1.6]">
            Contact maldivesaba@maldivesaba.com for changes or cancellations.
            Fees are non-refundable within 30 days of the conference.
          </p>
        </div>

        {/* Student note */}
        <div className="flex items-center bg-navy/[0.03] px-6 py-3">
          <span className="font-[family-name:var(--font-body)] text-[14px] font-semibold text-navy">
            Students & Academic: FREE registration
          </span>
        </div>
      </div>
    </section>
  );
}
