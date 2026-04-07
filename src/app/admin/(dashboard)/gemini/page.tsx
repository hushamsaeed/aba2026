"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Loader2,
  Download,
  Copy,
  Check,
  ImageIcon,
  Wand2,
} from "lucide-react";

interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  filename: string;
  mimeType: string;
  createdAt: string;
}

const PROMPT_SUGGESTIONS = [
  "Maldivian ocean landscape for conference hero banner",
  "Islamic geometric pattern divider in gold and deep blue",
  "Banking conference networking illustration",
  "Tropical resort conference venue with ocean view",
  "Abstract financial growth visualization with teal accents",
  "Maldivian sunset panorama for website background",
];

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}

export default function GeminiPage() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/gemini");
      if (res.ok) {
        const data = await res.json();
        setImages(data.images);
      }
    } catch {
      // Silently fail on fetch
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  async function handleGenerate() {
    if (!prompt.trim()) return;

    setGenerating(true);
    setError(null);
    setPreviewUrl(null);

    try {
      const res = await fetch("/api/admin/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || "Failed to generate image");
        return;
      }

      setPreviewUrl(data.url);
      setPrompt("");
      // Refresh the gallery
      fetchImages();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleCopyUrl(url: string, id: string) {
    const fullUrl = `${window.location.origin}${url}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <Sparkles className="size-6 text-amber-500" />
          AI Image Generation
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate conference images using Google Gemini AI
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Generator Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate New Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  placeholder="Describe the image you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={3}
                  disabled={generating}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating || !prompt.trim()}
                className="w-full"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 size-4" />
                    Generate Image
                  </>
                )}
              </Button>

              {error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Prompt Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prompt Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {PROMPT_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setPrompt(suggestion)}
                    disabled={generating}
                    className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {generating ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-20">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Generating your image...
                </p>
                <p className="text-xs text-muted-foreground/60 mt-1">
                  This may take 15-30 seconds
                </p>
              </div>
            ) : previewUrl ? (
              <div className="space-y-3">
                <div className="overflow-hidden rounded-lg border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Generated image"
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyUrl(previewUrl, "preview")}
                  >
                    {copiedId === "preview" ? (
                      <>
                        <Check className="mr-1.5 size-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1.5 size-3.5" />
                        Copy URL
                      </>
                    )}
                  </Button>
                  <a
                    href={previewUrl}
                    download
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Download className="mr-1.5 size-3.5" />
                    Download
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 py-20">
                <ImageIcon className="size-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm text-muted-foreground">
                  Generated image will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            Image Gallery
            <Badge variant="secondary" className="text-xs font-normal">
              {images.length} images
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ImageIcon className="size-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">
                No images generated yet. Create your first one above.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="aspect-video overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 space-y-2">
                    <p className="text-sm line-clamp-2 text-foreground">
                      {image.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(image.createdAt)}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => handleCopyUrl(image.url, image.id)}
                        >
                          {copiedId === image.id ? (
                            <Check className="size-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </Button>
                        <a
                          href={image.url}
                          download
                          className="inline-flex items-center justify-center rounded-md h-7 px-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <Download className="size-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
