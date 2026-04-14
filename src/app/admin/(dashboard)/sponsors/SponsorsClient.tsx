"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface Sponsor {
  id: string;
  name: string;
  tier: string;
  logoUrl: string;
  website: string;
  order: number;
  active: boolean;
}

const tiers = ["PLATINUM", "GOLD", "SILVER", "BRONZE", "MEDIA_PARTNER"] as const;

const tierColors: Record<string, string> = {
  PLATINUM: "bg-slate-100 text-slate-800 border-slate-300",
  GOLD: "bg-amber-100 text-amber-800 border-amber-300",
  SILVER: "bg-gray-100 text-gray-600 border-gray-300",
  BRONZE: "bg-orange-100 text-orange-800 border-orange-300",
  MEDIA_PARTNER: "bg-blue-100 text-blue-800 border-blue-300",
};

const emptySponsor = {
  name: "",
  tier: "GOLD" as string,
  logoUrl: "",
  website: "",
  order: 0,
  active: true,
};

export function SponsorsClient({ sponsors: initial }: { sponsors: Sponsor[] }) {
  const router = useRouter();
  const [sponsors, setSponsors] = useState(initial);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<Sponsor | null>(null);
  const [form, setForm] = useState(emptySponsor);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(emptySponsor);
    setDialogOpen(true);
  }

  function openEdit(sponsor: Sponsor) {
    setEditing(sponsor);
    setForm({
      name: sponsor.name,
      tier: sponsor.tier,
      logoUrl: sponsor.logoUrl,
      website: sponsor.website,
      order: sponsor.order,
      active: sponsor.active,
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
        ? `/api/admin/sponsors/${editing.id}`
        : "/api/admin/sponsors";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");

      setDialogOpen(false);
      router.refresh();

      const listRes = await fetch("/api/admin/sponsors");
      const data = await listRes.json();
      setSponsors(data.sponsors);
    } catch {
      alert("Failed to save sponsor");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/sponsors/${deleting}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");

      setSponsors((prev) => prev.filter((s) => s.id !== deleting));
      setDeleteOpen(false);
      setDeleting(null);
      router.refresh();
    } catch {
      alert("Failed to delete sponsor");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={openCreate}>
          <Plus className="mr-2 size-4" />
          Add Sponsor
        </Button>
      </div>

      {sponsors.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            No sponsors yet. Add your first sponsor.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {tiers.map((tier) => {
            const tierSponsors = sponsors.filter((s) => s.tier === tier);
            return (
              <div key={tier}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C5A55A]">
                  {tier.replace("_", " ")}
                </h3>
                {tierSponsors.length === 0 ? (
                  <p className="text-sm italic text-muted-foreground">No sponsors in this tier</p>
                ) : (
                  <Card>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Logo</TableHead>
                              <TableHead>Website</TableHead>
                              <TableHead>Active</TableHead>
                              <TableHead>Order</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tierSponsors.map((sponsor) => (
                              <TableRow key={sponsor.id}>
                                <TableCell className="font-medium">{sponsor.name}</TableCell>
                                <TableCell>
                                  {sponsor.logoUrl ? (
                                    <Image
                                      src={sponsor.logoUrl}
                                      alt={sponsor.name}
                                      width={48}
                                      height={32}
                                      className="rounded object-contain"
                                    />
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {sponsor.website ? (
                                    <a
                                      href={sponsor.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-blue-600 hover:underline"
                                    >
                                      {new URL(sponsor.website).hostname}
                                    </a>
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {sponsor.active ? (
                                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Active</Badge>
                                  ) : (
                                    <Badge variant="secondary">Inactive</Badge>
                                  )}
                                </TableCell>
                                <TableCell>{sponsor.order}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => openEdit(sponsor)}>
                                      <Pencil className="size-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => openDelete(sponsor.id)}>
                                      <Trash2 className="size-4 text-destructive" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Sponsor" : "Add Sponsor"}</DialogTitle>
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
              <Label htmlFor="tier">Tier *</Label>
              <Select value={form.tier} onValueChange={(v) => v && setForm({ ...form, tier: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tiers.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logoUrl">Logo URL *</Label>
              <Input
                id="logoUrl"
                value={form.logoUrl}
                onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
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
            <div className="flex items-center gap-3">
              <Switch
                id="active"
                checked={form.active}
                onCheckedChange={(checked) => setForm({ ...form, active: checked })}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving || !form.name || !form.logoUrl}>
              {saving ? "Saving..." : editing ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Sponsor</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this sponsor? This action cannot be undone.
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
