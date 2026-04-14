"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Mic2,
  Building2,
  CalendarDays,
  FileText,
  Settings,
  UserCog,
  ClipboardList,
  Mail,
  Sparkles,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";

interface AdminSidebarProps {
  userName: string;
  userEmail: string;
  userRole: string;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/registrations", label: "Registrations", icon: ClipboardList },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/speakers", label: "Speakers", icon: Mic2 },
  { href: "/admin/sponsors", label: "Sponsors", icon: Building2 },
  { href: "/admin/program", label: "Program", icon: CalendarDays },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/users", label: "Users", icon: UserCog },
  { href: "/admin/applications", label: "Applications", icon: Users },
  { href: "/admin/contact", label: "Contact", icon: Mail },
  { href: "/admin/gemini", label: "Gemini (AI Images)", icon: Sparkles },
];

function NavContent({
  pathname,
  userName,
  userEmail,
  userRole,
  collapsed,
  onLogout,
}: {
  pathname: string;
  userName: string;
  userEmail: string;
  userRole: string;
  collapsed: boolean;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
        <Image
          src="/logos/aba-logo.png"
          alt="ABA"
          width={36}
          height={36}
          className="shrink-0 rounded"
        />
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate font-heading text-sm font-semibold text-sidebar-foreground">
              ABA 2026
            </p>
            <p className="truncate text-xs text-sidebar-foreground/50">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-sidebar-border p-3">
        {!collapsed && (
          <div className="mb-2 px-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {userName}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/50">
              {userEmail}
            </p>
            <span className="mt-1 inline-block rounded-full bg-sidebar-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-sidebar-accent-foreground">
              {userRole}
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={onLogout}
          className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  );
}

export function AdminSidebar({
  userName,
  userEmail,
  userRole,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile trigger */}
      <div className="fixed left-0 top-0 z-40 flex h-14 w-full items-center border-b border-border bg-background px-4 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            }
          />
          <SheetContent side="left" className="w-72 bg-sidebar p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <NavContent
              pathname={pathname}
              userName={userName}
              userEmail={userEmail}
              userRole={userRole}
              collapsed={false}
              onLogout={handleLogout}
            />
          </SheetContent>
        </Sheet>
        <span className="ml-3 font-heading text-sm font-semibold">
          ABA Admin
        </span>
      </div>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 lg:flex",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <NavContent
          pathname={pathname}
          userName={userName}
          userEmail={userEmail}
          userRole={userRole}
          collapsed={collapsed}
          onLogout={handleLogout}
        />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-7 flex size-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground/60 shadow-sm transition hover:text-sidebar-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={cn(
              "size-3.5 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </button>
      </aside>
    </>
  );
}
