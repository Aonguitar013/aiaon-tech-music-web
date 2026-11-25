import React from "react";
import type { PillarId } from "@/config/navigationRegistry";
import { cn } from "@/lib/utils";

interface PillarThemeWrapperProps {
  pillar: PillarId;
  eduWorld?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * 🏛️ 3-Layer Theme Governance Wrapper (Brand Bible V2.0)
 * Opts any page or section cleanly into the Warm Premium Editorial shell
 * and applies its Pillar Chromatic Tokens via [data-pillar].
 */
export function PillarThemeWrapper({
  pillar,
  eduWorld,
  children,
  className,
}: PillarThemeWrapperProps) {
  const isEdu = pillar === "edu";
  return (
    <div
      data-aiaon-shell=""
      data-pillar={pillar}
      {...(isEdu ? { "data-edu-theme": "" } : {})}
      {...(eduWorld ? { "data-edu-world": eduWorld } : {})}
      className={cn(
        "min-h-screen w-full transition-colors duration-300",
        isEdu ? "bg-[#FFFDF7] text-[#1E293B]" : "bg-[#FAF8F5] text-[#1E293B]",
        className
      )}
    >
      {children}
    </div>
  );
}
