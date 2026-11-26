"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  LogIn,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  Gift,
  Briefcase,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Music,
  BookOpen,
  Search,
  Crown,
  Database,
  PawPrint,
  Target,
  Backpack,
  Cat,
  Sliders,
  Radio,
  UserRound,
  Zap,
  ScrollText,
  ArrowUpRight,
} from "lucide-react";
import { useCommandMenu } from "@/components/command-menu/CommandMenuProvider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { logout } from "@/app/login/actions";
import { cn } from "@/lib/utils";
import { createClient as createBrowserSupabase } from "@/utils/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import {
  NAVIGATION_PILLARS,
  type NavIconKey,
  type NavPillarGroup,
  type PillarId,
} from "@/config/navigationRegistry";

const ICON_MAP: Record<NavIconKey, React.ComponentType<{ className?: string }>> = {
  crown: Crown,
  database: Database,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
  briefcase: Briefcase,
  "paw-print": PawPrint,
  "book-open": BookOpen,
  "graduation-cap": GraduationCap,
  target: Target,
  backpack: Backpack,
  music: Music,
  cat: Cat,
  sliders: Sliders,
  radio: Radio,
  "user-round": UserRound,
  zap: Zap,
  "scroll-text": ScrollText,
};

function getPillarIconStyles(pillar: PillarId) {
  switch (pillar) {
    case "tech":
      return "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]";
    case "edu":
      return "bg-[#FEF9EF] text-[#92400E] border-[#FDE68A]";
    case "audio":
      return "bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]";
    case "studio":
      return "bg-[#FAF5FF] text-[#6D28D9] border-[#DDD6FE]";
    case "about":
    default:
      return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
  }
}

function getBadgeStyles(tone?: "blue" | "amber" | "violet" | "teal" | "rose") {
  switch (tone) {
    case "blue":
      return "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]";
    case "violet":
      return "bg-[#FAF5FF] text-[#6D28D9] border-[#DDD6FE]";
    case "teal":
      return "bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]";
    case "rose":
      return "bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]";
    case "amber":
    default:
      return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
  }
}

interface NavbarProps {
  /** Optional initial user (e.g. from a server component). Normally resolved client-side. */
  user?: SupabaseUser | null;
}

export function Navbar({ user: initialUser = null }: NavbarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<SupabaseUser | null>(initialUser);
  const { open: openCommandMenu } = useCommandMenu();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Desktop Mega Menu state (supports hover, click, keyboard & Escape)
  const [activePillarId, setActivePillarId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Single-open Mobile Accordion state (opening one collapses others)
  const [openMobilePillar, setOpenMobilePillar] = useState<string | null>("products");

  // Resolve Supabase auth state client-side
  useEffect(() => {
    const supabase = createBrowserSupabase();
    let active = true;

    supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    setUser(null);
    try {
      await createBrowserSupabase().auth.signOut();
    } catch {
      // ignore – server action below also clears session
    }
    await logout();
  };

  // Close menus on route change
  useEffect(() => {
    setActivePillarId(null);
    setMobileOpen(false);
  }, [pathname]);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(scrollTop > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click & Escape key dismissal
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActivePillarId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePillarId(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openDesktopMenu = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActivePillarId(id);
  };

  const scheduleCloseDesktopMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActivePillarId(null);
    }, 160);
  };

  const activeGroup: NavPillarGroup | undefined = NAVIGATION_PILLARS.find(
    (g) => g.id === activePillarId
  );

  return (
    <header
      ref={navRef}
      data-aiaon-shell=""
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 border-b border-[#E2E8F0] bg-[#FAF8F5]/95 backdrop-blur-md text-[#0F172A]",
        isScrolled && "shadow-[0_8px_24px_rgba(48,39,24,0.06)] bg-[#FAF8F5]/98"
      )}
    >
      <div className="max-w-[1240px] mx-auto flex h-[66px] lg:h-[74px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Master Brand Logo (Geometric iA Monogram + AiAon Tech) */}
        <Link
          href="/"
          aria-label="AiAon Tech — หน้าแรก"
          className="shrink-0 inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-xl py-1 pr-2"
        >
          <svg
            aria-hidden="true"
            width="34"
            height="28"
            viewBox="0 0 64 52"
            className="shrink-0 transition-transform duration-200 group-hover:scale-105"
          >
            <circle cx="15" cy="8" r="6" fill="#22D3EE" />
            <path
              d="M10 19h13L10 49H0zm6 30L36 5q5-7 10 0l18 44H50L40 24 29 49z"
              fill="#2563EB"
            />
            <path d="M34 36h13l6 13H43z" fill="#0EA5E9" />
          </svg>
          <span className="font-prompt text-[19px] font-bold tracking-tight text-[#0F172A] whitespace-nowrap">
            AiAon <span className="text-[#2563EB]">Tech</span>
          </span>
        </Link>

        {/* Desktop 4-Pillar Mega Navigation (>= 1024px) */}
        <nav
          aria-label="เมนูหลัก 4 เสาหลัก"
          className="hidden lg:flex items-center gap-1"
          onMouseLeave={scheduleCloseDesktopMenu}
        >
          {NAVIGATION_PILLARS.map((group) => {
            const isOpen = activePillarId === group.id;
            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => openDesktopMenu(group.id)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`mega-menu-${group.id}`}
                  onClick={() =>
                    setActivePillarId(isOpen ? null : group.id)
                  }
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-prompt font-medium transition-colors cursor-pointer select-none whitespace-nowrap",
                    isOpen
                      ? "bg-white text-[#0F172A] shadow-xs ring-1 ring-[#E2E8F0]"
                      : "text-[#475569] hover:text-[#0F172A] hover:bg-white/70"
                  )}
                >
                  <span className="text-[11px] font-mono font-semibold text-[#475569]">
                    {group.number}
                  </span>
                  <span>{group.label}</span>
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 text-[#64748B] transition-transform duration-200",
                      isOpen && "rotate-180 text-[#0F172A]"
                    )}
                  />
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right Action Controls (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Quick Search (⌘K) */}
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="ค้นหาด่วน (Ctrl+K)"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-[#FFFDF9] border border-[#E2E8F0] hover:border-[#2563EB]/40 text-[#475569] hover:text-[#0F172A] text-xs font-prompt transition-all cursor-pointer shadow-2xs"
          >
            <Search className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden xl:inline">ค้นหา...</span>
            <kbd className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-[#64748B] bg-[#FAF8F5] border border-[#E2E8F0] rounded-md">
              ⌘K
            </kbd>
          </button>

          {/* 🎁 Freebies Lead Magnet CTA (WCAG AA 8.15:1) */}
          <Link
            href="/freebies"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border border-[#FDE68A] text-sm font-prompt font-semibold transition-all whitespace-nowrap shadow-2xs"
          >
            <Gift className="w-4 h-4 shrink-0" />
            <span>Freebies</span>
          </Link>

          {/* Auth-Aware Console CTA */}
          {user ? (
            <div className="flex items-center gap-1.5">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-prompt font-semibold transition-all whitespace-nowrap"
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>แผงควบคุม</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="ออกจากระบบ"
                title="ออกจากระบบ"
                className="inline-flex items-center justify-center p-2 rounded-xl border border-[#E2E8F0] bg-white text-[#475569] hover:text-[#BE123C] hover:border-[#FECDD3] hover:bg-[#FFF1F2] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-prompt font-semibold transition-all whitespace-nowrap shadow-xs"
            >
              <LogIn className="w-4 h-4 shrink-0" />
              <span>เข้าสู่ระบบ</span>
            </Link>
          )}
        </div>

        {/* Mobile Actions (< 1024px) */}
        <div className="flex lg:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="ค้นหาด่วน (Ctrl+K)"
            className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#FFFDF9] transition-colors cursor-pointer"
          >
            <Search className="h-4 w-4 text-[#2563EB]" />
          </button>

          <Link
            href="/freebies"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A] text-xs font-prompt font-semibold whitespace-nowrap"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>ฟรี</span>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="เปิดเมนูหลัก"
              className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] hover:bg-[#FFFDF9] transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-[380px] bg-[#FAF8F5] text-[#0F172A] border-l border-[#E2E8F0] overflow-y-auto px-5 pt-6 pb-24"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setMobileOpen(false);
              }}
            >
              <SheetTitle className="text-left font-prompt text-lg font-bold text-[#0F172A] flex items-center gap-2 pb-4 border-b border-[#E2E8F0]">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                AiAon Universe
              </SheetTitle>

              {/* Single-Open 4-Pillar Accordion */}
              <div className="flex flex-col gap-2.5 mt-4">
                {NAVIGATION_PILLARS.map((group) => {
                  const isExpanded = openMobilePillar === group.id;
                  return (
                    <div
                      key={group.id}
                      className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-2xs"
                    >
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setOpenMobilePillar(isExpanded ? null : group.id)
                        }
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left font-prompt cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono font-bold text-[#94A3B8]">
                            {group.number}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-[#0F172A]">
                              {group.label}
                            </div>
                            <div className="text-[11px] text-[#64748B]">
                              {group.thaiLabel}
                            </div>
                          </div>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 text-[#64748B] transition-transform duration-200",
                            isExpanded && "rotate-180 text-[#0F172A]"
                          )}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5 border-t border-[#F1F5F9]">
                          {group.items.map((item) => {
                            const IconComp = ICON_MAP[item.icon];
                            return (
                              <Link
                                key={item.id}
                                href={item.href}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] transition-colors"
                              >
                                <div
                                  className={cn(
                                    "w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5",
                                    getPillarIconStyles(group.pillar)
                                  )}
                                >
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span className="text-sm font-semibold text-[#0F172A] truncate">
                                      {item.label}
                                    </span>
                                    {item.badge && (
                                      <span
                                        className={cn(
                                          "text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0",
                                          getBadgeStyles(item.badgeTone)
                                        )}
                                      >
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-[#475569] line-clamp-1 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Mobile Freebies & Auth */}
                <Link
                  href="/freebies"
                  className="mt-2 flex items-center justify-between px-4 py-3 rounded-2xl bg-[#FEF3C7] text-[#78350F] border border-[#FDE68A] font-prompt text-sm font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    คลังของแจกฟรี (Freebies)
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {user ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0F172A] text-white font-prompt text-sm font-semibold"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      แผงควบคุมสมาชิก
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#FFF1F2] text-[#BE123C] border border-[#FECDD3] font-prompt text-sm font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      ออกจากระบบ
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="mt-2 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0F172A] text-white font-prompt text-sm font-semibold"
                  >
                    <LogIn className="w-4 h-4" />
                    เข้าสู่ระบบ / คอนโซล
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop 2-Column Floating Mega Menu Panel */}
      {activeGroup && (
        <div
          id={`mega-menu-${activeGroup.id}`}
          onMouseEnter={() => openDesktopMenu(activeGroup.id)}
          onMouseLeave={scheduleCloseDesktopMenu}
          className="hidden lg:block absolute left-0 right-0 top-full pt-2 px-6 pointer-events-none"
        >
          <div className="max-w-[820px] mx-auto pointer-events-auto bg-white border border-[#E2E8F0] rounded-[20px] shadow-[0_20px_50px_rgba(15,23,42,0.10)] p-5 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#94A3B8]">
                  {activeGroup.number}
                </span>
                <span className="font-prompt text-sm font-bold text-[#0F172A]">
                  {activeGroup.label}
                </span>
                <span className="text-xs font-prompt text-[#64748B]">
                  · {activeGroup.thaiLabel}
                </span>
              </div>
              <span className="text-[11px] font-prompt text-[#64748B]">
                AiAon Creative Studio
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {activeGroup.items.map((item) => {
                const IconComp = ICON_MAP[item.icon];
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setActivePillarId(null)}
                    className="group flex items-start gap-3.5 p-3 rounded-2xl border border-transparent hover:border-[#E2E8F0] hover:bg-[#FAF8F5] transition-all"
                  >
                    <div
                      className={cn(
                        "w-[42px] h-[42px] rounded-[13px] border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105",
                        getPillarIconStyles(activeGroup.pillar)
                      )}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-prompt text-sm font-semibold text-[#0F172A] group-hover:text-[#2563EB] transition-colors truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={cn(
                              "text-[10px] font-prompt font-semibold px-2 py-0.5 rounded-full border shrink-0",
                              getBadgeStyles(item.badgeTone)
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="font-prompt text-xs text-[#475569] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
