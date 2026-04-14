"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { CheckCircle, Send } from "lucide-react";

interface Payment {
  id: string;
  registrationId: string;
  method: string;
  status: string;
  reference: string;
  amount: string;
  currency: string;
  paidAt: string | null;
  createdAt: string;
  registration: {
    referenceNumber: string;
    contactName: string;
    contactEmail: string;
  };
}

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  COMPLETED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  FAILED: "bg-red-500/10 text-red-600 border-red-500/20",
  REFUNDED: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

const methodLabels: Record<string, string> = {
  GATEWAY: "Payment Gateway",
  PAYMENT_LINK: "Payment Link",
  BANK_TRANSFER: "Bank Transfer",
};

function formatCurrency(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(amount));
}

const statusFilters = ["All", "PENDING", "COMPLETED", "FAILED", "REFUNDED"] as const;

export function PaymentsClient({ payments: initial }: { payments: Payment[] }) {
  const router = useRouter();
  const [payments, setPayments] = useState(initial);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredPayments = activeFilter === "All"
    ? payments
    : payments.filter((p) => p.status === activeFilter);

  function openConfirm(id: string) {
    setConfirmingId(id);
    setConfirmOpen(true);
  }

  async function markAsPaid() {
    if (!confirmingId) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: confirmingId, status: "COMPLETED" }),
      });

      if (!res.ok) throw new Error("Failed to update");

      const data = await res.json();
      setPayments((prev) =>
        prev.map((p) =>
          p.id === confirmingId
            ? { ...p, status: "COMPLETED", paidAt: data.payment.paidAt }
            : p
        )
      );
      setConfirmOpen(false);
      setConfirmingId(null);
      router.refresh();
    } catch {
      alert("Failed to mark payment as paid");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
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
            {status === "All" ? "All" : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Paid At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center text-sm text-muted-foreground">
                      {activeFilter === "All" ? "No payments yet." : `No ${activeFilter.toLowerCase()} payments.`}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-xs">
                        {payment.registration.referenceNumber.slice(0, 12)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.registration.contactName}</div>
                          <div className="text-xs text-muted-foreground">
                            {payment.registration.contactEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(payment.amount, payment.currency)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {methodLabels[payment.method] || payment.method}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[payment.status] || ""}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {payment.paidAt
                          ? new Date(payment.paidAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {payment.status === "PENDING" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openConfirm(payment.id)}
                              >
                                <CheckCircle className="mr-1 size-4" />
                                Mark Paid
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Placeholder for payment link functionality
                                  alert(
                                    `Send payment link to ${payment.registration.contactEmail}`
                                  );
                                }}
                              >
                                <Send className="mr-1 size-4" />
                                Send Link
                              </Button>
                            </>
                          )}
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

      {/* Confirm Mark as Paid */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to mark this payment as completed? This will also
            update the registration status to PAID.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={markAsPaid} disabled={saving}>
              {saving ? "Processing..." : "Confirm Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
