import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "42nd ABA General Meeting & Conference | Maldives 2026",
    template: "%s | 42nd ABA Conference",
  },
  description:
    "Banking in Asia: Investing to Build Resilience. September 1-3, 2026 at Kurumba Resort, Maldives. Hosted by Bank of Maldives.",
  keywords: [
    "ABA",
    "Asian Bankers Association",
    "banking conference",
    "Maldives",
    "Bank of Maldives",
    "banking",
    "2026",
    "Kurumba",
  ],
  openGraph: {
    title: "42nd ABA General Meeting & Conference",
    description:
      "Banking in Asia: Investing to Build Resilience. September 1-3, 2026, Kurumba Resort, Maldives.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment text-text font-[family-name:var(--font-body)]">
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
