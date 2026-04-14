import { prisma } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  DollarSign,
  Clock,
  Calendar,
} from "lucide-react";
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
  }).format(new Date(date));
}

export default async function AdminDashboardPage() {
  const [
    totalRegistrations,
    pendingRegistrations,
    revenueResult,
    recentRegistrations,
    weekAgoCount,
  ] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { status: "PENDING" } }),
    prisma.registration.aggregate({ _sum: { totalAmount: true } }),
    prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        referenceNumber: true,
        contactName: true,
        contactEmail: true,
        type: true,
        status: true,
        totalAmount: true,
        createdAt: true,
      },
    }),
    prisma.registration.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    }),
  ]);

  const totalRevenue = Number(revenueResult._sum.totalAmount ?? 0);

  const conferenceDate = new Date("2026-09-01");
  const today = new Date();
  const daysUntil = Math.ceil(
    (conferenceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const statusColor: Record<string, string> = {
    PENDING: "bg-amber-500/20 text-amber-400",
    PAYMENT_SENT: "bg-blue-500/20 text-blue-400",
    PAID: "bg-emerald-500/20 text-emerald-400",
    CONFIRMED: "bg-emerald-500/20 text-emerald-400",
    CANCELLED: "bg-red-500/20 text-red-400",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-white/40">
            42nd ABA General Meeting &amp; Conference
          </p>
        </div>
        <Link
          href="/api/admin/registrations/export"
          target="_blank"
          className="rounded-md bg-[#1a1a1a] px-4 py-2 text-sm text-white/60 hover:text-white border border-white/10 transition-colors"
        >
          Export CSV
        </Link>
      </div>

      {/* 4 KPI Cards — matching Pencil design */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-[#1a1a1a] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Total Registrations</span>
            <Users className="size-4 text-white/20" />
          </div>
          <div className="text-3xl font-bold text-white">{totalRegistrations}</div>
          <div className="text-xs text-emerald-400">
            +{weekAgoCount} this week
          </div>
        </div>

        <div className="rounded-lg bg-[#1a1a1a] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Total Revenue</span>
            <DollarSign className="size-4 text-white/20" />
          </div>
          <div className="text-3xl font-bold text-white">
            {formatCurrency(totalRevenue)}
          </div>
          <div className="text-xs text-white/30">USD · Bank Transfer</div>
        </div>

        <div className="rounded-lg bg-[#1a1a1a] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Pending Payments</span>
            <Clock className="size-4 text-white/20" />
          </div>
          <div className="text-3xl font-bold text-white">{pendingRegistrations}</div>
          <div className="text-xs text-amber-400">Awaiting confirmation</div>
        </div>

        <div className="rounded-lg bg-[#1a1a1a] p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Days Until Conference</span>
            <Calendar className="size-4 text-white/20" />
          </div>
          <div className="text-3xl font-bold text-white">
            {daysUntil > 0 ? daysUntil : 0}
          </div>
          <div className="text-xs text-white/30">1 Sep 2026</div>
        </div>
      </div>

      {/* Recent Registrations Table */}
      <div className="rounded-lg bg-[#1a1a1a]">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="text-base font-semibold text-white">
            Recent Registrations
          </h2>
          <Link
            href="/admin/registrations"
            className="text-sm text-[#C5A55A] hover:text-[#D4B86A] transition-colors"
          >
            View All →
          </Link>
        </div>

        {recentRegistrations.length === 0 ? (
          <p className="px-5 pb-8 text-center text-sm text-white/30">
            No registrations yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold text-white/40">Reference</TableHead>
                  <TableHead className="text-xs font-semibold text-white/40">Contact</TableHead>
                  <TableHead className="text-xs font-semibold text-white/40">Type</TableHead>
                  <TableHead className="text-xs font-semibold text-white/40">Amount</TableHead>
                  <TableHead className="text-xs font-semibold text-white/40">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-white/40">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRegistrations.map((reg) => (
                  <TableRow key={reg.id} className="border-white/5">
                    <TableCell className="font-mono text-xs text-white/50">
                      {reg.referenceNumber.slice(0, 12)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-white">{reg.contactName}</div>
                    </TableCell>
                    <TableCell className="text-sm text-white/50">{reg.type}</TableCell>
                    <TableCell className="text-sm font-medium text-white">
                      {formatCurrency(Number(reg.totalAmount))}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[reg.status] || ""}`}>
                        {reg.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-white/30">
                      {formatDate(reg.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
