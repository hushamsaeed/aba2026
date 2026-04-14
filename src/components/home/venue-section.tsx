import Image from "next/image";
import { Trees, Plane, Globe } from "lucide-react";

const features = [
  {
    icon: Trees,
    title: "Activities & Experiences",
    description:
      "Snorkelling, diving, water sports, spa treatments, sunset cruises, and cultural activities across the island.",
  },
  {
    icon: Plane,
    title: "Travel & Accessibility",
    description:
      "Just 10 minutes by speedboat from Velana International Airport. 24-hour transfers ensure effortless arrival.",
  },
  {
    icon: Globe,
    title: "About the Maldives",
    description:
      "An island nation of coral atolls renowned for turquoise lagoons, white-sand beaches, and warm hospitality.",
  },
];

const accommodations = [
  {
    name: "Kurumba Maldives",
    description:
      "Official conference venue with beachfront rooms, private bungalows, and villas. On-site meeting facilities, dining, and leisure amenities.",
    link: "nivakurumba.com",
  },
  {
    name: "dusitD2 Feydhoo",
    description:
      "Contemporary island resort with modern beach and overwater villas. Vibrant, lifestyle-focused atmosphere with all-inclusive offering.",
    link: "dusit.com",
  },
  {
    name: "Villa Nautica",
    description:
      "Spacious beachfront and overwater villas with dining, wellness, and recreational facilities. Classic charm with modern comforts.",
    link: "villaresorts.com",
  },
];

export function VenueSection() {
  return (
    <section className="w-full bg-navy overflow-hidden">
      <div className="max-w-[1440px] mx-auto py-25 md:py-12 flex flex-col gap-0">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-30 md:px-6">
          <span className="section-label">CONFERENCE VENUE</span>
          <h2 className="font-[family-name:var(--font-heading)] text-[56px] md:text-[36px] font-bold text-white text-center">
            Kurumba Maldives
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[16px] font-light text-white/60 text-center leading-[1.7] max-w-[700px]">
            An iconic island resort in the North Malé Atoll — the Maldives&apos;
            first private island resort, combining rich heritage with
            contemporary comfort.
          </p>
        </div>

        {/* Venue photo */}
        <div className="px-30 md:px-6 py-12">
          <div className="relative w-full h-[400px] md:h-[250px] overflow-hidden">
            <Image
              src="/images/venue-kurumba.png"
              alt="Kurumba Maldives resort"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col md:flex-col lg:flex-row gap-10 px-30 md:px-6 py-12">
          {features.map((feat) => (
            <div key={feat.title} className="flex flex-col gap-3 flex-1">
              <feat.icon className="w-7 h-7 text-gold" />
              <h3 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-white">
                {feat.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-[14px] text-white/50 leading-[1.7]">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Accommodation */}
        <div className="flex flex-col gap-8 px-30 md:px-6 py-12">
          <span className="section-label">ACCOMMODATION</span>
          <div className="flex flex-col lg:flex-row gap-6">
            {accommodations.map((accom) => (
              <div
                key={accom.name}
                className="flex flex-col gap-4 flex-1 bg-white/[0.03] p-8"
              >
                <h4 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-white">
                  {accom.name}
                </h4>
                <p className="font-[family-name:var(--font-body)] text-[14px] text-white/50 leading-[1.7]">
                  {accom.description}
                </p>
                <span className="font-[family-name:var(--font-body)] text-[13px] text-gold font-medium">
                  {accom.link} →
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
