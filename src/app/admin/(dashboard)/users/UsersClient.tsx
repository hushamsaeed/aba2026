"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const roles = ["SUPER_ADMIN", "ADMIN", "EDITOR"] as const;

const roleColors: Record<string, string> = {
  SUPER_ADMIN: "bg-red-100 text-red-800 border-red-300",
  ADMIN: "bg-blue-100 text-blue-800 border-blue-300",
  EDITOR: "bg-gray-100 text-gray-600 border-gray-300",
};

export function UsersClient({
  users: initial,
  currentUserId,
}: {
  users: User[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [users, setUsers] = useState(initial);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR" as string,
  });
  const [editForm, setEditForm] = useState({
    name: "",
    role: "EDITOR" as string,
    password: "",
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function openEdit(user: User) {
    setEditing(user);
    setEditForm({ name: user.name, role: user.role, password: "" });
    setEditOpen(true);
  }

  function openDelete(id: string) {
    setDeletingId(id);
    setDeleteOpen(true);
  }

  async function handleCreate() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create");
      }

      setCreateOpen(false);
      setCreateForm({ name: "", email: "", password: "", role: "EDITOR" });
      router.refresh();

      const listRes = await fetch("/api/admin/users");
      const data = await listRes.json();
      setUsers(data.users);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setSaving(false);
    }
  }

  async function handleEdit() {
    if (!editing) return;
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        name: editForm.name,
        role: editForm.role,
      };
      if (editForm.password) {
        payload.password = editForm.password;
      }

      const res = await fetch(`/api/admin/users/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update");

      setEditOpen(false);
      router.refresh();

      const listRes = await fetch("/api/admin/users");
      const data = await listRes.json();
      setUsers(data.users);
    } catch {
      alert("Failed to update user");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deletingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${deletingId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }

      setUsers((prev) => prev.filter((u) => u.id !== deletingId));
      setDeleteOpen(false);
      setDeletingId(null);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 size-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name}
                      {user.id === currentUserId && (
                        <Badge variant="secondary" className="ml-2">You</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={roleColors[user.role] || ""}>
                        {user.role.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(user)}>
                          <Pencil className="size-4" />
                        </Button>
                        {user.id !== currentUserId && (
                          <Button variant="ghost" size="icon" onClick={() => openDelete(user.id)}>
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="create-name">Name *</Label>
              <Input
                id="create-name"
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-email">Email *</Label>
              <Input
                id="create-email"
                type="email"
                value={createForm.email}
                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-password">Password *</Label>
              <Input
                id="create-password"
                type="password"
                value={createForm.password}
                onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-role">Role *</Label>
              <Select
                value={createForm.role}
                onValueChange={(v) => v && setCreateForm({ ...createForm, role: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={saving || !createForm.name || !createForm.email || createForm.password.length < 6}
            >
              {saving ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User: {editing?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select
                value={editForm.role}
                onValueChange={(v) => v && setEditForm({ ...editForm, role: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
              <Input
                id="edit-password"
                type="password"
                value={editForm.password}
                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                placeholder="Leave blank to keep current"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={saving || !editForm.name}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete this user? This action cannot be undone.
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
