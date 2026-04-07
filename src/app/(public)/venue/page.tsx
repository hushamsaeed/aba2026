import type { Metadata } from "next";
import {
  MapPin,
  Plane,
  Hotel,
  Thermometer,
  Clock,
  Globe,
  Ship,
  Palmtree,
  Wifi,
  UtensilsCrossed,
  Star,
} from "lucide-react";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WavesDivider } from "@/components/shared/WavesDivider";

export const metadata: Metadata = {
  title: "Venue | 42nd ABA Conference",
  description:
    "Kurumba Maldives — the conference venue for the 42nd ABA Conference. Travel, accommodation, and venue information.",
};

const venueHighlights = [
  {
    icon: Star,
    title: "First Resort in the Maldives",
    description:
      "Opened in 1972, Kurumba Maldives is a pioneer in Maldivian hospitality with over 50 years of excellence.",
  },
  {
    icon: Ship,
    title: "10-Minute Speedboat Transfer",
    description:
      "Just a short speedboat ride from Velana International Airport — the most convenient resort transfer in the Maldives.",
  },
  {
    icon: Palmtree,
    title: "Private Island Setting",
    description:
      "An exclusive private island resort surrounded by crystal-clear turquoise waters and pristine white-sand beaches.",
  },
  {
    icon: Wifi,
    title: "State-of-the-Art Conference Facilities",
    description:
      "Modern conference halls with advanced audio-visual equipment, high-speed connectivity, and versatile meeting spaces.",
  },
];

const roomTypes = [
  {
    name: "Deluxe Room",
    description: "Spacious rooms with garden or beach views, ideal for conference delegates.",
    features: ["42 sqm", "Garden/Beach view", "King or twin beds"],
  },
  {
    name: "Superior Room",
    description: "Elegantly appointed rooms with direct beach access and modern amenities.",
    features: ["49 sqm", "Beach front", "Private terrace"],
  },
  {
    name: "Pool Villa",
    description: "Luxurious standalone villas with private pools for an elevated experience.",
    features: ["95 sqm", "Private pool", "Butler service"],
  },
];

const travelInfo = [
  {
    icon: Globe,
    title: "Visa Information",
    description:
      "The Maldives offers a free 30-day tourist visa on arrival for all nationalities. A valid passport with at least 6 months validity, a confirmed hotel booking, and return ticket are required.",
  },
  {
    icon: Plane,
    title: "Getting There",
    description:
      "Fly into Velana International Airport (MLE) in Malé. The airport is well connected with direct flights from major Asian and Middle Eastern hubs including Singapore, Kuala Lumpur, Colombo, Dubai, and Doha.",
  },
  {
    icon: Ship,
    title: "Airport Transfers",
    description:
      "Complimentary speedboat transfers between Velana International Airport and Kurumba Maldives are available for all registered delegates. The journey takes approximately 10 minutes.",
  },
  {
    icon: Thermometer,
    title: "Weather in September",
    description:
      "September in the Maldives is warm and tropical with an average temperature of 28°C (82°F). Expect occasional tropical showers with plenty of sunshine. Light, breathable clothing is recommended.",
  },
  {
    icon: Clock,
    title: "Time Zone",
    description:
      "The Maldives operates on Maldives Time (MVT), which is UTC+5. Kurumba Maldives follows the same time zone as Malé.",
  },
  {
    icon: UtensilsCrossed,
    title: "Dining & Dietary Needs",
    description:
      "Kurumba offers eight restaurants and two bars catering to international cuisines. All dietary requirements including halal, vegetarian, and allergen-free options are available upon request.",
  },
];

export default function VenuePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep-blue py-24 md:py-32 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.06} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-aba-gold font-medium tracking-wide uppercase text-sm mb-3">
            Conference Venue
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Kurumba Maldives
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            The Maldives&rsquo; first resort — a legendary private island of
            timeless hospitality and modern excellence
          </p>
          <div className="mt-6 h-1 w-20 rounded-full bg-aba-gold mx-auto" />
          <div className="mt-8 flex items-center justify-center gap-2 text-white/60">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              Vihamanaafushi, North Malé Atoll, Maldives
            </span>
          </div>
        </div>
        <WavesDivider color="#f8f4f0" />
      </section>

      {/* Venue Highlights */}
      <section className="bg-coral-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Conference Venue"
            subtitle="A world-class setting for the 42nd ABA General Meeting and Conference"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {venueHighlights.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-ocean-teal/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-ocean-teal" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-deep-blue mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WavesDivider color="white" />

      {/* Accommodation */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Accommodation"
            subtitle="A selection of comfortable room categories for conference delegates"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {roomTypes.map((room) => (
              <div
                key={room.name}
                className="relative bg-coral-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Placeholder image area */}
                <div className="h-48 bg-gradient-to-br from-ocean-teal/20 to-deep-blue/20 flex items-center justify-center">
                  <Hotel className="w-12 h-12 text-deep-blue/30" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-deep-blue mb-2">
                    {room.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {room.description}
                  </p>
                  <ul className="space-y-1">
                    {room.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-aba-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-sand/50 rounded-xl p-6 md:p-8 text-center">
            <p className="text-muted-foreground">
              Special conference rates are available for registered delegates.
              Booking details will be provided upon registration confirmation.
            </p>
          </div>
        </div>
      </section>

      <WavesDivider color="#f8f4f0" />

      {/* Travel Information */}
      <section className="bg-coral-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Travel Information"
            subtitle="Everything you need to know for your journey to the Maldives"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {travelInfo.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-deep-blue/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-deep-blue" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-deep-blue mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WavesDivider color="white" />

      {/* Map Placeholder */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Location"
            subtitle="Kurumba Maldives, North Malé Atoll"
          />

          <div className="rounded-2xl overflow-hidden bg-coral-white border border-sand h-80 md:h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-deep-blue/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">
                Interactive map will be displayed here
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                Kurumba Maldives — 4.2734° N, 73.5267° E
              </p>
            </div>
          </div>
        </div>
      </section>

      <WavesDivider color="#1e3a5f" flip />

      {/* CTA */}
      <section className="relative bg-deep-blue py-16 md:py-20 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.05} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Join Us in Paradise?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Register for the 42nd ABA Conference and secure your accommodation
            at Kurumba Maldives.
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
