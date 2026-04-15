import type { CollectionConfig } from "payload";

export const Registrations: CollectionConfig = {
  slug: "registrations",
  admin: {
    useAsTitle: "contactName",
    defaultColumns: ["referenceNumber", "contactName", "type", "membershipType", "status", "totalAmount", "createdAt"],
  },
  fields: [
    { name: "referenceNumber", type: "text", required: true, unique: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Individual", value: "INDIVIDUAL" },
        { label: "Group", value: "GROUP" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "PENDING",
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Payment Sent", value: "PAYMENT_SENT" },
        { label: "Paid", value: "PAID" },
        { label: "Confirmed", value: "CONFIRMED" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
    },
    { name: "contactName", type: "text", required: true },
    { name: "contactEmail", type: "email", required: true },
    { name: "contactPhone", type: "text" },
    { name: "organizationName", type: "text" },
    { name: "country", type: "text" },
    {
      name: "membershipType",
      type: "select",
      required: true,
      options: [
        { label: "Member", value: "MEMBER" },
        { label: "Non-Member", value: "NON_MEMBER" },
      ],
    },
    { name: "totalAmount", type: "number", required: true },
    { name: "currency", type: "text", defaultValue: "USD" },
    { name: "earlyBird", type: "checkbox", defaultValue: false },
    {
      name: "delegates",
      type: "array",
      fields: [
        { name: "salutation", type: "text" },
        { name: "firstName", type: "text", required: true },
        { name: "lastName", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text" },
        { name: "jobTitle", type: "text" },
        { name: "organization", type: "text" },
        { name: "country", type: "text" },
        { name: "dietaryRequirements", type: "text" },
        { name: "specialRequests", type: "textarea" },
      ],
    },
  ],
};
