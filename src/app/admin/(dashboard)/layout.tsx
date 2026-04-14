import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getCurrentUser();

  if (!payload) {
    redirect("/admin/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { name: true, email: true, role: true },
  });

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <AdminSidebar
        userName={user.name}
        userEmail={user.email}
        userRole={user.role}
      />
      {/* Main content */}
      <main className="min-h-screen pt-14 lg:pl-64 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
