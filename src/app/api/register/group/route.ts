import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { groupRegistrationSchema } from "@/lib/validations";
import { getPricingConfig, calculateFee } from "@/lib/pricing";
import { sendEmail, registrationConfirmationEmail } from "@/lib/email";

function generateReferenceNumber(): string {
  const prefix = "ABA42G";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// GET handler to return pricing info for the client form
export async function GET() {
  try {
    const config = await getPricingConfig();
    const { earlyBird } = calculateFee(config, "MEMBER", "GROUP", 1);

    return NextResponse.json({
      memberGroup: config.memberGroup,
      memberGroupEarlyBird: config.memberGroupEarlyBird,
      nonMemberGroup: config.nonMemberGroup,
      nonMemberGroupEarlyBird: config.nonMemberGroupEarlyBird,
      earlyBirdDeadline: config.earlyBirdDeadline,
      currency: config.currency,
      earlyBird,
      groupMinimum: config.groupMinimum,
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
    const parsed = groupRegistrationSchema.safeParse(body);
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

    // Load config and validate delegate count
    const config = await getPricingConfig();

    if (data.delegates.length < config.groupMinimum) {
      return NextResponse.json(
        {
          error: `Group registration requires a minimum of ${config.groupMinimum} delegates. You submitted ${data.delegates.length}.`,
        },
        { status: 400 }
      );
    }

    // Calculate fee
    const delegateCount = data.delegates.length;
    const fee = calculateFee(
      config,
      data.membershipType,
      "GROUP",
      delegateCount
    );
    const referenceNumber = generateReferenceNumber();

    // Create registration, delegates, and payment in a transaction
    const registration = await prisma.$transaction(async (tx) => {
      const reg = await tx.registration.create({
        data: {
          referenceNumber,
          type: "GROUP",
          status: "PENDING",
          organizationName: data.organizationName,
          organizationUrl: data.organizationUrl || null,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone || null,
          country: data.country || null,
          membershipType: data.membershipType,
          totalAmount: fee.total,
          currency: config.currency,
          earlyBird: fee.earlyBird,
          delegates: {
            create: data.delegates.map((d) => ({
              salutation: d.salutation || null,
              firstName: d.firstName,
              middleName: d.middleName || null,
              lastName: d.lastName,
              email: d.email,
              phone: d.phone || null,
              jobTitle: d.jobTitle || null,
              organization: data.organizationName,
              country: d.country || data.country || null,
              dietaryRequirements: d.dietaryRequirements || null,
              specialRequests: d.specialRequests || null,
            })),
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
      type: "Group",
      membershipType:
        data.membershipType === "MEMBER" ? "ABA Member" : "Non-Member",
      totalAmount: fee.total,
      currency: config.currency,
      delegateCount,
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
    console.error("Group registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
