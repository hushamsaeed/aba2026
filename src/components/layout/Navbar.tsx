"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/message", label: "Message" },
  { href: "/venue", label: "Venue" },
  { href: "/program", label: "Program" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-sm"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <nav className="w-[90%] max-w-[1640px] mx-auto flex items-center justify-between h-20 md:h-24">
          {/* Logos */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logos/aba-logo.webp"
              alt="ABA"
              width={56}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
            <div className="w-px h-8 bg-white/20" />
            <Image
              src="/logos/bml-logo.png"
              alt="BML"
              width={40}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-aba-gold text-editorial transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Register CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="hidden sm:flex items-center gap-2 gradient-gold text-black px-6 py-3 btn-sharp text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Register
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="text-white hover:text-aba-gold transition-colors p-2"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black noise-overlay" />
        <div className="relative z-10 h-full flex flex-col">
          {/* Close button */}
          <div className="w-[90%] max-w-[1640px] mx-auto flex justify-between items-center h-20 md:h-24">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
              <Image src="/logos/aba-logo.webp" alt="ABA" width={56} height={40} className="h-8 md:h-10 w-auto" />
              <div className="w-px h-8 bg-white/20" />
              <Image src="/logos/bml-logo.png" alt="BML" width={40} height={40} className="h-8 md:h-10 w-auto" />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-aba-gold transition-colors p-2"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Menu links */}
          <div className="flex-1 flex items-center">
            <div className="w-[90%] max-w-[1640px] mx-auto">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 py-3 border-b border-white/5 hover:border-aba-gold/30 transition-all"
                  >
                    <span className="text-editorial text-white/30 group-hover:text-aba-gold transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-3xl md:text-5xl font-light text-white group-hover:text-aba-gold transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-3 gradient-gold text-black px-8 py-4 btn-sharp text-sm font-bold tracking-widest uppercase mt-8 w-fit hover:opacity-90 transition-opacity"
                >
                  Register Now
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </nav>
            </div>
          </div>

          {/* Menu footer */}
          <div className="w-[90%] max-w-[1640px] mx-auto py-8 flex items-center justify-between border-t border-white/5">
            <span className="text-editorial text-white/30">
              September 1-3, 2026 &bull; Maldives
            </span>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/ABASecretariat" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-aba-gold transition-colors" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/asian-bankers-association" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-aba-gold transition-colors" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
