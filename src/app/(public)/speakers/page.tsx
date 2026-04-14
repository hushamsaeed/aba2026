import { Metadata } from "next";
import { SpeakerCard } from "@/components/shared/speaker-card";
import { ButtonPrimary } from "@/components/shared/button-primary";

export const metadata: Metadata = {
  title: "Speakers",
};

const sessions = [
  {
    label: "PLENARY SESSION 1",
    title: "Digital First for the Digital Era",
    moderator: "Moderated by Mohamed Shareef, CEO & MD, Bank of Maldives",
    dark: false,
    speakers: [
      { name: "Piyush Gupta", title: "CEO", organization: "Development Bank of Singapore", photo: "piyush-gupta" },
      { name: "Steve Monaghan", title: "Executive Chairman", organization: "Human AI", photo: "steve-monaghan" },
      { name: "Kenny Lam", title: "CEO", organization: "Two Sigma Asia Pacific", photo: "kenny-lam" },
      { name: "Jahja Setiaatmadja", title: "President Director", organization: "Bank Central Asia", photo: "jahja-setiaatmadja" },
      { name: "Nguyen Duc Binh", title: "Chief Technology Officer", organization: "DNSE Securities", photo: "nguyen-duc-binh" },
      { name: "Dato Sri Khairussaleh", title: "President & Group CEO", organization: "Maybank", photo: "dato-sri-khairussaleh" },
    ],
  },
  {
    label: "PLENARY SESSION 2",
    title: "Sustainability: Building Resilience",
    moderator: "Moderated by Damith Pallewatte, CEO & MD, Hatton National Bank",
    dark: true,
    speakers: [
      { name: "Tessa Dann", title: "Head of Sustainable Finance, Asia Pacific", organization: "Societe Generale", photo: "tessa-dann" },
      { name: "Luanne Sieh", title: "Group Sustainability Officer", organization: "CIMB", photo: "luanne-sieh" },
      { name: "Dr. Guo Peiyuan", title: "Chairman", organization: "Syntai Green Finance", photo: "guo-peiyuan" },
      { name: "Eugene Wong", title: "CEO", organization: "Sustainable Finance Institute Asia", photo: "eugene-wong" },
      { name: "Kamran Khan", title: "Head of ESG, APAC, MENA & Africa", organization: "Deutsche Bank", photo: "kamran-khan" },
    ],
  },
  {
    label: "PLENARY SESSION 3",
    title: "Success Through Synergy: Leveraging Technology for Risk",
    moderator: "Moderated by Reginaldo Cariaso, President & CEO, RCBC",
    dark: false,
    speakers: [
      { name: "Andeed Ma", title: "President", organization: "Risk & Insurance Management Association of Singapore", photo: "andeed-ma" },
      { name: "Noppachai Tungsinpulchai", title: "Head of IT Risk Management", organization: "Krung Thai Bank", photo: "noppachai-tungsinpulchai" },
      { name: "Kelvin Teo", title: "Co-Founder & Group CEO", organization: "Funding Securities / Modalku", photo: "kelvin-teo" },
      { name: "Mayank Nanda", title: "SVP & Head of Market/Credit Risk Analytics", organization: "Numerix", photo: "mayank-nanda" },
      { name: "Gaitri Sharma", title: "Chief Risk Officer, Group Global Banking", organization: "Maybank", photo: "gaitri-sharma" },
    ],
  },
  {
    label: "PLENARY SESSION 4 — GOVERNORS' ROUNDTABLE",
    title: "Governors' Roundtable",
    moderator: "Moderated by Thinley Namgyel, Chairman, ABA",
    dark: true,
    speakers: [
      { name: "Dr. Eli Remolona Jr.", title: "Governor", organization: "Central Bank of the Philippines", photo: "eli-remolona" },
      { name: "Gan Kim Yong", title: "Chairman", organization: "Monetary Authority of Singapore", photo: "gan-kim-yong" },
      { name: "Dato' Sri Abdul Rasheed Ghaffour", title: "Governor", organization: "Bank Negara Malaysia", photo: "abdul-rasheed-ghaffour" },
      { name: "Ahmed Munawar", title: "Governor", organization: "Maldives Monetary Authority", photo: "ahmed-munawar" },
      { name: "Yang Chin-long", title: "Governor", organization: "Central Bank of the Republic of China (Taiwan)", photo: "yang-chin-long" },
    ],
  },
];

export default function SpeakersPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-20 flex flex-col items-center gap-4">
          <span className="section-label">CONFERENCE SPEAKERS</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[32px] lg:text-[48px] font-bold text-text text-center">
            Meet Our Speakers
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] font-light text-text-secondary text-center leading-[1.6] max-w-[700px]">
            25 distinguished leaders from banking, technology, sustainability, and
            financial regulation across Asia.
          </p>
          <div className="w-[60px] h-[2px] bg-gold" />
        </div>
      </div>

      {/* Session sections — alternating parchment/navy */}
      {sessions.map((session) => (
        <div
          key={session.label}
          className={`w-full ${session.dark ? "bg-navy" : "bg-parchment"}`}
        >
          <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-12 flex flex-col gap-6">
            <span className="section-label">{session.label}</span>
            <h2
              className={`font-[family-name:var(--font-heading)] text-[22px] lg:text-[28px] font-bold ${
                session.dark ? "text-white" : "text-text"
              }`}
            >
              {session.title}
            </h2>
            <p
              className={`font-[family-name:var(--font-body)] text-[13px] font-medium ${
                session.dark ? "text-white/50" : "text-text-secondary"
              }`}
            >
              {session.moderator}
            </p>

            {/* Speaker grid — 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {session.speakers.map((speaker) => (
                <SpeakerCard
                  key={speaker.name}
                  name={speaker.name}
                  title={speaker.title}
                  organization={speaker.organization}
                  photoUrl={`/images/speakers/${speaker.photo}.png`}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-12 flex flex-col items-center gap-5">
          <h2 className="font-[family-name:var(--font-heading)] text-[24px] lg:text-[28px] font-bold text-text text-center">
            Want to join our speakers?
          </h2>
          <ButtonPrimary href="/get-involved/apply">APPLY TO SPEAK</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
