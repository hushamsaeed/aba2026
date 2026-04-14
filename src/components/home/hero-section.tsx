import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/button-primary";
import { ButtonSecondary } from "@/components/shared/button-secondary";

export function HeroSection() {
  return (
    <section className="relative w-full h-[700px] lg:h-[900px] bg-navy-dark overflow-hidden -mt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Maldives aerial view"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, #0D1B2AEE 0%, #0D1B2ABB 40%, #0D1B2A88 70%, #0D1B2ADD 100%)",
          }}
        />
      </div>

      {/* Content — vertically centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-6 pt-20">
        {/* ABA Logo — hidden on mobile (already in navbar) */}
        <Image
          src="/logos/aba-logo.png"
          alt="Asian Bankers Association"
          width={200}
          height={65}
          className="hidden lg:block h-[65px] w-auto object-contain"
        />

        {/* Date label */}
        <p className="font-[family-name:var(--font-body)] text-[11px] lg:text-[13px] font-medium tracking-[3px] lg:tracking-[4px] text-gold">
          1 – 3  SEPTEMBER  2026   ·   KURUMBA MALDIVES
        </p>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-heading)] text-[36px] lg:text-[72px] font-bold text-white text-center leading-[1.1] max-w-[900px]">
          42nd ABA General{"\n"}Meeting & Conference
        </h1>

        {/* Theme subtitle */}
        <p className="font-[family-name:var(--font-body)] text-[14px] lg:text-[20px] font-light tracking-[1px] text-white/80 text-center">
          Banking in Asia: Investing to Build Resilience
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <ButtonPrimary href="/register">REGISTER NOW</ButtonPrimary>
          <ButtonSecondary href="/program" className="text-white border-white/30 hover:border-gold hover:text-gold">
            VIEW PROGRAM
          </ButtonSecondary>
        </div>

        {/* Hosted by */}
        <div className="flex items-center gap-3 mt-4">
          <span className="font-[family-name:var(--font-body)] text-[12px] text-white/50">
            Hosted by
          </span>
          <Image
            src="/logos/bml-logo-white.png"
            alt="Bank of Maldives"
            width={160}
            height={22}
            className="h-[22px] w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
