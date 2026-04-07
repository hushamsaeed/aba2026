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
  { year: "2025", label: "41st — Bhutan", url: "https://41aba.bt" },
  { year: "2024", label: "40th — Azerbaijan" },
  { year: "2023", label: "39th — Vietnam" },
];

export function Footer() {
  return (
    <footer className="relative bg-black">
      <div className="absolute inset-0 noise-overlay" />

      {/* Top divider */}
      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
        <div className="h-px gradient-gold" />
      </div>

      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logos/aba-logo.webp" alt="ABA" width={48} height={32} className="h-8 w-auto brightness-90" />
              <div className="w-px h-6 bg-white/10" />
              <Image src="/logos/bml-logo.png" alt="BML" width={32} height={32} className="h-8 w-auto brightness-90" />
            </div>
            <p className="text-white/40 text-xs leading-relaxed mb-6">
              42nd ABA General Meeting & Conference
              <br />
              September 1-3, 2026
              <br />
              Kurumba Resort, Maldives
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/ABASecretariat" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-aba-gold transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/asian-bankers-association" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-aba-gold transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.youtube.com/@AsianBankersAssociation" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-aba-gold transition-colors" aria-label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-editorial text-aba-gold text-[10px] mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-aba-gold text-xs transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Previous Conferences */}
          <div>
            <h3 className="text-editorial text-aba-gold text-[10px] mb-6">Previous Conferences</h3>
            <ul className="space-y-3">
              {previousConferences.map((conf) => (
                <li key={conf.year}>
                  {conf.url ? (
                    <a href={conf.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-aba-gold text-xs transition-colors">
                      {conf.label}
                    </a>
                  ) : (
                    <span className="text-white/20 text-xs">{conf.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-editorial text-aba-gold text-[10px] mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs text-white/40">
                <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0 text-aba-gold/60" />
                <a href="mailto:conference@bankofmaldives.com.mv" className="hover:text-aba-gold transition-colors">
                  conference@bankofmaldives.com.mv
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-white/40">
                <Phone className="h-3.5 w-3.5 mt-0.5 shrink-0 text-aba-gold/60" />
                <span>+960 332 3321</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-white/40">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0 text-aba-gold/60" />
                <span>
                  Bank of Maldives
                  <br />
                  Boduthakurufaanu Magu
                  <br />
                  Male&apos;, Republic of Maldives
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] text-editorial">
            &copy; 2026 Asian Bankers Association & Bank of Maldives
          </p>
          <p className="text-white/20 text-[10px] text-editorial">
            Hosted by Bank of Maldives
          </p>
        </div>
      </div>
    </footer>
  );
}
