import Link from "next/link";
import { CheckCircle2, Home, Mail, FileText, ArrowUpRight } from "lucide-react";

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
      <section className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[800px] mx-auto text-center">
          {/* Animated Check Icon */}
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center bg-aba-gold/10 animate-in zoom-in duration-500">
            <div className="flex h-16 w-16 items-center justify-center bg-aba-gold/20">
              <CheckCircle2 className="h-10 w-10 text-aba-gold" />
            </div>
          </div>

          <p className="text-editorial text-aba-gold mb-4">Confirmed</p>
          <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-white">
            Registration Successful
          </h1>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            Thank you for registering for the 42nd ABA General Meeting &amp;
            Conference
          </p>
        </div>
      </section>

      <section className="relative py-12 md:py-16 bg-dark-surface">
        <div className="absolute inset-0 noise-overlay" />
        <div className="relative z-10 w-[90%] max-w-[640px] mx-auto">
          {/* Reference Number Card */}
          {referenceNumber && (
            <div className="bg-dark-card border border-white/10 p-6 md:p-8 text-center mb-8">
              <p className="text-sm text-white/40 mb-2">
                Your Reference Number
              </p>
              <p className="text-2xl md:text-3xl font-mono font-bold gradient-gold-text tracking-wider">
                {referenceNumber}
              </p>
              <p className="mt-2 text-xs text-white/40">
                Please save this number for your records
              </p>
            </div>
          )}

          {/* Info Cards */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-dark-card border border-white/10 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-aba-gold/10">
                <Mail className="h-5 w-5 text-aba-gold" />
              </div>
              <div>
                <h3 className="font-medium text-white">
                  Confirmation Email
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  You will receive a confirmation email shortly with a summary of
                  your registration details. Please check your inbox and spam
                  folder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-dark-card border border-white/10 p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-aba-gold/10">
                <FileText className="h-5 w-5 text-aba-gold" />
              </div>
              <div>
                <h3 className="font-medium text-white">
                  Payment Instructions
                </h3>
                <p className="mt-1 text-sm text-white/50">
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
              className="btn-sharp gradient-gold inline-flex h-11 items-center justify-center gap-2 px-6 text-sm font-medium text-white"
            >
              <Home className="h-4 w-4" />
              Back to Homepage
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="btn-sharp inline-flex h-11 items-center justify-center gap-2 border border-white/10 bg-dark-card px-6 text-sm font-medium text-white transition-colors hover:border-aba-gold/40"
            >
              <Mail className="h-4 w-4" />
              Contact Support
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
