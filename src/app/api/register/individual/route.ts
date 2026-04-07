import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { individualRegistrationSchema } from "@/lib/validations";
import { getPricingConfig, calculateFee } from "@/lib/pricing";
import { sendEmail, registrationConfirmationEmail } from "@/lib/email";

function generateReferenceNumber(): string {
  const prefix = "ABA42";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// GET handler to return pricing info for the client form
export async function GET() {
  try {
    const config = await getPricingConfig();
    const { earlyBird } = calculateFee(config, "MEMBER", "INDIVIDUAL", 1);

    return NextResponse.json({
      memberIndividual: config.memberIndividual,
      memberIndividualEarlyBird: config.memberIndividualEarlyBird,
      nonMemberIndividual: config.nonMemberIndividual,
      nonMemberIndividualEarlyBird: config.nonMemberIndividualEarlyBird,
      earlyBirdDeadline: config.earlyBirdDeadline,
      currency: config.currency,
      earlyBird,
    });
  } catch (error) {
    console.error("Failed to fetch pricing:", error);
    return NextResponse.json(
      { error: "Failed to load pricing information" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const parsed = individualRegistrationSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        {
          error: firstError?.message || "Invalid registration data",
          errors: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Calculate fee
    const config = await getPricingConfig();
    const fee = calculateFee(config, data.membershipType, "INDIVIDUAL", 1);
    const referenceNumber = generateReferenceNumber();

    // Create registration, delegate, and payment in a transaction
    const registration = await prisma.$transaction(async (tx) => {
      const reg = await tx.registration.create({
        data: {
          referenceNumber,
          type: "INDIVIDUAL",
          status: "PENDING",
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone || null,
          country: data.country || null,
          membershipType: data.membershipType,
          totalAmount: fee.total,
          currency: config.currency,
          earlyBird: fee.earlyBird,
          delegates: {
            create: {
              salutation: data.delegate.salutation || null,
              firstName: data.delegate.firstName,
              middleName: data.delegate.middleName || null,
              lastName: data.delegate.lastName,
              email: data.delegate.email,
              phone: data.delegate.phone || null,
              jobTitle: data.delegate.jobTitle || null,
              organization: data.delegate.organization || null,
              country: data.delegate.country || null,
              dietaryRequirements: data.delegate.dietaryRequirements || null,
              specialRequests: data.delegate.specialRequests || null,
            },
          },
          payment: {
            create: {
              method: "PAYMENT_LINK",
              status: "PENDING",
              amount: fee.total,
              currency: config.currency,
            },
          },
        },
      });

      return reg;
    });

    // Send confirmation email (non-blocking)
    const emailContent = registrationConfirmationEmail({
      name: data.contactName,
      referenceNumber,
      type: "Individual",
      membershipType: data.membershipType === "MEMBER" ? "ABA Member" : "Non-Member",
      totalAmount: fee.total,
      currency: config.currency,
      delegateCount: 1,
    });

    sendEmail({
      to: data.contactEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    }).catch((err) => {
      console.error("Failed to send confirmation email:", err);
    });

    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        registrationId: registration.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Individual registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
