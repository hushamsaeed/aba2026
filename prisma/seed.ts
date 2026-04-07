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

  // Seed sample program days
  const day1 = await prisma.programDay.upsert({
    where: { id: "day-1" },
    update: {},
    create: { id: "day-1", date: new Date("2026-09-01"), title: "Day 1 — Opening & Plenary Sessions", order: 1 },
  });

  const day2 = await prisma.programDay.upsert({
    where: { id: "day-2" },
    update: {},
    create: { id: "day-2", date: new Date("2026-09-02"), title: "Day 2 — Plenary Sessions & General Meeting", order: 2 },
  });

  const day3 = await prisma.programDay.upsert({
    where: { id: "day-3" },
    update: {},
    create: { id: "day-3", date: new Date("2026-09-03"), title: "Day 3 — Activities & Excursions", order: 3 },
  });

  // Seed sample sessions for Day 1
  const day1Sessions = [
    { id: "s1-1", title: "Registration & Welcome Coffee", startTime: "08:00", endTime: "09:00", type: "BREAK" as const, order: 1 },
    { id: "s1-2", title: "Opening Ceremony", startTime: "09:00", endTime: "09:45", type: "CEREMONY" as const, order: 2, description: "Welcome address by the Host Bank and ABA Chairman" },
    { id: "s1-3", title: "Keynote Address", startTime: "09:45", endTime: "10:30", type: "KEYNOTE" as const, order: 3, description: "Banking in Asia: Investing to Build Resilience" },
    { id: "s1-4", title: "Coffee Break", startTime: "10:30", endTime: "11:00", type: "BREAK" as const, order: 4 },
    { id: "s1-5", title: "Plenary Session 1: Digital Transformation in Banking", startTime: "11:00", endTime: "12:30", type: "PANEL" as const, order: 5 },
    { id: "s1-6", title: "Networking Lunch", startTime: "12:30", endTime: "14:00", type: "BREAK" as const, order: 6 },
    { id: "s1-7", title: "Plenary Session 2: Sustainable Finance & ESG", startTime: "14:00", endTime: "15:30", type: "PANEL" as const, order: 7 },
    { id: "s1-8", title: "Welcome Dinner & Cultural Performance", startTime: "19:00", endTime: "22:00", type: "NETWORKING" as const, order: 8 },
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
    { id: "s2-1", title: "Morning Coffee", startTime: "08:30", endTime: "09:00", type: "BREAK" as const, order: 1 },
    { id: "s2-2", title: "Plenary Session 3: Risk Management & Resilience", startTime: "09:00", endTime: "10:30", type: "PANEL" as const, order: 2 },
    { id: "s2-3", title: "Coffee Break", startTime: "10:30", endTime: "11:00", type: "BREAK" as const, order: 3 },
    { id: "s2-4", title: "Plenary Session 4: Future of Banking in Asia", startTime: "11:00", endTime: "12:30", type: "PANEL" as const, order: 4 },
    { id: "s2-5", title: "Networking Lunch", startTime: "12:30", endTime: "14:00", type: "BREAK" as const, order: 5 },
    { id: "s2-6", title: "ABA General Meeting", startTime: "14:00", endTime: "16:00", type: "CEREMONY" as const, order: 6, description: "Annual General Meeting of the Asian Bankers Association" },
    { id: "s2-7", title: "Gala Dinner", startTime: "19:00", endTime: "22:00", type: "NETWORKING" as const, order: 7 },
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
    { id: "s3-1", title: "Island Excursion & Snorkeling", startTime: "09:00", endTime: "12:00", type: "EXCURSION" as const, order: 1, description: "Guided tour of nearby islands with snorkeling" },
    { id: "s3-2", title: "Lunch at Resort", startTime: "12:00", endTime: "13:30", type: "BREAK" as const, order: 2 },
    { id: "s3-3", title: "Cultural Workshop — Maldivian Lacquerwork", startTime: "14:00", endTime: "15:30", type: "ACTIVITY" as const, order: 3 },
    { id: "s3-4", title: "Farewell Reception", startTime: "17:00", endTime: "19:00", type: "NETWORKING" as const, order: 4 },
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
