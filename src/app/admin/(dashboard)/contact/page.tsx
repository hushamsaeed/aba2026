import { prisma } from "@/lib/db";
import { ContactClient } from "./ContactClient";

export default async function ContactPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = contacts.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    subject: c.subject ?? "",
    message: c.message,
    read: c.read,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Contact Submissions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage contact messages ({contacts.length} total,{" "}
          {contacts.filter((c) => !c.read).length} unread)
        </p>
      </div>
      <ContactClient contacts={serialized} />
    </div>
  );
}
