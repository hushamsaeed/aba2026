"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function VenuePreview() {
  return (
    <section className="relative bg-black section-padding overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />

      {/* Massive background text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <p className="text-massive text-white/[0.02] text-center whitespace-nowrap">
          KURUMBA
        </p>
      </div>

      <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            className="relative aspect-[4/3] overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/venue-kurumba.png"
              alt="Kurumba Maldives"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {/* Venue label overlay */}
            <div className="absolute bottom-6 left-6">
              <span className="text-editorial text-white/60 text-[10px]">Conference Venue</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-editorial text-aba-gold mb-4">The Venue</p>
            <h2 className="text-display text-3xl md:text-5xl lg:text-6xl text-white mb-8">
              Kurumba
              <br />
              <span className="gradient-gold-text">Maldives</span>
            </h2>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              The first resort to open in the Maldives, Kurumba remains one of the most
              beloved. Located just 10 minutes by speedboat from Velana International
              Airport on its own private island.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-t border-b border-white/10">
              <div>
                <span className="font-heading text-2xl md:text-3xl font-bold text-aba-gold">10</span>
                <p className="text-editorial text-white/40 text-[9px] mt-1">Min from airport</p>
              </div>
              <div>
                <span className="font-heading text-2xl md:text-3xl font-bold text-aba-gold">180</span>
                <p className="text-editorial text-white/40 text-[9px] mt-1">Rooms & Villas</p>
              </div>
              <div>
                <span className="font-heading text-2xl md:text-3xl font-bold text-aba-gold">28°</span>
                <p className="text-editorial text-white/40 text-[9px] mt-1">Avg Temperature</p>
              </div>
            </div>

            <Link
              href="/venue"
              className="inline-flex items-center gap-2 text-aba-gold text-editorial hover:text-white transition-colors group"
            >
              View venue details
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
