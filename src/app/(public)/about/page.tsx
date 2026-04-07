import type { Metadata } from "next";
import { Download, Users, Landmark, CreditCard, Globe, Building2 } from "lucide-react";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WavesDivider } from "@/components/shared/WavesDivider";

export const metadata: Metadata = {
  title: "About | 42nd ABA Conference",
  description:
    "Learn about Bank of Maldives, the host institution, and the Asian Bankers Association.",
};

const bmlFacts = [
  { label: "Customers", value: "365,000+", icon: Users },
  { label: "Total Deposits", value: "MVR 32.03B", icon: Landmark },
  { label: "Total Assets", value: "MVR 48.4B", icon: Building2 },
  { label: "Employees", value: "1,000+", subtext: "99% local", icon: Users },
  { label: "Network", value: "Largest", subtext: "in Maldives", icon: Globe },
  {
    label: "Card Memberships",
    value: "Principal Member",
    subtext: "Visa & MasterCard",
    icon: CreditCard,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep-blue py-24 md:py-32 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.06} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            About
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            The host institution and the regional association behind the 42nd ABA
            Conference
          </p>
          <div className="mt-6 h-1 w-20 rounded-full bg-aba-gold mx-auto" />
        </div>
        <WavesDivider color="#f8f4f0" />
      </section>

      {/* About BML */}
      <section className="relative bg-coral-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <div className="h-1 w-8 rounded-full bg-bml-red" />
            <span className="text-bml-red font-medium text-sm uppercase tracking-wide">
              Host Institution
            </span>
            <div className="h-1 w-8 rounded-full bg-bml-red" />
          </div>

          <SectionHeading
            title="Bank of Maldives"
            subtitle="The national bank and largest financial institution in the Republic of Maldives"
          />

          <div className="max-w-3xl mx-auto mb-12">
            <div className="space-y-4 text-muted-foreground leading-relaxed text-center">
              <p>
                Bank of Maldives (BML) is the leading financial institution in
                the Maldives, serving as the backbone of the nation&rsquo;s
                economy. Established in 1982, BML has grown to become the most
                trusted and widely connected bank across the Maldivian
                archipelago, providing comprehensive financial services to
                individuals, businesses, and government institutions.
              </p>
              <p>
                With the largest network of branches, ATMs, and agents across
                every inhabited island, BML plays a pivotal role in driving
                financial inclusion throughout the Maldives. The bank is a
                principal member of both Visa and MasterCard networks and holds
                an exclusive partnership with American Express in the Maldives.
              </p>
            </div>
          </div>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {bmlFacts.map((fact) => (
              <div
                key={fact.label}
                className="bg-white rounded-xl p-5 text-center shadow-sm border border-bml-red/5 hover:border-bml-red/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-bml-red/10 flex items-center justify-center mx-auto mb-3">
                  <fact.icon className="w-5 h-5 text-bml-red" />
                </div>
                <p className="font-heading text-lg md:text-xl font-bold text-deep-blue">
                  {fact.value}
                </p>
                {fact.subtext && (
                  <p className="text-xs text-bml-red font-medium">
                    {fact.subtext}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              BML is also the exclusive American Express representative in the
              Maldives, further cementing its role as the financial gateway of
              the nation.
            </p>
          </div>
        </div>
      </section>

      <WavesDivider color="white" />

      {/* About ABA */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Asian Bankers Association"
            subtitle="Fostering connections across the Asian banking community since 1981"
          />

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The Asian Bankers Association (ABA) is a regional industry
                  association established in 1981 with the mission of providing a
                  forum for advancing the cause of the banking and finance
                  industry in the Asia-Pacific region.
                </p>
                <p>
                  Headquartered in Taipei, Taiwan, ABA serves as a bridge
                  connecting banking professionals, regulators, and financial
                  institutions across Asia, fostering dialogue and cooperation on
                  issues of common concern.
                </p>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With members from over 25 countries across the Asia-Pacific
                  region, ABA organises its annual General Meeting and
                  Conference to facilitate the exchange of ideas, best practices,
                  and emerging trends in the banking sector.
                </p>
                <p>
                  The association&rsquo;s activities include policy advocacy,
                  capacity building, and the promotion of sound banking
                  practices. Through its programmes and publications, ABA
                  contributes to the development of a robust, inclusive, and
                  innovative financial ecosystem in Asia.
                </p>
              </div>
            </div>

            {/* ABA Highlights */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-coral-white rounded-xl p-6 text-center">
                <p className="font-heading text-3xl font-bold text-deep-blue">
                  42
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Years of Annual Conferences
                </p>
              </div>
              <div className="bg-coral-white rounded-xl p-6 text-center">
                <p className="font-heading text-3xl font-bold text-deep-blue">
                  25+
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Member Countries
                </p>
              </div>
              <div className="bg-coral-white rounded-xl p-6 text-center">
                <p className="font-heading text-3xl font-bold text-deep-blue">
                  Taipei
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Headquarters
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WavesDivider color="#1e3a5f" flip />

      {/* Download Brochure */}
      <section className="relative bg-deep-blue py-16 md:py-24 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.05} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Conference Brochure"
            subtitle="Download the official brochure for the 42nd ABA General Meeting and Conference"
            light
          />

          <a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-aba-gold text-white font-heading text-lg font-semibold hover:bg-aba-gold-dark transition-colors shadow-lg shadow-aba-gold/20"
          >
            <Download className="w-5 h-5" />
            Download Brochure (PDF)
          </a>

          <p className="mt-4 text-white/50 text-sm">
            The brochure includes programme details, speaker profiles, venue
            information, and registration guidelines.
          </p>
        </div>
      </section>

      <WavesDivider color="#f8f4f0" />
    </>
  );
}
