import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create super admin
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@aba2026.com" },
    update: {},
    create: {
      email: "admin@aba2026.com",
      name: "Super Admin",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  // Seed site config — pricing
  const pricingConfigs = [
    { key: "member_individual", value: "800", label: "Member Individual Fee", group: "pricing" },
    { key: "member_individual_early_bird", value: "700", label: "Member Individual Early Bird", group: "pricing" },
    { key: "non_member_individual", value: "1000", label: "Non-Member Individual Fee", group: "pricing" },
    { key: "non_member_individual_early_bird", value: "900", label: "Non-Member Individual Early Bird", group: "pricing" },
    { key: "member_group", value: "700", label: "Member Group Fee (per person)", group: "pricing" },
    { key: "member_group_early_bird", value: "600", label: "Member Group Early Bird (per person)", group: "pricing" },
    { key: "non_member_group", value: "900", label: "Non-Member Group Fee (per person)", group: "pricing" },
    { key: "non_member_group_early_bird", value: "800", label: "Non-Member Group Early Bird (per person)", group: "pricing" },
    { key: "early_bird_deadline", value: "2026-06-30", label: "Early Bird Deadline", group: "pricing" },
    { key: "group_minimum", value: "3", label: "Minimum Delegates for Group", group: "pricing" },
    { key: "currency", value: "USD", label: "Currency", group: "pricing" },
    { key: "cancellation_fee", value: "100", label: "Cancellation Fee", group: "pricing" },
  ];

  for (const config of pricingConfigs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }

  // Seed site config — general
  const generalConfigs = [
    { key: "site_title", value: "42nd ABA General Meeting & Conference", label: "Site Title", group: "general" },
    { key: "event_theme", value: "Banking in Asia: Investing to Build Resilience", label: "Event Theme", group: "general" },
    { key: "event_dates", value: "September 1-3, 2026", label: "Event Dates", group: "general" },
    { key: "event_venue", value: "Kurumba Resort, Maldives", label: "Event Venue", group: "general" },
    { key: "event_start_date", value: "2026-09-01", label: "Event Start Date", group: "general" },
    { key: "contact_email", value: "conference@bankofmaldives.com.mv", label: "Contact Email", group: "general" },
    { key: "contact_phone", value: "+960 332 3321", label: "Contact Phone", group: "general" },
  ];

  for (const config of generalConfigs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }

  // Seed site config — social
  const socialConfigs = [
    { key: "social_facebook", value: "https://www.facebook.com/ABASecretariat", label: "Facebook", group: "social" },
    { key: "social_linkedin", value: "https://www.linkedin.com/company/asian-bankers-association", label: "LinkedIn", group: "social" },
    { key: "social_youtube", value: "https://www.youtube.com/@AsianBankersAssociation", label: "YouTube", group: "social" },
    { key: "social_twitter", value: "", label: "Twitter/X", group: "social" },
  ];

  for (const config of socialConfigs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config,
    });
  }

  // Seed content blocks
  const contentBlocks = [
    {
      slug: "home-hero",
      title: "42nd ABA General Meeting & Conference",
      body: "Banking in Asia: Investing to Build Resilience",
      metadata: { subtitle: "September 1-3, 2026 | Kurumba Resort, Maldives" },
    },
    {
      slug: "chairman-message",
      title: "Message from ABA Chairman",
      body: `<p>Dear ABA Members and Distinguished Guests,</p>
<p>It is my great pleasure to invite you to the 42nd ABA General Meeting and Conference, to be held at the beautiful Kurumba Resort in the Maldives from September 1-3, 2026.</p>
<p>Under the theme "Banking in Asia: Investing to Build Resilience," this year's conference will bring together leading bankers, regulators, and industry experts from across Asia to discuss how the banking sector can invest strategically to build resilience in the face of global challenges.</p>
<p>The conference will feature four plenary sessions where invited speakers will address critical issues around our theme, including digital transformation, sustainable finance, risk management, and the future of banking in Asia.</p>
<p>I look forward to welcoming you to the Maldives for what promises to be a memorable and insightful conference.</p>
<p>Warm regards,<br/>Daniel Wu<br/>Chairman, Asian Bankers Association<br/>Vice Chairman, CTBC Financial Holding</p>`,
    },
    {
      slug: "host-message",
      title: "Message from the Host Country",
      body: `<p>On behalf of Bank of Maldives, it is our honor and privilege to host the 42nd ABA General Meeting and Conference in the beautiful Maldives.</p>
<p>As the leading financial institution in the Maldives, Bank of Maldives is proud to welcome banking professionals from across Asia to our shores. The Maldives, known for its stunning natural beauty and warm hospitality, provides the perfect backdrop for meaningful dialogue and networking.</p>
<p>We have prepared an enriching program that will not only provide valuable insights into the future of banking but also offer you a taste of Maldivian culture and hospitality.</p>
<p>We look forward to hosting you at Kurumba Resort and ensuring a conference experience that is both productive and unforgettable.</p>`,
    },
    {
      slug: "venue-info",
      title: "Kurumba Maldives",
      body: `<p>Kurumba Maldives is the first resort to open in the Maldives and remains one of the most beloved. Located on its own private island just 10 minutes by speedboat from Velana International Airport, Kurumba offers world-class facilities in a stunning tropical setting.</p>
<p>The resort features:</p>
<ul>
<li>State-of-the-art conference facilities</li>
<li>180 rooms and villas</li>
<li>8 restaurants and bars</li>
<li>Full-service spa</li>
<li>Water sports and diving center</li>
<li>White sand beaches and crystal-clear lagoons</li>
</ul>`,
    },
    {
      slug: "about-bml",
      title: "About Bank of Maldives",
      body: `<p>Bank of Maldives (BML) is the leading financial institution in the Maldives, providing a comprehensive range of personal, business, and corporate banking services.</p>
<p>Key facts:</p>
<ul>
<li>Over 365,000 customers</li>
<li>Deposit base of MVR 32.03 billion</li>
<li>Total assets of MVR 48.4 billion</li>
<li>Over 1,000 employees (99% local)</li>
<li>Largest network of branches, agents, ATMs, and POS terminals in the Maldives</li>
<li>Principal member for Visa and MasterCard in the Maldives</li>
<li>Exclusive acquirer and issuer of American Express in the Maldives</li>
</ul>
<p>Vision: To be the bank of choice in the Maldives.</p>`,
    },
    {
      slug: "sponsorship-info",
      title: "Sponsorship Opportunities",
      body: `<p>The 42nd ABA General Meeting & Conference offers a range of sponsorship packages designed to maximize your organization's visibility among Asia's banking leaders.</p>
<h3>Sponsorship Tiers</h3>
<ul>
<li><strong>Platinum Sponsor</strong> — Premium branding, keynote speaking slot, VIP networking</li>
<li><strong>Gold Sponsor</strong> — Prominent branding, panel speaking opportunity, priority networking</li>
<li><strong>Silver Sponsor</strong> — Branding visibility, exhibition space, networking access</li>
<li><strong>Bronze Sponsor</strong> — Logo placement, conference materials inclusion</li>
<li><strong>Media Partner</strong> — Media coverage, content distribution partnership</li>
</ul>
<p>For detailed sponsorship packages and pricing, please contact us at conference@bankofmaldives.com.mv</p>`,
    },
  ];

  for (const block of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { slug: block.slug },
      update: { body: block.body, title: block.title, metadata: block.metadata },
      create: block as { slug: string; title: string; body: string; metadata?: Record<string, string> },
    });
  }

  // Seed previous conferences
  const previousConferences = [
    { year: 2025, edition: "41st", title: "Financing the Future: Banking for Sustainable Growth", location: "Paro, Bhutan", url: "https://41aba.bt", order: 1 },
    { year: 2024, edition: "40th", title: "40th ABA General Meeting & Conference", location: "Baku, Azerbaijan", url: null, order: 2 },
    { year: 2023, edition: "39th", title: "39th ABA General Meeting & Conference", location: "Ha Long Bay, Vietnam", url: null, order: 3 },
    { year: 2019, edition: "36th", title: "36th ABA General Meeting & Conference", location: "Bali, Indonesia", url: null, order: 4 },
  ];

  for (const conf of previousConferences) {
    await prisma.previousConference.upsert({
      where: { id: `prev-${conf.year}` },
      update: {},
      create: { id: `prev-${conf.year}`, ...conf },
    });
  }

  // Seed all 25 speakers
  const speakers = [
    { id: "sp-mohamed-shareef", name: "Mohamed Shareef", title: "CEO & Managing Director", organization: "Bank of Maldives", country: "Maldives", photoUrl: "/images/speakers/mohamed-shareef.png", featured: true, order: 1 },
    { id: "sp-piyush-gupta", name: "Piyush Gupta", title: "CEO", organization: "Development Bank of Singapore", country: "Singapore", photoUrl: "/images/speakers/piyush-gupta.png", featured: true, order: 2 },
    { id: "sp-steve-monaghan", name: "Steve Monaghan", title: "Executive Chairman", organization: "Human AI", country: "Singapore", photoUrl: "/images/speakers/steve-monaghan.png", featured: false, order: 3 },
    { id: "sp-nguyen-duc-binh", name: "Nguyen Duc Binh", title: "Chief Technology Officer", organization: "DNSE Securities", country: "Vietnam", photoUrl: "/images/speakers/nguyen-duc-binh.png", featured: false, order: 4 },
    { id: "sp-kenny-lam", name: "Kenny Lam", title: "CEO", organization: "Two Sigma Asia Pacific", country: "Hong Kong", photoUrl: "/images/speakers/kenny-lam.png", featured: false, order: 5 },
    { id: "sp-jahja-setiaatmadja", name: "Jahja Setiaatmadja", title: "President Director", organization: "Bank Central Asia", country: "Indonesia", photoUrl: "/images/speakers/jahja-setiaatmadja.png", featured: true, order: 6 },
    { id: "sp-dato-sri-khairussaleh", name: "Dato Sri Khairussaleh", title: "President & Group CEO", organization: "Maybank", country: "Malaysia", photoUrl: "/images/speakers/dato-sri-khairussaleh.png", featured: true, order: 7 },
    { id: "sp-damith-pallewatte", name: "Damith Pallewatte", title: "CEO & Managing Director", organization: "Hatton National Bank", country: "Sri Lanka", photoUrl: "/images/speakers/damith-pallewatte.png", featured: true, order: 8 },
    { id: "sp-tessa-dann", name: "Tessa Dann", title: "Head of Sustainable Finance, Asia Pacific", organization: "Societe Generale", country: "Singapore", photoUrl: "/images/speakers/tessa-dann.png", featured: false, order: 9 },
    { id: "sp-luanne-sieh", name: "Luanne Sieh", title: "Group Sustainability Officer", organization: "CIMB", country: "Malaysia", photoUrl: "/images/speakers/luanne-sieh.png", featured: false, order: 10 },
    { id: "sp-guo-peiyuan", name: "Dr. Guo Peiyuan", title: "Chairman", organization: "Syntai Green Finance", country: "China", photoUrl: "/images/speakers/guo-peiyuan.png", featured: false, order: 11 },
    { id: "sp-eugene-wong", name: "Eugene Wong", title: "CEO", organization: "Sustainable Finance Institute Asia", country: "Singapore", photoUrl: "/images/speakers/eugene-wong.png", featured: false, order: 12 },
    { id: "sp-kamran-khan", name: "Kamran Khan", title: "Head of ESG, APAC, MENA & Africa", organization: "Deutsche Bank", country: "Singapore", photoUrl: "/images/speakers/kamran-khan.png", featured: false, order: 13 },
    { id: "sp-reginaldo-cariaso", name: "Reginaldo Cariaso", title: "President & CEO", organization: "Rizal Commercial Banking Corporation", country: "Philippines", photoUrl: "/images/speakers/reginaldo-cariaso.png", featured: true, order: 14 },
    { id: "sp-andeed-ma", name: "Andeed Ma", title: "President", organization: "Risk & Insurance Management Association of Singapore", country: "Singapore", photoUrl: "/images/speakers/andeed-ma.png", featured: false, order: 15 },
    { id: "sp-noppachai", name: "Noppachai Tungsinpulchai", title: "Head of IT Risk Management", organization: "Krung Thai Bank", country: "Thailand", photoUrl: "/images/speakers/noppachai-tungsinpulchai.png", featured: false, order: 16 },
    { id: "sp-kelvin-teo", name: "Kelvin Teo", title: "Co-Founder & Group CEO", organization: "Funding Securities / Modalku", country: "Singapore", photoUrl: "/images/speakers/kelvin-teo.png", featured: false, order: 17 },
    { id: "sp-mayank-nanda", name: "Mayank Nanda", title: "SVP & Head of Market/Credit Risk Analytics", organization: "Numerix", country: "India", photoUrl: "/images/speakers/mayank-nanda.png", featured: false, order: 18 },
    { id: "sp-gaitri-sharma", name: "Gaitri Sharma", title: "Chief Risk Officer, Group Global Banking", organization: "Maybank", country: "Malaysia", photoUrl: "/images/speakers/gaitri-sharma.png", featured: false, order: 19 },
    { id: "sp-thinley-namgyel", name: "Thinley Namgyel", title: "Chairman", organization: "Bank of Bhutan", country: "Bhutan", photoUrl: "/images/speakers/thinley-namgyel.png", featured: true, order: 20 },
    { id: "sp-eli-remolona", name: "Dr. Eli Remolona Jr.", title: "Governor", organization: "Central Bank of the Philippines", country: "Philippines", photoUrl: "/images/speakers/eli-remolona.png", featured: true, order: 21 },
    { id: "sp-gan-kim-yong", name: "Gan Kim Yong", title: "Chairman", organization: "Monetary Authority of Singapore", country: "Singapore", photoUrl: "/images/speakers/gan-kim-yong.png", featured: true, order: 22 },
    { id: "sp-abdul-rasheed", name: "Dato' Sri Abdul Rasheed Ghaffour", title: "Governor", organization: "Bank Negara Malaysia", country: "Malaysia", photoUrl: "/images/speakers/abdul-rasheed-ghaffour.png", featured: true, order: 23 },
    { id: "sp-ahmed-munawar", name: "Ahmed Munawar", title: "Governor", organization: "Maldives Monetary Authority", country: "Maldives", photoUrl: "/images/speakers/ahmed-munawar.png", featured: true, order: 24 },
    { id: "sp-yang-chin-long", name: "Yang Chin-long", title: "Governor", organization: "Central Bank of the Republic of China (Taiwan)", country: "Taiwan", photoUrl: "/images/speakers/yang-chin-long.png", featured: true, order: 25 },
  ];

  for (const speaker of speakers) {
    await prisma.speaker.upsert({
      where: { id: speaker.id },
      update: { name: speaker.name, title: speaker.title, organization: speaker.organization, photoUrl: speaker.photoUrl },
      create: speaker,
    });
  }

  // Seed program days
  const day1 = await prisma.programDay.upsert({
    where: { id: "day-1" },
    update: {},
    create: { id: "day-1", date: new Date("2026-09-01"), title: "Day 1 — Opening & Host Bank", order: 1 },
  });

  const day2 = await prisma.programDay.upsert({
    where: { id: "day-2" },
    update: {},
    create: { id: "day-2", date: new Date("2026-09-02"), title: "Day 2 — 41st ABA General Meeting & Conference", order: 2 },
  });

  const day3 = await prisma.programDay.upsert({
    where: { id: "day-3" },
    update: {},
    create: { id: "day-3", date: new Date("2026-09-03"), title: "Day 3 — Risk, Governance & Farewell", order: 3 },
  });

  // Day 1 sessions
  const day1Sessions = [
    { id: "s1-1", title: "Registration", startTime: "09:00", endTime: "10:00", type: "BREAK" as const, order: 1 },
    { id: "s1-2", title: "Opening Ceremony", startTime: "10:00", endTime: "11:00", type: "CEREMONY" as const, order: 2 },
    { id: "s1-3", title: "Coffee Break", startTime: "11:00", endTime: "11:15", type: "BREAK" as const, order: 3 },
    { id: "s1-4", title: "Host Bank Session — Bank of Maldives", startTime: "11:15", endTime: "12:45", type: "KEYNOTE" as const, order: 4 },
    { id: "s1-5", title: "Lunch", startTime: "12:45", endTime: "14:00", type: "BREAK" as const, order: 5 },
    { id: "s1-6", title: "ABA Policy Advocacy Committee Meeting", startTime: "14:00", endTime: "15:30", type: "PANEL" as const, order: 6 },
    { id: "s1-7", title: "B2B / Networking Session", startTime: "15:30", endTime: "17:30", type: "NETWORKING" as const, order: 7 },
    { id: "s1-8", title: "Welcome Dinner", startTime: "18:30", endTime: "20:00", type: "NETWORKING" as const, order: 8 },
  ];

  for (const session of day1Sessions) {
    await prisma.programSession.upsert({
      where: { id: session.id },
      update: {},
      create: { ...session, dayId: day1.id },
    });
  }

  // Day 2 sessions
  const day2Sessions = [
    { id: "s2-1", title: "Registration", startTime: "09:00", endTime: "10:00", type: "BREAK" as const, order: 1 },
    { id: "s2-2", title: "Plenary Session 1: Digital First for the Digital Era", startTime: "10:00", endTime: "11:30", type: "PANEL" as const, order: 2, description: "Digital transformation, AI, emerging tech, payment revolution, agentic commerce, cross-border payments" },
    { id: "s2-3", title: "Plenary Session 2: Sustainability — Building Resilience", startTime: "11:30", endTime: "13:00", type: "PANEL" as const, order: 3, description: "ESG issues, climate risk management, financing climate adaptation, blue economy, sustainable tourism finance" },
    { id: "s2-4", title: "Lunch & ABA Chairman's Report", startTime: "13:00", endTime: "15:00", type: "BREAK" as const, order: 4 },
    { id: "s2-5", title: "B2B / Networking Session", startTime: "15:00", endTime: "16:30", type: "NETWORKING" as const, order: 5 },
  ];

  for (const session of day2Sessions) {
    await prisma.programSession.upsert({
      where: { id: session.id },
      update: {},
      create: { ...session, dayId: day2.id },
    });
  }

  // Day 3 sessions
  const day3Sessions = [
    { id: "s3-1", title: "Plenary Session 3: Success Through Synergy — Leveraging Technology for Risk", startTime: "09:00", endTime: "10:30", type: "PANEL" as const, order: 1, description: "AI/ML/blockchain/cloud computing for risk management, predictive analytics, responsible AI, governance" },
    { id: "s3-2", title: "Coffee Break", startTime: "10:30", endTime: "10:45", type: "BREAK" as const, order: 2 },
    { id: "s3-3", title: "Plenary Session 4: Governors' Roundtable", startTime: "10:45", endTime: "12:15", type: "PANEL" as const, order: 3, description: "Central bank governors examine regulatory support for bank transformation, financial stability, digital transformation, sustainable finance" },
    { id: "s3-4", title: "Lunch", startTime: "12:30", endTime: "14:00", type: "BREAK" as const, order: 4 },
    { id: "s3-5", title: "Farewell Dinner & Entertainment", startTime: "19:00", endTime: "22:00", type: "NETWORKING" as const, order: 5 },
  ];

  for (const session of day3Sessions) {
    await prisma.programSession.upsert({
      where: { id: session.id },
      update: {},
      create: { ...session, dayId: day3.id },
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
