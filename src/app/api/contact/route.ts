import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: parsed.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        id: submission.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
