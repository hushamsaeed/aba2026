import type { CollectionConfig } from "payload";

export const Sessions: CollectionConfig = {
  slug: "sessions",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "day", "startTime", "endTime", "type"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "day", type: "relationship", relationTo: "conference-days", required: true },
    { name: "startTime", type: "text", required: true },
    { name: "endTime", type: "text", required: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Keynote", value: "KEYNOTE" },
        { label: "Panel", value: "PANEL" },
        { label: "Workshop", value: "WORKSHOP" },
        { label: "Break", value: "BREAK" },
        { label: "Networking", value: "NETWORKING" },
        { label: "Ceremony", value: "CEREMONY" },
        { label: "Activity", value: "ACTIVITY" },
        { label: "Excursion", value: "EXCURSION" },
      ],
    },
    { name: "location", type: "text" },
    { name: "order", type: "number", required: true },
    { name: "speakers", type: "relationship", relationTo: "speakers", hasMany: true },
  ],
};
