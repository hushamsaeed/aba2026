"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function SponsorsStrip() {
  return (
    <section className="relative bg-dark-surface section-padding">
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
        {/* Massive label */}
        <div className="overflow-hidden mb-16 md:mb-24">
          <motion.p
            className="font-heading text-[8vw] md:text-[6vw] font-bold text-white/[0.04] uppercase leading-none whitespace-nowrap"
            initial={{ x: 100 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            Sponsors & Partners
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-editorial text-aba-gold mb-4">Partners</p>
            <h2 className="text-display text-3xl md:text-4xl text-white max-w-lg">
              Join leading organizations supporting Asia&apos;s banking future
            </h2>
          </div>

          <Link
            href="/get-involved"
            className="inline-flex items-center gap-3 gradient-gold text-black px-8 py-4 btn-sharp text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity shrink-0"
          >
            Become a Sponsor
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Sponsor grid placeholder */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-dark-surface hover:bg-white/[0.02] transition-colors flex items-center justify-center py-16 px-8"
            >
              <span className="text-editorial text-white/20 text-[10px]">
                Sponsor {i}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
