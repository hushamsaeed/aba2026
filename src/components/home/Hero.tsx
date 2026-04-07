"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer";
import { IslamicPattern } from "@/components/shared/IslamicPattern";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-blue via-deep-blue-dark to-deep-blue" />

      {/* Ocean gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-ocean-teal/20 to-transparent" />

      {/* Islamic geometric pattern */}
      <IslamicPattern color="#bf9436" opacity={0.06} />

      {/* Animated wave shapes */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-24 md:h-40"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120C240 160 480 80 720 120C960 160 1200 80 1440 120V200H0V120Z"
            fill="#f8f4f0"
            opacity="0.3"
          />
          <path
            d="M0 140C300 170 600 110 900 140C1100 155 1300 125 1440 150V200H0V140Z"
            fill="#f8f4f0"
            opacity="0.5"
          />
          <path
            d="M0 160C200 180 400 150 600 165C800 180 1000 150 1200 165C1350 173 1400 168 1440 170V200H0V160Z"
            fill="#f8f4f0"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
        {/* Logos */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/logos/aba-logo.webp"
            alt="Asian Bankers Association"
            width={100}
            height={70}
            className="h-12 md:h-16 w-auto"
            priority
          />
          <div className="w-px h-12 md:h-16 bg-white/30" />
          <Image
            src="/logos/bml-logo.png"
            alt="Bank of Maldives"
            width={70}
            height={70}
            className="h-12 md:h-16 w-auto"
            priority
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-aba-gold font-heading font-semibold text-sm md:text-base uppercase tracking-[0.2em] mb-3">
            42nd ABA General Meeting & Conference
          </p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Banking in Asia:
            <br />
            <span className="text-aba-gold">Investing to Build</span>
            <br />
            Resilience
          </h1>
        </motion.div>

        {/* Date & Venue */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base font-medium">
            September 1-3, 2026
          </span>
          <span className="text-white/40">&bull;</span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm md:text-base font-medium">
            Kurumba Resort, Maldives
          </span>
        </motion.div>

        {/* Countdown */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CountdownTimer targetDate="2026-09-01T09:00:00" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/register">
            <Button
              size="lg"
              className="bg-bml-red hover:bg-bml-red-dark text-white font-semibold px-8 py-6 rounded-full text-lg shadow-2xl hover:shadow-bml-red/30 transition-all"
            >
              Register Now
            </Button>
          </Link>
          <Link href="/program">
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg"
            >
              View Program
            </Button>
          </Link>
        </motion.div>

        {/* Early bird tag */}
        <motion.p
          className="mt-4 text-aba-gold/80 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Early bird pricing available — save up to $100
        </motion.p>
      </div>
    </section>
  );
}
