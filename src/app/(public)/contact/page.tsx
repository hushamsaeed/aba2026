import { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <div className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto px-30 py-25 md:px-6 md:py-12 flex flex-col items-center gap-12">
        {/* Header */}
        <span className="section-label">CONTACT</span>
        <h1 className="font-[family-name:var(--font-heading)] text-[48px] md:text-[32px] font-bold text-text text-center">
          Get in Touch
        </h1>
        <div className="w-[60px] h-[2px] bg-gold" />

        {/* Two columns */}
        <div className="flex flex-col lg:flex-row gap-15 w-full">
          {/* Form */}
          <div className="flex-1">
            <ContactForm />
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="flex flex-col gap-8 bg-navy p-10 text-white">
              <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-bold">
                Conference Secretariat
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[2px] text-gold uppercase">
                    Email
                  </span>
                  <a
                    href="mailto:maldivesaba@maldivesaba.com"
                    className="font-[family-name:var(--font-body)] text-[14px] text-white/70 hover:text-white transition-colors"
                  >
                    maldivesaba@maldivesaba.com
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[2px] text-gold uppercase">
                    Phone
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[14px] text-white/70">
                    +960 332 3321
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[2px] text-gold uppercase">
                    Host Organization
                  </span>
                  <span className="font-[family-name:var(--font-body)] text-[14px] text-white/70">
                    Bank of Maldives
                  </span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div className="flex flex-col gap-3">
                <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[2px] text-gold uppercase">
                  Social Media
                </span>
                <a
                  href="https://www.linkedin.com/company/asian-bankers-association"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-body)] text-[14px] text-white/70 hover:text-white transition-colors"
                >
                  LinkedIn →
                </a>
                <a
                  href="https://www.facebook.com/ABASecretariat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-body)] text-[14px] text-white/70 hover:text-white transition-colors"
                >
                  Facebook →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
