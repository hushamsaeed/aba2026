import Image from "next/image";
import { BrochureButton } from "@/components/shared/brochure-button";

export function AboutSection() {
  return (
    <section className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-25 flex flex-col gap-14">
        {/* Section label */}
        <span data-animate className="section-label">ABOUT</span>

        {/* Two columns */}
        <div data-stagger className="flex flex-col lg:flex-row gap-10 lg:gap-15">
          {/* About ABA */}
          <div className="flex flex-col items-start gap-5 flex-1">
            <Image
              src="/logos/aba-logo.png"
              alt="ABA Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <h3 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-text">
              Asian Bankers Association
            </h3>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
              The ABA aims to provide a forum for advancing the cause of the
              banking and finance industry in the region and promoting regional
              economic cooperation.
            </p>
            <ul className="flex flex-col gap-3">
              <li className="font-[family-name:var(--font-body)] text-[14px] text-text-secondary leading-[1.6]">
                • Forum for banking and finance industry advancement in
                Asia-Pacific
              </li>
              <li className="font-[family-name:var(--font-body)] text-[14px] text-text-secondary leading-[1.6]">
                • Exchange of views on banking opportunities in the region
              </li>
              <li className="font-[family-name:var(--font-body)] text-[14px] text-text-secondary leading-[1.6]">
                • Facilitating networking among regional bankers
              </li>
              <li className="font-[family-name:var(--font-body)] text-[14px] text-text-secondary leading-[1.6]">
                • Joint activities to enhance members&apos; role in financial
                services
              </li>
            </ul>
            <a
              href="https://www.aba.org.tw"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-[14px] font-semibold text-gold hover:text-gold-hover transition-colors"
            >
              Visit asianbankers.org →
            </a>
            <BrochureButton />
          </div>

          {/* About BML */}
          <div className="flex flex-col items-start gap-5 flex-1">
            <Image
              src="/logos/bml-logo-simple.png"
              alt="Bank of Maldives"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <h3 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-text">
              Bank of Maldives
            </h3>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
              Bank of Maldives (BML) is the leading financial institution in
              Maldives, offering the complete spectrum of personal, business and
              corporate financial services.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
              We are privileged to touch the lives of almost every citizen and
              business in Maldives through our extensive network of branches,
              agents, relationship managers and online banking facilities.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
              We are firmly focused on being a professionally managed,
              customer-oriented organization which follows international best
              practices.
            </p>
            <a
              href="https://www.bankofmaldives.com.mv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-[14px] font-semibold text-gold hover:text-gold-hover transition-colors"
            >
              Visit bankofmaldives.com.mv →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
