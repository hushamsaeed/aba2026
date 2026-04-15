import type { CollectionConfig } from "payload";

export const SiteConfig: CollectionConfig = {
  slug: "site-config",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["key", "label", "value", "group"],
  },
  fields: [
    { name: "key", type: "text", required: true, unique: true },
    { name: "value", type: "text", required: true },
    { name: "label", type: "text" },
    {
      name: "group",
      type: "select",
      defaultValue: "general",
      options: [
        { label: "General", value: "general" },
        { label: "Pricing", value: "pricing" },
        { label: "Social", value: "social" },
        { label: "Email", value: "email" },
        { label: "Payment", value: "payment" },
      ],
    },
  ],
};
