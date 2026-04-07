import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const configs = await prisma.siteConfig.findMany({
      orderBy: [{ group: "asc" }, { key: "asc" }],
    });

    return NextResponse.json({ configs });
  } catch (error) {
    console.error("Settings fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only ADMIN and SUPER_ADMIN can update settings
    if (user.role === "EDITOR") {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { updates } = body as {
      updates: Array<{ key: string; value: string }>;
    };

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        { error: "No updates provided" },
        { status: 400 }
      );
    }

    // Validate all updates have required fields
    for (const update of updates) {
      if (!update.key || typeof update.value !== "string") {
        return NextResponse.json(
          { error: `Invalid update for key: ${update.key}` },
          { status: 400 }
        );
      }
    }

    // Update all configs in a transaction
    await prisma.$transaction(
      updates.map((update) =>
        prisma.siteConfig.update({
          where: { key: update.key },
          data: { value: update.value },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
