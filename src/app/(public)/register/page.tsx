export const dynamic = "force-dynamic";

import Link from "next/link";
import { getPricingConfig, isEarlyBird } from "@/lib/pricing";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { CheckCircle2, Clock, Users, User, HelpCircle, Mail } from "lucide-react";

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
      <section className="relative bg-deep-blue py-20 md:py-28 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.06} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Register
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Secure your place at the 42nd ABA General Meeting &amp; Conference
          </p>
          <div className="mt-4 h-1 w-20 rounded-full bg-aba-gold mx-auto" />
        </div>
      </section>

      {/* Early Bird Banner */}
      {earlyBird && (
        <div className="bg-aba-gold/10 border-b border-aba-gold/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center gap-3 text-center">
            <Clock className="h-5 w-5 text-aba-gold shrink-0" />
            <p className="text-deep-blue font-medium">
              <span className="font-bold">Early Bird Discount</span> — Register
              before{" "}
              <span className="text-bml-red font-bold">
                {formatDate(config.earlyBirdDeadline)}
              </span>{" "}
              and save on registration fees!
            </p>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-coral-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Registration Fees"
            subtitle="Choose the registration category that suits you best"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingCards.map((card) => {
              const Icon = card.icon;
              const displayPrice = earlyBird
                ? card.earlyBirdPrice
                : card.regularPrice;

              return (
                <Card
                  key={card.title}
                  className={`relative flex flex-col ${
                    card.highlight
                      ? "ring-2 ring-aba-gold/50 shadow-lg"
                      : ""
                  }`}
                >
                  {card.highlight && earlyBird && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-aba-gold text-white px-3 py-1 text-xs">
                        Best Value
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-deep-blue/5">
                      <Icon className="h-6 w-6 text-deep-blue" />
                    </div>
                    <CardTitle className="text-lg text-deep-blue">
                      {card.title}
                    </CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 text-center">
                    <div className="mb-4">
                      {earlyBird && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatCurrency(card.regularPrice, config.currency)}
                        </p>
                      )}
                      <p className="text-3xl font-bold text-deep-blue">
                        {formatCurrency(displayPrice, config.currency)}
                      </p>
                      {card.perPerson && (
                        <p className="text-xs text-muted-foreground mt-1">
                          per person &middot; minimum {config.groupMinimum}{" "}
                          delegates
                        </p>
                      )}
                      {earlyBird && (
                        <Badge
                          variant="secondary"
                          className="mt-2 bg-green-50 text-green-700 text-xs"
                        >
                          Save{" "}
                          {formatCurrency(
                            card.regularPrice - card.earlyBirdPrice,
                            config.currency
                          )}
                        </Badge>
                      )}
                    </div>
                    <ul className="space-y-2 text-left text-sm text-muted-foreground">
                      {INCLUDED_FEATURES.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-ocean-teal shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-center border-t-0 bg-transparent pt-2">
                    <Link
                      href={`/register/${card.type}`}
                      className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-bml-red px-6 text-sm font-medium text-white transition-colors hover:bg-bml-red/90 focus-visible:ring-2 focus-visible:ring-bml-red/50 focus-visible:outline-none"
                    >
                      {card.type === "individual"
                        ? "Register as Individual"
                        : "Register as Group"}
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fee Structure Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Complete Fee Structure"
            subtitle="All fees are quoted in US Dollars (USD)"
          />

          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-deep-blue">
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
                <TableRow>
                  <TableCell className="font-medium">
                    Individual — Member
                  </TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {formatCurrency(
                      config.memberIndividualEarlyBird,
                      config.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(config.memberIndividual, config.currency)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Individual — Non-Member
                  </TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {formatCurrency(
                      config.nonMemberIndividualEarlyBird,
                      config.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(
                      config.nonMemberIndividual,
                      config.currency
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Group — Member
                    <span className="text-xs text-muted-foreground ml-2">
                      (per person)
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {formatCurrency(
                      config.memberGroupEarlyBird,
                      config.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(config.memberGroup, config.currency)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Group — Non-Member
                    <span className="text-xs text-muted-foreground ml-2">
                      (per person)
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-green-700 font-medium">
                    {formatCurrency(
                      config.nonMemberGroupEarlyBird,
                      config.currency
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(config.nonMemberGroup, config.currency)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {earlyBird && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Early bird rates are available until{" "}
              <span className="font-semibold text-deep-blue">
                {formatDate(config.earlyBirdDeadline)}
              </span>
              . Group registrations require a minimum of{" "}
              <span className="font-semibold">{config.groupMinimum}</span>{" "}
              delegates.
            </p>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 md:py-20 bg-sand">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-6 w-6 text-aba-gold" />
            <h3 className="font-heading text-2xl font-bold text-deep-blue">
              Have Questions?
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            If you need assistance with registration or have any questions about
            the conference, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-deep-blue px-6 text-sm font-medium text-white transition-colors hover:bg-deep-blue/90"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
            </Link>
            <Link
              href="/faq"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-deep-blue/20 bg-white px-6 text-sm font-medium text-deep-blue transition-colors hover:bg-deep-blue/5"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
