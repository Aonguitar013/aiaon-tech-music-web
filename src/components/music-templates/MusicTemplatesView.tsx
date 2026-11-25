"use client";

import { useEffect } from "react";
import { useBrandTheme } from "@/components/providers/BrandThemeProvider";
import { motion } from "framer-motion";
import { Music, Download, Headphones, Sparkles, Disc, ArrowLeft } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  icon_name?: string;
  color_classes?: string;
  button_classes?: string;
  image_url?: string;
  category?: string;
}

interface MusicTemplatesViewProps {
  initialProducts: Product[];
  user: unknown;
}

export function MusicTemplatesView({ initialProducts, user }: MusicTemplatesViewProps) {
  const { setBrandTheme } = useBrandTheme();

  useEffect(() => {
    setBrandTheme("music");
  }, [setBrandTheme]);

  const fallbackTemplates: Product[] = [
    {
      id: "fallback-music-1",
      title: "Logic Pro Cinematic Orchestra Template",
      description: "เทมเพลตสำหรับทำเพลงแนว Cinematic / Trailer สไตล์ภาพยนตร์ฮอลลีวูด จัดเรียงสายเครื่องสาย เครื่องเป่า และเพอร์คัสชันมิกซ์สำเร็จรูปพร้อมแต่งเพลงได้ทันที (Format: Logic Pro X Project)",
      price: "1,290 THB",
      icon_name: "Disc",
    },
    {
      id: "fallback-music-2",
      title: "Ableton Live Lofi Pop Creator Kit",
      description: "สร้างเพลงแนว Lofi Chill / Pop ด้วยเทมเพลตที่มี Drum Rack, โครงสร้างเปียโนแจ๊สฟิลเตอร์ และ Synth Lead ในตัว ครบชุดพร้อมลูปพิเศษ (Format: Ableton Live 11+ Suite)",
      price: "990 THB",
      icon_name: "Headphones",
    },
    {
      id: "fallback-music-3",
      title: "FL Studio Synthwave Master Project",
      description: "โปรเจกต์ต้นแบบเพลงแนว Retro 80s Synthwave อย่างละเอียด เรียนรู้วิธีการจัดโครงสร้าง มิกซ์เสียงกลอง และการใช้ VST/EQ เพื่อให้ได้เสียงอนาล็อกหนา (Format: FL Studio Project File)",
      price: "1,490 THB",
      icon_name: "Volume2",
    },
    {
      id: "fallback-music-4",
      title: "Ultimate Acoustic Guitar Preset Chain",
      description: "ชุดปลั๊กอินแชนแนลสตริป (EQ, Comp, Reverb) สำหรับบันทึกเสียงกีตาร์โปร่งและกีตาร์ไฟฟ้าให้ใส มีมิติ กว้างระดับสตูดิโออัลบั้ม (Format: Logic/FL/Ableton Presets)",
      price: "590 THB",
      icon_name: "Music",
    }
  ];

  const displayProducts = initialProducts.length > 0 ? initialProducts : fallbackTemplates;

  return (
    <div className="w-full relative overflow-hidden bg-[#FAF8F5] text-[#1E293B] pb-24 min-h-screen font-prompt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 md:pt-14">

        {/* Header Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-[#475569] hover:text-[#0F172A] transition-colors font-prompt text-sm group font-medium">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            กลับหน้าแรก (Home)
          </Link>
        </div>

        {/* Hero Banner Area */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FDE68A] bg-[#FEF9EF] text-[#92400E] text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4 text-[#D97706]" />
            <span>Premium Music Templates</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-prompt text-4xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight"
          >
            สร้างเพลงระดับโปรดิวเซอร์<br />ด้วย{" "}
            <span className="text-[#D97706]">
              Music Templates
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-[#475569] font-prompt leading-relaxed max-w-xl mx-auto"
          >
            ประหยัดเวลาการมิกซ์เสียงและจัดโครงสร้างเพลง ยกระดับผลงานดนตรีของคุณด้วยโปรเจกต์ต้นแบบระดับสตูดิโอที่พร้อมใช้งานทันที
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {displayProducts.map((product, index) => {
            let IconComponent = Music;
            if (product.icon_name === "Disc") IconComponent = Disc;
            else if (product.icon_name === "Headphones") IconComponent = Headphones;
            else if (product.icon_name === "Volume2") IconComponent = Icons.Volume2 || Music;

            let cleanDesc = product.description;
            let formatTag = "";
            const matchFormat = cleanDesc.match(/\(Format:\s*(.+?)\)/);
            if (matchFormat) {
              formatTag = matchFormat[1];
              cleanDesc = cleanDesc.replace(matchFormat[0], "").trim();
            }

            const isMock = product.id.startsWith("fallback-");
            const checkoutUrl = user
              ? (isMock ? `/dashboard/marketplace` : `/dashboard/marketplace/checkout/${product.id}`)
              : `/login?next=/music-templates`;

            const priceStr = (product.price || "").trim().toLowerCase();
            const isFree =
              priceStr === "0" ||
              priceStr === "0 thb" ||
              priceStr === "ฟรี" ||
              priceStr === "0 บาท" ||
              priceStr === "free" ||
              priceStr === "";

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white border border-[#E2E8F0] hover:border-amber-400 rounded-3xl p-6 md:p-8 flex flex-col h-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 overflow-hidden">
                  {isFree && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black font-prompt border border-emerald-200 uppercase tracking-wider">
                      <Icons.Gift className="w-3 h-3 shrink-0" />
                      <span>แจกฟรี</span>
                    </div>
                  )}

                  {/* Icon & Format badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-[#FDE68A] bg-[#FEF9EF] text-[#D97706] group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    {formatTag && (
                      <span className="bg-[#FAF8F5] border border-[#E2E8F0] text-[#475569] text-xs px-3.5 py-1.5 rounded-full font-prompt font-semibold">
                        {formatTag}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-prompt text-2xl font-bold text-[#0F172A] mb-3 group-hover:text-[#D97706] transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="font-prompt text-sm md:text-base text-[#475569] leading-relaxed mb-8 flex-1">
                      {cleanDesc}
                    </p>

                    {/* Bottom Pricing & CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-[#F1F5F9] mt-auto">
                      <div>
                        <p className="text-xs text-[#64748B] font-prompt mb-0.5">ราคาขายขาด</p>
                        <p className="text-2xl font-black text-[#0F172A] font-prompt tracking-wide">{product.price}</p>
                      </div>

                      <Link
                        href={checkoutUrl}
                        className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-prompt font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-xs transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>{isFree ? "ดาวน์โหลดฟรี" : "สั่งซื้อตอนนี้"}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <section className="p-8 md:p-12 border border-[#E2E8F0] bg-white rounded-3xl shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-prompt text-3xl font-extrabold text-[#0F172A] mb-4">ทำไมต้องเลือกใช้เทมเพลตของเรา?</h2>
            <p className="font-prompt text-[#475569] text-sm md:text-base">ช่วยลดขั้นตอนการทำงานซ้ำซ้อน เพื่อให้คุณมุ่งเน้นไปที่การสร้างสรรค์จินตนาการทางดนตรีได้อย่างเต็มที่</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left font-prompt">
            {[
              {
                title: "งานคุณภาพระดับมืออาชีพ",
                desc: "ทุกเทมเพลตผ่านการมิกซ์ ปรับแต่งเสียง (Gain Staging) และการจัดระบบเลเยอร์เครื่องดนตรีตามมาตรฐานสตูดิโอเสียงจริง",
              },
              {
                title: "ติดตั้งง่าย ไร้กังวล",
                desc: "มีเอกสารกำกับและคำแนะนำการตั้งค่าแบบ Step-by-Step พร้อมไฟล์วิดีโออธิบายวิธีโหลดและเซ็ตอัปเครื่องดนตรีเสมือน VST",
              },
              {
                title: "อัปเดตฟรีตลอดชีพ",
                desc: "เมื่อมีการออกอัปเดต หรือปรับปรุงเทมเพลตให้เสถียรขึ้นกับเวอร์ชันใหม่ของ DAW คุณจะได้รับสิทธิ์โหลดใหม่ฟรีโดยไม่มีค่าธรรมเนียม",
              }
            ].map((item, idx) => (
              <div key={idx} className="space-y-3 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] hover:border-amber-300 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-[#FEF9EF] border border-[#FDE68A] flex items-center justify-center text-[#D97706] font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                  {idx + 1}
                </div>
                <h4 className="text-lg font-bold text-[#0F172A]">{item.title}</h4>
                <p className="text-sm text-[#475569] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
