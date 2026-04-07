import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { speakerApplicationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = speakerApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const application = await prisma.speakerApplication.create({
      data: parsed.data,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your speaker application has been submitted successfully.",
        id: application.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Speaker application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
