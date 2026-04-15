import type { CollectionConfig } from "payload";

export const Sponsors: CollectionConfig = {
  slug: "sponsors",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "tier", "website", "active"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "tier",
      type: "select",
      required: true,
      options: [
        { label: "Platinum", value: "platinum" },
        { label: "Gold", value: "gold" },
        { label: "Silver", value: "silver" },
        { label: "Bronze", value: "bronze" },
        { label: "Media Partner", value: "media_partner" },
      ],
    },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "website", type: "text" },
    { name: "order", type: "number", defaultValue: 0 },
    { name: "active", type: "checkbox", defaultValue: true },
  ],
};
