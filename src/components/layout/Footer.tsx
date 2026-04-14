import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Program", href: "/program" },
  { label: "Venue & Accommodation", href: "/venue" },
  { label: "Registration", href: "/register" },
  { label: "Sponsorship", href: "/get-involved/sponsor" },
];

const prevConferences = [
  { label: "41st ABA Conference — Bhutan 2025", href: "#" },
  { label: "40th ABA Conference — Baku 2024", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-navy text-white">
      <div className="max-w-[1440px] mx-auto px-20 py-15 flex flex-col gap-12 md:px-10 sm:px-6">
        {/* Top row — 4 columns */}
        <div className="flex flex-col md:flex-row gap-15 justify-between">
          {/* Brand column */}
          <div className="flex flex-col gap-4 max-w-[360px]">
            <p className="font-[family-name:var(--font-body)] text-[14px] text-white/60 leading-[1.7]">
              42nd ABA General Meeting & Conference{"\n"}
              1–3 September 2026{"\n"}
              Kurumba Maldives
            </p>
            <Image
              src="/logos/aba-logo.webp"
              alt="ABA Logo"
              width={140}
              height={44}
              className="h-11 w-auto object-contain"
            />
            <Image
              src="/logos/bml-logo.png"
              alt="Bank of Maldives"
              width={180}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3.5">
            <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[2px] text-gold uppercase">
              Quick Links
            </span>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-body)] text-[14px] text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3.5">
            <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[2px] text-gold uppercase">
              Contact
            </span>
            <a
              href="mailto:maldivesaba@maldivesaba.com"
              className="font-[family-name:var(--font-body)] text-[14px] text-white/60 hover:text-white transition-colors"
            >
              maldivesaba@maldivesaba.com
            </a>
            <span className="font-[family-name:var(--font-body)] text-[14px] text-white/60">
              Bank of Maldives
            </span>
          </div>

          {/* Previous Conferences */}
          <div className="flex flex-col gap-3.5">
            <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[2px] text-gold uppercase">
              Previous Conferences
            </span>
            {prevConferences.map((conf) => (
              <Link
                key={conf.label}
                href={conf.href}
                className="font-[family-name:var(--font-body)] text-[14px] text-white/60 hover:text-white transition-colors"
              >
                {conf.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/[0.08]" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-body)] text-[12px] text-white/30">
            &copy; 2026 Asian Bankers Association. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/company/asian-bankers-association"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-[12px] text-white/30 hover:text-white/60 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-white/20">&middot;</span>
            <a
              href="https://www.facebook.com/ABASecretariat"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-[12px] text-white/30 hover:text-white/60 transition-colors"
            >
              Facebook
            </a>
            <span className="text-white/20">&middot;</span>
            <a
              href="https://www.youtube.com/@AsianBankersAssociation"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] text-[12px] text-white/30 hover:text-white/60 transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
