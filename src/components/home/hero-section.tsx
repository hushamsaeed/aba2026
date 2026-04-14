import Image from "next/image";
import { ButtonPrimary } from "@/components/shared/button-primary";
import { ButtonSecondary } from "@/components/shared/button-secondary";

export function HeroSection() {
  return (
    <section className="relative w-full h-[700px] lg:h-[900px] bg-navy-dark overflow-hidden -mt-16 lg:-mt-20">
      {/* Background image — parallax */}
      <div className="absolute inset-0" data-parallax>
        <Image
          src="/images/hero-bg.jpg"
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

      {/* Cultural decorative layers */}
      {/* Palm silhouettes — faint parallax bg */}
      <div className="absolute bottom-[100px] left-0 right-0 h-[200px] opacity-[0.07] pointer-events-none hidden lg:block" data-parallax-slow>
        <Image src="/images/cultural/palm-silhouettes.jpg" alt="" fill className="object-cover" sizes="1440px" />
      </div>
      {/* Dhoni boat — floating animation */}
      <div className="absolute bottom-[80px] right-[5%] lg:right-[10%] w-[250px] lg:w-[400px] h-[140px] lg:h-[225px] opacity-20 lg:opacity-25 pointer-events-none animate-[gentle-rock_6s_ease-in-out_infinite]">
        <Image src="/images/cultural/dhoni-hero.jpg" alt="" fill className="object-contain" sizes="400px" />
      </div>
      {/* Wave border — animated at bottom */}
      <div className="absolute bottom-0 left-0 w-[200%] h-[60px] lg:h-[80px] opacity-30 pointer-events-none animate-[wave-flow_20s_linear_infinite]">
        <Image src="/images/cultural/wave-border.jpg" alt="" fill className="object-cover" sizes="2880px" />
      </div>

      {/* Content — vertically centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 lg:gap-8 px-6 pt-16 lg:pt-20">
        {/* ABA Logo — hidden on mobile */}
        <Image
          src="/logos/aba-logo.png"
          alt="Asian Bankers Association"
          width={200}
          height={65}
          className="hidden lg:block h-[65px] w-auto object-contain"
        />

        {/* Thaana calligraphy accent */}
        <div className="relative w-[120px] lg:w-[180px] h-[24px] lg:h-[32px] opacity-30 animate-[shimmer_4s_ease-in-out_infinite]">
          <Image src="/images/cultural/thaana-welcome.jpg" alt="" fill className="object-contain" sizes="180px" />
        </div>

        {/* Date label */}
        <p className="font-[family-name:var(--font-body)] text-[11px] lg:text-[13px] font-medium tracking-[3px] lg:tracking-[4px] text-gold">
          1 – 3  SEPTEMBER  2026   ·   KURUMBA MALDIVES
        </p>

        {/* Title */}
        <h1 className="font-[family-name:var(--font-heading)] text-[36px] lg:text-[72px] font-bold text-white text-center leading-[1.1] max-w-[900px]">
          42nd ABA General{"\n"}Meeting & Conference
        </h1>

        {/* Theme subtitle */}
        <p className="font-[family-name:var(--font-body)] text-[14px] lg:text-[20px] font-light tracking-[1px] text-white/80 text-center leading-[1.5]">
          Banking in Asia: Investing to Build Resilience
        </p>

        {/* Venue text — mobile only */}
        <p className="font-[family-name:var(--font-body)] text-[12px] text-white/50 text-center lg:hidden">
          Kurumba Maldives
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-5 w-full lg:w-auto px-6 lg:px-0">
          <ButtonPrimary href="/register" className="w-full lg:w-auto">REGISTER NOW</ButtonPrimary>
          <ButtonSecondary href="/program" className="w-full lg:w-auto text-gold border-gold lg:text-white lg:border-white/30 hover:border-gold hover:text-gold">
            VIEW PROGRAM
          </ButtonSecondary>
        </div>

        {/* Hosted by */}
        <div className="flex items-center gap-3 mt-2">
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
