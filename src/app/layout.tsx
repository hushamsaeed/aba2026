import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "42nd ABA General Meeting & Conference | Maldives 2026",
    template: "%s | 42nd ABA Conference",
  },
  description:
    "Banking in Asia: Investing to Build Resilience. September 1-3, 2026 at Kurumba Resort, Maldives. Hosted by Bank of Maldives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Minimal root layout — Payload (payload) group provides its own html/body.
  // Public (public) group provides its own html/body with fonts + globals.css.
  return children;
}
