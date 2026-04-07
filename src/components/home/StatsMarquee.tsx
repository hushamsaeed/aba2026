"use client";

import { Building2, Users, Globe, Mic2, Calendar, Landmark } from "lucide-react";

const stats = [
  { icon: Globe, value: "30+", label: "Countries" },
  { icon: Users, value: "500+", label: "Delegates" },
  { icon: Mic2, value: "40+", label: "Speakers" },
  { icon: Calendar, value: "4", label: "Plenary Sessions" },
  { icon: Building2, value: "100+", label: "Institutions" },
  { icon: Landmark, value: "3", label: "Days" },
];

export function StatsMarquee() {
  return (
    <section className="bg-coral-white py-8 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <stat.icon className="h-6 w-6 text-aba-gold mb-2" />
              <span className="text-2xl md:text-3xl font-heading font-bold text-deep-blue">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
