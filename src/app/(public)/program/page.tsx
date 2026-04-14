import { Metadata } from "next";
import Image from "next/image";
import { SpeakerCard } from "@/components/shared/speaker-card";
import { ButtonPrimary } from "@/components/shared/button-primary";

export const metadata: Metadata = {
  title: "Conference Program",
};

/* ── Speaker data ── */

const plenary1Speakers = [
  { name: "Piyush Gupta", title: "CEO", organization: "Development Bank of Singapore", photo: "piyush-gupta" },
  { name: "Steve Monaghan", title: "Executive Chairman", organization: "Human AI", photo: "steve-monaghan" },
  { name: "Nguyen Duc Binh", title: "Chief Technology Officer", organization: "DNSE Securities", photo: "nguyen-duc-binh" },
  { name: "Kenny Lam", title: "CEO", organization: "Two Sigma Asia Pacific", photo: "kenny-lam" },
  { name: "Jahja Setiaatmadja", title: "President Director", organization: "Bank Central Asia", photo: "jahja-setiaatmadja" },
  { name: "Dato Sri Khairussaleh", title: "President & Group CEO", organization: "Maybank", photo: "dato-sri-khairussaleh" },
];

const plenary2Speakers = [
  { name: "Tessa Dann", title: "Head of Sustainable Finance, Asia Pacific", organization: "Societe Generale", photo: "tessa-dann" },
  { name: "Luanne Sieh", title: "Group Sustainability Officer", organization: "CIMB", photo: "luanne-sieh" },
  { name: "Dr. Guo Peiyuan", title: "Chairman", organization: "Syntai Green Finance", photo: "guo-peiyuan" },
  { name: "Eugene Wong", title: "CEO", organization: "Sustainable Finance Institute Asia", photo: "eugene-wong" },
  { name: "Kamran Khan", title: "Head of ESG, APAC, MENA & Africa", organization: "Deutsche Bank", photo: "kamran-khan" },
];

const plenary3Speakers = [
  { name: "Andeed Ma", title: "President", organization: "Risk & Insurance Management Association of Singapore", photo: "andeed-ma" },
  { name: "Noppachai Tungsinpulchai", title: "Head of IT Risk Management", organization: "Krung Thai Bank", photo: "noppachai-tungsinpulchai" },
  { name: "Kelvin Teo", title: "Co-Founder & Group CEO", organization: "Funding Securities / Modalku", photo: "kelvin-teo" },
  { name: "Mayank Nanda", title: "SVP & Head of Market/Credit Risk Analytics", organization: "Numerix", photo: "mayank-nanda" },
  { name: "Gaitri Sharma", title: "Chief Risk Officer, Group Global Banking", organization: "Maybank", photo: "gaitri-sharma" },
];

const plenary4Speakers = [
  { name: "Dr. Eli Remolona Jr.", title: "Governor", organization: "Central Bank of the Philippines", photo: "eli-remolona" },
  { name: "Gan Kim Yong", title: "Chairman", organization: "Monetary Authority of Singapore", photo: "gan-kim-yong" },
  { name: "Dato' Sri Abdul Rasheed Ghaffour", title: "Governor", organization: "Bank Negara Malaysia", photo: "abdul-rasheed-ghaffour" },
  { name: "Ahmed Munawar", title: "Governor", organization: "Maldives Monetary Authority", photo: "ahmed-munawar" },
  { name: "Yang Chin-long", title: "Governor", organization: "Central Bank of the Republic of China (Taiwan)", photo: "yang-chin-long" },
];

/* ── Helper components ── */

function TimeSlot({ time, children, light }: { time: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
      <span className={`font-[family-name:var(--font-body)] text-[14px] w-auto lg:w-[130px] shrink-0 ${light ? "text-white/40" : "text-text-secondary"}`}>
        {time}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function SessionTitle({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`font-[family-name:var(--font-body)] text-[16px] font-medium ${light ? "text-white" : "text-text"}`}>
      {children}
    </p>
  );
}

function PlenaryCard({
  title,
  description,
  moderator,
  moderatorTitle,
  moderatorPhoto,
  speakers,
  light,
}: {
  title: string;
  description: string;
  moderator: string;
  moderatorTitle: string;
  moderatorPhoto: string;
  speakers: { name: string; title: string; organization: string; photo: string }[];
  light?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-8 p-6 lg:p-10 border-t-[3px] border-gold ${light ? "bg-white/[0.06]" : "bg-white"}`}>
      <div className="flex flex-col gap-3">
        <span className="section-label">PLENARY SESSION</span>
        <h3 className={`font-[family-name:var(--font-heading)] text-[22px] lg:text-[28px] font-bold ${light ? "text-white" : "text-text"}`}>
          {title}
        </h3>
        <p className={`font-[family-name:var(--font-body)] text-[15px] leading-[1.7] max-w-[700px] ${light ? "text-white/60" : "text-text-secondary"}`}>
          {description}
        </p>
      </div>

      {/* Moderator */}
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-speaker-bg shrink-0">
          <Image
            src={`/images/speakers/${moderatorPhoto}.png`}
            alt={moderator}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div className="flex flex-col">
          <span className={`font-[family-name:var(--font-body)] text-[12px] font-semibold tracking-[1px] uppercase ${light ? "text-gold" : "text-gold"}`}>
            Moderator
          </span>
          <span className={`font-[family-name:var(--font-body)] text-[14px] font-medium ${light ? "text-white" : "text-text"}`}>
            {moderator}
          </span>
          <span className={`font-[family-name:var(--font-body)] text-[12px] ${light ? "text-white/50" : "text-text-secondary"}`}>
            {moderatorTitle}
          </span>
        </div>
      </div>

      {/* Speaker grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker) => (
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
  );
}

/* ── Main page ── */

export default function ProgramPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-20 flex flex-col items-center gap-6">
          <span className="section-label">CONFERENCE PROGRAM</span>
          <h1 className="font-[family-name:var(--font-heading)] text-[36px] lg:text-[52px] font-bold text-text text-center">
            Three Days of Insight & Connection
          </h1>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary text-center leading-[1.7] max-w-[800px]">
            The 42nd ABA General Meeting and Conference brings together banking
            leaders, regulators, and industry experts for three days of keynotes,
            panel discussions, and networking.
          </p>
          <div className="w-[60px] h-[2px] bg-gold" />
        </div>
      </div>

      {/* ── Day 1 — Navy ── */}
      <div className="w-full bg-navy">
        <div className="max-w-[1440px] mx-auto px-6 py-8 lg:px-30 lg:py-12 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="section-label">DAY 1</span>
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[36px] font-bold text-white">
              September 1, 2026
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <TimeSlot time="09:00 – 10:00" light><SessionTitle light>Registration</SessionTitle></TimeSlot>
            <TimeSlot time="10:00 – 11:00" light><SessionTitle light>Opening Ceremony</SessionTitle></TimeSlot>
            <TimeSlot time="11:00 – 11:15" light><SessionTitle light>Coffee Break</SessionTitle></TimeSlot>
            <TimeSlot time="11:15 – 12:45" light><SessionTitle light>Host Bank Session — Bank of Maldives</SessionTitle></TimeSlot>
            <TimeSlot time="12:45 – 14:00" light><SessionTitle light>Lunch</SessionTitle></TimeSlot>
            <TimeSlot time="14:00 – 15:30" light><SessionTitle light>ABA Policy Advocacy Committee Meeting</SessionTitle></TimeSlot>
            <TimeSlot time="15:30 – 17:30" light><SessionTitle light>B2B / Networking Session</SessionTitle></TimeSlot>
            <TimeSlot time="15:30 – 16:15" light>
              <p className="font-[family-name:var(--font-body)] text-[14px] text-white/50 italic">
                Concurrent: ABA Advisory Council Meeting (Members Only)
              </p>
            </TimeSlot>
            <TimeSlot time="16:30 – 18:00" light>
              <p className="font-[family-name:var(--font-body)] text-[14px] text-white/50 italic">
                Concurrent: 66th ABA Board of Directors&apos; Meeting
              </p>
            </TimeSlot>
            <TimeSlot time="18:30 – 20:00" light>
              <p className="font-[family-name:var(--font-body)] text-[16px] font-medium text-gold">
                Welcome Dinner
              </p>
            </TimeSlot>
          </div>
        </div>
      </div>

      {/* ── Day 2 — Parchment ── */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-8 lg:px-30 lg:py-12 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="section-label">DAY 2</span>
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[36px] font-bold text-text">
              September 2, 2026
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary">
              41st ABA General Meeting & Conference
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <TimeSlot time="09:00 – 10:00"><SessionTitle>Registration</SessionTitle></TimeSlot>
          </div>

          {/* Plenary 1 */}
          <div className="flex flex-col gap-2">
            <TimeSlot time="10:00 – 11:30">
              <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-[1px] text-gold uppercase">
                Plenary Session 1
              </span>
            </TimeSlot>
          </div>
          <PlenaryCard
            title="Digital First for the Digital Era"
            description="Exploring how digital transformation, AI, emerging technologies, and cross-border payment innovation are reshaping banking across Asia."
            moderator="Mohamed Shareef"
            moderatorTitle="CEO & MD, Bank of Maldives; Vice Chairman, ABA"
            moderatorPhoto="mohamed-shareef"
            speakers={plenary1Speakers}
          />

          {/* Plenary 2 */}
          <div className="flex flex-col gap-2 mt-8">
            <TimeSlot time="11:30 – 13:00">
              <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-[1px] text-gold uppercase">
                Plenary Session 2
              </span>
            </TimeSlot>
          </div>
          <PlenaryCard
            title="Sustainability: Building Resilience"
            description="ESG integration, climate risk management, financing climate adaptation, blue economy, and sustainable tourism finance for the region."
            moderator="Damith Pallewatte"
            moderatorTitle="CEO & MD, Hatton National Bank"
            moderatorPhoto="damith-pallewatte"
            speakers={plenary2Speakers}
          />

          <div className="flex flex-col gap-6 mt-8">
            <TimeSlot time="13:00 – 15:00"><SessionTitle>Lunch & ABA Chairman&apos;s Report</SessionTitle></TimeSlot>
            <TimeSlot time="15:00 – 16:30"><SessionTitle>B2B / Networking Session</SessionTitle></TimeSlot>
          </div>
        </div>
      </div>

      {/* ── Day 3 — Navy ── */}
      <div className="w-full bg-navy">
        <div className="max-w-[1440px] mx-auto px-6 py-8 lg:px-30 lg:py-12 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="section-label">DAY 3</span>
            <h2 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[36px] font-bold text-white">
              September 3, 2026
            </h2>
          </div>

          {/* Plenary 3 */}
          <div className="flex flex-col gap-2">
            <TimeSlot time="09:00 – 10:30" light>
              <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-[1px] text-gold uppercase">
                Plenary Session 3
              </span>
            </TimeSlot>
          </div>
          <PlenaryCard
            title="Success Through Synergy: Leveraging Technology for Risk"
            description="How AI, ML, blockchain, and cloud computing are transforming risk management, predictive analytics, and governance oversight in banking."
            moderator="Reginaldo Cariaso"
            moderatorTitle="President & CEO, Rizal Commercial Banking Corporation"
            moderatorPhoto="reginaldo-cariaso"
            speakers={plenary3Speakers}
            light
          />

          <div className="flex flex-col gap-6">
            <TimeSlot time="10:30 – 10:45" light><SessionTitle light>Coffee Break</SessionTitle></TimeSlot>
          </div>

          {/* Plenary 4 */}
          <div className="flex flex-col gap-2">
            <TimeSlot time="10:45 – 12:15" light>
              <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold tracking-[1px] text-gold uppercase">
                Plenary Session 4 — Governors&apos; Roundtable
              </span>
            </TimeSlot>
          </div>
          <PlenaryCard
            title="Governors' Roundtable"
            description="Central bank governors examine how regulators support bank transformation through progressive policies on financial stability, digital transformation, and sustainable finance."
            moderator="Thinley Namgyel"
            moderatorTitle="Chairman, Bank of Bhutan; Chairman, ABA"
            moderatorPhoto="thinley-namgyel"
            speakers={plenary4Speakers}
            light
          />

          <div className="flex flex-col gap-6 mt-8">
            <TimeSlot time="12:30 – 14:00" light><SessionTitle light>Lunch</SessionTitle></TimeSlot>
            <TimeSlot time="19:00 – 22:00" light>
              <p className="font-[family-name:var(--font-body)] text-[16px] font-medium text-gold">
                Farewell Dinner & Entertainment
              </p>
            </TimeSlot>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="w-full bg-parchment">
        <div className="max-w-[1440px] mx-auto px-6 py-12 lg:px-30 lg:py-20 flex flex-col items-center gap-6">
          <h2 className="font-[family-name:var(--font-heading)] text-[28px] lg:text-[36px] font-bold text-text text-center">
            Join Us in Maldives
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary text-center">
            Secure your place at the 42nd ABA General Meeting & Conference.
          </p>
          <ButtonPrimary href="/register">REGISTER NOW</ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
