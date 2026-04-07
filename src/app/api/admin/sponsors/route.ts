import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";

const sponsorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tier: z.enum(["PLATINUM", "GOLD", "SILVER", "BRONZE", "MEDIA_PARTNER"]),
  logoUrl: z.string().min(1, "Logo URL is required"),
  website: z.string().optional().default(""),
  order: z.number().int().optional().default(0),
  active: z.boolean().optional().default(true),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sponsors = await prisma.sponsor.findMany({
      orderBy: [{ tier: "asc" }, { order: "asc" }],
    });

    return NextResponse.json({ sponsors });
  } catch (error) {
    console.error("Sponsors fetch error:", error);
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
    const parsed = sponsorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const sponsor = await prisma.sponsor.create({
      data: parsed.data,
    });

    return NextResponse.json({ sponsor }, { status: 201 });
  } catch (error) {
    console.error("Sponsor create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
