"use client";

import { motion } from "framer-motion";
import {
  Palmtree,
  Ship,
  Waves,
  Camera,
  Sunset,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IslamicPattern } from "@/components/shared/IslamicPattern";

const activities = [
  {
    icon: Ship,
    title: "Sunset Dolphin Cruise",
    description:
      "Experience the magical Maldivian sunset aboard a traditional dhoni while watching dolphins play in the Indian Ocean.",
    time: "Day 3 — Afternoon",
  },
  {
    icon: Waves,
    title: "Snorkelling Excursion",
    description:
      "Explore vibrant coral reefs and tropical marine life in the crystal-clear waters surrounding Kurumba.",
    time: "Day 3 — Morning",
  },
  {
    icon: Palmtree,
    title: "Malé City Tour",
    description:
      "Discover the capital city of the Maldives, including the historic Friday Mosque, local markets, and cultural landmarks.",
    time: "Day 3 — Morning",
  },
  {
    icon: Camera,
    title: "Island Photography Walk",
    description:
      "Capture the stunning natural beauty of Kurumba island with a guided photography tour through lush tropical gardens.",
    time: "Day 3 — Midday",
  },
  {
    icon: Sunset,
    title: "Gala Dinner on the Beach",
    description:
      "A memorable evening under the stars with fine dining, cultural performances, and networking on the pristine beachfront.",
    time: "Day 2 — Evening",
  },
];

export function ActivitiesSection() {
  return (
    <section className="relative bg-coral-white py-16 md:py-24 overflow-hidden">
      <IslamicPattern color="#bf9436" opacity={0.03} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Activities & Excursions"
          subtitle="Beyond the conference — immerse yourself in the beauty and culture of the Maldives"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-ocean-teal/10 flex items-center justify-center shrink-0">
                  <activity.icon className="w-5 h-5 text-ocean-teal" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-deep-blue mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-aba-gold font-medium mb-2">
                    {activity.time}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activity.description}
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
