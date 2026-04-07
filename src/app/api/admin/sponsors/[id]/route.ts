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

    const sponsor = await prisma.sponsor.update({
      where: { id },
      data: {
        name: body.name,
        tier: body.tier,
        logoUrl: body.logoUrl,
        website: body.website ?? "",
        order: body.order ?? 0,
        active: body.active ?? true,
      },
    });

    return NextResponse.json({ sponsor });
  } catch (error) {
    console.error("Sponsor update error:", error);
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

    await prisma.sponsor.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sponsor delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
