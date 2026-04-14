import { HeroSection } from "@/components/home/hero-section";
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
