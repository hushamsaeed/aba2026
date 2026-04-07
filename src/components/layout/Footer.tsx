import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/message", label: "Chairman's Message" },
  { href: "/venue", label: "Venue & Accommodation" },
  { href: "/program", label: "Program & Speakers" },
  { href: "/register", label: "Register" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/about", label: "About" },
];

const previousConferences = [
  { year: "2025", label: "41st ABA — Bhutan", url: "https://41aba.bt" },
  { year: "2024", label: "40th ABA — Azerbaijan" },
  { year: "2023", label: "39th ABA — Vietnam" },
];

export function Footer() {
  return (
    <footer className="bg-deep-blue text-white">
      {/* Wave divider */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 md:h-20 -mb-1"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V80H0V30Z"
            fill="#1e3a5f"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logos/aba-logo.webp"
                alt="ABA"
                width={50}
                height={35}
                className="h-8 w-auto brightness-110"
              />
              <Image
                src="/logos/bml-logo.png"
                alt="BML"
                width={35}
                height={35}
                className="h-8 w-auto brightness-110"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              42nd ABA General Meeting & Conference
              <br />
              September 1-3, 2026
              <br />
              Kurumba Resort, Maldives
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com/ABASecretariat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-aba-gold transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/company/asian-bankers-association"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-aba-gold transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/@AsianBankersAssociation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-aba-gold transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-aba-gold font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Previous Conferences */}
          <div>
            <h3 className="text-aba-gold font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Previous Conferences
            </h3>
            <ul className="space-y-2">
              {previousConferences.map((conf) => (
                <li key={conf.year}>
                  {conf.url ? (
                    <a
                      href={conf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {conf.label}
                    </a>
                  ) : (
                    <span className="text-white/50 text-sm">{conf.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-aba-gold font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-aba-gold" />
                <a
                  href="mailto:conference@bankofmaldives.com.mv"
                  className="hover:text-white transition-colors"
                >
                  conference@bankofmaldives.com.mv
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-aba-gold" />
                <span>+960 332 3321</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-aba-gold" />
                <span>
                  Bank of Maldives
                  <br />
                  Boduthakurufaanu Magu, Male&apos;
                  <br />
                  Republic of Maldives
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; 2026 Asian Bankers Association & Bank of Maldives. All rights
            reserved.
          </p>
          <p className="text-white/40 text-xs">
            Hosted by{" "}
            <a
              href="https://www.bankofmaldives.com.mv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-aba-gold/60 hover:text-aba-gold transition-colors"
            >
              Bank of Maldives
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
