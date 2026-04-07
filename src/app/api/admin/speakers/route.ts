import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";

const speakerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  organization: z.string().min(1, "Organization is required"),
  bio: z.string().optional().default(""),
  photoUrl: z.string().optional().default(""),
  country: z.string().optional().default(""),
  featured: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const speakers = await prisma.speaker.findMany({
      orderBy: { order: "asc" },
      include: { sessions: { include: { session: true } } },
    });

    return NextResponse.json({ speakers });
  } catch (error) {
    console.error("Speakers fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = speakerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const speaker = await prisma.speaker.create({
      data: parsed.data,
    });

    return NextResponse.json({ speaker }, { status: 201 });
  } catch (error) {
    console.error("Speaker create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
