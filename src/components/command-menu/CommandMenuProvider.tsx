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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={close}
            />

            {/* Modal Dialog — Brand V2.0 Warm Cream Editorial */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ type: "spring", damping: 26, stiffness: 360 }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#FFFDF7] border border-slate-200/90 shadow-2xl shadow-slate-900/15 overflow-hidden font-prompt flex flex-col z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200/80 bg-white">
                <Search className="w-5 h-5 text-sky-600 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="พิมพ์เพื่อค้นหานิทาน, ใบงาน, รหัส EDU/AONE, E-Book, ของแจกฟรี..."
                  className="flex-1 bg-transparent text-[#0F172A] placeholder-slate-400 text-sm sm:text-base outline-none font-prompt"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded-md">
                  ESC
                </kbd>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-200/70 bg-[#FAF8F5] overflow-x-auto no-scrollbar">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-sky-600 text-white border border-sky-600 shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white border border-transparent"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
                <span className="ml-auto text-[11px] text-slate-500 hidden sm:inline px-2 font-medium">
                  พบ {filteredItems.length} รายการ
                </span>
              </div>

              {/* Search Results List */}
              <div
                ref={listRef}
                className="max-h-[380px] sm:max-h-[440px] overflow-y-auto p-2 space-y-1 custom-scrollbar bg-[#FFFDF7]"
              >
                {filteredItems.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 space-y-2">
                    <Search className="w-8 h-8 mx-auto opacity-30" />
                    <p className="text-sm font-medium text-slate-700">ไม่พบผลการค้นหาสำหรับ &ldquo;{query}&rdquo;</p>
                    <p className="text-xs text-slate-500">
                      ลองค้นหาด้วยรหัส เช่น EDU-ST06, AONE01, EB01 หรือคำว่า &ldquo;นิทาน&rdquo;, &ldquo;แจกฟรี&rdquo;
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
                        className={`group flex items-center justify-between gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? "bg-white border border-sky-300 shadow-xs text-[#0F172A]"
                            : "text-slate-700 hover:bg-white/80 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "bg-sky-100 text-sky-700"
                                : "bg-slate-100 text-slate-500 group-hover:text-sky-700 group-hover:bg-sky-50"
                            }`}
                          >
                            <ItemIcon className="w-4 h-4" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-bold text-[#0F172A] group-hover:text-sky-700 transition-colors line-clamp-1">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                                  {item.badge}
                                </span>
                              )}
                              {item.price && (
                                <span className="text-xs font-mono font-bold text-rose-700">
                                  {item.price}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isSelected && (
                            <CornerDownLeft className="w-4 h-4 text-sky-600 shrink-0 hidden sm:block" />
                          )}
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Keyboard Navigation Footer */}
              <div className="px-4 py-2.5 bg-[#FAF8F5] border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">↓</kbd>
                    <span className="hidden sm:inline">เลือก</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">↵</kbd>
                    <span>เปิด</span>
                  </span>
                  <span className="flex items-center gap-1 hidden sm:inline-flex">
                    <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[10px] text-slate-600">ESC</kbd>
                    <span>ปิด</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sky-700 font-semibold">
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
