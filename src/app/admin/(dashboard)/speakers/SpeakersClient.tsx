"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

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

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {speakers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-sm text-muted-foreground">
                      No speakers yet. Add your first speaker.
                    </TableCell>
                  </TableRow>
                ) : (
                  speakers.map((speaker) => (
                    <TableRow key={speaker.id}>
                      <TableCell className="font-medium">{speaker.name}</TableCell>
                      <TableCell>{speaker.title}</TableCell>
                      <TableCell>{speaker.organization}</TableCell>
                      <TableCell>{speaker.country || "-"}</TableCell>
                      <TableCell>
                        {speaker.featured ? (
                          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Featured</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{speaker.order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(speaker)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDelete(speaker.id)}
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
