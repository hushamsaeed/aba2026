import type { CollectionConfig } from "payload";

export const ConferenceDays: CollectionConfig = {
  slug: "conference-days",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "order"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "date", type: "date", required: true },
    { name: "order", type: "number", required: true },
  ],
};
