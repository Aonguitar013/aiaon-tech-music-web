"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Settings,
  User,
  Receipt,
  ChevronRight,
  Presentation,
  type LucideIcon,
} from "lucide-react";

// Icon registry — maps serializable string keys to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Settings,
  User,
  Receipt,
  Presentation,
};

interface DesktopNavLinkProps {
  href: string;
  label: string;
  iconName: string; // plain string — safe to pass across server/client boundary
}

export function DesktopNavLink({ href, label, iconName }: DesktopNavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  const Icon = ICON_MAP[iconName] ?? LayoutDashboard;

  return (
    <Link
      href={href}
      className={`flex items-center justify-between gap-3 px-3 py-3 rounded-lg font-prompt font-normal transition-all group ${
        isActive
          ? "bg-blue-50 text-blue-900 border border-blue-200 shadow-sm"
          : "text-slate-600 hover:text-slate-900 hover:bg-amber-50 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={`w-5 h-5 transition-colors ${
            isActive
              ? "text-blue-700"
              : "text-blue-700/60 group-hover:text-blue-700"
          }`}
        />
        <span>{label}</span>
      </div>
      {isActive && (
        <ChevronRight className="w-4 h-4 text-blue-700/50 shrink-0" />
      )}
    </Link>
  );
}
