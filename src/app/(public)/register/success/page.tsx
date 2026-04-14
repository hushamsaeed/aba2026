import { Metadata } from "next";
import { ButtonPrimary } from "@/components/shared/button-primary";
import { ButtonSecondary } from "@/components/shared/button-secondary";

export const metadata: Metadata = {
  title: "Registration Successful",
};

export default async function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <div className="w-full bg-parchment min-h-[70vh]">
      <div className="max-w-[1440px] mx-auto px-30 py-25 md:px-6 md:py-12 flex flex-col items-center gap-8">
        {/* Success icon */}
        <div className="w-20 h-20 bg-gold/10 flex items-center justify-center">
          <span className="text-gold text-[36px]">✓</span>
        </div>

        <h1 className="font-[family-name:var(--font-heading)] text-[48px] md:text-[32px] font-bold text-text text-center">
          Registration Confirmed
        </h1>

        {ref && (
          <div className="flex flex-col items-center gap-2">
            <span className="font-[family-name:var(--font-body)] text-[13px] text-text-secondary uppercase tracking-[2px]">
              Reference Number
            </span>
            <span className="font-[family-name:var(--font-heading)] text-[28px] font-bold text-navy">
              {ref}
            </span>
          </div>
        )}

        <div className="w-[60px] h-[2px] bg-gold" />

        <div className="flex flex-col items-center gap-4 max-w-[600px]">
          <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary text-center leading-[1.7]">
            Thank you for registering for the 42nd ABA General Meeting &
            Conference. A confirmation email has been sent to your registered
            email address.
          </p>
          <p className="font-[family-name:var(--font-body)] text-[16px] text-text-secondary text-center leading-[1.7]">
            Payment details for bank transfer will be included in the
            confirmation email. Please complete payment within 14 days to secure
            your registration.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mt-4">
          <h3 className="font-[family-name:var(--font-heading)] text-[22px] font-bold text-text">
            What&apos;s Next?
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              "Check your email for the confirmation and payment details",
              "Complete bank transfer payment within 14 days",
              "Receive your delegate kit information closer to the event",
              "Join us in Maldives on September 1-3, 2026!",
            ].map((item) => (
              <li
                key={item}
                className="font-[family-name:var(--font-body)] text-[15px] text-text-secondary flex items-start gap-3"
              >
                <span className="text-gold mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <ButtonPrimary href="/program">VIEW PROGRAM</ButtonPrimary>
          <ButtonSecondary href="/" className="text-navy border-navy hover:bg-navy/5">
            BACK TO HOME
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}
