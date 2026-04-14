"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface ContentBlock {
  id: string;
  slug: string;
  title: string;
  body: string;
  imageUrl: string;
  metadata: Record<string, unknown> | null;
  updatedAt: string;
  updatedBy: string;
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

export function ContentClient({ blocks: initial }: { blocks: ContentBlock[] }) {
  const router = useRouter();
  const [blocks, setBlocks] = useState(initial);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", body: "", imageUrl: "" });
  const [saving, setSaving] = useState(false);

  const selectedBlock = blocks.find((b) => b.slug === selectedSlug) ?? null;

  function selectBlock(block: ContentBlock) {
    setSelectedSlug(block.slug);
    setForm({
      title: block.title,
      body: block.body,
      imageUrl: block.imageUrl,
    });
  }

  async function handleSave() {
    if (!selectedBlock) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${selectedBlock.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      setBlocks((prev) =>
        prev.map((b) =>
          b.slug === selectedBlock.slug
            ? {
                ...b,
                title: data.block.title ?? "",
                body: data.block.body,
                imageUrl: data.block.imageUrl ?? "",
                updatedAt: data.block.updatedAt,
              }
            : b
        )
      );
      router.refresh();
    } catch {
      alert("Failed to save content");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex gap-6 min-h-[600px]">
      {/* Left column - block list */}
      <div className="w-80 shrink-0 space-y-1 overflow-y-auto rounded-lg bg-[#1a1a1a] p-3">
        {blocks.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No content blocks yet.
          </p>
        ) : (
          blocks.map((block) => (
            <button
              key={block.id}
              onClick={() => selectBlock(block)}
              className={`w-full rounded-md px-3 py-3 text-left transition-colors ${
                selectedSlug === block.slug
                  ? "border border-amber-500/40 bg-amber-500/10"
                  : "border border-transparent hover:bg-[#222]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-[10px] shrink-0">
                  {block.slug}
                </Badge>
              </div>
              {block.title && (
                <p className="mt-1 text-sm font-medium text-white truncate">
                  {block.title}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                Updated {timeAgo(block.updatedAt)}
              </p>
            </button>
          ))
        )}
      </div>

      {/* Right column - editor */}
      <div className="flex-1 rounded-lg bg-[#1a1a1a] p-6">
        {!selectedBlock ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Select a content block to edit
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-white">
              Edit: {selectedBlock.title || selectedBlock.slug}
            </h2>

            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-body">Body</Label>
              <Textarea
                id="edit-body"
                rows={14}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="font-mono text-sm"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-imageUrl">Image URL</Label>
              <Input
                id="edit-imageUrl"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
