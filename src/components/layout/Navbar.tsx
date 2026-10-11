"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, LogOut, LayoutDashboard, GraduationCap, ShoppingBag, Terminal, Gift, Briefcase, Shirt, ChevronDown, Info, Wrench, FileText, Sparkles, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { logout } from "@/app/login/actions";
import { cn } from "@/lib/utils";

interface SubRouteItem {
  name: string;
  href: string;
  description?: string;
  badge?: string;
  badgeColor?: "amber" | "purple" | "cyan" | "pink" | "teal";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>;
  hoverColor?: string;
}

interface RouteItem {
  name: string;
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: React.ComponentType<any>;
  hoverColor: string;
  badge?: string;
  isSpecial?: boolean;
  items?: SubRouteItem[];
}

const routes: RouteItem[] = [
  { name: "หน้าแรก", href: "/", icon: Terminal, hoverColor: "cyan" },
  {
    name: "คลังระบบ & สินค้า",
    icon: ShoppingBag,
    hoverColor: "amber",
    items: [
      { 
        name: "คลังระบบครู & โรงเรียน", 
        href: "/digital-vault", 
        description: "20+ ระบบ Google Apps Script ลดงานเอกสาร ประเมิน ว.PA", 
        badge: "ยอดนิยม", 
        badgeColor: "amber", 
        icon: ShoppingBag, 
        hoverColor: "amber" 
      },
      { 
        name: "คลังนักเรียน & TCAS", 
        href: "/student-vault", 
        description: "Web Portfolio 3D, ระบบเช็คการบ้าน, AI Prompts", 
        badge: "เริ่มต้น 69 ฿", 
        badgeColor: "pink", 
        icon: GraduationCap, 
        hoverColor: "pink" 
      },
      { 
        name: "แพ็กเกจเหมาสุดคุ้ม (Bundles)", 
        href: "/bundles", 
        description: "ประหยัดสูงสุด 70% ปลดล็อกระบบยกชุดพร้อมใช้งาน", 
        badge: "คุ้มสุด", 
        badgeColor: "purple", 
        icon: Sparkles, 
        hoverColor: "purple" 
      },
    ],
  },
  {
    name: "บริการ & เครื่องมือ",
    icon: Wrench,
    hoverColor: "teal",
    items: [
      { 
        name: "รับติดตั้ง & เฝ้าดูแล AI รายเดือน", 
        href: "/ai-caretaker", 
        description: "แอดมิน AI ตอบแชท ตรวจสลิป จองคิว พร้อมระบบเฝ้าระวัง 24 ชม.", 
        badge: "ใหม่! 990฿/ด.", 
        badgeColor: "teal", 
        icon: ShieldCheck, 
        hoverColor: "teal" 
      },
      { 
        name: "รวมช่องทาง & หน้าร้านไอทีครูอ้น", 
        href: "/channels", 
        description: "ครบทุกแพลตฟอร์ม + พิกัดอุปกรณ์ไอทีของแท้ TikTok Shop, Shopee, Lazada", 
        badge: "HUB", 
        badgeColor: "amber", 
        icon: Globe, 
        hoverColor: "amber" 
      },
      { 
        name: "บริการรับพัฒนาระบบตามสั่ง", 
        href: "/services", 
        description: "ออกแบบและพัฒนา Web App เฉพาะโรงเรียนและองค์กร", 
        icon: Briefcase, 
        hoverColor: "teal" 
      },
      { 
        name: "iAon IT ง่ายๆ (Demo Playground)", 
        href: "/saas", 
        description: "ทดลองเล่น Simulator สดและสแกนเช็คชื่ออัตโนมัติ", 
        icon: Terminal, 
        hoverColor: "cyan" 
      },
    ],
  },
  { 
    name: "ช่องทาง & ร้านไอที", 
    href: "/channels", 
    icon: Globe, 
    hoverColor: "amber"
  },
  { 
    name: "ของแจกฟรี", 
    href: "/freebies", 
    icon: Gift, 
    hoverColor: "purple", 
    badge: "FREE",
    isSpecial: true 
  },
  { name: "เกี่ยวกับเรา", href: "/about", icon: Info, hoverColor: "cyan" },
];

interface NavbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

export function Navbar({ user }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileMenus, setOpenMobileMenus] = useState<Record<string, boolean>>({});

  const toggleMobileMenu = (name: string) => {
    setOpenMobileMenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger check immediately in case page is already scrolled on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500",
      isScrolled 
        ? "glass-nav py-2" 
        : "bg-transparent border-b border-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="shrink-0 flex items-center">
          <Link href="/" className="font-prompt text-xl font-normal text-white flex items-center gap-1 transition-all duration-300 hover:text-cyan-400 hover:-translate-y-0.5 group whitespace-nowrap">
            iAonTech<span className="text-blue-500 group-hover:text-cyan-400 transition-colors duration-300">xMusic</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <NavigationMenu>
            <NavigationMenuList className="gap-1 flex-nowrap">
              {routes.map((route) => {
                const isCyan   = route.hoverColor === "cyan";
                const isPurple = route.hoverColor === "purple";
                const isTeal   = route.hoverColor === "teal";

                // 1. Special Highlighted Item (e.g. ของแจกฟรี 🎁)
                if (route.isSpecial) {
                  return (
                    <NavigationMenuItem key={route.name} className="shrink-0">
                      <NavigationMenuLink 
                        className="relative w-max whitespace-nowrap shrink-0 px-3 py-1.5 rounded-xl font-prompt text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 bg-linear-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/30 text-purple-200 hover:text-white hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer group select-none"
                        render={<Link href={route.href || ""} />}
                      >
                        <Gift className="w-4 h-4 text-pink-400 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
                        <span>{route.name}</span>
                        <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                          FREE
                        </span>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }

                // 2. Dropdown Menu with Rich 2-Line Sub-items
                if ("items" in route && route.items) {
                  const TriggerIcon = route.icon;
                  return (
                    <NavigationMenuItem key={route.name} className="shrink-0">
                      <NavigationMenuTrigger
                        className={cn(
                          "relative w-max whitespace-nowrap shrink-0 bg-transparent text-white/80 px-3 py-1.5 rounded-xl font-prompt text-sm font-normal transition-all duration-300 flex items-center gap-1.5 group select-none cursor-pointer border border-transparent data-[state=open]:text-white data-[state=open]:bg-white/5 data-[state=open]:border-white/10 data-open:text-white data-open:bg-white/5 data-open:border-white/10",
                          isTeal
                            ? "hover:text-teal-400 hover:bg-teal-500/5 hover:border-teal-500/20 data-[state=open]:text-teal-400 data-[state=open]:bg-teal-500/5 data-[state=open]:border-teal-500/20"
                            : isPurple
                            ? "hover:text-purple-400 hover:bg-purple-500/5 hover:border-purple-500/20 data-[state=open]:text-purple-400 data-[state=open]:bg-purple-500/5 data-[state=open]:border-purple-500/20"
                            : isCyan 
                            ? "hover:text-cyan-400 hover:bg-cyan-500/5 hover:border-cyan-500/20 data-[state=open]:text-cyan-400 data-[state=open]:bg-cyan-500/5 data-[state=open]:border-cyan-500/20"
                            : "hover:text-amber-400 hover:bg-amber-400/5 hover:border-amber-400/20 data-[state=open]:text-amber-400 data-[state=open]:bg-amber-400/5 data-[state=open]:border-amber-400/20"
                        )}
                      >
                        {TriggerIcon && <TriggerIcon className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />}
                        {route.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="flex flex-col gap-1.5 w-[360px] sm:w-[400px] p-2.5 bg-black/95 border border-white/15 rounded-2xl backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-200">
                        {route.items.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubTeal   = subItem.hoverColor === "teal";
                          const isSubPurple = subItem.hoverColor === "purple";
                          const isSubCyan   = subItem.hoverColor === "cyan";
                          const isSubPink   = subItem.hoverColor === "pink";

                          return (
                            <NavigationMenuLink
                              key={subItem.name}
                              className={cn(
                                "flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 group hover:translate-x-1 cursor-pointer select-none border border-transparent",
                                isSubTeal
                                  ? "hover:bg-teal-500/10 hover:border-teal-500/20"
                                  : isSubPurple
                                  ? "hover:bg-purple-500/10 hover:border-purple-500/20"
                                  : isSubCyan
                                  ? "hover:bg-cyan-500/10 hover:border-cyan-500/20"
                                  : isSubPink
                                  ? "hover:bg-pink-500/10 hover:border-pink-500/20"
                                  : "hover:bg-amber-400/10 hover:border-amber-400/20"
                              )}
                              render={<Link href={subItem.href || ""} />}
                            >
                              <div className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border transition-all duration-300",
                                isSubTeal
                                  ? "bg-teal-500/10 border-teal-500/30 text-teal-400 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                                  : isSubPurple
                                  ? "bg-purple-500/10 border-purple-500/30 text-purple-400 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                                  : isSubCyan
                                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                                  : isSubPink
                                  ? "bg-pink-500/10 border-pink-500/30 text-pink-400 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(244,63,94,0.4)]"
                                  : "bg-amber-400/10 border-amber-400/30 text-amber-400 group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.4)]"
                              )}>
                                {SubIcon && <SubIcon className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className={cn(
                                    "font-prompt text-sm font-medium transition-colors duration-200",
                                    isSubTeal ? "text-white/90 group-hover:text-teal-300"
                                    : isSubPurple ? "text-white/90 group-hover:text-purple-300"
                                    : isSubCyan ? "text-white/90 group-hover:text-cyan-300"
                                    : isSubPink ? "text-white/90 group-hover:text-pink-300"
                                    : "text-white/90 group-hover:text-amber-300"
                                  )}>
                                    {subItem.name}
                                  </span>
                                  {subItem.badge && (
                                    <span className={cn(
                                      "text-[10px] font-prompt px-2 py-0.5 rounded-full border shrink-0 font-medium",
                                      subItem.badgeColor === "amber" && "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.2)]",
                                      subItem.badgeColor === "pink" && "bg-pink-500/15 text-pink-300 border-pink-500/30 shadow-[0_0_8px_rgba(244,63,94,0.2)]",
                                      subItem.badgeColor === "purple" && "bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.2)]",
                                      subItem.badgeColor === "teal" && "bg-teal-500/15 text-teal-300 border-teal-500/30 shadow-[0_0_8px_rgba(20,184,166,0.2)]",
                                      subItem.badgeColor === "cyan" && "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                                    )}>
                                      {subItem.badge}
                                    </span>
                                  )}
                                </div>
                                {subItem.description && (
                                  <p className="text-xs font-prompt text-white/50 group-hover:text-white/70 transition-colors line-clamp-1 font-light mt-0.5">
                                    {subItem.description}
                                  </p>
                                )}
                              </div>
                            </NavigationMenuLink>
                          );
                        })}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                // 3. Regular Top-Level Nav Link
                return (
                  <NavigationMenuItem key={route.name} className="shrink-0">
                    <NavigationMenuLink 
                      className={cn(
                        "relative w-max whitespace-nowrap shrink-0 bg-transparent text-white/75 px-3 py-1.5 rounded-xl font-prompt text-sm font-normal transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 group overflow-hidden border border-transparent select-none cursor-pointer",
                        isTeal
                          ? "hover:text-teal-400 hover:bg-teal-500/5 hover:border-teal-500/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                          : isPurple
                          ? "hover:text-purple-400 hover:bg-purple-500/5 hover:border-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                          : isCyan 
                          ? "hover:text-cyan-400 hover:bg-cyan-500/5 hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                          : "hover:text-amber-400 hover:bg-amber-400/5 hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      )}
                      render={<Link href={route.href || ""} />}
                    >
                      {route.icon && <route.icon className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />}
                      <span>{route.name}</span>
                      {/* Underline glow effect */}
                      <span className={cn(
                        "absolute bottom-0 left-3 right-3 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center",
                        isTeal
                          ? "bg-linear-to-r from-teal-400 to-emerald-400 shadow-[0_0_8px_rgba(20,184,166,0.8)]"
                          : isPurple
                          ? "bg-linear-to-r from-purple-400 to-pink-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                          : isCyan 
                          ? "bg-linear-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                          : "bg-linear-to-r from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                      )} />
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          {user ? (
              <div className="flex items-center gap-2 ml-1 shrink-0">
                  <Link 
                    href="/dashboard" 
                    className="relative w-max whitespace-nowrap shrink-0 bg-transparent text-white/80 px-3.5 py-1.5 rounded-xl font-prompt text-sm font-normal transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 group overflow-hidden hover:text-cyan-400 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                  >
                      <LayoutDashboard className="w-4 h-4 shrink-0" /> <span>แผงควบคุม</span>
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-linear-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => logout()}
                    className="rounded-full border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all flex items-center justify-center p-2 w-8 h-8 active:scale-95 shrink-0"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </Button>
              </div>
          ) : (
            <Link href="/login" className="ml-1 shrink-0">
              <Button 
                variant="outline" 
                className="w-max whitespace-nowrap shrink-0 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all font-prompt text-sm font-medium px-4 py-1.5 active:scale-95 h-8.5"
              >
                เข้าสู่ระบบ
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation (Hamburger) */}
        <div className="flex lg:hidden items-center">
          <Sheet>
            <SheetTrigger className="p-2 text-white hover:bg-white/10 rounded-xl transition-colors flex items-center justify-center">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open main menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-l border-white/10 overflow-y-auto">
              <SheetTitle className="text-left font-prompt text-xl font-bold text-white mb-6">
                เมนูหลัก
              </SheetTitle>
              <div className="flex flex-col gap-2 mt-6">
                {routes.map((route) => {
                  const isCyan   = route.hoverColor === "cyan";
                  const isPurple = route.hoverColor === "purple";
                  const isTeal   = route.hoverColor === "teal";

                  // Mobile: Special Item (ของแจกฟรี)
                  if (route.isSpecial) {
                    return (
                      <Link 
                        key={route.name}
                        href={route.href || ""}
                        className="font-prompt text-base font-medium text-purple-200 bg-linear-to-r from-purple-500/15 to-pink-500/15 border border-purple-500/30 hover:border-purple-400/60 px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-between shadow-[0_0_15px_rgba(168,85,247,0.2)] mt-1"
                      >
                        <span className="flex items-center gap-2.5">
                          <Gift className="w-5 h-5 text-pink-400" />
                          {route.name}
                        </span>
                        <span className="bg-linear-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                          FREE
                        </span>
                      </Link>
                    );
                  }

                  // Mobile: Dropdown Accordion
                  if ("items" in route && route.items) {
                    const isExpanded = !!openMobileMenus[route.name];
                    const MobileDropdownIcon = route.icon;
                    return (
                      <div key={route.name} className="flex flex-col">
                        <button
                          onClick={() => toggleMobileMenu(route.name)}
                          className={cn(
                            "font-prompt text-base font-normal text-white/80 px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between w-full text-left outline-none cursor-pointer",
                            isTeal
                              ? "hover:text-teal-400 hover:bg-teal-500/5 active:scale-95"
                              : isPurple
                              ? "hover:text-purple-400 hover:bg-purple-500/5 active:scale-95"
                              : isCyan 
                              ? "hover:text-cyan-400 hover:bg-cyan-500/5 active:scale-95"
                              : "hover:text-amber-400 hover:bg-amber-400/5 active:scale-95"
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            {MobileDropdownIcon && <MobileDropdownIcon className="w-5 h-5 shrink-0 opacity-70" />}
                            {route.name}
                          </span>
                          <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 opacity-70", isExpanded && "rotate-180")} />
                        </button>
                        
                        <div className={cn(
                          "grid transition-all duration-300 ease-in-out pl-2 overflow-hidden",
                          isExpanded ? "grid-rows-[1fr] opacity-100 mt-1 mb-2" : "grid-rows-[0fr] opacity-0"
                        )}>
                          <div className="overflow-hidden flex flex-col gap-1.5 border-l border-white/10 pl-2">
                            {route.items.map((subItem) => {
                              const SubIcon = subItem.icon;
                              const isSubTeal   = subItem.hoverColor === "teal";
                              const isSubPurple = subItem.hoverColor === "purple";
                              const isSubCyan   = subItem.hoverColor === "cyan";
                              const isSubPink   = subItem.hoverColor === "pink";

                              return (
                                <Link 
                                  key={subItem.name}
                                  href={subItem.href || ""}
                                  className={cn(
                                    "font-prompt p-2.5 rounded-xl transition-all duration-300 flex items-start gap-2.5 bg-white/[0.02] border border-white/5",
                                    isSubTeal
                                      ? "hover:text-teal-400 hover:bg-teal-500/10 hover:border-teal-500/20"
                                      : isSubPurple
                                      ? "hover:text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/20"
                                      : isSubCyan 
                                      ? "hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20"
                                      : isSubPink
                                      ? "hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/20"
                                      : "hover:text-amber-400 hover:bg-amber-400/10 hover:border-amber-400/20"
                                  )}
                                >
                                  {SubIcon && <SubIcon className="w-4 h-4 shrink-0 mt-0.5 text-white/60" />}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-sm font-medium text-white/90">{subItem.name}</span>
                                      {subItem.badge && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                                          {subItem.badge}
                                        </span>
                                      )}
                                    </div>
                                    {subItem.description && (
                                      <p className="text-xs text-white/40 line-clamp-1 font-light mt-0.5">{subItem.description}</p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Mobile: Regular Links
                  const Icon = route.icon;
                  return (
                    <Link 
                      key={route.name}
                      href={route.href || ""}
                      className={cn(
                        "font-prompt text-base font-normal text-white/80 px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5",
                        isTeal
                          ? "hover:text-teal-400 hover:bg-teal-500/5 border border-transparent hover:border-teal-500/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                          : isPurple
                          ? "hover:text-purple-400 hover:bg-purple-500/5 border border-transparent hover:border-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                          : isCyan 
                          ? "hover:text-cyan-400 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                          : "hover:text-amber-400 hover:bg-amber-400/5 border border-transparent hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      )}
                    >
                      {Icon && <Icon className="w-5 h-5 shrink-0 opacity-70" />}
                      {route.name}
                    </Link>
                  );
                })}
                
                {user ? (
                   <>
                     <Link 
                       href="/dashboard" 
                       className="font-prompt text-base font-normal text-white/80 hover:text-cyan-400 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5 mt-2"
                     >
                        <LayoutDashboard className="w-5 h-5 text-white/70" /> แผงควบคุม
                     </Link>
                     <Button 
                        onClick={() => logout()}
                        className="mt-6 w-full rounded-full bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/20 flex gap-2 font-prompt text-sm font-medium py-2.5 active:scale-95"
                     >
                        <LogOut className="w-4 h-4" /> ออกจากระบบ
                     </Button>
                   </>
                ) : (
                  <Link href="/login" className="w-full mt-4">
                    <Button 
                      className="w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] font-prompt text-sm font-medium py-2.5 active:scale-95"
                    >
                      เข้าสู่ระบบ
                    </Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}
