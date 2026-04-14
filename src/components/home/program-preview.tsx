import Link from "next/link";
import { ButtonPrimary } from "@/components/shared/button-primary";

const days = [
  {
    date: "Day 1 — September 1",
    title: "Opening & Host Bank",
    highlights: [
      "Opening Ceremony",
      "Host Bank Session by Bank of Maldives",
      "ABA Policy Advocacy Committee Meeting",
      "B2B / Networking Session",
      "Welcome Dinner",
    ],
  },
  {
    date: "Day 2 — September 2",
    title: "Conference & Plenaries",
    highlights: [
      "Plenary 1: Digital First for the Digital Era",
      "Plenary 2: Sustainability — Building Resilience",
      "ABA Chairman's Report",
      "B2B / Networking Session",
    ],
  },
  {
    date: "Day 3 — September 3",
    title: "Risk, Governance & Farewell",
    highlights: [
      "Plenary 3: Technology for Risk Management",
      "Plenary 4: Governors' Roundtable",
      "Farewell Dinner & Entertainment",
    ],
  },
];

export function ProgramPreview() {
  return (
    <section className="w-full bg-parchment">
      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-25 flex flex-col items-center gap-12">
        {/* Header */}
        <span data-animate className="section-label">CONFERENCE PROGRAM</span>
        <h2 data-animate className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-text text-center">
          Three Days of Insight
        </h2>
        <div data-divider className="w-[60px] h-[2px] bg-gold" />

        {/* Day cards */}
        <div data-stagger className="flex flex-col lg:flex-row gap-6 w-full">
          {days.map((day) => (
            <div
              key={day.date}
              className="flex flex-col gap-5 flex-1 bg-white p-8 border border-border-light"
            >
              <span className="font-[family-name:var(--font-body)] text-[12px] font-semibold tracking-[2px] text-gold uppercase">
                {day.date}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] text-[24px] font-bold text-text">
                {day.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {day.highlights.map((item) => (
                  <li
                    key={item}
                    className="font-[family-name:var(--font-body)] text-[14px] text-text-secondary leading-[1.6] flex items-start gap-2"
                  >
                    <span className="text-gold mt-0.5">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <ButtonPrimary href="/program">VIEW FULL PROGRAM</ButtonPrimary>
      </div>
    </section>
  );
}
