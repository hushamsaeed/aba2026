import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("Contacts fetch error:", error);
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
    const { id, read } = body;

    if (!id || typeof read !== "boolean") {
      return NextResponse.json(
        { error: "Missing id or read status" },
        { status: 400 }
      );
    }

    const contact = await prisma.contactSubmission.update({
      where: { id },
      data: { read },
    });

    return NextResponse.json({ contact });
  } catch (error) {
    console.error("Contact update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
