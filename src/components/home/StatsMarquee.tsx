"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "30+", label: "Countries" },
  { value: "500+", label: "Delegates" },
  { value: "40+", label: "Speakers" },
  { value: "4", label: "Plenary Sessions" },
  { value: "100+", label: "Institutions" },
  { value: "3", label: "Days" },
];

export function StatsMarquee() {
  return (
    <section className="relative bg-black section-padding overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />

      {/* Massive background text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <p className="text-massive text-white/[0.02] text-center whitespace-nowrap">
          42ND ABA
        </p>
      </div>

      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
        <p className="text-editorial text-aba-gold mb-12 md:mb-16">
          By the Numbers
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold gradient-gold-text leading-none">
                {stat.value}
              </span>
              <p className="text-editorial text-white/40 mt-3 text-[10px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
