import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "Program", href: "/program" },
  { label: "Venue & Accommodation", href: "/venue" },
  { label: "Registration", href: "/register" },
  { label: "Sponsorship", href: "/get-involved/sponsor" },
];

const prevConferences = [
  { label: "41st ABA Conference", href: "#" },
  { label: "40th ABA Conference", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-navy text-white">
      {/* Kasabu embroidery cultural border */}
      <div className="relative w-full h-1.5 overflow-hidden">
        <Image src="/images/kasabu-embroidery.jpg" alt="" fill className="object-cover opacity-40" sizes="1440px" />
      </div>
      {/* Padding 60 80, gap 48 — matches design */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-10 lg:py-15 flex flex-col gap-10 lg:gap-12">
        {/* Top row — 4 columns, gap 60, space-between */}
        <div className="flex flex-col md:flex-row gap-15 justify-between">
          {/* Brand column — width 360 */}
          <div className="flex flex-col gap-4 max-w-[360px]">
            <p className="font-[family-name:var(--font-body)] text-[14px] text-white/60 leading-[1.7] whitespace-pre-line">
              {"42nd ABA General Meeting & Conference\n1–3 September 2026\nKurumba Maldives"}
            </p>
            <Image
              src="/logos/aba-logo.png"
              alt="ABA Logo"
              width={140}
              height={44}
              className="h-11 w-auto object-contain"
            />
            <Image
              src="/logos/bml-logo-white.png"
              alt="Bank of Maldives"
              width={180}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </div>

          {/* Quick Links — gap 14 */}
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

          {/* Contact — gap 14 */}
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

          {/* Previous Conferences — gap 14 */}
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

        {/* Divider — #FFFFFF15 */}
        <div className="w-full h-px bg-white/[0.08]" />

        {/* Bottom row — space-between */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-body)] text-[12px] text-white/30">
            &copy; 2026 Asian Bankers Association. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-body)] text-[12px] text-white/30">
            <a
              href="https://www.linkedin.com/company/asian-bankers-association"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              LinkedIn
            </a>
            {"  \u00B7  "}
            <a
              href="https://twitter.com/ABASecretariat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Twitter
            </a>
            {"  \u00B7  "}
            <a
              href="https://www.facebook.com/ABASecretariat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Facebook
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
