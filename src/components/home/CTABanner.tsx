"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* Background image with heavy overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/dhoni-silhouette.png"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-editorial text-aba-gold mb-6">Join Us</p>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-white mb-6 max-w-4xl mx-auto">
            Asia&apos;s Banking
            <br />
            <span className="gradient-gold-text">Leaders Converge</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed">
            Network with 500+ delegates from 30+ countries, hear from 40+ speakers,
            and shape the future of banking in Asia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-3 gradient-red text-white px-10 py-5 btn-sharp text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Register Now
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-10 py-5 btn-sharp text-sm tracking-widest uppercase hover:border-aba-gold hover:text-aba-gold transition-all"
            >
              Become a Sponsor
            </Link>
          </div>

          <p className="text-editorial text-white/30 text-[10px] mt-8">
            Early bird pricing available — save up to $100
          </p>
        </motion.div>
      </div>
    </section>
  );
}
