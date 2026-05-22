"use client";

import Link from "next/link";
import { Menu, LogOut, LayoutDashboard, GraduationCap, ShoppingBag, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { logout } from "@/app/login/actions";

const routes = [
  { name: "คอร์สเรียน", href: "/#academy", icon: GraduationCap },
  { name: "สินค้าและบริการ", href: "/#products", icon: ShoppingBag },
  { name: "ระบบออนไลน์", href: "/#saas", icon: Terminal },
];

interface NavbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="font-prompt text-xl font-normal text-white flex items-center gap-1 transition-all duration-300 hover:text-amber-400 hover:-translate-y-0.5 group">
            iAonTech<span className="text-blue-500 group-hover:text-amber-400 transition-colors duration-300">xMusic</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {routes.map((route) => {
                const Icon = route.icon;
                return (
                  <NavigationMenuItem key={route.name}>
                    <NavigationMenuLink 
                      className="bg-transparent text-white/70 hover:text-amber-400 hover:bg-amber-400/5 border border-transparent hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] px-3 py-2 rounded-lg font-prompt text-xl font-normal transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                      render={<Link href={route.href} />}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {route.name}
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
                    className="bg-transparent text-white/70 hover:text-amber-400 hover:bg-amber-400/5 border border-transparent hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] px-3 py-2 rounded-lg font-prompt text-xl font-normal transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                  >
                      <LayoutDashboard className="w-5 h-5" /> แผงควบคุม
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
                  const Icon = route.icon;
                  return (
                    <Link 
                      key={route.name}
                      href={route.href}
                      className="font-prompt text-base font-normal text-white/70 hover:text-amber-400 hover:bg-amber-400/5 border border-transparent hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {route.name}
                    </Link>
                  );
                })}
                
                {user ? (
                   <>
                     <Link 
                       href="/dashboard" 
                       className="font-prompt text-base font-normal text-white/70 hover:text-amber-400 hover:bg-amber-400/5 border border-transparent hover:border-amber-400/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] px-4 py-2.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
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
