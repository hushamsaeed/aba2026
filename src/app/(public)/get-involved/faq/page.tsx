import { Metadata } from "next";
import { FAQItem } from "@/components/shared/faq-item";
import { ButtonPrimary } from "@/components/shared/button-primary";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqs = [
  {
    question: "How do I register for the conference?",
    answer:
      "You can register through our online registration portal. Select your registration tier (individual or group), fill in your details, and complete payment to secure your spot. Both ABA member and non-member rates are available.",
  },
  {
    question: "What is included in the registration fee?",
    answer:
      "All registration packages include full conference access for 3 days, all plenary sessions, networking and B2B sessions, welcome and farewell dinners, conference materials and delegate kit, and a certificate of attendance.",
  },
  {
    question: "Is there an early bird discount?",
    answer:
      "Yes! Early bird pricing is available until 1 June 2026, offering approximately 20% savings on all registration tiers. We encourage you to register early to take advantage of these rates.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Registrations cancelled more than 30 days before the conference will receive a refund minus a $100 administrative fee. Cancellations within 30 days of the conference are non-refundable. Contact maldivesaba@maldivesaba.com for changes.",
  },
  {
    question: "How do I get to Kurumba Maldives?",
    answer:
      "Kurumba Maldives is located just 10 minutes by speedboat from Velana International Airport in Malé. The resort offers 24-hour speedboat transfers. Upon arrival at the airport, you will be met by resort staff and transferred directly to the island.",
  },
  {
    question: "Are there other accommodation options?",
    answer:
      "Yes, in addition to Kurumba Maldives (the official conference venue), we have negotiated special rates at dusitD2 Feydhoo Maldives and Villa Nautica Maldives. All properties are easily accessible from the conference venue.",
  },
  {
    question: "What is the group registration minimum?",
    answer:
      "Group registrations require a minimum of 3 delegates. You can register your group and add individual delegate details during the registration process. Group rates offer a discount over individual registration.",
  },
  {
    question: "Can I apply to be a speaker?",
    answer:
      "Absolutely! We welcome proposals from banking professionals, fintech leaders, regulators, and researchers. Submit your application through our Apply to Speak page with your topic proposal and brief biography.",
  },
  {
    question: "What sponsorship opportunities are available?",
    answer:
      "We offer multiple sponsorship tiers: Platinum, Gold, Silver, and Bronze, as well as Media Partner packages. Each tier includes varying levels of branding, speaking opportunities, and complimentary registrations. Contact us for a detailed prospectus.",
  },
  {
    question: "Is there a dress code for the conference?",
    answer:
      "Business attire is recommended for conference sessions and plenary meetings. Smart casual is appropriate for evening events and social activities. The Maldives is a tropical destination, so lightweight fabrics are recommended.",
  },
];

export default function FAQPage() {
  return (
    <div className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto px-30 py-25 md:px-6 md:py-12 flex flex-col items-center gap-12">
        {/* Header */}
        <span className="section-label">FAQ</span>
        <h1 className="font-[family-name:var(--font-heading)] text-[48px] md:text-[32px] font-bold text-text text-center">
          Frequently Asked Questions
        </h1>
        <div className="w-[60px] h-[2px] bg-gold" />

        {/* FAQ items */}
        <div className="w-full max-w-[900px]">
          {faqs.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary text-center">
            Still have questions?
          </p>
          <ButtonPrimary href="/contact">CONTACT US</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
