"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";

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

export function ContentClient({ blocks: initial }: { blocks: ContentBlock[] }) {
  const router = useRouter();
  const [blocks, setBlocks] = useState(initial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<ContentBlock | null>(null);
  const [form, setForm] = useState({ title: "", body: "", imageUrl: "" });
  const [saving, setSaving] = useState(false);

  function openEdit(block: ContentBlock) {
    setEditing(block);
    setForm({
      title: block.title,
      body: block.body,
      imageUrl: block.imageUrl,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${editing.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      setBlocks((prev) =>
        prev.map((b) =>
          b.slug === editing.slug
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
      setDialogOpen(false);
      router.refresh();
    } catch {
      alert("Failed to save content");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {blocks.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No content blocks yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {blocks.map((block) => (
            <Card key={block.id} className="group relative">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">
                    {block.title || block.slug}
                  </CardTitle>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {block.slug}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEdit(block)}
                >
                  <Pencil className="size-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {block.body}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Updated:{" "}
                  {new Date(block.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit Content: {editing?.title || editing?.slug}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                rows={12}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                className="font-mono text-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
