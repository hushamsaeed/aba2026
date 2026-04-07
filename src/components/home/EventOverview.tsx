"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Shield,
  TrendingUp,
  Leaf,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const themes = [
  {
    icon: Lightbulb,
    title: "Digital Transformation",
    description:
      "Explore how Asian banks are leveraging AI, blockchain, and fintech partnerships to reimagine financial services.",
  },
  {
    icon: Shield,
    title: "Risk & Resilience",
    description:
      "Discuss strategies for building robust risk management frameworks in an era of geopolitical uncertainty.",
  },
  {
    icon: Leaf,
    title: "Sustainable Finance",
    description:
      "Address how ESG principles and green finance are reshaping investment strategies across Asia.",
  },
  {
    icon: TrendingUp,
    title: "Future of Banking",
    description:
      "Envision the next decade of banking in Asia — from open banking to embedded finance and beyond.",
  },
];

export function EventOverview() {
  return (
    <section className="py-16 md:py-24 bg-coral-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Conference Themes"
          subtitle="Four plenary sessions exploring the critical issues shaping the future of banking in Asia"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.title}
              className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg border border-border/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-aba-gold/10 flex items-center justify-center group-hover:bg-aba-gold/20 transition-colors">
                  <theme.icon className="h-6 w-6 text-aba-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-deep-blue mb-2">
                    {theme.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
