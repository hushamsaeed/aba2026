const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export interface GeminiImageResult {
  success: boolean;
  imageData?: string; // base64 encoded
  mimeType?: string;
  error?: string;
}

export async function generateImage(prompt: string): Promise<GeminiImageResult> {
  if (!GEMINI_API_KEY) {
    return { success: false, error: "Gemini API key not configured" };
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a professional, high-quality image for a banking conference website. Style: modern, corporate, clean. Theme: Maldivian (ocean, tropical, Islamic geometric patterns). Colors: gold (#bf9436), deep blue (#1e3a5f), teal (#0891b2). Prompt: ${prompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["TEXT", "IMAGE"],
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error: `Gemini API error: ${error}` };
    }

    const data = await response.json();
    const parts = data.candidates?.[0]?.content?.parts;

    if (!parts) {
      return { success: false, error: "No content in Gemini response" };
    }

    for (const part of parts) {
      if (part.inlineData) {
        return {
          success: true,
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
        };
      }
    }

    return { success: false, error: "No image in Gemini response" };
  } catch (error) {
    return {
      success: false,
      error: `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
