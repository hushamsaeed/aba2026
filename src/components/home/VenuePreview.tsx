"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Plane, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IslamicPattern } from "@/components/shared/IslamicPattern";

export function VenuePreview() {
  return (
    <section className="relative py-16 md:py-24 bg-deep-blue overflow-hidden">
      <IslamicPattern color="#bf9436" opacity={0.04} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="The Venue"
          subtitle="Experience world-class hospitality at the jewel of the Maldives"
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Kurumba Maldives
            </h3>
            <p className="text-white/70 leading-relaxed mb-6">
              The first resort to open in the Maldives, Kurumba remains one of
              the most beloved. Located just 10 minutes by speedboat from Velana
              International Airport, this private island paradise offers
              state-of-the-art conference facilities surrounded by crystal-clear
              lagoons and white sand beaches.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="h-5 w-5 text-aba-gold shrink-0" />
                <span className="text-sm">North Male&apos; Atoll</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Plane className="h-5 w-5 text-aba-gold shrink-0" />
                <span className="text-sm">10 min from airport</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Sun className="h-5 w-5 text-aba-gold shrink-0" />
                <span className="text-sm">28°C average</span>
              </div>
            </div>

            <Link href="/venue">
              <Button className="bg-aba-gold hover:bg-aba-gold-dark text-white font-semibold rounded-full px-8">
                View Venue Details
              </Button>
            </Link>
          </motion.div>

          {/* Visual placeholder */}
          <motion.div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ocean-teal/20 border border-white/10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Sun className="h-16 w-16 text-aba-gold/30 mx-auto mb-4" />
                <p className="text-white/40 text-sm">Venue imagery</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
