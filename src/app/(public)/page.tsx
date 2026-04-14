import { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";

export const metadata: Metadata = {
  title: "42nd ABA General Meeting & Conference | Maldives 2026",
  description:
    "Banking in Asia: Investing to Build Resilience. Join 500+ banking leaders at Kurumba Maldives, September 1-3, 2026. Hosted by Bank of Maldives.",
};
import { ChairmanMessage } from "@/components/home/chairman-message";
import { VenueSection } from "@/components/home/venue-section";
import { ProgramPreview } from "@/components/home/program-preview";
import { SponsorshipSection } from "@/components/home/sponsorship-section";
import { RegistrationSection } from "@/components/home/registration-section";
import { AboutSection } from "@/components/home/about-section";
import { AnimatedHomepage } from "@/components/home/animated-homepage";

export default function HomePage() {
  return (
    <AnimatedHomepage>
      <HeroSection />
      <ChairmanMessage />
      <VenueSection />
      <ProgramPreview />
      <SponsorshipSection />
      <RegistrationSection />
      <AboutSection />
    </AnimatedHomepage>
  );
}
