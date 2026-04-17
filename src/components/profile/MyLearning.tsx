"use client";

import { BookOpen, Download, Package, PlayCircle } from "lucide-react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";

type ItemType = "course" | "digital_product";

type LearningItem = {
    id: string;
    title: string;
    description?: string;
    itemType: ItemType;
    // Course-specific
    color_gradient?: string;
    // Product-specific
    icon_name?: string;
    color_classes?: string;
    category?: string;
};

export function MyLearning({ items }: { items: LearningItem[] }) {
    const { brandTheme } = useBrandTheme();

    if (!items || items.length === 0) {
        return (
            <div className="glass-card p-10 flex flex-col items-center justify-center border-white/5 bg-white/5 text-center">
                <Package className="w-12 h-12 text-white/20 mb-4" />
                <p className="font-prompt text-white/50">
                    คุณยังไม่มีสินค้าหรือคอร์สที่ซื้อ<br />
                    สำรวจ Academy หรือ Marketplace เพื่อเริ่มต้น!
                </p>
                <div className="flex gap-4 mt-5">
                    <Link href="/dashboard/academy" className="text-blue-400 hover:text-blue-300 font-prompt text-sm underline">
                        🎓 Academy
                    </Link>
                    <span className="text-white/20">·</span>
                    <Link href="/dashboard/marketplace" className="text-purple-400 hover:text-purple-300 font-prompt text-sm underline">
                        🛍️ Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => {
                const isCourse = item.itemType === "course";

                // Resolve lucide icon for products
                const ProductIcon = !isCourse
                    ? ((Icons as any)[item.icon_name || "Package"] || Icons.Package)
                    : null;

                // Strip color_classes into parts for product icon box
                const colorParts = (item.color_classes || "text-purple-400 bg-purple-500/10 border-purple-500/20")
                    .split(" ")
                    .filter((c: string) => c.startsWith("text-") || c.startsWith("bg-") || c.startsWith("border-"))
                    .join(" ");

                const href = isCourse
                    ? `/dashboard/academy/${item.id}`
                    : `/dashboard/marketplace/${item.id}`;

                const isCourseActuallyMusic = item.category === "Music";
                const isMusic = isCourseActuallyMusic || brandTheme === "music";

                const accentCourse = isMusic 
                    ? "hover:border-amber-500/40 hover:bg-amber-500/5 text-amber-500" 
                    : "hover:border-blue-500/40 hover:bg-blue-500/5 text-blue-500";
                const accentPurple = "hover:border-purple-500/40 hover:bg-purple-500/5";

                return (
                    <Link key={`${item.itemType}-${item.id}`} href={href} className="group block">
                        <div className={`glass-card flex items-center p-4 border-white/10 transition-all duration-200 ${isCourse ? accentCourse : accentPurple}`}>

                            {/* Icon block */}
                            {isCourse ? (
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${isMusic ? (item.color_gradient || "from-amber-600 to-orange-400") : (item.color_gradient || "from-blue-500 to-cyan-400")} flex items-center justify-center shrink-0 shadow-lg`}>
                                    {isCourseActuallyMusic ? (
                                        <Icons.Music className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                                    ) : (
                                        <PlayCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                                    )}
                                </div>
                            ) : (
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg border ${colorParts}`}>
                                    {ProductIcon && <ProductIcon className="w-7 h-7 group-hover:scale-110 transition-transform" />}
                                </div>
                            )}

                            {/* Content */}
                            <div className="ml-4 flex-1 min-w-0">
                                {/* Badge */}
                                <span className={`inline-block text-[10px] font-prompt font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1.5 ${
                                    isCourse
                                        ? (isMusic ? "text-amber-400 border-amber-500/30 bg-amber-500/10" : "text-blue-400 border-blue-500/30 bg-blue-500/10")
                                        : "text-purple-400 border-purple-500/30 bg-purple-500/10"
                                }`}>
                                    {isCourse ? "คอร์สเรียน" : "สินค้าดิจิทัล"}
                                </span>

                                <h4 className={`font-bold font-prompt text-white truncate transition-colors ${
                                    isCourse ? (isMusic ? "group-hover:text-amber-400" : "group-hover:text-blue-400") : "group-hover:text-purple-400"
                                }`}>
                                    {item.title}
                                </h4>

                                {/* CTA row */}
                                {isCourse ? (
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                            <div className={`h-full w-[30%] ${isMusic ? "bg-amber-500" : "bg-emerald-500"}`}></div>
                                        </div>
                                        <span className={`text-[10px] font-prompt whitespace-nowrap flex items-center gap-1 ${isMusic ? "text-amber-400" : "text-blue-400"}`}>
                                            <BookOpen className="w-3 h-3" /> เริ่มเรียน →
                                        </span>
                                    </div>
                                ) : (
                                    <p className="text-[11px] text-purple-400 font-prompt mt-2 flex items-center gap-1">
                                        <Download className="w-3 h-3" /> เข้าถึง / ดาวน์โหลด →
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
