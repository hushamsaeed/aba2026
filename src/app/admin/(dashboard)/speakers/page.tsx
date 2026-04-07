import { prisma } from "@/lib/db";
import { SpeakersClient } from "./SpeakersClient";

export default async function SpeakersPage() {
  const speakers = await prisma.speaker.findMany({
    orderBy: { order: "asc" },
  });

  const serialized = speakers.map((s) => ({
    id: s.id,
    name: s.name,
    title: s.title,
    organization: s.organization,
    bio: s.bio ?? "",
    photoUrl: s.photoUrl ?? "",
    country: s.country ?? "",
    featured: s.featured,
    order: s.order,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Speakers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage conference speakers ({speakers.length} total)
        </p>
      </div>
      <SpeakersClient speakers={serialized} />
    </div>
  );
}
