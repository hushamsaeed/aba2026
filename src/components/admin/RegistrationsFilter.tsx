"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface Registration {
  id: string;
  referenceNumber: string;
  contactName: string;
  contactEmail: string;
  type: string;
  membershipType: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  delegateCount: number;
}

interface Props {
  registrations: Registration[];
  statusStyles: Record<string, string>;
}

function formatCurrency(amount: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(amount));
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateStr));
}

export function RegistrationsFilter({ registrations, statusStyles }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const matchesSearch =
        !search ||
        r.contactName.toLowerCase().includes(search.toLowerCase()) ||
        r.contactEmail.toLowerCase().includes(search.toLowerCase()) ||
        r.referenceNumber.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || r.status === statusFilter;
      const matchesType = typeFilter === "ALL" || r.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [registrations, search, statusFilter, typeFilter]);

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or reference..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "ALL")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PAYMENT_SENT">Payment Sent</SelectItem>
            <SelectItem value="PAID">Paid</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v ?? "ALL")}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="INDIVIDUAL">Individual</SelectItem>
            <SelectItem value="GROUP">Group</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {registrations.length} registrations
      </p>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No registrations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell>
                        <Link
                          href={`/admin/registrations/${reg.id}`}
                          className="font-mono text-xs text-primary hover:underline"
                        >
                          {reg.referenceNumber.slice(0, 12)}
                        </Link>
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
                        <Badge variant="outline">{reg.membershipType}</Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyles[reg.status] || ""}`}
                        >
                          {reg.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(reg.totalAmount)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(reg.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
