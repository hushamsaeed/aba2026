import type { CollectionConfig } from "payload";

export const Speakers: CollectionConfig = {
  slug: "speakers",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "title", "organization", "country", "featured"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "organization", type: "text", required: true },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "country", type: "text" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
