import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        registration: {
          select: {
            referenceNumber: true,
            contactName: true,
            contactEmail: true,
          },
        },
      },
    });

    return NextResponse.json({ payments });
  } catch (error) {
    console.error("Payments fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    if (!["PENDING", "COMPLETED", "FAILED", "REFUNDED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = { status };

    if (status === "COMPLETED") {
      updateData.paidAt = new Date();
    }

    const payment = await prisma.payment.update({
      where: { id },
      data: updateData,
      include: {
        registration: {
          select: {
            referenceNumber: true,
            contactName: true,
            contactEmail: true,
          },
        },
      },
    });

    // Also update registration status if payment completed
    if (status === "COMPLETED") {
      await prisma.registration.update({
        where: { id: payment.registrationId },
        data: { status: "PAID" },
      });
    }

    return NextResponse.json({ payment });
  } catch (error) {
    console.error("Payment update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
