"use client";

import { motion } from "framer-motion";
import { Ship, Waves, Camera } from "lucide-react";

const activities = [
  { icon: Ship, title: "Sunset Dolphin Cruise", desc: "Traditional dhoni cruise with dolphins at sunset.", time: "Day 3 — Afternoon" },
  { icon: Waves, title: "Snorkelling Excursion", desc: "Vibrant coral reefs and tropical marine life.", time: "Day 3 — Morning" },
  { icon: Ship, title: "Male' City Tour", desc: "Historic Friday Mosque, local markets, cultural landmarks.", time: "Day 3 — Morning" },
  { icon: Camera, title: "Island Photography Walk", desc: "Guided tour through Kurumba's tropical gardens.", time: "Day 3 — Midday" },
  { icon: Ship, title: "Gala Dinner on the Beach", desc: "Fine dining, cultural performances under the stars.", time: "Day 2 — Evening" },
];

export function ActivitiesSection() {
  return (
    <section className="relative bg-dark-surface py-20 md:py-32">
      <div className="absolute inset-0 noise-overlay" />
      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
        <p className="text-editorial text-aba-gold mb-4">Beyond the Conference</p>
        <h2 className="text-display text-3xl md:text-5xl text-white mb-12">Activities & Excursions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {activities.map((a, i) => (
            <motion.div
              key={a.title}
              className="bg-dark-surface p-6 md:p-8 hover:bg-dark-card transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <a.icon className="w-5 h-5 text-aba-gold mb-4" />
              <h3 className="font-heading text-base font-semibold text-white mb-1">{a.title}</h3>
              <p className="text-editorial text-aba-gold/60 text-[9px] mb-3">{a.time}</p>
              <p className="text-white/40 text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
