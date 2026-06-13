"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, LogOut, LayoutDashboard, GraduationCap, ShoppingBag, Terminal, Gift, Briefcase, Shirt, ChevronDown, Info, Wrench } from "lucide-react";
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

interface RouteItem {
  name: string;
  href?: string;
  icon?: React.ComponentType<any>;
  hoverColor: string;
  items?: RouteItem[];
}

const routes: RouteItem[] = [
  { name: "หน้าแรก", href: "/saas", icon: Terminal, hoverColor: "cyan" },
  { name: "คอร์สเรียน", href: "/#academy", icon: GraduationCap, hoverColor: "cyan" },
  {
    name: "เครื่องมือ & ระบบ",
    icon: Wrench,
    hoverColor: "cyan",
    items: [
      { name: "จัดการชั้นเรียน", href: "/classroom-management", icon: GraduationCap, hoverColor: "cyan" },
      { name: "ของแจกฟรี", href: "/freebies", icon: Gift, hoverColor: "purple" },
    ],
  },
  {
    name: "สินค้า & บริการ",
    icon: ShoppingBag,
    hoverColor: "amber",
    items: [
      { name: "คลังสินค้าดิจิทัล (Digital Vault)", href: "/digital-vault", icon: ShoppingBag, hoverColor: "amber" },
      { name: "บริการของเรา", href: "/services", icon: Briefcase, hoverColor: "teal" },
      { name: "เสื้อ AiAonTech", href: "/merch", icon: Shirt, hoverColor: "purple" },
    ],
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
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="shrink-0 flex items-center">
          <Link href="/" className="font-prompt text-xl font-normal text-white flex items-center gap-1 transition-all duration-300 hover:text-cyan-400 hover:-translate-y-0.5 group">
            iAonTech<span className="text-blue-500 group-hover:text-cyan-400 transition-colors duration-300">xMusic</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {routes.map((route) => {
                const isCyan   = route.hoverColor === "cyan";
                const isPurple = route.hoverColor === "purple";
                const isTeal   = route.hoverColor === "teal";

                if ("items" in route) {
                  const TriggerIcon = route.icon;
                  return (
                    <NavigationMenuItem key={route.name}>
                      <NavigationMenuTrigger
                        className={cn(
                          "relative bg-transparent text-white/70 px-3 py-1.5 rounded-lg font-prompt text-sm font-normal transition-all duration-300 flex items-center gap-1.5 group overflow-hidden border border-transparent select-none cursor-pointer data-[state=open]:text-white data-[state=open]:bg-white/5 data-[state=open]:border-white/10 data-open:text-white data-open:bg-white/5 data-open:border-white/10",
                          isTeal
                            ? "hover:text-teal-400 hover:bg-teal-500/5 hover:border-teal-500/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] data-open:text-teal-400 data-open:bg-teal-500/5 data-open:border-teal-500/20 data-[state=open]:text-teal-400 data-[state=open]:bg-teal-500/5 data-[state=open]:border-teal-500/20"
                            : isPurple
                            ? "hover:text-purple-400 hover:bg-purple-500/5 hover:border-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] data-open:text-purple-400 data-open:bg-purple-500/5 data-open:border-purple-500/20 data-[state=open]:text-purple-400 data-[state=open]:bg-purple-500/5 data-[state=open]:border-purple-500/20"
                            : isCyan 
                            ? "hover:text-cyan-400 hover:bg-cyan-500/5 hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] data-open:text-cyan-400 data-open:bg-cyan-500/5 data-open:border-cyan-500/20 data-[state=open]:text-cyan-400 data-[state=open]:bg-cyan-500/5 data-[state=open]:border-cyan-500/20"
                            : "hover:text-amber-400 hover:bg-amber-400/5 hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] data-open:text-amber-400 data-open:bg-amber-400/5 data-open:border-amber-400/20 data-[state=open]:text-amber-400 data-[state=open]:bg-amber-400/5 data-[state=open]:border-amber-400/20"
                        )}
                      >
                        {TriggerIcon && <TriggerIcon className="w-4 h-4 shrink-0 opacity-70" />}
                        {route.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="flex flex-col gap-1 min-w-[200px] p-2 bg-black/95 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        {route.items?.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubCyan   = subItem.hoverColor === "cyan";
                          const isSubPurple = subItem.hoverColor === "purple";
                          const isSubTeal   = subItem.hoverColor === "teal";
                          return (
                            <NavigationMenuLink
                              key={subItem.name}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2.5 rounded-lg text-white/70 font-prompt text-sm font-normal transition-all duration-300 hover:translate-x-1 cursor-pointer select-none border border-transparent",
                                isSubTeal
                                  ? "hover:text-teal-400 hover:bg-teal-500/5 hover:border-teal-500/10"
                                  : isSubPurple
                                  ? "hover:text-purple-400 hover:bg-purple-500/5 hover:border-purple-500/10"
                                  : isSubCyan
                                  ? "hover:text-cyan-400 hover:bg-cyan-500/5 hover:border-cyan-500/10"
                                  : "hover:text-amber-400 hover:bg-amber-400/5 hover:border-amber-400/10"
                              )}
                              render={<Link href={subItem.href || ""} />}
                            >
                              {SubIcon && <SubIcon className="w-4 h-4 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />}
                              {subItem.name}
                            </NavigationMenuLink>
                          );
                        })}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                return (
                  <NavigationMenuItem key={route.name}>
                    <NavigationMenuLink 
                      className={cn(
                        "relative bg-transparent text-white/70 px-3 py-1.5 rounded-lg font-prompt text-sm font-normal transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 group overflow-hidden border border-transparent",
                        isTeal
                          ? "hover:text-teal-400 hover:bg-teal-500/5 border border-transparent hover:border-teal-500/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                          : isPurple
                          ? "hover:text-purple-400 hover:bg-purple-500/5 border border-transparent hover:border-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                          : isCyan 
                          ? "hover:text-cyan-400 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                          : "hover:text-amber-400 hover:bg-amber-400/5 border border-transparent hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      )}
                      render={<Link href={route.href || ""} />}
                    >
                      {route.icon && <route.icon className="w-4 h-4 shrink-0 opacity-70" />}
                      {route.name}
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
              <div className="flex items-center gap-2">
                  <Link 
                    href="/dashboard" 
                    className="relative bg-transparent text-white/70 px-4 py-2 rounded-lg font-prompt text-xl font-normal transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group overflow-hidden hover:text-cyan-400 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                  >
                      <LayoutDashboard className="w-5 h-5" /> แผงควบคุม
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-linear-to-r from-cyan-400 to-blue-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => logout()}
                    className="rounded-full border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all flex items-center justify-center p-2 w-9 h-9 active:scale-95 shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
              </div>
          ) : (
            <Link href="/login">
              <Button 
                variant="outline" 
                className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all font-prompt text-sm font-medium px-4 py-2 active:scale-95"
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation (Hamburger) */}
        <div className="flex md:hidden items-center">
          <Sheet>
            <SheetTrigger className="p-2 text-white hover:bg-white/10 rounded-md transition-colors flex items-center justify-center">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open main menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-l border-white/10">
              <SheetTitle className="text-left font-prompt text-xl font-bold text-white mb-6">
                Menu
              </SheetTitle>
              <div className="flex flex-col gap-2 mt-8">
                {routes.map((route) => {
                  const isCyan   = route.hoverColor === "cyan";
                  const isPurple = route.hoverColor === "purple";
                  const isTeal   = route.hoverColor === "teal";

                  if ("items" in route) {
                    const isExpanded = !!openMobileMenus[route.name];
                    const MobileDropdownIcon = route.icon;
                    return (
                      <div key={route.name} className="flex flex-col">
                        <button
                          onClick={() => toggleMobileMenu(route.name)}
                          className={cn(
                            "font-prompt text-base font-normal text-white/70 px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between w-full text-left outline-none cursor-pointer",
                            isTeal
                              ? "hover:text-teal-400 hover:bg-teal-500/5 active:scale-95"
                              : isPurple
                              ? "hover:text-purple-400 hover:bg-purple-500/5 active:scale-95"
                              : isCyan 
                              ? "hover:text-cyan-400 hover:bg-cyan-500/5 active:scale-95"
                              : "hover:text-amber-400 hover:bg-amber-400/5 active:scale-95"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {MobileDropdownIcon && <MobileDropdownIcon className="w-5 h-5 shrink-0 opacity-70" />}
                            {route.name}
                          </span>
                          <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 opacity-70", isExpanded && "rotate-180")} />
                        </button>
                        
                        <div className={cn(
                          "grid transition-all duration-300 ease-in-out pl-4 overflow-hidden",
                          isExpanded ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
                        )}>
                          <div className="overflow-hidden flex flex-col gap-1.5 border-l border-white/10 pl-2">
                            {route.items?.map((subItem) => {
                              const SubIcon = subItem.icon;
                              const isSubCyan   = subItem.hoverColor === "cyan";
                              const isSubPurple = subItem.hoverColor === "purple";
                              const isSubTeal   = subItem.hoverColor === "teal";
                              return (
                                <Link 
                                  key={subItem.name}
                                  href={subItem.href || ""}
                                  className={cn(
                                    "font-prompt text-sm font-normal text-white/60 px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2",
                                    isSubTeal
                                      ? "hover:text-teal-400 hover:bg-teal-500/5"
                                      : isSubPurple
                                      ? "hover:text-purple-400 hover:bg-purple-500/5"
                                      : isSubCyan 
                                      ? "hover:text-cyan-400 hover:bg-cyan-500/5"
                                      : "hover:text-amber-400 hover:bg-amber-400/5"
                                  )}
                                >
                                  {SubIcon && <SubIcon className="w-4 h-4 shrink-0" />}
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const Icon = route.icon;
                  return (
                    <Link 
                      key={route.name}
                      href={route.href || ""}
                      className={cn(
                        "font-prompt text-base font-normal text-white/70 px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2",
                        isTeal
                          ? "hover:text-teal-400 hover:bg-teal-500/5 border border-transparent hover:border-teal-500/20 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
                          : isPurple
                          ? "hover:text-purple-400 hover:bg-purple-500/5 border border-transparent hover:border-purple-500/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                          : isCyan 
                          ? "hover:text-cyan-400 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                          : "hover:text-amber-400 hover:bg-amber-400/5 border border-transparent hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      )}
                    >
                      {Icon && <Icon className="w-5 h-5 shrink-0" />}
                      {route.name}
                    </Link>
                  );
                })}
                
                {user ? (
                   <>
                     <Link 
                       href="/dashboard" 
                       className="font-prompt text-base font-normal text-white/70 hover:text-cyan-400 hover:bg-cyan-500/5 border border-transparent hover:border-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
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
                  <Link href="/login" className="w-full">
                    <Button 
                      className="mt-6 w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] font-prompt text-sm font-medium py-2.5 active:scale-95"
                    >
                      Login
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
