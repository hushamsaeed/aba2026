import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(
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
    const { speakerIds, ...sessionData } = body;

    // Update session and replace speaker assignments
    const session = await prisma.$transaction(async (tx) => {
      // Delete existing speaker assignments
      await tx.speakerSession.deleteMany({
        where: { sessionId: id },
      });

      // Update session and create new speaker assignments
      return tx.programSession.update({
        where: { id },
        data: {
          title: sessionData.title,
          description: sessionData.description ?? "",
          startTime: sessionData.startTime,
          endTime: sessionData.endTime,
          type: sessionData.type,
          location: sessionData.location ?? "",
          order: sessionData.order ?? 0,
          speakers: {
            create: (speakerIds || []).map((speakerId: string) => ({
              speakerId,
            })),
          },
        },
        include: {
          speakers: { include: { speaker: true } },
        },
      });
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.programSession.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
