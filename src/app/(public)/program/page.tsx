import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WavesDivider } from "@/components/shared/WavesDivider";
import { ProgramTabs } from "./ProgramTabs";
import { SpeakerGrid } from "./SpeakerGrid";
import { ActivitiesSection } from "./ActivitiesSection";

export const metadata: Metadata = {
  title: "Program | 42nd ABA Conference",
  description:
    "Conference agenda, speakers, and activities for the 42nd ABA General Meeting and Conference in the Maldives.",
};

export default async function ProgramPage() {
  const [days, speakers] = await Promise.all([
    prisma.programDay.findMany({
      orderBy: { order: "asc" },
      include: {
        sessions: {
          orderBy: { order: "asc" },
          include: {
            speakers: {
              include: {
                speaker: true,
              },
            },
          },
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
      <section className="relative bg-deep-blue py-24 md:py-32 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.06} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Program
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Three days of insightful sessions, engaging discussions, and
            unforgettable experiences in the Maldives
          </p>
          <div className="mt-6 h-1 w-20 rounded-full bg-aba-gold mx-auto" />
        </div>
        <WavesDivider color="#f8f4f0" />
      </section>

      {/* Agenda */}
      <section className="bg-coral-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Conference Agenda"
            subtitle="Explore the full programme across all three days of the conference"
          />

          {days.length > 0 ? (
            <ProgramTabs days={days} />
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl">
              <p className="text-muted-foreground">
                The detailed programme will be announced soon. Please check back
                for updates.
              </p>
            </div>
          )}
        </div>
      </section>

      <WavesDivider color="white" />

      {/* Speakers */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Speakers"
            subtitle="Distinguished leaders and experts from across the Asian banking industry"
          />

          {speakers.length > 0 ? (
            <SpeakerGrid speakers={speakers} />
          ) : (
            <div className="text-center py-12 bg-coral-white rounded-2xl">
              <p className="text-muted-foreground">
                Speaker announcements will be made in the coming weeks. Stay
                tuned for an exceptional lineup of industry leaders.
              </p>
            </div>
          )}
        </div>
      </section>

      <WavesDivider color="#f8f4f0" />

      {/* Activities */}
      <ActivitiesSection />

      <WavesDivider color="#1e3a5f" flip />

      {/* CTA */}
      <section className="relative bg-deep-blue py-16 md:py-20 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.05} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Secure Your Place
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Register now to join banking leaders from across Asia at this
            landmark conference.
          </p>
          <a
            href="/register"
            className="inline-flex items-center px-8 py-3 rounded-lg bg-aba-gold text-white font-medium hover:bg-aba-gold-dark transition-colors"
          >
            Register Now
          </a>
        </div>
      </section>

      <WavesDivider color="#f8f4f0" />
    </>
  );
}
