import type { Metadata } from "next";
import { Mic, HandshakeIcon, Mail, ArrowRight } from "lucide-react";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { WavesDivider } from "@/components/shared/WavesDivider";
import { SpeakerApplicationForm } from "./SpeakerApplicationForm";

export const metadata: Metadata = {
  title: "Get Involved | 42nd ABA Conference",
  description:
    "Apply to speak or become a sponsor at the 42nd ABA Conference in the Maldives.",
};

const sponsorTiers = [
  {
    name: "Platinum",
    color: "bg-gradient-to-br from-gray-100 to-gray-300",
    textColor: "text-gray-800",
    borderColor: "border-gray-300",
    benefits: [
      "Premium branding across all conference materials",
      "Keynote speaking opportunity",
      "VIP delegation for up to 10 attendees",
      "Exclusive networking dinner hosting",
      "Full-page advertisement in conference proceedings",
      "Priority booth location in exhibition area",
    ],
  },
  {
    name: "Gold",
    color: "bg-gradient-to-br from-aba-gold-light/20 to-aba-gold/20",
    textColor: "text-aba-gold-dark",
    borderColor: "border-aba-gold/30",
    benefits: [
      "Logo on conference materials and signage",
      "Panel discussion speaking slot",
      "Delegation for up to 6 attendees",
      "Half-page advertisement in proceedings",
      "Exhibition booth",
      "Brand visibility on event website",
    ],
  },
  {
    name: "Silver",
    color: "bg-gradient-to-br from-blue-50 to-blue-100",
    textColor: "text-deep-blue",
    borderColor: "border-blue-200",
    benefits: [
      "Logo on select conference materials",
      "Workshop hosting opportunity",
      "Delegation for up to 4 attendees",
      "Quarter-page advertisement in proceedings",
      "Shared exhibition space",
    ],
  },
  {
    name: "Bronze",
    color: "bg-gradient-to-br from-orange-50 to-orange-100",
    textColor: "text-orange-800",
    borderColor: "border-orange-200",
    benefits: [
      "Logo on conference website",
      "Delegation for up to 2 attendees",
      "Acknowledgement in conference proceedings",
      "Networking event access",
    ],
  },
  {
    name: "Media Partner",
    color: "bg-gradient-to-br from-ocean-teal/5 to-ocean-teal/15",
    textColor: "text-ocean-teal-dark",
    borderColor: "border-ocean-teal/20",
    benefits: [
      "Reciprocal media coverage and branding",
      "Press credentials for up to 3 representatives",
      "Logo on media wall and digital displays",
      "Access to press conferences and interviews",
    ],
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep-blue py-24 md:py-32 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.06} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Get Involved
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Share your expertise on stage or partner with us as a sponsor to
            shape the future of Asian banking
          </p>
          <div className="mt-6 h-1 w-20 rounded-full bg-aba-gold mx-auto" />
        </div>
        <WavesDivider color="#f8f4f0" />
      </section>

      {/* Apply to Speak */}
      <section className="bg-coral-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-ocean-teal/10 flex items-center justify-center">
                <Mic className="w-5 h-5 text-ocean-teal" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-deep-blue">
                Apply to Speak
              </h2>
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              We invite industry leaders, academics, and innovators to share
              their insights at the 42nd ABA Conference. Whether you have
              expertise in digital banking, sustainable finance, regulatory
              frameworks, or emerging technologies, we welcome your proposal.
            </p>

            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-sand">
              <SpeakerApplicationForm />
            </div>
          </div>
        </div>
      </section>

      <WavesDivider color="white" />

      {/* Be a Sponsor */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2 justify-center">
            <div className="w-10 h-10 rounded-lg bg-aba-gold/10 flex items-center justify-center">
              <HandshakeIcon className="w-5 h-5 text-aba-gold" />
            </div>
          </div>

          <SectionHeading
            title="Be a Sponsor"
            subtitle="Partner with us to gain unparalleled visibility among Asia's banking leaders"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sponsorTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 md:p-8 border ${tier.borderColor} transition-shadow hover:shadow-md`}
              >
                <div
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${tier.color} ${tier.textColor}`}
                >
                  {tier.name}
                </div>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <ArrowRight className="w-4 h-4 text-aba-gold shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-coral-white rounded-2xl p-8 md:p-10 text-center">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-deep-blue mb-3">
              Interested in Sponsoring?
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              For detailed sponsorship packages and custom partnership
              opportunities, please contact our sponsorship team.
            </p>
            <a
              href="mailto:sponsors@aba2026.mv"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-aba-gold text-white font-medium hover:bg-aba-gold-dark transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Sponsorship Team
            </a>
          </div>
        </div>
      </section>

      <WavesDivider color="#1e3a5f" flip />

      <section className="relative bg-deep-blue py-12 md:py-16 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.04} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/70 text-sm">
            All sponsorship enquiries will receive a response within 3 business
            days. Custom packages are available upon request.
          </p>
        </div>
      </section>

      <WavesDivider color="#f8f4f0" />
    </>
  );
}
