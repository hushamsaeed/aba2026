"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Clock, MapPin } from "lucide-react";

interface SessionSpeaker {
  id: string;
  name: string;
}

interface Session {
  id: string;
  dayId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  order: number;
  speakers: SessionSpeaker[];
}

interface Day {
  id: string;
  date: string;
  title: string;
  order: number;
  sessions: Session[];
}

const sessionTypes = [
  "KEYNOTE",
  "PANEL",
  "WORKSHOP",
  "BREAK",
  "NETWORKING",
  "CEREMONY",
  "ACTIVITY",
  "EXCURSION",
] as const;

const typeColors: Record<string, string> = {
  KEYNOTE: "bg-purple-100 text-purple-800 border-purple-300",
  PANEL: "bg-blue-100 text-blue-800 border-blue-300",
  WORKSHOP: "bg-emerald-100 text-emerald-800 border-emerald-300",
  BREAK: "bg-gray-100 text-gray-600 border-gray-300",
  NETWORKING: "bg-amber-100 text-amber-800 border-amber-300",
  CEREMONY: "bg-rose-100 text-rose-800 border-rose-300",
  ACTIVITY: "bg-cyan-100 text-cyan-800 border-cyan-300",
  EXCURSION: "bg-lime-100 text-lime-800 border-lime-300",
};

const emptySession = {
  dayId: "",
  title: "",
  description: "",
  startTime: "",
  endTime: "",
  type: "PANEL" as string,
  location: "",
  order: 0,
  speakerIds: [] as string[],
};

export function ProgramClient({
  days: initialDays,
  allSpeakers,
}: {
  days: Day[];
  allSpeakers: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [days, setDays] = useState(initialDays);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Session | null>(null);
  const [form, setForm] = useState(emptySession);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openCreate(dayId: string) {
    setEditing(null);
    setForm({ ...emptySession, dayId });
    setDialogOpen(true);
  }

  function openEdit(session: Session) {
    setEditing(session);
    setForm({
      dayId: session.dayId,
      title: session.title,
      description: session.description,
      startTime: session.startTime,
      endTime: session.endTime,
      type: session.type,
      location: session.location,
      order: session.order,
      speakerIds: session.speakers.map((s) => s.id),
    });
    setDialogOpen(true);
  }

  function openDelete(id: string) {
    setDeletingId(id);
    setDeleteOpen(true);
  }

  function toggleSpeaker(id: string) {
    setForm((prev) => ({
      ...prev,
      speakerIds: prev.speakerIds.includes(id)
        ? prev.speakerIds.filter((sid) => sid !== id)
        : [...prev.speakerIds, id],
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const url = editing
        ? `/api/admin/program/${editing.id}`
        : "/api/admin/program";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");

      setDialogOpen(false);
      router.refresh();

      const listRes = await fetch("/api/admin/program");
      const data = await listRes.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setDays(
        data.days.map((d: any) => ({
          ...d,
          sessions: d.sessions.map((s: any) => ({
            ...s,
            speakers: s.speakers.map((ss: any) => ss.speaker),
          })),
        }))
      );
    } catch {
      alert("Failed to save session");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deletingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/program/${deletingId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");

      setDays((prev) =>
        prev.map((d) => ({
          ...d,
          sessions: d.sessions.filter((s) => s.id !== deletingId),
        }))
      );
      setDeleteOpen(false);
      setDeletingId(null);
      router.refresh();
    } catch {
      alert("Failed to delete session");
    } finally {
      setSaving(false);
    }
  }

  if (days.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            No program days configured yet. Add program days in the database first.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Tabs defaultValue={days[0]?.id}>
        <TabsList>
          {days.map((day) => (
            <TabsTrigger key={day.id} value={day.id}>
              {day.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {days.map((day) => (
          <TabsContent key={day.id} value={day.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" -- "}
                {day.sessions.length} session{day.sessions.length !== 1 ? "s" : ""}
              </p>
              <Button onClick={() => openCreate(day.id)}>
                <Plus className="mr-2 size-4" />
                Add Session
              </Button>
            </div>

            {day.sessions.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  No sessions for this day yet.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {day.sessions.map((session) => (
                  <Card key={session.id}>
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{session.title}</CardTitle>
                          <Badge className={typeColors[session.type] || ""}>
                            {session.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5" />
                            {session.startTime} - {session.endTime}
                          </span>
                          {session.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="size-3.5" />
                              {session.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(session)}>
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDelete(session.id)}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    {(session.description || session.speakers.length > 0) && (
                      <CardContent className="pt-0">
                        {session.description && (
                          <p className="text-sm text-muted-foreground">{session.description}</p>
                        )}
                        {session.speakers.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {session.speakers.map((sp) => (
                              <Badge key={sp.id} variant="secondary">
                                {sp.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Add/Edit Session Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Session" : "Add Session"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  placeholder="09:00"
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endTime">End Time *</Label>
                <Input
                  id="endTime"
                  placeholder="10:00"
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={form.type} onValueChange={(v) => v && setForm({ ...form, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sessionTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
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
            {allSpeakers.length > 0 && (
              <div className="grid gap-2">
                <Label>Speakers</Label>
                <div className="max-h-40 overflow-y-auto rounded-md border p-2">
                  {allSpeakers.map((sp) => (
                    <label
                      key={sp.id}
                      className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 hover:bg-muted"
                    >
                      <input
                        type="checkbox"
                        checked={form.speakerIds.includes(sp.id)}
                        onChange={() => toggleSpeaker(sp.id)}
                        className="rounded"
                      />
                      <span className="text-sm">{sp.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !form.title || !form.startTime || !form.endTime}
            >
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Session</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this session? This action cannot be undone.
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
