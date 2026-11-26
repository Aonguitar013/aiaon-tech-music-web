"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Settings,
  LogOut,
  User,
  Receipt,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { logout } from "@/app/login/actions";

interface MobileSidebarProps {
  userEmail: string;
  userInitial: string;
  isAdmin: boolean;
}

const navLinks = [
  { label: "ภาพรวม (Overview)", href: "/dashboard", icon: LayoutDashboard },
  { label: "คอร์สเรียน (Academy)", href: "/dashboard/academy", icon: BookOpen },
  { label: "สินค้า (Marketplace)", href: "/dashboard/marketplace", icon: ShoppingCart },
  { label: "โปรไฟล์ (Profile)", href: "/dashboard/profile", icon: User },
  { label: "ตั้งค่า (Settings)", href: "/dashboard/settings", icon: Settings },
];

const adminLinks = [
  { label: "Admin — Orders", href: "/dashboard/admin", icon: Receipt },
];

export function MobileSidebar({ userEmail, userInitial, isAdmin }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const allLinks = isAdmin ? [...navLinks, ...adminLinks] : navLinks;

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-amber-50 transition-all"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#FEF9EF] backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#FEF9EF] border-r border-amber-200/70 backdrop-blur-xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-amber-200/70 shrink-0">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="font-prompt text-xl font-normal text-[#1E293B] flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            iAonTech<span className="text-blue-500">xMusic</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-amber-50 transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3 font-prompt">
            เมนูหลัก
          </div>
          {allLinks.map((link) => {
            const isActive =
              link.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between gap-3 px-3 py-3 rounded-xl font-prompt font-normal transition-all group ${
                  isActive
                    ? "bg-blue-50 text-blue-900 border border-blue-200 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-amber-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? "text-blue-700"
                        : "text-blue-700/60 group-hover:text-blue-700"
                    }`}
                  />
                  {link.label}
                </div>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-blue-700/60 shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* User footer + Logout */}
        <div className="p-4 border-t border-amber-200/70 shrink-0">
          <div className="flex items-center gap-3 px-2 py-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-700 font-bold uppercase shrink-0 text-sm">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#1E293B] truncate font-prompt">
                ผู้ใช้งานระบบ
              </p>
              <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2 justify-center px-4 py-2.5 rounded-xl bg-red-500/10 text-red-700 hover:bg-red-500/20 border border-red-500/20 transition-all font-prompt text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> ออกจากระบบ
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
