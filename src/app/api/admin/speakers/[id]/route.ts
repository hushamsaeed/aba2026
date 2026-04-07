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

    const speaker = await prisma.speaker.update({
      where: { id },
      data: {
        name: body.name,
        title: body.title,
        organization: body.organization,
        bio: body.bio ?? "",
        photoUrl: body.photoUrl ?? "",
        country: body.country ?? "",
        featured: body.featured ?? false,
        order: body.order ?? 0,
      },
    });

    return NextResponse.json({ speaker });
  } catch (error) {
    console.error("Speaker update error:", error);
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

    await prisma.speaker.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Speaker delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
