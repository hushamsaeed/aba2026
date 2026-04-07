export const dynamic = "force-dynamic";

import Link from "next/link";
import { getPricingConfig, isEarlyBird } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CheckCircle2, Clock, Users, User, HelpCircle, Mail, ArrowUpRight } from "lucide-react";

function formatCurrency(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const INCLUDED_FEATURES = [
  "Full conference access (3 days)",
  "Welcome reception & gala dinner",
  "Conference materials & delegate kit",
  "Networking sessions & coffee breaks",
  "Certificate of attendance",
];

export default async function RegisterPage() {
  const config = await getPricingConfig();
  const earlyBird = isEarlyBird(config.earlyBirdDeadline);

  const pricingCards = [
    {
      title: "Individual Member",
      description: "ABA member banks & institutions",
      regularPrice: config.memberIndividual,
      earlyBirdPrice: config.memberIndividualEarlyBird,
      type: "individual" as const,
      icon: User,
      highlight: true,
    },
    {
      title: "Individual Non-Member",
      description: "Non-member participants",
      regularPrice: config.nonMemberIndividual,
      earlyBirdPrice: config.nonMemberIndividualEarlyBird,
      type: "individual" as const,
      icon: User,
      highlight: false,
    },
    {
      title: "Group Member",
      description: `ABA member group (min. ${config.groupMinimum} delegates)`,
      regularPrice: config.memberGroup,
      earlyBirdPrice: config.memberGroupEarlyBird,
      type: "group" as const,
      icon: Users,
      highlight: true,
      perPerson: true,
    },
    {
      title: "Group Non-Member",
      description: `Non-member group (min. ${config.groupMinimum} delegates)`,
      regularPrice: config.nonMemberGroup,
      earlyBirdPrice: config.nonMemberGroupEarlyBird,
      type: "group" as const,
      icon: Users,
      highlight: false,
      perPerson: true,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto text-center">
          <p className="text-editorial text-aba-gold mb-4">Registration</p>
          <h1 className="text-display text-4xl md:text-6xl lg:text-7xl text-white">
            Register
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/50 max-w-2xl mx-auto">
            Secure your place at the 42nd ABA General Meeting &amp; Conference
          </p>
        </div>
      </section>

      {/* Early Bird Banner */}
      {earlyBird && (
        <div className="bg-dark-surface border-b border-white/10">
          <div className="w-[90%] max-w-[1640px] mx-auto py-4 flex items-center justify-center gap-3 text-center">
            <Clock className="h-5 w-5 text-aba-gold shrink-0" />
            <p className="text-white/50 font-medium">
              <span className="font-bold text-white">Early Bird Discount</span> — Register
              before{" "}
              <span className="text-aba-gold font-bold">
                {formatDate(config.earlyBirdDeadline)}
              </span>{" "}
              and save on registration fees!
            </p>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <section className="relative py-16 md:py-24 bg-dark-surface">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1640px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4 text-center">Pricing</p>
          <h2 className="text-display text-3xl md:text-5xl text-white text-center mb-4">
            Registration Fees
          </h2>
          <p className="text-white/50 text-center mb-12">
            Choose the registration category that suits you best
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingCards.map((card) => {
              const Icon = card.icon;
              const displayPrice = earlyBird
                ? card.earlyBirdPrice
                : card.regularPrice;

              return (
                <div
                  key={card.title}
                  className={`relative flex flex-col bg-dark-card border border-white/10 ${
                    card.highlight
                      ? "border-aba-gold/40"
                      : ""
                  }`}
                >
                  {card.highlight && earlyBird && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="gradient-red text-white px-3 py-1 text-xs font-medium uppercase tracking-wider">
                        Best Value
                      </span>
                    </div>
                  )}
                  <div className="text-center p-6 pb-2">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center bg-white/5">
                      <Icon className="h-6 w-6 text-aba-gold" />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/40 mt-1">{card.description}</p>
                  </div>
                  <div className="flex-1 text-center px-6">
                    <div className="mb-4">
                      {earlyBird && (
                        <p className="text-sm text-white/40 line-through">
                          {formatCurrency(card.regularPrice, config.currency)}
                        </p>
                      )}
                      <p className="text-3xl font-bold gradient-gold-text">
                        {formatCurrency(displayPrice, config.currency)}
                      </p>
                      {card.perPerson && (
                        <p className="text-xs text-white/40 mt-1">
                          per person &middot; minimum {config.groupMinimum}{" "}
                          delegates
                        </p>
                      )}
                      {earlyBird && (
                        <span className="inline-block mt-2 gradient-red text-white text-xs px-2 py-0.5 font-medium">
                          Save{" "}
                          {formatCurrency(
                            card.regularPrice - card.earlyBirdPrice,
                            config.currency
                          )}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-2 text-left text-sm text-white/50">
                      {INCLUDED_FEATURES.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-aba-gold shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 pt-4">
                    <Link
                      href={`/register/${card.type}`}
                      className="btn-sharp gradient-gold inline-flex h-10 w-full items-center justify-center px-6 text-sm font-medium text-white transition-colors"
                    >
                      {card.type === "individual"
                        ? "Register as Individual"
                        : "Register as Group"}
                      <ArrowUpRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fee Structure Table */}
      <section className="relative py-16 md:py-24 bg-black">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[1000px] mx-auto">
          <p className="text-editorial text-aba-gold mb-4 text-center">Details</p>
          <h2 className="text-display text-3xl md:text-5xl text-white text-center mb-4">
            Complete Fee Structure
          </h2>
          <p className="text-white/50 text-center mb-12">
            All fees are quoted in US Dollars (USD)
          </p>

          <div className="border border-white/10 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-dark-card border-b border-white/10">
                  <TableHead className="text-white font-semibold">
                    Category
                  </TableHead>
                  <TableHead className="text-white font-semibold text-right">
                    Early Bird Rate
                  </TableHead>
                  <TableHead className="text-white font-semibold text-right">
                    Standard Rate
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-b border-white/10">
                  <TableCell className="font-medium text-white">
                    Individual — Member
                  </TableCell>
                  <TableCell className="text-right text-aba-gold font-medium">
                    {formatCurrency(
                      config.memberIndividualEarlyBird,
                      config.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right text-white/50">
                    {formatCurrency(config.memberIndividual, config.currency)}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-white/10">
                  <TableCell className="font-medium text-white">
                    Individual — Non-Member
                  </TableCell>
                  <TableCell className="text-right text-aba-gold font-medium">
                    {formatCurrency(
                      config.nonMemberIndividualEarlyBird,
                      config.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right text-white/50">
                    {formatCurrency(
                      config.nonMemberIndividual,
                      config.currency
                    )}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-white/10">
                  <TableCell className="font-medium text-white">
                    Group — Member
                    <span className="text-xs text-white/40 ml-2">
                      (per person)
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-aba-gold font-medium">
                    {formatCurrency(
                      config.memberGroupEarlyBird,
                      config.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right text-white/50">
                    {formatCurrency(config.memberGroup, config.currency)}
                  </TableCell>
                </TableRow>
                <TableRow className="border-b border-white/10">
                  <TableCell className="font-medium text-white">
                    Group — Non-Member
                    <span className="text-xs text-white/40 ml-2">
                      (per person)
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-aba-gold font-medium">
                    {formatCurrency(
                      config.nonMemberGroupEarlyBird,
                      config.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right text-white/50">
                    {formatCurrency(config.nonMemberGroup, config.currency)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {earlyBird && (
            <p className="mt-4 text-center text-sm text-white/40">
              Early bird rates are available until{" "}
              <span className="font-semibold text-aba-gold">
                {formatDate(config.earlyBirdDeadline)}
              </span>
              . Group registrations require a minimum of{" "}
              <span className="font-semibold text-white">{config.groupMinimum}</span>{" "}
              delegates.
            </p>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="relative py-16 md:py-20 bg-dark-surface">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[800px] mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-6 w-6 text-aba-gold" />
            <h3 className="text-display text-2xl text-white">
              Have Questions?
            </h3>
          </div>
          <p className="text-white/50 mb-6">
            If you need assistance with registration or have any questions about
            the conference, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-sharp gradient-gold inline-flex h-10 items-center justify-center px-6 text-sm font-medium text-white"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Link>
            <Link
              href="/faq"
              className="btn-sharp inline-flex h-10 items-center justify-center border border-white/10 bg-dark-card px-6 text-sm font-medium text-white transition-colors hover:border-aba-gold/40"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              View FAQ
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
