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
import {
  Users,
  CreditCard,
  Clock,
  DollarSign,
  Calendar,
  UserCheck,
  UserX,
} from "lucide-react";

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

export default async function AdminDashboardPage() {
  const [
    totalRegistrations,
    paidRegistrations,
    pendingRegistrations,
    revenueResult,
    recentRegistrations,
    individualCount,
    groupCount,
    memberCount,
    nonMemberCount,
  ] = await Promise.all([
    prisma.registration.count(),
    prisma.registration.count({ where: { status: "PAID" } }),
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
        membershipType: true,
        status: true,
        totalAmount: true,
        createdAt: true,
      },
    }),
    prisma.registration.count({ where: { type: "INDIVIDUAL" } }),
    prisma.registration.count({ where: { type: "GROUP" } }),
    prisma.registration.count({ where: { membershipType: "MEMBER" } }),
    prisma.registration.count({ where: { membershipType: "NON_MEMBER" } }),
  ]);

  const totalRevenue = Number(revenueResult._sum.totalAmount ?? 0);

  // Conference date: September 1, 2026
  const conferenceDate = new Date("2026-09-01");
  const today = new Date();
  const daysUntil = Math.ceil(
    (conferenceDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const statusColor: Record<string, string> = {
    PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    PAYMENT_SENT: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    PAID: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    CONFIRMED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    CANCELLED: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          42nd ABA General Meeting &amp; Conference overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Registrations
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid
            </CardTitle>
            <CreditCard className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {paidRegistrations}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <Clock className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {pendingRegistrations}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalRevenue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conference Countdown
            </CardTitle>
            <Calendar className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-deep-blue">
              {daysUntil > 0 ? daysUntil : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              days until September 1, 2026
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Registration Type
            </CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-4">
              <div>
                <span className="text-2xl font-bold">{individualCount}</span>
                <span className="ml-1 text-xs text-muted-foreground">
                  Individual
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold">{groupCount}</span>
                <span className="ml-1 text-xs text-muted-foreground">
                  Group
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Membership
            </CardTitle>
            <UserCheck className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-4">
              <div className="flex items-baseline gap-1">
                <UserCheck className="size-3.5 text-emerald-500" />
                <span className="text-2xl font-bold">{memberCount}</span>
                <span className="text-xs text-muted-foreground">Member</span>
              </div>
              <div className="flex items-baseline gap-1">
                <UserX className="size-3.5 text-muted-foreground" />
                <span className="text-2xl font-bold">{nonMemberCount}</span>
                <span className="text-xs text-muted-foreground">
                  Non-Member
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Registrations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          {recentRegistrations.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No registrations yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRegistrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-mono text-xs">
                        {reg.referenceNumber.slice(0, 12)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {reg.contactName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {reg.contactEmail}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{reg.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusColor[reg.status] || ""}`}
                        >
                          {reg.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(Number(reg.totalAmount))}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(reg.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
