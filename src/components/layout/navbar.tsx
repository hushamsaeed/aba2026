"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Message", href: "/message" },
  { label: "Venue", href: "/venue" },
  { label: "Program", href: "/program" },
  { label: "Activities", href: "/program/activities" },
  { label: "Speakers", href: "/speakers" },
  { label: "About", href: "/about" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "FAQ", href: "/get-involved/faq" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* NavBar — adds backdrop blur + shadow on scroll */}
      <nav className={`w-full h-16 lg:h-20 flex items-center justify-between px-4 lg:px-15 transition-all duration-300 ${scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg" : "bg-navy"}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logos/aba-logo.png"
            alt="ABA Logo"
            width={160}
            height={50}
            className="h-8 lg:h-[50px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav Links — gap 28px for 8 links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-body)] text-[13px] font-medium tracking-[0.3px] text-white hover:text-gold transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Register CTA */}
        <Link
          href="/register"
          className="hidden lg:flex items-center justify-center bg-gold px-6 py-2.5 font-[family-name:var(--font-body)] text-[12px] font-semibold tracking-[1.5px] text-navy uppercase hover:bg-gold-hover transition-colors shrink-0"
        >
          REGISTER
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-navy z-40 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-5 py-4 border-b border-white/10 font-[family-name:var(--font-body)] text-[16px] font-medium text-white hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="p-5">
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full bg-gold px-7 py-4 font-[family-name:var(--font-body)] text-[14px] font-semibold tracking-[1.5px] text-navy uppercase"
                >
                  REGISTER NOW
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
