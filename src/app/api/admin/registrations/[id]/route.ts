import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { RegistrationStatus } from "@/generated/prisma/client";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const registration = await prisma.registration.findUnique({
      where: { id },
      include: {
        delegates: true,
        payment: true,
      },
    });

    if (!registration) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      registration: {
        ...registration,
        totalAmount: registration.totalAmount.toString(),
        payment: registration.payment
          ? {
              ...registration.payment,
              amount: registration.payment.amount.toString(),
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Registration fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

const VALID_STATUSES: RegistrationStatus[] = [
  "PENDING",
  "PAYMENT_SENT",
  "PAID",
  "CONFIRMED",
  "CANCELLED",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body as { status: RegistrationStatus };

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const existing = await prisma.registration.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Registration not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.registration.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      registration: {
        ...updated,
        totalAmount: updated.totalAmount.toString(),
      },
    });
  } catch (error) {
    console.error("Registration update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
