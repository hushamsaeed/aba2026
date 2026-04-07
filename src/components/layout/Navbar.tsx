"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-deep-blue/95 backdrop-blur-md shadow-lg"
          : "bg-deep-blue/80 backdrop-blur-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-aba-gold/90 text-white text-xs py-1.5 text-center font-medium tracking-wide hidden md:block">
        September 1-3, 2026 &bull; Kurumba Resort, Maldives &bull;{" "}
        <span className="font-semibold">Banking in Asia: Investing to Build Resilience</span>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logos */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logos/aba-logo.webp"
                alt="Asian Bankers Association"
                width={60}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
              <div className="w-px h-8 bg-white/30 hidden sm:block" />
              <Image
                src="/logos/bml-logo.png"
                alt="Bank of Maldives"
                width={40}
                height={40}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-aba-gold transition-colors px-3 py-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button className="bg-bml-red hover:bg-bml-red-dark text-white font-semibold px-5 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-all">
                Register Now
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="lg:hidden text-white p-2">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-deep-blue border-deep-blue-light w-80">
                <div className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-white/90 hover:text-aba-gold hover:bg-white/5 transition-colors px-4 py-3 text-lg font-medium rounded-lg"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-4 px-4">
                    <Link href="/register" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-bml-red hover:bg-bml-red-dark text-white font-semibold py-3 rounded-full">
                        Register Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
