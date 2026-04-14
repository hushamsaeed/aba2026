"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  organization: string;
  title: string;
  bio: string;
  topicProposal: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  REVIEWED: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  ACCEPTED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  DECLINED: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusFilters = ["All", "PENDING", "REVIEWED", "ACCEPTED", "DECLINED"] as const;

export function ApplicationsClient({
  applications: initial,
}: {
  applications: Application[];
}) {
  const router = useRouter();
  const [applications, setApplications] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredApplications = activeFilter === "All"
    ? applications
    : applications.filter((a) => a.status === activeFilter);

  function getCount(status: string) {
    if (status === "All") return applications.length;
    return applications.filter((a) => a.status === status).length;
  }

  async function updateStatus(id: string, status: string) {
    setSaving(id);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      router.refresh();
    } catch {
      alert("Failed to update application status");
    } finally {
      setSaving(null);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        {statusFilters.map((status) => (
          <button
            key={status}
            onClick={() => setActiveFilter(status)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === status
                ? "border-[#C5A55A] bg-[#C5A55A] text-gray-900"
                : "border-border bg-transparent text-muted-foreground hover:bg-accent"
            }`}
          >
            {status === "All" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()} ({getCount(status)})
          </button>
        ))}
      </div>

      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No speaker applications yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredApplications.map((app) => (
            <Card key={app.id}>
              <CardHeader
                className="cursor-pointer"
                onClick={() => setExpanded(expanded === app.id ? null : app.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">{app.name}</CardTitle>
                    <Badge className={statusColors[app.status] || ""}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    {expanded === app.id ? (
                      <ChevronUp className="size-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {app.title} at {app.organization} -- {app.email}
                </p>
              </CardHeader>

              {expanded === app.id && (
                <CardContent className="pt-0">
                  <Separator className="mb-4" />
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Bio</h4>
                      <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                        {app.bio}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Topic Proposal</h4>
                      <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                        {app.topicProposal}
                      </p>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(app.id, "ACCEPTED");
                        }}
                        disabled={saving === app.id || app.status === "ACCEPTED"}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Check className="mr-1 size-4" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateStatus(app.id, "DECLINED");
                        }}
                        disabled={saving === app.id || app.status === "DECLINED"}
                      >
                        <X className="mr-1 size-4" />
                        Decline
                      </Button>
                      {app.status === "PENDING" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateStatus(app.id, "REVIEWED");
                          }}
                          disabled={saving === app.id}
                        >
                          Mark as Reviewed
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
