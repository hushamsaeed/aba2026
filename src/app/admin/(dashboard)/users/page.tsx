import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UsersClient } from "./UsersClient";

export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  const serialized = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage admin users ({users.length} total)
        </p>
      </div>
      <UsersClient users={serialized} currentUserId={currentUser.userId} />
    </div>
  );
}
