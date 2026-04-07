"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

export function SponsorsStrip() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Sponsors"
          subtitle="Join leading organizations supporting the future of banking in Asia"
        />

        {/* Placeholder for sponsor logos — populated from DB */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-8">
          <div className="text-muted-foreground/50 text-sm text-center">
            Sponsorship opportunities available
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/get-involved">
            <Button
              variant="outline"
              className="border-aba-gold text-aba-gold hover:bg-aba-gold hover:text-white rounded-full px-8"
            >
              Become a Sponsor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
