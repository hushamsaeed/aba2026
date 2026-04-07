"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CountdownTimer } from "./CountdownTimer";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Editorial metadata — faded, top-left */}
      <motion.div
        className="absolute top-28 md:top-32 left-[5%] z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <p className="text-editorial text-white text-[10px] md:text-xs tracking-[0.3em]">
          Banking / Conference
        </p>
        <p className="text-editorial text-white text-[10px] md:text-xs tracking-[0.3em] mt-1">
          Vol 42
        </p>
      </motion.div>

      {/* Massive year text — bleeds across screen */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-0 overflow-hidden pointer-events-none select-none">
        <motion.p
          className="text-massive text-white/[0.03] text-center whitespace-nowrap"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
        >
          MALDIVES
        </motion.p>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto pb-0">
        {/* Logos */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/logos/aba-logo.webp"
            alt="ABA"
            width={80}
            height={56}
            className="h-12 md:h-16 w-auto drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            priority
          />
          <div className="w-px h-12 md:h-16 bg-white/20" />
          <Image
            src="/logos/bml-logo.png"
            alt="BML"
            width={56}
            height={56}
            className="h-12 md:h-16 w-auto drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-editorial text-aba-gold mb-4 text-xs md:text-sm tracking-[0.2em]">
            42nd ABA General Meeting & Conference
          </p>
          <h1 className="text-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white max-w-5xl">
            Banking in Asia:
            <br />
            <span className="gradient-gold-text">Investing to Build</span>
            <br />
            Resilience
          </h1>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <CountdownTimer targetDate="2026-09-01T09:00:00" />
        </motion.div>

        {/* Gradient bottom bar — Circles signature */}
        <motion.div
          className="mt-10 md:mt-14 gradient-gold flex items-center justify-between px-6 md:px-10 py-5 md:py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <span className="text-black font-heading font-semibold text-xs md:text-sm uppercase tracking-wider">
            Kurumba Resort, Maldives
          </span>
          <span className="text-black/70 font-heading font-medium text-xs md:text-sm hidden sm:block">
            September 1-3, 2026
          </span>
          <Link
            href="/register"
            className="flex items-center gap-2 text-black font-heading font-bold text-xs md:text-sm uppercase tracking-wider hover:gap-3 transition-all"
          >
            Register
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Dark section below hero */}
      <div className="relative z-10 bg-dark-surface py-6 md:py-8">
        <div className="w-[90%] max-w-[1640px] mx-auto flex items-center justify-between">
          <p className="text-editorial text-white/30 text-[10px]">
            Hosted by Bank of Maldives
          </p>
          <p className="text-editorial text-white/30 text-[10px]">
            Asian Bankers Association
          </p>
        </div>
      </div>
    </section>
  );
}
