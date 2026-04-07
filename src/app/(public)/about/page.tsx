import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "About | 42nd ABA Conference",
  description: "About Bank of Maldives and the Asian Bankers Association.",
};

const bmlFacts = [
  { value: "365K+", label: "Customers" },
  { value: "32B", label: "MVR Deposits" },
  { value: "48.4B", label: "MVR Assets" },
  { value: "1,000+", label: "Employees" },
  { value: "99%", label: "Local Staff" },
  { value: "#1", label: "Network in Maldives" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">About</p>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-white">
            Our <span className="gradient-gold-text">Hosts</span>
          </h1>
        </div>
      </section>

      {/* BML Section */}
      <section className="relative bg-dark-surface py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Image src="/logos/bml-logo.png" alt="BML" width={48} height={48} className="h-12 w-auto" />
                <div>
                  <p className="text-editorial text-bml-red text-[10px]">Host Institution</p>
                  <h2 className="text-display text-3xl md:text-4xl text-white">Bank of Maldives</h2>
                </div>
              </div>
              <div className="space-y-4 text-white/50 text-sm leading-relaxed">
                <p>
                  Bank of Maldives (BML) is the leading financial institution in the Maldives,
                  providing a comprehensive range of personal, business, and corporate banking services.
                </p>
                <p>
                  BML is the principal member for Visa and MasterCard in the Maldives and the exclusive
                  acquirer and issuer of American Express. 99% of its 1,000+ employees are Maldivian nationals.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10">
              {bmlFacts.map((f) => (
                <div key={f.label} className="bg-dark-surface p-6 text-center hover:bg-dark-card transition-colors">
                  <span className="font-heading text-2xl md:text-3xl font-bold gradient-gold-text">{f.value}</span>
                  <p className="text-editorial text-white/40 text-[9px] mt-2">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABA Section */}
      <section className="relative bg-black py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Image src="/logos/aba-logo.webp" alt="ABA" width={60} height={40} className="h-10 w-auto" />
            <div>
              <p className="text-editorial text-aba-gold text-[10px]">Organizer</p>
              <h2 className="text-display text-3xl md:text-4xl text-white">Asian Bankers Association</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <p className="text-white/50 text-sm leading-relaxed">
              The Asian Bankers Association (ABA) is a regional banking industry association
              headquartered in Taipei, Taiwan. ABA brings together banks and financial
              institutions from over 25 countries across Asia-Pacific and beyond.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[{ v: "42", l: "Years" }, { v: "25+", l: "Countries" }, { v: "Taipei", l: "HQ" }].map((s) => (
                <div key={s.l} className="bg-dark-card border border-white/10 p-6 text-center">
                  <span className="font-heading text-2xl font-bold text-aba-gold">{s.v}</span>
                  <p className="text-editorial text-white/40 text-[9px] mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brochure */}
      <section className="relative bg-dark-surface py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto text-center">
          <p className="text-editorial text-aba-gold mb-4">Conference Materials</p>
          <h2 className="text-display text-3xl md:text-5xl text-white mb-6">Download Brochure</h2>
          <p className="text-white/50 text-sm max-w-lg mx-auto mb-10">
            Full conference brochure with program, speaker profiles, and practical details.
          </p>
          <a href="#" className="inline-flex items-center gap-3 gradient-gold text-black px-10 py-5 btn-sharp text-sm font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </section>
    </>
  );
}
