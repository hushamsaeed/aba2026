"use client";

import { motion } from "framer-motion";
import type { Speaker } from "@/generated/prisma/client";

interface SpeakerGridProps {
  speakers: Speaker[];
}

export function SpeakerGrid({ speakers }: SpeakerGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
      {speakers.map((speaker, index) => (
        <motion.div
          key={speaker.id}
          className="text-center group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <div className="relative mx-auto mb-3 w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-coral-white border-2 border-transparent group-hover:border-aba-gold transition-colors">
            {speaker.photoUrl ? (
              <img
                src={speaker.photoUrl}
                alt={speaker.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-deep-blue/5">
                <span className="font-heading text-xl font-bold text-deep-blue/40">
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            )}
            {speaker.featured && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-aba-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-t-md uppercase tracking-wider">
                Featured
              </div>
            )}
          </div>
          <h3 className="font-heading text-sm md:text-base font-semibold text-deep-blue">
            {speaker.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{speaker.title}</p>
          <p className="text-xs text-ocean-teal">{speaker.organization}</p>
        </motion.div>
      ))}
    </div>
  );
}
