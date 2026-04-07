import Link from "next/link";
import { IslamicPattern } from "@/components/shared/IslamicPattern";
import { CheckCircle2, Home, Mail, FileText } from "lucide-react";

interface SuccessPageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function RegistrationSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;
  const referenceNumber = params.ref;

  return (
    <>
      <section className="relative bg-deep-blue py-20 md:py-28 overflow-hidden">
        <IslamicPattern color="#bf9436" opacity={0.06} />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Check Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 animate-in zoom-in duration-500">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/30">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Registration Successful
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
            Thank you for registering for the 42nd ABA General Meeting &amp;
            Conference
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-coral-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Reference Number Card */}
          {referenceNumber && (
            <div className="rounded-xl bg-white ring-1 ring-foreground/10 p-6 md:p-8 text-center mb-8">
              <p className="text-sm text-muted-foreground mb-2">
                Your Reference Number
              </p>
              <p className="text-2xl md:text-3xl font-mono font-bold text-deep-blue tracking-wider">
                {referenceNumber}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Please save this number for your records
              </p>
            </div>
          )}

          {/* Info Cards */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl bg-white ring-1 ring-foreground/10 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ocean-teal/10">
                <Mail className="h-5 w-5 text-ocean-teal" />
              </div>
              <div>
                <h3 className="font-medium text-deep-blue">
                  Confirmation Email
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  You will receive a confirmation email shortly with a summary of
                  your registration details. Please check your inbox and spam
                  folder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-white ring-1 ring-foreground/10 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-aba-gold/10">
                <FileText className="h-5 w-5 text-aba-gold" />
              </div>
              <div>
                <h3 className="font-medium text-deep-blue">
                  Payment Instructions
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Payment instructions will be sent to your email. Your
                  registration will be confirmed upon receipt of payment. For bank
                  transfer details, please refer to the email or contact us.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-deep-blue px-6 text-sm font-medium text-white transition-colors hover:bg-deep-blue/90"
            >
              <Home className="h-4 w-4" />
              Back to Homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-deep-blue/20 bg-white px-6 text-sm font-medium text-deep-blue transition-colors hover:bg-deep-blue/5"
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
