import { Metadata } from "next";
import { FAQItem } from "@/components/shared/faq-item";
import { ButtonSecondary } from "@/components/shared/button-secondary";

export const metadata: Metadata = {
  title: "FAQ",
};

const faqCategories = [
  {
    label: "REGISTRATION",
    items: [
      { question: "How do I register for the conference?", answer: "You can register through our online registration portal. Select your registration tier (individual or group), fill in your details, and complete payment to secure your spot. Both ABA member and non-member rates are available." },
      { question: "Can I register as a group?", answer: "Yes, organizations can register multiple delegates at group rates. Use the Group Registration form to add your attendees and benefit from discounted pricing." },
      { question: "What is the cancellation policy?", answer: "Fees are non-refundable for cancellations or no-shows within 30 days of the conference. Please contact maldivesaba@maldivesaba.com for changes." },
    ],
  },
  {
    label: "VENUE & TRAVEL",
    items: [
      { question: "How do I get to Kurumba Maldives?", answer: "Kurumba is just 10 minutes by speedboat from Velana International Airport. Transfers operate 24 hours a day. Arrangements will be communicated upon registration." },
      { question: "What accommodation options are available?", answer: "Bank of Maldives has negotiated special rates at Kurumba Maldives (official venue), dusitD2 Feydhoo Maldives, and Villa Nautica Maldives. Transportation between resorts will be arranged." },
      { question: "Do I need a visa to visit the Maldives?", answer: "The Maldives offers visa-on-arrival for most nationalities for stays up to 30 days. Please check with your local Maldivian embassy for specific requirements." },
    ],
  },
  {
    label: "PROGRAM",
    items: [
      { question: "What is the conference format?", answer: "The 3-day event features plenary sessions with invited speakers, a Governors' Roundtable, B2B networking sessions, and social events including welcome and farewell dinners." },
      { question: "How are speakers selected?", answer: "Speakers are selected based on their expertise and relevance to the conference themes. You can apply through our Call for Speakers page." },
    ],
  },
  {
    label: "PAYMENTS",
    items: [
      { question: "What payment methods are accepted?", answer: "Full payment is required at the time of registration. We accept major credit cards and bank transfers. A confirmation email with receipt will be sent upon successful payment." },
      { question: "Can I get an invoice or receipt?", answer: "Yes, a payment receipt is automatically generated and sent to your registered email address. For invoices, please contact maldivesaba@maldivesaba.com." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-6 py-12 lg:px-30 lg:py-15">
          <span className="section-label">FREQUENTLY ASKED QUESTIONS</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[42px] font-bold text-text text-center">
            Everything You Need to Know
          </h1>
        </div>

        {/* FAQ categories */}
        <div className="flex flex-col gap-10 px-6 lg:px-30">
          {faqCategories.map((category) => (
            <div key={category.label} className="flex flex-col">
              <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[3px] text-gold uppercase mb-2">
                {category.label}
              </span>
              {category.items.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-5 px-6 py-12 lg:px-30 lg:py-12">
          <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[28px] font-bold text-text text-center">
            Still have questions?
          </h2>
          <ButtonSecondary href="/contact" className="text-navy border-navy hover:bg-navy/5">
            CONTACT US
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
