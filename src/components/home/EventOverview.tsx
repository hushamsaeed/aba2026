"use client";

import { motion } from "framer-motion";

const themes = [
  {
    num: "01",
    title: "Digital Transformation",
    description: "How Asian banks are leveraging AI, blockchain, and fintech partnerships to reimagine financial services.",
    gradient: "from-aba-gold to-ocean-teal",
  },
  {
    num: "02",
    title: "Risk & Resilience",
    description: "Strategies for building robust risk management frameworks in an era of geopolitical uncertainty.",
    gradient: "from-bml-red to-aba-gold",
  },
  {
    num: "03",
    title: "Sustainable Finance",
    description: "How ESG principles and green finance are reshaping investment strategies across Asia.",
    gradient: "from-ocean-teal to-palm-green",
  },
  {
    num: "04",
    title: "Future of Banking",
    description: "The next decade of banking in Asia — from open banking to embedded finance and beyond.",
    gradient: "from-[#0a1628] to-ocean-teal",
  },
];

export function EventOverview() {
  return (
    <section className="relative bg-dark-surface section-padding">
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
        {/* Section header — Circles style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-editorial text-aba-gold mb-4">Conference Themes</p>
            <h2 className="text-display text-3xl md:text-5xl lg:text-6xl text-white max-w-2xl">
              Four Plenary Sessions
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-sm leading-relaxed">
            Exploring the critical issues shaping the future of banking in Asia through expert-led discussions and panel debates.
          </p>
        </div>

        {/* Theme grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.num}
              className="group relative p-8 md:p-12 border border-white/10 hover:bg-white/[0.02] transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <span className="text-editorial text-white/20 text-[10px] group-hover:text-aba-gold transition-colors">
                {theme.num}
              </span>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-white mt-4 mb-4 group-hover:text-aba-gold transition-colors">
                {theme.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                {theme.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
