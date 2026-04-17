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
      className={`flex items-center justify-between gap-3 px-3 py-3 rounded-lg font-prompt font-medium transition-all group ${
        isActive
          ? "bg-blue-500/15 text-white border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.1)]"
          : "text-white/70 hover:text-white hover:bg-white/10 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={`w-5 h-5 transition-colors ${
            isActive
              ? "text-blue-400"
              : "text-blue-400/60 group-hover:text-blue-300"
          }`}
        />
        <span>{label}</span>
      </div>
      {isActive && (
        <ChevronRight className="w-4 h-4 text-blue-400/50 shrink-0" />
      )}
    </Link>
  );
}
