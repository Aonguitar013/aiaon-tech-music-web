"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, X, Laptop, BookOpen, Gift, Layers, Compass,
  ArrowRight, CornerDownLeft, Sparkles, Tag, ArrowUp, ArrowDown
} from "lucide-react";
import { COMMAND_MENU_ITEMS, CommandMenuItem } from "./commandMenuData";

interface CommandMenuContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const CommandMenuContext = createContext<CommandMenuContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const useCommandMenu = () => useContext(CommandMenuContext);

type CategoryFilter = "all" | "systems" | "ebooks" | "freebies" | "bundles" | "pages";

const CATEGORIES: { id: CategoryFilter; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "ทั้งหมด", icon: Compass },
  { id: "systems", label: "ระบบ GAS", icon: Laptop },
  { id: "ebooks", label: "E-Books", icon: BookOpen },
  { id: "freebies", label: "แจกฟรี 🎁", icon: Gift },
  { id: "bundles", label: "บันเดิล", icon: Layers },
];

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveCategory("all");
    setSelectedIndex(0);
  }, []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global Keyboard Listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter items
  const filteredItems = useMemo(() => {
    const cleanQ = query.trim().toLowerCase();

    return COMMAND_MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      // Query filter
      if (!cleanQ) return true;

      const titleMatch = item.title.toLowerCase().includes(cleanQ);
      const descMatch = item.description.toLowerCase().includes(cleanQ);
      const codeMatch = item.code ? item.code.toLowerCase().includes(cleanQ) : false;
      const kwMatch = item.keywords ? item.keywords.some((k) => k.toLowerCase().includes(cleanQ)) : false;

      return titleMatch || descMatch || codeMatch || kwMatch;
    });
  }, [query, activeCategory]);

  // Reset selected index when query or category changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Keyboard navigation inside list
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelectItem(filteredItems[selectedIndex]);
      }
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const handleSelectItem = (item: CommandMenuItem) => {
    close();
    router.push(item.url);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "systems": return Laptop;
      case "ebooks": return BookOpen;
      case "freebies": return Gift;
      case "bundles": return Layers;
      default: return Compass;
    }
  };

  return (
    <CommandMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              onClick={close}
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl rounded-2xl bg-zinc-950/95 border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden font-prompt flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.03]">
                <Search className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="พิมพ์เพื่อค้นหาระบบ, รหัส AONE, E-Book, ของแจกฟรี..."
                  className="flex-1 bg-transparent text-white placeholder-white/40 text-sm sm:text-base outline-none font-prompt"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-white/40 bg-white/5 border border-white/10 rounded-md">
                  ESC
                </kbd>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-black/40 overflow-x-auto no-scrollbar">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                          : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
                <span className="ml-auto text-[11px] text-white/30 hidden sm:inline px-2">
                  พบ {filteredItems.length} รายการ
                </span>
              </div>

              {/* Search Results List */}
              <div
                ref={listRef}
                className="max-h-[380px] sm:max-h-[440px] overflow-y-auto p-2 space-y-1 custom-scrollbar"
              >
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-white/40 space-y-2">
                    <Search className="w-8 h-8 mx-auto opacity-30" />
                    <p className="text-sm">ไม่พบผลการค้นหาสำหรับ &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-white/30">
                      ลองค้นหาด้วยรหัส เช่น AONE01, EB01 หรือคำว่า &ldquo;เช็คชื่อ&rdquo;, &ldquo;แจกฟรี&rdquo;
                    </p>
                  </div>
                ) : (
                  filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    const ItemIcon = getCategoryIcon(item.category);

                    return (
                      <div
                        key={item.id}
                        data-index={index}
                        onClick={() => handleSelectItem(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`group flex items-center justify-between gap-3 p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? "bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-transparent border border-cyan-500/30 text-white"
                            : "text-white/80 hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-cyan-500/25 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                : "bg-white/5 text-white/50 group-hover:text-cyan-400 group-hover:bg-white/10"
                            }`}
                          >
                            <ItemIcon className="w-4 h-4" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/5 text-white/60 border border-white/10">
                                  {item.badge}
                                </span>
                              )}
                              {item.price && (
                                <span className="text-xs font-mono font-bold text-amber-400">
                                  {item.price}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/50 line-clamp-1 mt-0.5 font-light">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isSelected && (
                            <CornerDownLeft className="w-4 h-4 text-cyan-400 shrink-0 hidden sm:block animate-pulse" />
                          )}
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Keyboard Navigation Footer */}
              <div className="px-4 py-2.5 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">↓</kbd>
                    <span className="hidden sm:inline">เลือก</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">↵</kbd>
                    <span>เปิด</span>
                  </span>
                  <span className="flex items-center gap-1 hidden sm:inline-flex">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[10px]">ESC</kbd>
                    <span>ปิด</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-cyan-400/80 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>AiAon Quick Command</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CommandMenuContext.Provider>
  );
}
