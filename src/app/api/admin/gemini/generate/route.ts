import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { generateImage } from "@/lib/gemini";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { prompt } = body as { prompt: string };

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await generateImage(prompt.trim());

    if (!result.success || !result.imageData) {
      return NextResponse.json(
        { error: result.error || "Failed to generate image" },
        { status: 500 }
      );
    }

    // Save image file to /public/generated/
    const ext = result.mimeType === "image/jpeg" ? "jpg" : "png";
    const filename = `gemini-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const dir = path.join(process.cwd(), "public", "generated");

    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, filename);
    const buffer = Buffer.from(result.imageData, "base64");
    await writeFile(filePath, buffer);

    const url = `/generated/${filename}`;

    // Create DB record
    const image = await prisma.generatedImage.create({
      data: {
        prompt: prompt.trim(),
        url,
        filename,
        mimeType: result.mimeType || "image/png",
      },
    });

    return NextResponse.json({ success: true, url, id: image.id });
  } catch (error) {
    console.error("Gemini generate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
