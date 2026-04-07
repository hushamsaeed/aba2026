import type { Metadata } from "next";
import { Space_Mono, Sora } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
    "fintech",
    "banking",
    "2026",
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
      className={`${spaceMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
