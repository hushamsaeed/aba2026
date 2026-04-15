import type { CollectionConfig } from "payload";

export const SpeakerApplications: CollectionConfig = {
  slug: "speaker-applications",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "organization", "status", "createdAt"],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "organization", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "bio", type: "textarea", required: true },
    { name: "topicProposal", type: "textarea", required: true },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Reviewed", value: "reviewed" },
        { label: "Accepted", value: "accepted" },
        { label: "Declined", value: "declined" },
      ],
    },
  ],
};
