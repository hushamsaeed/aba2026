import { prisma } from "@/lib/db";
import { ContentClient } from "./ContentClient";

export default async function ContentPage() {
  const blocks = await prisma.contentBlock.findMany({
    orderBy: { slug: "asc" },
  });

  const serialized = blocks.map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.title ?? "",
    body: b.body,
    imageUrl: b.imageUrl ?? "",
    metadata: b.metadata as Record<string, unknown> | null,
    updatedAt: b.updatedAt.toISOString(),
    updatedBy: b.updatedBy ?? "",
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage website content blocks ({blocks.length} total)
        </p>
      </div>
      <ContentClient blocks={serialized} />
    </div>
  );
}
