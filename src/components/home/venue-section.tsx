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
    tag: "OFFICIAL CONFERENCE VENUE",
    description:
      "Beachfront rooms, private bungalows, and villas set amid tropical gardens with onsite meeting facilities.",
    image: "/images/accom-kurumba.jpg",
  },
  {
    name: "dusitD2 Feydhoo Maldives",
    description:
      "Contemporary island resort with modern beach and overwater villas, bold design and premium all-inclusive offering.",
    image: "/images/accom-dusit.jpg",
  },
  {
    name: "Villa Nautica Maldives",
    description:
      "Spacious beachfront and overwater villas with dining, wellness, and recreational facilities near Malé.",
    image: "/images/accom-villa.jpg",
  },
];

export function VenueSection() {
  return (
    <section className="relative w-full bg-navy overflow-hidden">
      {/* Fish motif cultural background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <Image src="/images/cultural/fish-motif.jpg" alt="" fill className="object-cover" sizes="1440px" />
      </div>
      <div className="relative max-w-[1440px] mx-auto py-12 lg:py-25 flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-6 lg:px-30">
          <span data-animate className="section-label">CONFERENCE VENUE</span>
          <h2 data-animate className="font-[family-name:var(--font-heading)] text-[36px] lg:text-[56px] font-bold text-white text-center">
            Kurumba Maldives
          </h2>
          <p data-animate className="font-[family-name:var(--font-body)] text-[16px] font-light text-white/60 text-center leading-[1.7] max-w-[700px]">
            An iconic island resort in the North Malé Atoll — the Maldives&apos;
            first private island resort, combining rich heritage with
            contemporary comfort.
          </p>
        </div>

        {/* Venue photo — padded inside container */}
        <div className="px-6 lg:px-30 py-12">
          <div className="relative w-full h-[250px] lg:h-[400px] overflow-hidden">
            <Image
              src="/images/venue-kurumba.jpg"
              alt="Kurumba Maldives resort"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>

        {/* Coir rope cultural divider */}
        <div className="relative w-full h-3 mx-auto max-w-[300px] overflow-hidden opacity-20">
          <Image src="/images/coir-rope-border.jpg" alt="" fill className="object-cover" sizes="300px" />
        </div>

        {/* Features — 3 columns */}
        <div data-stagger className="flex flex-col lg:flex-row gap-10 px-6 lg:px-30 py-12">
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

        {/* Accommodation — cards with images matching design */}
        <div className="flex flex-col gap-8 px-6 lg:px-30 py-12">
          <span data-animate className="section-label">ACCOMMODATION</span>
          <div data-stagger className="flex flex-col lg:flex-row gap-6">
            {accommodations.map((accom) => (
              <div
                key={accom.name}
                className="flex flex-col flex-1 bg-white/[0.03] overflow-hidden"
              >
                {/* Card image — 180px */}
                <div className="relative w-full h-[180px]">
                  <Image
                    src={accom.image}
                    alt={accom.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
                {/* Card info — padding 24, gap 8 */}
                <div className="flex flex-col gap-2 p-6">
                  <h4 className="font-[family-name:var(--font-heading)] text-[20px] font-bold text-white">
                    {accom.name}
                  </h4>
                  {accom.tag && (
                    <span className="font-[family-name:var(--font-body)] text-[10px] font-bold tracking-[2px] text-gold uppercase">
                      {accom.tag}
                    </span>
                  )}
                  <p className="font-[family-name:var(--font-body)] text-[13px] text-white/50 leading-[1.6]">
                    {accom.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
