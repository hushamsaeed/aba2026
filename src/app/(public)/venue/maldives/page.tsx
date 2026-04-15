import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About the Maldives",
};

export default function MaldivesPage() {
  return (
    <div className="w-full">
      {/* Hero */}
      <div className="relative w-full h-[300px] lg:h-[360px] overflow-hidden">
        <Image src="/images/maldives-atoll.jpg" alt="Maldives atoll aerial" fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #1B2A4A99, #1B2A4ABB)" }} />
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 px-6">
          <span className="section-label">DISCOVER</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-white text-center">
            About the Maldives
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] font-light text-white/60 text-center">
            An island nation of coral atolls, turquoise lagoons, and warm hospitality
          </p>
        </div>
      </div>

      {/* Culture & Heritage */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-15">
            <div className="flex flex-col gap-6 flex-1">
              <span className="section-label">CULTURE & HERITAGE</span>
              <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-text">
                A Rich Cultural Tapestry
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
                The Maldives has a rich cultural heritage shaped by centuries of Indian, Sri Lankan, Arab, and African influences. Traditional crafts like liyelaa jehun (lacquer work) from Thulhaadhoo in Baa Atoll, coir rope making, and kasabu embroidery remain vibrant art forms practiced across the islands.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
                The rhythmic Bodu Beru drumming is the heartbeat of Maldivian celebrations — a powerful percussion tradition that brings communities together. The Thaana script, unique to the Maldives, reflects the nation&apos;s distinct linguistic identity.
              </p>
            </div>
            <div className="relative w-full lg:w-[500px] h-[300px] shrink-0 overflow-hidden">
              <Image src="/images/maldives-village.jpg" alt="Traditional Maldivian village" fill className="object-cover" sizes="500px" />
            </div>
          </div>
        </div>
      </div>

      {/* Marine Life */}
      <div className="w-full bg-navy">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-15">
            <div className="flex flex-col gap-6 flex-1">
              <span className="section-label">MARINE LIFE</span>
              <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-white">
                Underwater Paradise
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 leading-[1.7]">
                Home to some of the world&apos;s most biodiverse coral reefs, the Maldives offers extraordinary marine encounters. Over 2,000 species of fish, 187 species of coral, and regular visits from manta rays, whale sharks, and sea turtles make this a diver&apos;s and snorkeller&apos;s paradise.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 leading-[1.7]">
                Kurumba&apos;s house reef is accessible directly from the beach, with guided snorkelling excursions and PADI-certified diving available for conference delegates.
              </p>
            </div>
            <div className="relative w-full lg:w-[500px] h-[300px] shrink-0 overflow-hidden">
              <Image src="/images/maldives-marine.jpg" alt="Maldives coral reef" fill className="object-cover" sizes="500px" />
            </div>
          </div>
        </div>
      </div>

      {/* Cuisine */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-15">
            <div className="flex flex-col gap-6 flex-1">
              <span className="section-label">MALDIVIAN CUISINE</span>
              <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-text">
                Flavours of the Islands
              </h2>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
                Maldivian cuisine is built on tuna, coconut, and tropical fruits. Signature dishes include garudhiya (clear fish broth), mas huni (shredded tuna with coconut and onion, served with roshi flatbread), and hedhikaa (short eats — bite-sized snacks perfect for tea time).
              </p>
              <p className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary leading-[1.7]">
                The cuisine reflects centuries of maritime trade, blending South Asian spices with island freshness. At Kurumba, eight restaurants serve both international and authentic Maldivian cuisine — from beachfront grills to fine dining experiences.
              </p>
            </div>
            <div className="relative w-full lg:w-[500px] h-[300px] shrink-0 overflow-hidden">
              <Image src="/images/maldives-cuisine.jpg" alt="Traditional Maldivian cuisine" fill className="object-cover" sizes="500px" />
            </div>
          </div>
        </div>
      </div>

      {/* Places to Visit & Etiquette */}
      <div className="w-full bg-navy">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-15 flex flex-col lg:flex-row gap-10 lg:gap-15">
          <div className="flex flex-col gap-6 flex-1">
            <span className="section-label">PLACES TO VISIT</span>
            <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-white">
              Beyond the Resort
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 leading-[1.7]">
              Explore Malé, the world&apos;s smallest capital, with its colourful fish market, the 17th-century Hukuru Miskiy mosque featuring intricate coral stone carvings, and the Maldives National Museum. Visit local islands like Maafushi and Thulusdhoo to experience authentic Maldivian daily life, traditional crafts, and legendary surf breaks.
            </p>
          </div>
          <div className="flex flex-col gap-6 flex-1">
            <span className="section-label">LOCAL ETIQUETTE</span>
            <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[32px] font-bold text-white">
              Respecting Local Customs
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[15px] text-white/60 leading-[1.7]">
              The Maldives is an Islamic nation with warm, welcoming people. Modest dress is appreciated when visiting local islands and mosques. Resort islands have relaxed dress codes. Alcohol is only available at resorts. Friday is the holy day — some local businesses may be closed. A warm smile and &ldquo;Assalaamu Alaikum&rdquo; goes a long way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
