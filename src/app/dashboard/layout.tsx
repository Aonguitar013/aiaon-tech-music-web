import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, ShieldCheck } from "lucide-react";
import { logout } from "@/app/login/actions";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { DesktopNavLink } from "@/components/dashboard/DesktopNavLink";

// Plain serializable data — no React components/functions in this array
const navLinks = [
  { label: "ภาพรวม (Overview)",     href: "/dashboard",             iconName: "LayoutDashboard" },
  { label: "คอร์สเรียน (Academy)",  href: "/dashboard/academy",     iconName: "BookOpen"        },
  { label: "สินค้า (Marketplace)",  href: "/dashboard/marketplace", iconName: "ShoppingCart"    },
  { label: "โปรไฟล์ (Profile)",     href: "/dashboard/profile",     iconName: "User"            },
  { label: "ตั้งค่า (Settings)",    href: "/dashboard/settings",    iconName: "Settings"        },
];

const adminOnlyLinks = [
  { label: "Admin — Orders", href: "/dashboard/admin", iconName: "Receipt" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Check admin status once at layout level
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin =
    profile?.role === "admin" || user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const userInitial = user.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="flex min-h-screen bg-black">
      {/* ─── Desktop Sidebar ──────────────────────────────────── */}
      <aside className="hidden md:flex w-72 flex-col bg-black/60 border-r border-white/10 backdrop-blur-xl relative z-20 shrink-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link
            href="/"
            className="font-prompt text-xl font-normal text-white flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            iAonTech<span className="text-blue-500">xMusic</span>
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto py-5 px-4 space-y-1">
          <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3 px-3 font-prompt">
            เมนูหลัก
          </div>

          {navLinks.map((link) => (
            <DesktopNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              iconName={link.iconName}
            />
          ))}

          {/* Admin section — only visible to admin users */}
          {isAdmin && (
            <>
              <div className="text-xs font-semibold text-orange-400/60 uppercase tracking-wider mt-5 mb-3 px-3 font-prompt flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                Admin
              </div>
              {adminOnlyLinks.map((link) => (
                <DesktopNavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  iconName={link.iconName}
                />
              ))}
            </>
          )}
        </div>

        {/* User footer */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2 mb-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold uppercase shrink-0 text-sm">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate font-prompt">
                ผู้ใช้งานระบบ
              </p>
              <p className="text-xs text-white/40 truncate">{user.email}</p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 justify-center px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all font-prompt text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> ออกจากระบบ
            </button>
          </form>
        </div>
      </aside>

      {/* ─── Main Content Area ────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden min-w-0">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-[-200px] w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

        {/* ─── Mobile Header ──────────────────────────────────── */}
        <header className="md:hidden h-16 flex items-center justify-between px-4 border-b border-white/10 bg-black/80 backdrop-blur-xl shrink-0 z-30 sticky top-0">
          <div className="flex items-center gap-3">
            {/* MobileSidebar only receives serializable primitives */}
            <MobileSidebar
              userEmail={user.email ?? ""}
              userInitial={userInitial}
              isAdmin={isAdmin}
            />
            <Link
              href="/"
              className="font-prompt text-lg font-normal text-white flex items-center gap-1"
            >
              iAonTech<span className="text-blue-500">xMusic</span>
            </Link>
          </div>

          <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold uppercase text-sm select-none">
            {userInitial}
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
