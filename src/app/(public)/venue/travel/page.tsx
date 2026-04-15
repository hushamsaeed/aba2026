import { Metadata } from "next";
import Image from "next/image";
import { Plane, FileCheck, Sun, Clock, Shield, Luggage } from "lucide-react";

export const metadata: Metadata = {
  title: "Travel & Accessibility",
};

const travelTips = [
  { icon: Clock, title: "10-Minute Transfer", description: "Speedboat from Velana International Airport to Kurumba — the closest resort to the airport. 24-hour transfers available." },
  { icon: Shield, title: "Visa on Arrival", description: "Most nationalities receive a 30-day visa on arrival. Valid passport (6+ months), hotel booking, and return ticket required." },
  { icon: Sun, title: "Tropical Climate", description: "September temperatures: 28-31°C. Occasional rain showers. Warm and humid — pack light, breathable clothing." },
  { icon: Luggage, title: "What to Pack", description: "Business attire for sessions, smart casual for evenings. Sunscreen, sunglasses, and swimwear for resort activities." },
  { icon: Plane, title: "Getting There", description: "Major airlines fly to Velana International Airport (MLE) from hubs across Asia, the Middle East, and Europe." },
  { icon: FileCheck, title: "Conference Logistics", description: "Transfer arrangements and accommodation details will be communicated upon registration confirmation." },
];

export default function TravelPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="relative w-full h-[300px] lg:h-[360px] overflow-hidden">
        <Image src="/images/travel-speedboat.jpg" alt="Speedboat transfer to Kurumba" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1B2A4A99, #1B2A4ABB)" }} />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 px-6">
          <span className="section-label">TRAVEL & ACCESSIBILITY</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-white text-center">
            Getting to Kurumba
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] font-light text-white/60 text-center">
            Just 10 minutes by speedboat from Velana International Airport
          </p>
        </div>
      </div>

      {/* Airport Transfer Section */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-15">
            <div className="flex flex-col gap-6 flex-1">
              <span className="section-label">AIRPORT TRANSFERS</span>
              <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-text">
                Seamless Arrival
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
                Kurumba Maldives is the closest resort to Velana International Airport (MLE). Upon arrival, you will be met by resort staff and transferred by speedboat — the journey takes just 10 minutes across the crystal-clear lagoon. Transfers operate 24 hours a day, ensuring effortless arrival regardless of your flight time.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
                The airport is located on Hulhulé island, connected to the capital Malé by the Sinamalé Bridge. International flights arrive from major hubs including Singapore, Dubai, Colombo, Kuala Lumpur, Istanbul, and Hong Kong.
              </p>
            </div>
            <div className="relative w-full lg:w-[500px] h-[300px] shrink-0 overflow-hidden">
              <Image src="/images/travel-airport.jpg" alt="Velana International Airport" fill className="object-cover" sizes="500px" />
            </div>
          </div>
        </div>
      </div>

      {/* Travel Tips Grid */}
      <div className="w-full bg-navy">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col gap-10">
          <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-white">
            Essential Travel Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelTips.map((tip) => (
              <div key={tip.title} className="flex flex-col gap-4 bg-white/[0.04] p-6">
                <tip.icon className="w-8 h-8 text-gold" />
                <h3 className="font-[family-name:var(--font-heading)] text-[20px] font-bold text-white">
                  {tip.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-[14px] text-white/50 leading-[1.7]">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visa & Weather Details */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col lg:flex-row gap-10 lg:gap-15">
          <div className="flex flex-col gap-6 flex-1">
            <span className="section-label">VISA INFORMATION</span>
            <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-text">
              Entry Requirements
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
              The Maldives offers visa-on-arrival for most nationalities for stays up to 30 days. You will need a valid passport with at least 6 months validity, a confirmed hotel booking, and a return/onward flight ticket. No advance visa application is required for conference delegates.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
              Please check with your local Maldivian embassy or the Immigration Controller&apos;s Office for specific requirements based on your nationality.
            </p>
          </div>
          <div className="flex flex-col gap-6 flex-1">
            <span className="section-label">WEATHER & CLIMATE</span>
            <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-text">
              September Conditions
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
              September falls within the southwest monsoon season (Hulhangu). Expect warm temperatures between 28-31°C with humidity around 80%. Occasional rain showers are common but usually brief. The sea remains warm (27-29°C) and ideal for swimming and water sports.
            </p>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
              Pack lightweight, breathable clothing. Business attire is recommended for conference sessions; smart casual for evening events and social activities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
