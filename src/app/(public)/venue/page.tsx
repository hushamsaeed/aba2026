import { Metadata } from "next";
import { VenueSection } from "@/components/home/venue-section";

export const metadata: Metadata = {
  title: "Venue & Accommodation",
};

export default function VenuePage() {
  return <VenueSection />;
}
