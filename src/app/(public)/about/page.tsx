import { Metadata } from "next";
import { AboutSection } from "@/components/home/about-section";

export const metadata: Metadata = {
  title: "About ABA & Bank of Maldives",
};

export default function AboutPage() {
  return <AboutSection />;
}
