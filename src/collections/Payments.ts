import type { CollectionConfig } from "payload";

export const Payments: CollectionConfig = {
  slug: "payments",
  admin: {
    defaultColumns: ["registration", "method", "amount", "status", "createdAt"],
  },
  fields: [
    { name: "registration", type: "relationship", relationTo: "registrations", required: true },
    {
      name: "method",
      type: "select",
      required: true,
      options: [
        { label: "Gateway", value: "GATEWAY" },
        { label: "Payment Link", value: "PAYMENT_LINK" },
        { label: "Bank Transfer", value: "BANK_TRANSFER" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "PENDING",
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Completed", value: "COMPLETED" },
        { label: "Failed", value: "FAILED" },
        { label: "Refunded", value: "REFUNDED" },
      ],
    },
    { name: "reference", type: "text" },
    { name: "amount", type: "number", required: true },
    { name: "currency", type: "text", defaultValue: "USD" },
    { name: "paidAt", type: "date" },
  ],
};
