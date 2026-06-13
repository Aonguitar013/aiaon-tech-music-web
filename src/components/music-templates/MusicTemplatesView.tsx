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
  user: any;
}

export function MusicTemplatesView({ initialProducts, user }: MusicTemplatesViewProps) {
  const { setBrandTheme } = useBrandTheme();

  // Force Brand Theme to 'music' (Amber/Orange theme) when landing on this page
  useEffect(() => {
    setBrandTheme("music");
  }, [setBrandTheme]);

  // Pre-configured premium fallback music templates if database is empty
  const fallbackTemplates: Product[] = [
    {
      id: "fallback-music-1",
      title: "Logic Pro Cinematic Orchestra Template",
      description: "เทมเพลตสำหรับทำเพลงแนว Cinematic / Trailer สไตล์ภาพยนตร์ฮอลลีวูด จัดเรียงสายเครื่องสาย เครื่องเป่า และเพอร์คัสชันมิกซ์สำเร็จรูปพร้อมแต่งเพลงได้ทันที (Format: Logic Pro X Project)",
      price: "1,290 THB",
      icon_name: "Disc",
      color_classes: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      button_classes: "bg-amber-500 hover:bg-amber-600",
    },
    {
      id: "fallback-music-2",
      title: "Ableton Live Lofi Pop Creator Kit",
      description: "สร้างเพลงแนว Lofi Chill / Pop ด้วยเทมเพลตที่มี Drum Rack, โครงสร้างเปียโนแจ๊สฟิลเตอร์ และ Synth Lead ในตัว ครบชุดพร้อมลูปพิเศษ (Format: Ableton Live 11+ Suite)",
      price: "990 THB",
      icon_name: "Headphones",
      color_classes: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      button_classes: "bg-orange-500 hover:bg-orange-600",
    },
    {
      id: "fallback-music-3",
      title: "FL Studio Synthwave Master Project",
      description: "โปรเจกต์ต้นแบบเพลงแนว Retro 80s Synthwave อย่างละเอียด เรียนรู้วิธีการจัดโครงสร้าง มิกซ์เสียงกลอง และการใช้ VST/EQ เพื่อให้ได้เสียงอนาล็อกหนา (Format: FL Studio Project File)",
      price: "1,490 THB",
      icon_name: "Volume2",
      color_classes: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
      button_classes: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      id: "fallback-music-4",
      title: "Ultimate Acoustic Guitar Preset Chain",
      description: "ชุดปลั๊กอินแชนแนลสตริป (EQ, Comp, Reverb) สำหรับบันทึกเสียงกีตาร์โปร่งและกีตาร์ไฟฟ้าให้ใส มีมิติ กว้างระดับสตูดิโออัลบั้ม (Format: Logic/FL/Ableton Presets)",
      price: "590 THB",
      icon_name: "Music",
      color_classes: "text-red-400 bg-red-500/10 border-red-500/20",
      button_classes: "bg-red-500 hover:bg-red-600",
    }
  ];

  // Use DB products if available, otherwise use fallbacks
  const displayProducts = initialProducts.length > 0 ? initialProducts : fallbackTemplates;

  return (
    <div className="w-full relative overflow-hidden bg-black pb-24 min-h-screen">
      {/* Background ambient lights specifically in amber/orange music theme */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-200px] w-[600px] h-[600px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-16">
        
        {/* Header Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-prompt text-sm group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            กลับหน้าแรก (Home)
          </Link>
        </div>

        {/* Hero Banner Area */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-amber-500/30 bg-amber-500/5 text-amber-400 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
            <span>Premium Music Templates</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-prompt text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            สร้างเพลงระดับโปรดิวเซอร์<br />ด้วย{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-yellow-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.35)]">
              Music Templates
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-white/60 font-prompt leading-relaxed max-w-xl mx-auto font-light"
          >
            ประหยัดเวลาการมิกซ์เสียงและจัดโครงสร้างเพลง ยกระดับผลงานดนตรีของคุณด้วยโปรเจกต์ต้นแบบระดับสตูดิโอที่พร้อมใช้งานทันที
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {displayProducts.map((product, index) => {
            // Determine dynamic icon
            let IconComponent = Music;
            if (product.icon_name === "Disc") IconComponent = Disc;
            else if (product.icon_name === "Headphones") IconComponent = Headphones;
            else if (product.icon_name === "Volume2") IconComponent = Icons.Volume2 || Music;
            
            // Extract format if written in description
            let cleanDesc = product.description;
            let formatTag = "";
            const matchFormat = cleanDesc.match(/\(Format:\s*(.+?)\)/);
            if (matchFormat) {
              formatTag = matchFormat[1];
              cleanDesc = cleanDesc.replace(matchFormat[0], "").trim();
            }

            // Create target checkout URL: if logged out, send to login, else check if valid supabase UUID
            const isMock = product.id.startsWith("fallback-");
            const checkoutUrl = user
              ? (isMock ? `/dashboard/marketplace` : `/dashboard/marketplace/checkout/${product.id}`)
              : `/login?next=/music-templates`;

            const priceStr = (product.price || "").trim().toLowerCase();
            const isFree = priceStr === "0" || 
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
                {/* Glow border overlay on hover */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500 to-orange-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition duration-500 pointer-events-none" />
                
                <div className="relative glass-card bg-black/40 border border-white/10 hover:border-amber-500/40 p-6 md:p-8 flex flex-col h-full transition-all duration-300 overflow-hidden">
                  {/* FREE Badge */}
                  {isFree && (
                    <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400 text-black text-[10px] font-black font-prompt shadow-[0_0_15px_rgba(52,211,153,0.6)] border border-emerald-300/30 uppercase tracking-wider animate-pulse">
                      <Icons.Gift className="w-3 h-3 shrink-0" />
                      <span>แจกฟรี</span>
                    </div>
                  )}

                  {/* Icon & Format badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-amber-500/20 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    {formatTag && (
                      <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-3.5 py-1.5 rounded-full font-prompt font-medium shadow-md">
                        {formatTag}
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-prompt text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="font-prompt text-sm md:text-base text-white/50 leading-relaxed mb-8 flex-1">
                      {cleanDesc}
                    </p>

                    {/* Bottom Pricing & CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <div>
                        <p className="text-xs text-white/40 font-prompt mb-0.5">ราคาขายขาด</p>
                        <p className="text-2xl font-bold text-emerald-400 font-prompt tracking-wide">{product.price}</p>
                      </div>
                      
                      <Link
                        href={checkoutUrl}
                        className="inline-flex items-center gap-2 bg-linear-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white font-prompt font-bold text-sm px-6 py-3.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.03] active:scale-95 cursor-pointer"
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
        <section className="glass-card p-8 md:p-12 border-white/5 relative overflow-hidden bg-white/5 rounded-3xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20"></div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-prompt text-3xl font-bold text-white mb-4">ทำไมต้องเลือกใช้เทมเพลตของเรา?</h2>
            <p className="font-prompt text-white/50 text-sm md:text-base">ช่วยลดขั้นตอนการทำงานซ้ำซ้อน เพื่อให้คุณมุ่งเน้นไปที่การสร้างสรรค์จินตนาการทางดนตรีได้อย่างเต็มที่</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-left font-prompt">
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
              <div key={idx} className="space-y-3 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                  {idx + 1}
                </div>
                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
