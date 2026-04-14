import { cn } from "@/lib/utils";
import { ButtonPrimary } from "./button-primary";

interface PricingCardProps {
  tierLabel: string;
  price: string;
  earlyBirdPrice: string;
  perPerson?: boolean;
  features: string[];
  selected?: boolean;
  ctaHref?: string;
  className?: string;
}

export function PricingCard({
  tierLabel,
  price,
  earlyBirdPrice,
  perPerson = true,
  features,
  selected,
  ctaHref = "/register",
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-white border border-border-light w-[340px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        selected && "ring-[3px] ring-gold",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col gap-2 bg-navy p-8 px-7">
        <span className="font-[family-name:var(--font-body)] text-[12px] font-semibold tracking-[2px] text-gold">
          {tierLabel}
        </span>
        <div className="flex items-end gap-1">
          <span className="font-[family-name:var(--font-heading)] text-[42px] font-bold text-white">
            {price}
          </span>
          {perPerson && (
            <span className="font-[family-name:var(--font-body)] text-[14px] text-white/50 pb-2">
              /person
            </span>
          )}
        </div>
        <div className="flex items-center bg-gold/20 px-3.5 py-1.5 w-fit">
          <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold text-gold">
            Early Bird: {earlyBirdPrice}
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col gap-4 p-7">
        {features.map((feature) => (
          <p
            key={feature}
            className="font-[family-name:var(--font-body)] text-[14px] text-text"
          >
            {feature}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="px-7 pb-7">
        <ButtonPrimary href={ctaHref} fullWidth>
          GET YOUR PASS
        </ButtonPrimary>
      </div>
    </div>
  );
}
