import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { ProgramTabs } from "./ProgramTabs";
import { SpeakerGrid } from "./SpeakerGrid";
import { ActivitiesSection } from "./ActivitiesSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Program | 42nd ABA Conference",
  description: "Conference agenda, speakers, and activities for the 42nd ABA General Meeting and Conference.",
};

export default async function ProgramPage() {
  const [days, speakers] = await Promise.all([
    prisma.programDay.findMany({
      orderBy: { order: "asc" },
      include: {
        sessions: {
          orderBy: { order: "asc" },
          include: { speakers: { include: { speaker: true } } },
        },
      },
    }),
    prisma.speaker.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">Conference</p>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-white">
            Program
          </h1>
          <p className="mt-4 text-white/50 max-w-2xl text-sm leading-relaxed">
            Three days of insightful sessions, engaging discussions, and unforgettable experiences in the Maldives.
          </p>
        </div>
      </section>

      {/* Agenda */}
      <section className="relative bg-dark-surface py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">Schedule</p>
          <h2 className="text-display text-3xl md:text-5xl text-white mb-12">Conference Agenda</h2>

          {days.length > 0 ? (
            <ProgramTabs days={days} />
          ) : (
            <div className="bg-dark-card border border-white/10 p-12 text-center">
              <p className="text-white/40 text-sm">The detailed programme will be announced soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Speakers */}
      <section className="relative bg-black py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">Speakers</p>
          <h2 className="text-display text-3xl md:text-5xl text-white mb-12">Distinguished Leaders</h2>

          {speakers.length > 0 ? (
            <SpeakerGrid speakers={speakers} />
          ) : (
            <div className="bg-dark-card border border-white/10 p-12 text-center">
              <p className="text-white/40 text-sm">Speaker announcements coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Activities */}
      <ActivitiesSection />

      {/* CTA */}
      <section className="relative bg-black py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto text-center">
          <h2 className="text-display text-3xl md:text-4xl text-white mb-4">Secure Your Place</h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto mb-10">
            Register now to join banking leaders from across Asia at this landmark conference.
          </p>
          <Link href="/register" className="inline-flex items-center gap-3 gradient-gold text-black px-10 py-5 btn-sharp text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
            Register Now
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
