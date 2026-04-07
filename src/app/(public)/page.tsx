import { Hero } from "@/components/home/Hero";
import { StatsMarquee } from "@/components/home/StatsMarquee";
import { EventOverview } from "@/components/home/EventOverview";
import { VenuePreview } from "@/components/home/VenuePreview";
import { SponsorsStrip } from "@/components/home/SponsorsStrip";
import { CTABanner } from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsMarquee />
      <EventOverview />
      <VenuePreview />
      <SponsorsStrip />
      <CTABanner />
    </>
  );
}
