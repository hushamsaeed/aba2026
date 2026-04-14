"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  photoUrl: string;
  country: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

const emptySpeaker: Omit<Speaker, "id" | "createdAt"> = {
  name: "",
  title: "",
  organization: "",
  bio: "",
  photoUrl: "",
  country: "",
  featured: false,
  order: 0,
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function SpeakersClient({ speakers: initial }: { speakers: Speaker[] }) {
  const router = useRouter();
  const [speakers, setSpeakers] = useState(initial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Speaker | null>(null);
  const [form, setForm] = useState(emptySpeaker);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(emptySpeaker);
    setDialogOpen(true);
  }

  function openEdit(speaker: Speaker) {
    setEditing(speaker);
    setForm({
      name: speaker.name,
      title: speaker.title,
      organization: speaker.organization,
      bio: speaker.bio,
      photoUrl: speaker.photoUrl,
      country: speaker.country,
      featured: speaker.featured,
      order: speaker.order,
    });
    setDialogOpen(true);
  }

  function openDelete(id: string) {
    setDeleting(id);
    setDeleteOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const url = editing
        ? `/api/admin/speakers/${editing.id}`
        : "/api/admin/speakers";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");

      setDialogOpen(false);
      router.refresh();

      // Optimistic: refetch
      const listRes = await fetch("/api/admin/speakers");
      const data = await listRes.json();
      setSpeakers(data.speakers);
    } catch {
      alert("Failed to save speaker");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/speakers/${deleting}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");

      setSpeakers((prev) => prev.filter((s) => s.id !== deleting));
      setDeleteOpen(false);
      setDeleting(null);
      router.refresh();
    } catch {
      alert("Failed to delete speaker");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="mr-2 size-4" />
          Add Speaker
        </Button>
      </div>

      {speakers.length === 0 ? (
        <div className="rounded-lg bg-[#1a1a1a] py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No speakers yet. Add your first speaker.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="group bg-[#1a1a1a] rounded-lg p-4 transition-colors hover:bg-[#222]"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {speaker.photoUrl ? (
                    <Image
                      src={speaker.photoUrl}
                      alt={speaker.name}
                      width={56}
                      height={56}
                      className="size-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-14 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 font-semibold text-lg">
                      {getInitials(speaker.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">
                      {speaker.name}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {speaker.title}
                      {speaker.organization && ` — ${speaker.organization}`}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => openEdit(speaker)}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => openDelete(speaker.id)}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                {speaker.featured && (
                  <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                    Featured
                  </Badge>
                )}
                {speaker.country && (
                  <span className="text-xs text-muted-foreground">
                    {speaker.country}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Speaker" : "Add Speaker"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organization">Organization *</Label>
              <Input
                id="organization"
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={3}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photoUrl">Photo URL</Label>
              <Input
                id="photoUrl"
                value={form.photoUrl}
                onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                id="featured"
                checked={form.featured}
                onCheckedChange={(checked) => setForm({ ...form, featured: checked })}
              />
              <Label htmlFor="featured">Featured speaker</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !form.name || !form.title || !form.organization}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Speaker</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this speaker? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>
              {saving ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
