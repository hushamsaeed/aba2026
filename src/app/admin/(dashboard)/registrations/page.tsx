import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RegistrationsFilter } from "@/components/admin/RegistrationsFilter";
import Link from "next/link";

function formatCurrency(amount: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount));
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  PAYMENT_SENT: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  PAID: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  CONFIRMED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
};

export default async function RegistrationsPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      referenceNumber: true,
      contactName: true,
      contactEmail: true,
      type: true,
      membershipType: true,
      status: true,
      totalAmount: true,
      createdAt: true,
      _count: { select: { delegates: true } },
    },
  });

  const serialized = registrations.map((r) => ({
    id: r.id,
    referenceNumber: r.referenceNumber,
    contactName: r.contactName,
    contactEmail: r.contactEmail,
    type: r.type,
    membershipType: r.membershipType,
    status: r.status,
    totalAmount: r.totalAmount.toString(),
    createdAt: r.createdAt.toISOString(),
    delegateCount: r._count.delegates,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Registrations</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage conference registrations ({registrations.length} total)
          </p>
        </div>
        <a
          href="/api/admin/registrations/export"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          Export CSV
        </a>
      </div>

      <RegistrationsFilter
        registrations={serialized}
        statusStyles={statusStyles}
      />
    </div>
  );
}
