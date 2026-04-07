import type { Metadata } from "next";
import { Mic, Mail, ArrowUpRight } from "lucide-react";
import { SpeakerApplicationForm } from "./SpeakerApplicationForm";

export const metadata: Metadata = {
  title: "Get Involved | 42nd ABA Conference",
  description: "Apply to speak or become a sponsor at the 42nd ABA Conference in the Maldives.",
};

const sponsorTiers = [
  {
    name: "Platinum",
    gradient: "from-aba-gold to-ocean-teal",
    benefits: ["Premium branding across all materials", "Keynote speaking opportunity", "VIP delegation (10 attendees)", "Exclusive networking dinner hosting", "Full-page advertisement", "Priority exhibition booth"],
  },
  {
    name: "Gold",
    gradient: "from-aba-gold to-aba-gold-dark",
    benefits: ["Logo on conference materials", "Panel discussion slot", "Delegation (6 attendees)", "Half-page advertisement", "Exhibition booth", "Website branding"],
  },
  {
    name: "Silver",
    gradient: "from-ocean-teal to-ocean-teal-dark",
    benefits: ["Logo on select materials", "Workshop hosting opportunity", "Delegation (4 attendees)", "Quarter-page advertisement", "Shared exhibition space"],
  },
  {
    name: "Bronze",
    gradient: "from-bml-red to-aba-gold",
    benefits: ["Logo on website", "Delegation (2 attendees)", "Conference proceedings acknowledgement", "Networking event access"],
  },
  {
    name: "Media Partner",
    gradient: "from-[#0a1628] to-ocean-teal",
    benefits: ["Reciprocal media coverage", "Press credentials (3 reps)", "Logo on media wall", "Press conference access"],
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">Participate</p>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-white">
            Get <span className="gradient-gold-text">Involved</span>
          </h1>
          <p className="mt-4 text-white/50 max-w-2xl text-sm leading-relaxed">
            Share your expertise on stage or partner with us as a sponsor to shape the future of Asian banking.
          </p>
        </div>
      </section>

      {/* Apply to Speak */}
      <section className="relative bg-dark-surface py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1000px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Mic className="w-5 h-5 text-aba-gold" />
            <p className="text-editorial text-aba-gold">Apply to Speak</p>
          </div>
          <h2 className="text-display text-2xl md:text-4xl text-white mb-4">
            Share Your Insights
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-2xl">
            We invite industry leaders, academics, and innovators to share their expertise at the 42nd ABA Conference.
          </p>
          <div className="bg-dark-card border border-white/10 p-6 md:p-10">
            <SpeakerApplicationForm />
          </div>
        </div>
      </section>

      {/* Sponsorship */}
      <section className="relative bg-black py-20 md:py-32">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4">Sponsorship</p>
          <h2 className="text-display text-3xl md:text-5xl text-white mb-4">
            Be a Sponsor
          </h2>
          <p className="text-white/50 text-sm max-w-xl mb-16">
            Partner with us to gain unparalleled visibility among Asia&apos;s banking leaders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {sponsorTiers.map((tier) => (
              <div key={tier.name} className="relative bg-black p-8 md:p-10 group hover:bg-dark-card transition-colors">
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${tier.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                <span className="text-editorial text-aba-gold text-[10px]">{tier.name}</span>
                <ul className="mt-6 space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-white/40 text-sm group-hover:text-white/60 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 text-aba-gold/50 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 bg-dark-card border border-white/10 p-8 md:p-12 text-center">
            <h3 className="text-display text-xl md:text-2xl text-white mb-3">Interested in Sponsoring?</h3>
            <p className="text-white/50 text-sm max-w-xl mx-auto mb-8">
              For detailed packages and custom partnership opportunities, contact our sponsorship team.
            </p>
            <a href="mailto:conference@bankofmaldives.com.mv" className="inline-flex items-center gap-3 gradient-gold text-black px-8 py-4 btn-sharp text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
              <Mail className="w-4 h-4" />
              Contact Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
