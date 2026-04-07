"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, MailOpen, Eye } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function ContactClient({ contacts: initial }: { contacts: Contact[] }) {
  const router = useRouter();
  const [contacts, setContacts] = useState(initial);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  async function toggleRead(id: string, read: boolean) {
    setToggling(id);
    try {
      const res = await fetch("/api/admin/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, read } : c))
      );
      if (selected?.id === id) {
        setSelected((prev) => (prev ? { ...prev, read } : prev));
      }
      router.refresh();
    } catch {
      alert("Failed to update read status");
    } finally {
      setToggling(null);
    }
  }

  function openMessage(contact: Contact) {
    setSelected(contact);
    if (!contact.read) {
      toggleRead(contact.id, true);
    }
  }

  return (
    <>
      {contacts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No contact submissions yet.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/50 ${
                    !contact.read ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => openMessage(contact)}
                >
                  <div className="shrink-0">
                    {contact.read ? (
                      <MailOpen className="size-5 text-muted-foreground" />
                    ) : (
                      <Mail className="size-5 text-blue-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${!contact.read ? "font-semibold" : "font-medium"}`}>
                        {contact.name}
                      </span>
                      {!contact.read && (
                        <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {contact.subject || "(No subject)"} -- {contact.message.slice(0, 80)}
                      {contact.message.length > 80 ? "..." : ""}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selected?.subject || "(No subject)"}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{selected.name}</span>
                  <span className="ml-2 text-muted-foreground">{selected.email}</span>
                </div>
                <span className="text-muted-foreground">
                  {new Date(selected.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <Separator />
              <p className="whitespace-pre-wrap text-sm">{selected.message}</p>
              <Separator />
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRead(selected.id, !selected.read)}
                  disabled={toggling === selected.id}
                >
                  <Eye className="mr-2 size-4" />
                  Mark as {selected.read ? "Unread" : "Read"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
