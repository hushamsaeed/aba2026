import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    const block = await prisma.contentBlock.findUnique({
      where: { slug },
    });

    if (!block) {
      return NextResponse.json(
        { error: "Content block not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ block });
  } catch (error) {
    console.error("Content block fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    const block = await prisma.contentBlock.update({
      where: { slug },
      data: {
        title: body.title,
        body: body.body,
        imageUrl: body.imageUrl ?? null,
        metadata: body.metadata ?? null,
        updatedBy: user.userId,
      },
    });

    return NextResponse.json({ block });
  } catch (error) {
    console.error("Content block update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
