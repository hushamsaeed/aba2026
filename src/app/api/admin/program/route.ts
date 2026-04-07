import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";

const sessionSchema = z.object({
  dayId: z.string().min(1, "Day is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  type: z.enum([
    "KEYNOTE",
    "PANEL",
    "WORKSHOP",
    "BREAK",
    "NETWORKING",
    "CEREMONY",
    "ACTIVITY",
    "EXCURSION",
  ]),
  location: z.string().optional().default(""),
  order: z.number().int().optional().default(0),
  speakerIds: z.array(z.string()).optional().default([]),
});

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const days = await prisma.programDay.findMany({
      orderBy: { order: "asc" },
      include: {
        sessions: {
          orderBy: { order: "asc" },
          include: {
            speakers: {
              include: { speaker: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ days });
  } catch (error) {
    console.error("Program fetch error:", error);
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
    const parsed = sessionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { speakerIds, ...sessionData } = parsed.data;

    const session = await prisma.programSession.create({
      data: {
        ...sessionData,
        speakers: {
          create: speakerIds.map((speakerId) => ({
            speakerId,
          })),
        },
      },
      include: {
        speakers: { include: { speaker: true } },
      },
    });

    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error("Session create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
