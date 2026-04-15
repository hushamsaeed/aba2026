import type { CollectionConfig } from "payload";

export const PreviousConferences: CollectionConfig = {
  slug: "previous-conferences",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["year", "edition", "title", "location"],
  },
  fields: [
    { name: "year", type: "number", required: true },
    { name: "edition", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "location", type: "text", required: true },
    { name: "url", type: "text" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
