import { prisma } from "@/lib/db";
import { SponsorsClient } from "./SponsorsClient";

export default async function SponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({
    orderBy: [{ tier: "asc" }, { order: "asc" }],
  });

  const serialized = sponsors.map((s) => ({
    id: s.id,
    name: s.name,
    tier: s.tier,
    logoUrl: s.logoUrl,
    website: s.website ?? "",
    order: s.order,
    active: s.active,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Sponsors</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage conference sponsors ({sponsors.length} total)
        </p>
      </div>
      <SponsorsClient sponsors={serialized} />
    </div>
  );
}
