"use client";

import Link from "next/link";
import { Menu, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { logout } from "@/app/login/actions";

const routes = [
  { name: "Academy", href: "/#academy" },
  { name: "Marketplace", href: "/#products" },
  { name: "SaaS Tools", href: "/#saas" },
];

interface NavbarProps {
  user?: any;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="font-prompt text-2xl font-bold tracking-widest text-white uppercase flex items-center gap-1">
            AiAon <span className="text-blue-500">Tech</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {routes.map((route) => (
                <NavigationMenuItem key={route.name}>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} bg-transparent text-white/70 hover:text-white hover:bg-white/10 focus:bg-white/10 focus:text-white font-medium`}
                    render={<Link href={route.href} />}
                  >
                    {route.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {user ? (
              <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors flex gap-2 items-center text-sm font-medium">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => logout()}
                    className="rounded-full border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-all flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
              </div>
          ) : (
            <Link href="/login">
              <Button 
                variant="outline" 
                className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
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
              <div className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link 
                    key={route.name}
                    href={route.href}
                    className="text-lg font-medium text-white/70 hover:text-white transition-colors"
                  >
                    {route.name}
                  </Link>
                ))}
                
                {user ? (
                   <>
                     <Link href="/dashboard" className="text-lg font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                     </Link>
                     <Button 
                        onClick={() => logout()}
                        className="mt-6 w-full rounded-full bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/20 flex gap-2"
                     >
                        <LogOut className="w-4 h-4" /> Logout
                     </Button>
                   </>
                ) : (
                  <Link href="/login" className="w-full">
                    <Button 
                      className="mt-6 w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
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
