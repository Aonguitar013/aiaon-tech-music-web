"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type BrandTheme = "tech" | "music";

interface BrandThemeContextType {
  brandTheme: BrandTheme;
  toggleTheme: () => void;
  setBrandTheme: (theme: BrandTheme) => void;
}

const BrandThemeContext = createContext<BrandThemeContextType | undefined>(undefined);

export function BrandThemeProvider({ children }: { children: React.ReactNode }) {
  const [brandTheme, setBrandThemeState] = useState<BrandTheme>("tech");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem("aiaon-brand-theme") as BrandTheme;
    if (saved === "tech" || saved === "music") {
      setBrandThemeState(saved);
      document.documentElement.setAttribute("data-brand-theme", saved);
    }
    setMounted(true);
  }, []);

  const setBrandTheme = (theme: BrandTheme) => {
    setBrandThemeState(theme);
    localStorage.setItem("aiaon-brand-theme", theme);
    document.documentElement.setAttribute("data-brand-theme", theme);
  };

  const toggleTheme = () => {
    setBrandTheme(brandTheme === "tech" ? "music" : "tech");
  };

  // Prevent hydration mismatch
  return (
    <BrandThemeContext.Provider value={{ brandTheme, toggleTheme, setBrandTheme }}>
      {/* Prevent hydration mismatch by rendering invisibly initially if needed, or simply render children if safe */}
      <div className={!mounted ? "invisible" : ""}>
        {children}
      </div>
    </BrandThemeContext.Provider>
  );
}

export function useBrandTheme() {
  const context = useContext(BrandThemeContext);
  if (context === undefined) {
    throw new Error("useBrandTheme must be used within a BrandThemeProvider");
  }
  return context;
}
