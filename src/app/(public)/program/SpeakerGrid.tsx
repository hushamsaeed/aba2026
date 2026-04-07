"use client";

import { motion } from "framer-motion";
import type { Speaker } from "@/generated/prisma/client";

interface SpeakerGridProps { speakers: Speaker[] }

export function SpeakerGrid({ speakers }: SpeakerGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-white/10">
      {speakers.map((speaker, index) => (
        <motion.div
          key={speaker.id}
          className="group bg-black p-6 hover:bg-dark-card transition-colors text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <div className="relative mx-auto mb-4 w-20 h-20 md:w-24 md:h-24 overflow-hidden bg-dark-card border border-white/10 group-hover:border-aba-gold/50 transition-colors">
            {speaker.photoUrl ? (
              <img src={speaker.photoUrl} alt={speaker.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-heading text-lg font-bold text-white/20 group-hover:text-aba-gold/40 transition-colors">
                  {speaker.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
            )}
            {speaker.featured && (
              <div className="absolute bottom-0 left-0 right-0 gradient-gold text-black text-[8px] font-bold text-center py-0.5 uppercase tracking-wider">
                Featured
              </div>
            )}
          </div>
          <h3 className="font-heading text-sm font-semibold text-white">{speaker.name}</h3>
          <p className="text-[10px] text-white/40 mt-1">{speaker.title}</p>
          <p className="text-[10px] text-aba-gold mt-0.5">{speaker.organization}</p>
        </motion.div>
      ))}
    </div>
  );
}
