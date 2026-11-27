"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type SiteLang = "th" | "en";

interface LanguageContextValue {
  lang: SiteLang;
  setLang: (next: SiteLang) => void;
  toggleLang: () => void;
  t: (th: string, en: string) => string;
}

const STORAGE_KEY = "aiaon_site_lang_v1";

const LanguageContext = createContext<LanguageContextValue>({
  lang: "th",
  setLang: () => {},
  toggleLang: () => {},
  t: (th) => th,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SiteLang>("th");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("lang")?.toLowerCase();
      if (q === "en" || q === "th") {
        setLangState(q);
        window.localStorage.setItem(STORAGE_KEY, q);
        document.documentElement.lang = q;
        return;
      }
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "th") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (next: SiteLang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => setLang(lang === "th" ? "en" : "th");

  const t = (th: string, en: string) => (lang === "en" ? en : th);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useSiteLang() {
  return useContext(LanguageContext);
}
