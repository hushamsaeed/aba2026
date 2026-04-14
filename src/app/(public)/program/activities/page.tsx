import { Metadata } from "next";
import Image from "next/image";
import { ButtonSecondary } from "@/components/shared/button-secondary";

export const metadata: Metadata = {
  title: "Resort Activities",
};

const activities = [
  {
    title: "Snorkelling & Diving",
    description: "Explore Kurumba's vibrant house reef with guided snorkelling and PADI-certified diving excursions among tropical marine life.",
    image: "/images/maldives-ocean.png",
  },
  {
    title: "Water Sports",
    description: "Kayaking, paddleboarding, jet skiing, and parasailing — the Indian Ocean is your playground with activities for all skill levels.",
    image: "/images/maldives-ocean.png",
  },
  {
    title: "Spa & Wellness",
    description: "Rejuvenate with traditional Maldivian treatments, aromatherapy, and wellness rituals in an oceanfront spa setting.",
    image: "/images/venue-kurumba.jpg",
  },
  {
    title: "Cultural Activities",
    description: "Discover Maldivian heritage through coconut palm weaving, traditional music, Bodu Beru drumming, and island village visits.",
    image: "/images/maldives-ocean.png",
  },
  {
    title: "Sunset Cruises",
    description: "Sail across the Indian Ocean at golden hour aboard a traditional Maldivian dhoni, with dolphin-watching opportunities along the way.",
    image: "/images/hero-bg.jpg",
  },
  {
    title: "Dining Experiences",
    description: "Eight restaurants and bars serve international and Maldivian cuisine, from beachfront grills to fine dining — perfect for informal networking.",
    image: "/images/venue-kurumba.jpg",
  },
];

export default function ActivitiesPage() {
  return (
    <div className="w-full bg-parchment">
      {/* Hero banner */}
      <div className="relative w-full h-[300px] lg:h-[360px] overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="Maldives resort activities"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #1B2A4A99, #1B2A4ABB)" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 px-6">
          <span className="section-label">RESORT ACTIVITIES</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[36px] lg:text-[56px] font-bold text-white text-center">
            Experience Paradise
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] font-light text-white/60 text-center">
            Discover a world of leisure and adventure at Kurumba Maldives
          </p>
        </div>
      </div>

      {/* Activity grid — 3 columns, 2 rows */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity.title} className="flex flex-col bg-white overflow-hidden">
              <div className="relative w-full h-[200px] lg:h-[260px] bg-border-light">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                />
              </div>
              <div className="flex flex-col gap-3 p-6">
                <h3 className="font-[family-name:var(--font-heading)] text-[20px] font-bold text-text">
                  {activity.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[14px] text-text-secondary leading-[1.7]">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-12 flex flex-col items-center gap-5">
        <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[28px] font-bold text-text text-center">
          Explore more at Kurumba Maldives
        </h2>
        <ButtonSecondary
          href="https://www.kurumba.com"
          className="text-navy border-navy hover:bg-navy/5"
        >
          VISIT RESORT WEBSITE
        </ButtonSecondary>
      </div>
    </div>
  );
}
