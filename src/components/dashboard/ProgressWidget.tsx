"use client";

import { motion } from "framer-motion";

interface ProgressWidgetProps {
  progress: number;
  label?: string;
  colorClass?: string;
}

export function ProgressWidget({ progress, label, colorClass = "bg-blue-500" }: ProgressWidgetProps) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs font-prompt text-white/60 mb-1.5">
          <span>{label}</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className={`h-full rounded-full shadow-[0_0_10px_currentColor] ${colorClass}`}
        />
      </div>
    </div>
  );
}
