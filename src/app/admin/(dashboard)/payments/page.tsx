import { prisma } from "@/lib/db";
import { PaymentsClient } from "./PaymentsClient";

export default async function PaymentsPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      registration: {
        select: {
          referenceNumber: true,
          contactName: true,
          contactEmail: true,
        },
      },
    },
  });

  const serialized = payments.map((p) => ({
    id: p.id,
    registrationId: p.registrationId,
    method: p.method,
    status: p.status,
    reference: p.reference ?? "",
    amount: p.amount.toString(),
    currency: p.currency,
    paidAt: p.paidAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
    registration: {
      referenceNumber: p.registration.referenceNumber,
      contactName: p.registration.contactName,
      contactEmail: p.registration.contactEmail,
    },
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Payments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage conference payments ({payments.length} total)
        </p>
      </div>
      <PaymentsClient payments={serialized} />
    </div>
  );
}
