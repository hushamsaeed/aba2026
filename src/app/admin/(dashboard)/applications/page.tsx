import { prisma } from "@/lib/db";
import { ApplicationsClient } from "./ApplicationsClient";

export default async function ApplicationsPage() {
  const applications = await prisma.speakerApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = applications.map((a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    organization: a.organization,
    title: a.title,
    bio: a.bio,
    topicProposal: a.topicProposal,
    status: a.status,
    createdAt: a.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Speaker Applications</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review speaker applications ({applications.length} total)
        </p>
      </div>
      <ApplicationsClient applications={serialized} />
    </div>
  );
}
