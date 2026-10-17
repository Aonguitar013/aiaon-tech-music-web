import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, Mail, Download, BadgeCheck, BookOpen, Wrench, Sparkles, MessageSquare, ArrowRight, Gift, Zap } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { buildSignedDeliveryUrl } from "@/utils/delivery-links";
import { DvdCaseMockup } from "@/components/marketplace/DvdCaseMockup";

export function getVipSetupDetails(title: string) {
  const upper = title.toUpperCase();

  // Tier 3: High Complexity (Multi-Folders + Slides/Docs Template + Triggers + PDF Generator)
  if (upper.includes("AONE09") || upper.includes("ห้องเรียนสีขาว") || upper.includes("AONA02") || upper.includes("ยานพาหนะ")) {
    return {
      priceText: "+690 ฿",
      tierName: "Enterprise Setup",
      badge: "ระดับสูง ⭐⭐⭐",
      description: "ผูก Template เอกสาร Google Docs/Slides + สร้าง 3 Drive Folders + ตั้งค่า Time Triggers และ Deploy พร้อมใช้ 100%"
    };
  }

  // Tier 2: Medium Complexity (Drive Folder + QR + Time Trigger + Photo Uploads + Template)
  if (
    upper.includes("AONA01") || upper.includes("AONA03") || upper.includes("เกียรติบัตร") ||
    upper.includes("AONE01") || upper.includes("AONE02") || upper.includes("AONE05") ||
    upper.includes("AONE08") || upper.includes("AONE10") || upper.includes("3D") ||
    upper.includes("AONM01") || upper.includes("AONA06")
  ) {
    return {
      priceText: "+350 ฿",
      tierName: "Standard Setup",
      badge: "ยอดนิยม ⭐⭐",
      description: "สร้าง Drive Folder รับไฟล์/รูปภาพ + ผูก Folder ID + เชื่อมฐานข้อมูลชีต และ Deploy พร้อมใช้ 100%"
    };
  }

  // Tier 1: Quick Plug & Play (Single Sheet ID / Simple Table)
  return {
    priceText: "+190 ฿",
    tierName: "Quick Setup",
    badge: "ติดตั้งง่าย ⭐",
    description: "นำเข้าโครงสร้างตาราง Google Sheets + วางสคริปต์และ Deploy ส่งมอบลิงก์พร้อมใช้ทันที"
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch product (including file_url) and check purchase status concurrently (auth is optional for guests)
  const [{ data: product, error }, existingOrder] = await Promise.all([
    supabase.from('products').select('*, file_url').eq('id', id).single(),
    user
      ? supabase
          .from('orders')
          .select('id, status')
          .eq('user_id', user.id)
          .eq('product_id', id)
          .eq('status', 'completed')
          .maybeSingle()
          .then((res) => res.data)
      : Promise.resolve(null),
  ]);

  const isPurchased = !!existingOrder;

  if (error || !product) {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-white/50">
            <p className="font-prompt text-xl mb-4">ไม่พบสินค้านี้</p>
            <Link href="/dashboard/marketplace" className="text-blue-400 hover:text-blue-300 font-prompt underline">
                กลับสู่หน้ารวมสินค้า
            </Link>
        </div>
    );
  }
  
  // Extract clean description and format tag
  let rawDesc = product.description;
  let parsedType = "";
  const matchFormat = rawDesc.match(/\(Format:\s*(.+?)\)/);
  const matchType = rawDesc.match(/\(Type:\s*(.+?)\)/);
  
  if (matchFormat) {
    parsedType = matchFormat[1];
    rawDesc = rawDesc.replace(matchFormat[0], "").trim();
  } else if (matchType) {
    parsedType = matchType[1];
    rawDesc = rawDesc.replace(matchType[0], "").trim();
  }

  const PRODUCT_DOWNLOAD_LINKS: Record<string, string> = {
    'AONE02': 'https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgATR6et6O-BS61MuoKMqj_GAYU-TtWQfIJanJqGekSkGbk?e=AaoHOh',
    'AONA07': 'https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgDJlCMMPrrsT41Ts0p0_mG3ARQDzg2jFhgxYKp8p5n6gNA?e=X8Nj74',
    'AONE12': 'https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgD_Jr6rfSsxSpAKzMlvYwa0AUZTGXnV_mi0Q5WW4ra9jKI?e=6afyzo',
  };

  const matchedLink = Object.entries(PRODUCT_DOWNLOAD_LINKS).find(([k]) => product.title?.includes(k))?.[1];
  const signedPortalUrl = isPurchased
    ? buildSignedDeliveryUrl(product.title || "", existingOrder?.id || "SUPABASE_VERIFIED").url
    : null;
  const finalDownloadUrl = product.file_url || signedPortalUrl || matchedLink || "/dashboard/profile";

  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[product.icon_name || "Package"] || Icons.Package;
  const isService = product.category === "Service" || product.category === "Creative";
  const colorClass = product.color_classes || "text-amber-400 bg-amber-500/10 border-amber-500/20";

  const priceStr = (product.price || "").trim().toLowerCase();
  const isFree =
    priceStr === "0" ||
    priceStr === "0 thb" ||
    priceStr === "ฟรี" ||
    priceStr === "0 บาท" ||
    priceStr === "free" ||
    priceStr === "";

  const vipSetup = getVipSetupDetails(product.title);

  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-screen flex flex-col pb-20">
      <div className="mb-6">
          <Link href="/dashboard/marketplace" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-prompt text-sm">
             <ArrowLeft className="w-4 h-4" /> กลับหน้าคลังสินค้า
          </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Detail Area */}
          <div className="lg:col-span-2 flex flex-col gap-6">
             <div className="glass-card p-8 md:p-10 border-white/10 relative overflow-hidden bg-slate-950/80 rounded-3xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20"></div>
                 
                 <div className="flex items-start justify-between gap-4 mb-6">
                     <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border shadow-lg ${colorClass}`}>
                         <IconComponent className="w-10 h-10" />
                     </div>
                     {/* "Already Owned" badge */}
                     {isPurchased && (
                         <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-sm font-prompt font-semibold shadow-[0_0_20px_rgba(16,185,129,0.15)] shrink-0">
                             <BadgeCheck className="w-4 h-4" />
                             คุณเป็นเจ้าของแล้ว
                         </div>
                     )}
                 </div>

                 <div className="bg-white/10 text-white/80 border border-white/20 inline-block px-3 py-1 rounded-full text-xs font-prompt font-medium uppercase tracking-wider mb-4 shadow">
                     {product.category === "Template" ? "Google Apps Script" : product.category === "Service" ? "บริการพัฒนา" : "เทมเพลตอัตโนมัติ"}
                 </div>

                 <h1 className="text-3xl md:text-5xl font-bold font-prompt text-white mb-6 leading-tight">
                     {product.title}
                 </h1>

                 {product.title?.toUpperCase().includes("AONE09") && (
                   <div className="mb-8 p-4 rounded-3xl bg-slate-900/60 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                     <DvdCaseMockup
                       code="AONE09"
                       title={product.title}
                       categoryName={product.category}
                       tagline="WHITE CLASSROOM 37-PAGE AUTO REPORT"
                       heroBadge="⭐ HERO SYSTEM"
                     />
                   </div>
                 )}
                 
                 <div className="prose prose-invert max-w-none font-prompt text-white/70 leading-relaxed text-base sm:text-lg">
                    <p>{rawDesc}</p>
                    
                    {/* 2 Package Options Box */}
                    {!isFree && (
                      <div className="my-8 p-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 space-y-4">
                        <h3 className="text-lg font-bold font-prompt text-white flex items-center gap-2 m-0">
                          <Sparkles className="w-5 h-5 text-cyan-400" />
                          <span>เลือกรูปแบบการรับระบบที่เหมาะกับคุณ:</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 not-prose">
                          {/* Option 1: DIY */}
                          <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-prompt font-bold text-white text-sm">📦 1. แพ็กเกจติดตั้งเอง (DIY)</span>
                              <span className="font-prompt text-cyan-400 font-bold text-sm">{product.price}</span>
                            </div>
                            <p className="font-prompt text-xs text-white/60 leading-relaxed">
                              รับไฟล์โค้ดคลีนแล้ว + ตาราง CSV + คู่มือ 3 สเต็ปเสร็จใน 2 นาที รันบนชีตตัวเองได้ทันที
                            </p>
                          </div>

                          {/* Option 2: VIP Setup */}
                          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 space-y-2 relative overflow-hidden">
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500 text-zinc-950 text-[11px] font-prompt font-black uppercase">
                              {vipSetup.badge}
                            </div>
                            <div className="flex items-center justify-between pr-20">
                              <span className="font-prompt font-bold text-amber-300 text-sm">👑 2. แพ็กเกจ VIP Setup</span>
                              <span className="font-prompt text-amber-300 font-bold text-sm">{vipSetup.priceText}</span>
                            </div>
                            <p className="font-prompt text-xs text-white/60 leading-relaxed">
                              {vipSetup.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <h3 className="text-xl text-white font-bold mt-10 mb-4 border-b border-white/10 pb-2">สิ่งที่คุณจะได้รับ</h3>
                    <ul className="space-y-3 mt-4 list-none pl-0">
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                            <span>สิทธิ์การใช้งานแบบตลอดชีพ (Lifetime License) โดยไม่มีค่าเรียกเก็บรายเดือน</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                            <span>โฟลเดอร์ภาษาไทยระดับ Gold Standard พร้อมคู่มือการติดตั้ง 3 สเต็ปอย่างละเอียด</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                            <span>โครงสร้าง Google Sheets ตัวอย่าง และซอร์สโค้ด Apps Script พร้อม Deploy ทันที</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                            <span>Support ตอบคำถามและให้คำปรึกษาทางเทคนิคโดยครูอ้นผ่าน LINE OA @deu6776s</span>
                        </li>
                    </ul>
                 </div>
             </div>
          </div>

          {/* Sticky Checkout Sidebar */}
          <div className="lg:col-span-1 relative">
              <div className={`sticky top-8 glass-card p-6 flex flex-col shadow-2xl transition-all rounded-3xl bg-slate-950/90 ${isPurchased ? "border-emerald-500/30" : "border-white/10"}`}>
                  
                  {/* Purchased banner inside sidebar */}
                  {isPurchased && (
                      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-6">
                          <BadgeCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                          <p className="text-sm font-prompt text-emerald-300 font-medium leading-tight">
                              คุณซื้อสินค้านี้แล้ว<br />
                              <span className="text-emerald-400/70 text-xs font-normal">คลิกด้านล่างเพื่อเข้าถึงไฟล์</span>
                          </p>
                      </div>
                  )}

                  <p className="text-xs text-white/50 font-prompt mb-1">ราคาเริ่มต้น (แพ็กเกจไฟล์โค้ด)</p>
                  <div className={`text-4xl font-black font-prompt mb-4 ${isPurchased ? "text-emerald-400" : "text-white"}`}>
                      {product.price}
                  </div>

                  {!isPurchased && !isFree && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-prompt text-xs mb-6 space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="flex items-center gap-1.5">
                          <Wrench className="w-4 h-4 shrink-0" />
                          <span>ออปชัน VIP Setup ({vipSetup.priceText}):</span>
                        </span>
                        <span className="text-[11px] text-amber-400/70">{vipSetup.badge}</span>
                      </div>
                      <p className="text-white/70 text-[11px] leading-relaxed">
                        {vipSetup.description} แจ้งรับบริการใน LINE ตอนส่งสลิปได้เลยครับ
                      </p>
                    </div>
                  )}

                  {parsedType && (
                      <div className="bg-black/30 rounded-lg p-3 mb-6 border border-white/5">
                          <p className="text-[11px] text-white/40 font-prompt mb-0.5">รูปแบบการส่งมอบ / ประเภท</p>
                          <p className="text-xs text-white/80 font-prompt font-medium">{parsedType}</p>
                      </div>
                  )}

                  {/* === Conditional CTA Button === */}
                  {isPurchased ? (
                      <div className="flex flex-col gap-3 mb-4">
                          <a
                              href={finalDownloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-4 rounded-2xl text-zinc-950 font-prompt font-bold text-base transition-all shadow-lg flex items-center justify-center gap-2 group bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
                          >
                              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                              <span>📥 ดาวน์โหลด / เข้าถึงไฟล์</span>
                          </a>

                          {product.ebook_content ? (
                              <Link
                                  href={`/dashboard/marketplace/${product.id}/reader`}
                                  className="w-full py-3 rounded-2xl text-emerald-400 font-prompt font-medium text-sm transition-all border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/5 hover:bg-emerald-500/10 flex items-center justify-center gap-2 group"
                              >
                                  <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  เริ่มอ่านคู่มือออนไลน์
                              </Link>
                          ) : (
                              product.ebook_url && (
                                  <a
                                      href={product.ebook_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-full py-3 rounded-2xl text-emerald-400 font-prompt font-medium text-sm transition-all border border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/5 hover:bg-emerald-500/10 flex items-center justify-center gap-2 group"
                                  >
                                      <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                      คู่มือการใช้งาน
                                  </a>
                              )
                          )}
                      </div>
                  ) : (
                      <div className="space-y-3.5 mb-4">
                        {/* ── ✨ SLEEK LUXURY BUY BUTTON ── */}
                        <Link
                            href={`/dashboard/marketplace/checkout/${product.id}`}
                            className={cn(
                              "w-full py-4 px-6 rounded-2xl font-prompt font-extrabold text-base transition-all duration-300 flex flex-col items-center justify-center gap-1 group relative overflow-hidden cursor-pointer",
                              isService
                                ? "bg-linear-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-zinc-950 shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                                : isFree
                                  ? "bg-linear-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-zinc-950 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                                  : "bg-linear-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:via-teal-200 hover:to-cyan-300 text-zinc-950 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_45px_rgba(6,182,212,0.55)] hover:scale-[1.01] active:scale-[0.98]"
                            )}
                        >
                            {/* Subtle Light Sweep */}
                            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/45 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

                            <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-black tracking-tight relative z-10 text-zinc-950 whitespace-nowrap">
                              {isService ? (
                                <>
                                  <Mail className="w-5 h-5 shrink-0" />
                                  <span>ติดต่อขอใบเสนอราคา</span>
                                </>
                              ) : isFree ? (
                                <>
                                  <Gift className="w-5 h-5 shrink-0" />
                                  <span>รับระบบและโค้ดฟรีทันที</span>
                                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                              ) : (
                                <>
                                  <Zap className="w-5 h-5 fill-zinc-950/20 shrink-0" />
                                  <span>สั่งซื้อรับระบบทันที</span>
                                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                              )}
                            </div>

                            {!isService && !isFree && (
                              <span className="text-[11px] font-bold text-zinc-900/80 tracking-tight relative z-10 flex items-center gap-1 whitespace-nowrap">
                                <ShieldCheck className="w-3.5 h-3.5 text-zinc-950" />
                                ลิขสิทธิ์ตลอดชีพ • ดาวน์โหลดผ่าน OneDrive อัตโนมัติ
                              </span>
                            )}
                        </Link>

                        {/* Secondary LINE Button */}
                        <a
                          href={`https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(
                            isFree
                              ? `สวัสดีครับครูอ้น ขอรับระบบและโค้ดแจกฟรี:\n🎁 "${product.title}"\nรบกวนขอรหัสปลดล็อกและลิงก์ดาวน์โหลดด้วยครับ 🙏`
                              : `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบ:\n📦 "${product.title}"\n💰 ราคา: ${product.price} (หรือออปชัน VIP Setup ${vipSetup.priceText})\nรบกวนขอเลขบัญชี / PromptPay QR Code ด้วยครับ 🙏`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 rounded-2xl bg-[#06C755]/10 hover:bg-[#06C755]/20 border border-[#06C755]/40 text-[#06C755] font-prompt font-bold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer shadow-sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>สั่งซื้อ / ปรึกษาผ่าน LINE OA (@deu6776s)</span>
                        </a>
                      </div>
                  )}

                  <div className="pt-4 border-t border-white/5 space-y-2 text-white/50 text-[11px] font-prompt">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>รันบน Google Workspace ตัวเอง 100%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>ไม่มีค่าธรรมเนียมรายเดือน จ่ายครั้งเดียวตลอดชีพ</span>
                    </div>
                  </div>
                  
              </div>
          </div>
      </div>
    </div>
  );
}
