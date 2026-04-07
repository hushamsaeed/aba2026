import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const images = await prisma.generatedImage.findMany({
      orderBy: { createdAt: "desc" },
    });

    const serialized = images.map((img) => ({
      id: img.id,
      prompt: img.prompt,
      url: img.url,
      filename: img.filename,
      mimeType: img.mimeType,
      createdAt: img.createdAt.toISOString(),
    }));

    return NextResponse.json({ images: serialized });
  } catch (error) {
    console.error("Gemini list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
