import type { CollectionConfig } from "payload";

export const ContentBlocks: CollectionConfig = {
  slug: "content-blocks",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["slug", "title", "updatedAt"],
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true },
    { name: "title", type: "text" },
    { name: "body", type: "richText" },
    { name: "imageUrl", type: "text" },
    { name: "metadata", type: "json" },
  ],
};
