import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Plane, Thermometer, Clock, Globe, Ship } from "lucide-react";

export const metadata: Metadata = {
  title: "Venue | 42nd ABA Conference",
  description: "Kurumba Maldives — the conference venue for the 42nd ABA Conference.",
};

const venueHighlights = [
  { icon: Ship, title: "First Resort in Maldives", desc: "Opened 1972, a pioneer with 50+ years of excellence" },
  { icon: Plane, title: "10 Minutes from Airport", desc: "Quick speedboat transfer from Velana International" },
  { icon: MapPin, title: "Private Island", desc: "Exclusive island setting in North Male' Atoll" },
  { icon: Globe, title: "World-Class Facilities", desc: "State-of-the-art conference and banquet spaces" },
];

const travelInfo = [
  { icon: Globe, title: "Visa", desc: "30-day free visa on arrival for most nationalities" },
  { icon: Plane, title: "Flights", desc: "Direct flights from major Asian hubs to Velana International Airport (MLE)" },
  { icon: Ship, title: "Transfers", desc: "10-minute speedboat from airport, arranged by resort" },
  { icon: Thermometer, title: "Weather", desc: "28°C average in September, tropical with occasional showers" },
  { icon: Clock, title: "Time Zone", desc: "MVT (UTC+5), no daylight saving" },
  { icon: MapPin, title: "Currency", desc: "Maldivian Rufiyaa (MVR), USD widely accepted" },
];

const roomTypes = [
  { name: "Deluxe Room", desc: "Garden-facing, 41 sqm, ideal for business travelers" },
  { name: "Superior Room", desc: "Beachfront, 47 sqm, direct beach access" },
  { name: "Pool Villa", desc: "Private pool, 115 sqm, premium experience" },
];

export default function VenuePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">The Venue</p>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-white">
            Kurumba
            <br />
            <span className="gradient-gold-text">Maldives</span>
          </h1>
          <p className="mt-4 text-white/50 max-w-2xl text-sm leading-relaxed">
            The first resort to open in the Maldives, Kurumba remains one of the
            most beloved destinations in the Indian Ocean.
          </p>
        </div>
      </section>

      {/* Venue Image */}
      <section className="relative bg-dark-surface">
        <div className="w-[90%] max-w-[1640px] mx-auto">
          <div className="relative aspect-[21/9] overflow-hidden">
            <Image src="/images/venue-kurumba.png" alt="Kurumba Maldives" fill className="object-cover" sizes="90vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative bg-dark-surface py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {venueHighlights.map((h) => (
              <div key={h.title} className="bg-dark-surface p-8 md:p-10 group hover:bg-dark-card transition-colors">
                <h.icon className="h-6 w-6 text-aba-gold mb-4" />
                <h3 className="font-heading text-lg font-semibold text-white mb-2">{h.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="relative bg-black py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">Accommodation</p>
          <h2 className="text-display text-3xl md:text-5xl text-white mb-12">Room Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {roomTypes.map((room) => (
              <div key={room.name} className="bg-black p-8 md:p-10 border border-white/10 hover:bg-dark-card transition-colors">
                <h3 className="font-heading text-xl font-semibold text-white mb-3">{room.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{room.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-white/30 text-xs mt-8">
            Special conference rates available. Contact conference@bankofmaldives.com.mv for booking.
          </p>
        </div>
      </section>

      {/* Travel Info */}
      <section className="relative bg-dark-surface py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">Travel Information</p>
          <h2 className="text-display text-3xl md:text-5xl text-white mb-12">Getting Here</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelInfo.map((info) => (
              <div key={info.title} className="bg-dark-card border border-white/10 p-6 md:p-8 hover:border-aba-gold/30 transition-colors">
                <info.icon className="h-5 w-5 text-aba-gold mb-3" />
                <h3 className="font-heading text-base font-semibold text-white mb-2">{info.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="relative bg-black py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto text-center">
          <p className="text-editorial text-aba-gold mb-4">Location</p>
          <h2 className="text-display text-3xl md:text-4xl text-white mb-8">North Male&apos; Atoll</h2>
          <div className="bg-dark-card border border-white/10 aspect-[16/7] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-aba-gold/40 mx-auto mb-3" />
              <p className="text-white/30 text-sm">4.2667° N, 73.5333° E</p>
              <p className="text-white/20 text-xs mt-1">Kurumba Maldives, North Male&apos; Atoll</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
