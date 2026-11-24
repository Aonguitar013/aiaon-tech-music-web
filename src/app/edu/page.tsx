import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Printer,
  QrCode,
  Layers,
  Gift,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { EDU_CATALOG, getEduOrderLineUrl } from "@/lib/eduCatalog";

export const metadata: Metadata = {
  title:
    "iAon Edu-Verse — สื่อการสอน Hybrid 3 ชุดเปิดตัว (EF + สร้างวินัย 30 วัน + ดนตรี QR)",
  description:
    "คลังสื่อการสอนดิจิทัลแบบ Hybrid กระดาษคู่ QR Code มาตรฐานครูตัวจริง Zero AI-Slop ครบ 3 ชุดเปิดตัว: น้องแซลมอน EF, แม่ใหญ่ชุดสร้างวินัย 30 วัน และน้องข้าวต้มดนตรี แจกฟรีรวม 10 หน้า พร้อม Mega Bundle 3 เล่ม 249 ฿",
  openGraph: {
    title: "iAon Edu-Verse — สื่อการสอน Hybrid ครบ 3 ชุดโดยแก๊ง 6 แมว & ครูอ้น",
    description:
      "ใบงานฝึก EF, ชุดสร้างวินัย 30 วันตีนตุ๊กแก และดนตรีเด็กเล็ก Hybrid QR พร้อม Focus/Routine Timer และแจกฟรี 10 หน้า",
    url: "https://www.aiaon.tech/edu",
    images: [
      {
        url: "/edu/hero-banner-6cats.webp",
        width: 1280,
        height: 720,
        alt: "iAon Edu-Verse 6 Cats Squad",
      },
    ],
    type: "website",
  },
};

export default function EduVerseHubPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-12">
        {/* Hero Banner */}
        <section className="relative rounded-3xl border border-amber-400/25 bg-slate-900/90 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-3.5 py-1 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>iAon EDU-VERSE • 3 LAUNCH KITS (96 PAGES)</span>
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                สื่อการสอน Hybrid{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300">
                  กระดาษ + QR มีชีวิต
                </span>
              </h1>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                ออกแบบโดยครูตัวจริง ยึดมาตรฐาน <strong>Zero AI-Slop</strong> —
                โจทย์ทุกข้อผ่านการตรวจสอบ 100% พัฒนาคู่กับแก๊ง 6 แมวสุดคิวต์
                รองรับทั้งภาษาไทย-อังกฤษ และเวอร์ชันสี-ขาวดำประหยัดหมึก
              </p>

              <div className="flex flex-wrap gap-2.5 pt-1">
                <Link
                  href="/edu/ef01"
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-colors"
                >
                  <span>EF01 แซลมอน (ฟรี 5 หน้า)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/edu/rt01"
                  className="inline-flex items-center gap-2 rounded-2xl bg-rose-400 hover:bg-rose-300 px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-rose-500/20 transition-colors"
                >
                  <span>RT01 แม่ใหญ่ (ฟรี 5 หน้า)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#mega-bundle"
                  className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 px-4 py-3 text-sm font-semibold text-amber-200 transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  <span>โปรเหมา 3 เล่ม (249 ฿)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-full">
              <img
                src="/edu/hero-banner-6cats.webp"
                alt="iAon Edu-Verse 6 Cats Squad"
                className="w-full h-full object-cover min-h-[240px]"
              />
            </div>
          </div>
        </section>

        {/* 4-Pillar Standards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: QrCode,
              title: "Hybrid QR บนกระดาษ",
              desc: "สแกนเปิด Focus Timer, Routine Timer หรือฟังเสียงดนตรีจริงได้ทันที ไม่มีลิงก์ตาย",
            },
            {
              icon: ShieldCheck,
              title: "Zero AI-Slop 100%",
              desc: "เขาวงกต ซูโดกุ บอร์ดตีนตุ๊กแก และโน้ตดนตรีตรวจถูกต้องตามหลักวิชาการทุกหน้า",
            },
            {
              icon: Printer,
              title: "ประหยัดหมึก A4 & Letter",
              desc: "แถมไฟล์ขาว-ดำเส้นคมทุกชุด ปริ้นท์ได้ทั้ง A4 และ US Letter ไม่ตกขอบ",
            },
            {
              icon: Layers,
              title: "แยกสิทธิ์ Home / Class",
              desc: "รองรับทั้งพ่อแม่สอนลูกที่บ้าน และคุณครูปริ้นท์แจกทั้งห้องเรียน",
            },
          ].map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-white">{pillar.title}</h2>
                <p className="text-xs text-white/65 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </section>

        {/* 3-SKU Catalog Grid */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                คลังสื่อการสอนครบ 3 เล่มเปิดตัว (SKU Catalog)
              </h2>
              <p className="text-sm text-white/65">
                เลือกชุดสื่อเพื่อเปิดเครื่องมือ Hybrid QR บนเว็บ หรือดาวน์โหลดชุดทดลองฟรี (รวม 10 หน้า)
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              <span>2 เล่มพร้อมใช้เต็มระบบ • 1 เล่มรออัปเสียง</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDU_CATALOG.map((item) => {
              const isLive = item.status === "live";
              const cardBorder =
                item.accent === "amber"
                  ? "border-amber-400/40 bg-gradient-to-b from-amber-500/10 to-slate-950"
                  : item.accent === "rose"
                    ? "border-rose-400/40 bg-gradient-to-b from-rose-500/10 to-slate-950"
                    : "border-fuchsia-400/30 bg-gradient-to-b from-fuchsia-500/10 to-slate-950";

              const ringAccent =
                item.accent === "amber"
                  ? "ring-amber-400/60"
                  : item.accent === "rose"
                    ? "ring-rose-400/60"
                    : "ring-fuchsia-400/60";

              const ctaBg =
                item.accent === "rose"
                  ? "bg-rose-400 hover:bg-rose-300 text-slate-950"
                  : "bg-amber-400 hover:bg-amber-300 text-slate-950";

              return (
                <div
                  key={item.sku}
                  className={`rounded-3xl border p-5 flex flex-col justify-between gap-5 shadow-xl ${cardBorder}`}
                >
                  <div className="space-y-4">
                    {/* Top badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-mono font-bold text-white">
                        {item.sku}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          isLive
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/35"
                            : "bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/35"
                        }`}
                      >
                        {item.badgeTh}
                      </span>
                    </div>

                    {/* Real Mockup Cover (unobstructed 1:1 preview) */}
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 aspect-square">
                      <img
                        src={item.coverImage}
                        alt={item.titleTh}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* 3D Mascot Avatar + Title & Description */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-full bg-[#fffdf7] p-1 ring-2 ${ringAccent} shadow-md overflow-hidden flex items-center justify-center shrink-0`}
                        >
                          <img
                            src={item.heroImage}
                            alt={item.characterNameEn}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                            {item.titleTh}
                          </h3>
                          <p className="text-xs font-medium text-amber-200/85 mt-0.5">
                            {item.ageRangeTh} • {item.pages} หน้าเต็ม (4 PDF)
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-white/65 leading-relaxed">
                        {item.subtitleTh}
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Action */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-white/75">
                      <span>
                        Home{" "}
                        <strong className="text-base text-amber-300">
                          {item.priceHomeThb} ฿
                        </strong>
                      </span>
                      <span>
                        Class{" "}
                        <strong className="text-base text-sky-300">
                          {item.priceClassThb} ฿
                        </strong>
                      </span>
                    </div>

                    {isLive ? (
                      <Link
                        href={`/edu/${item.slug}`}
                        className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${ctaBg}`}
                      >
                        <span>เปิดหน้า Hybrid QR & โหลดฟรี 5 หน้า</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="space-y-2">
                        <a
                          href={getEduOrderLineUrl({
                            sku: item.sku,
                            edition: "MEGA_BUNDLE",
                            lang: "th",
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-fuchsia-400/45 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 px-4 py-2.5 text-sm font-semibold text-fuchsia-100 transition-colors"
                        >
                          <FaLine className="w-4 h-4 text-[#06C755]" />
                          <span>รับพร้อม Mega Bundle 3 เล่ม (249 ฿)</span>
                        </a>
                        <p className="text-[11px] text-center text-fuchsia-200/75">
                          * ไฟล์ PDF 32 หน้าเสร็จแล้ว • 6 แทร็กเสียงอัปเดตฟรีบนเว็บเมื่อเปิดระบบ
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mega Bundle 3-Book Conversion Section */}
        <section
          id="mega-bundle"
          className="rounded-3xl border border-amber-400/35 bg-gradient-to-br from-amber-950/35 via-slate-900/95 to-rose-950/35 p-6 sm:p-8 shadow-2xl space-y-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1 text-xs font-bold text-amber-300">
                <Gift className="w-3.5 h-3.5" />
                <span>LAUNCH PROMOTION • คุ้มที่สุดสำหรับบ้านที่มีลูกวัย 3–6 ปี</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                เลือกแพ็กเกจเหมาสุดคุ้ม สั่งซื้อและรับไฟล์ทาง LINE OA ทันที
              </h2>
              <p className="text-sm text-white/75">
                โปร่งใส 100%: โอนพร้อมเพย์รับลิงก์ดาวน์โหลดไฟล์ PDF ความละเอียดสูงทันที ครบทั้งภาษาไทย-อังกฤษ และสี-ขาวดำประหยัดหมึก
              </p>
            </div>

            {/* Mini 3-book visual stack */}
            <div className="flex items-center gap-2 shrink-0">
              {EDU_CATALOG.map((item) => (
                <div
                  key={item.sku}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-white/20 shadow-lg bg-slate-900"
                >
                  <img
                    src={item.coverImage}
                    alt={item.sku}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Option 1: Mega Bundle 3 Books (249 THB) */}
            <div className="rounded-2xl border border-amber-400/50 bg-slate-950/80 p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
                    🔥 แนะนำ • คุ้มสุด (ประหยัด 78 ฿)
                  </span>
                  <span className="text-xs font-mono text-amber-200">
                    96 หน้า • 12 PDF
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Mega Bundle ครบ 3 เล่ม (Home Edition)
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5">
                    <span className="text-4xl font-extrabold text-amber-300">
                      249 ฿
                    </span>
                    <span className="text-sm text-white/45 line-through">
                      327 ฿
                    </span>
                    <span className="text-xs text-white/60">
                      (เฉลี่ยเพียงเล่มละ 83 ฿)
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-white/85">
                  {[
                    "EDU-EF01 น้องแซลมอน EF 32 หน้า + เว็บ Focus Timer ใช้ได้ทันที",
                    "EDU-RT01 แม่ใหญ่สร้างวินัย 30 วัน 32 หน้า (ขอบ 20mm) + Routine Timer ใช้ได้ทันที",
                    "EDU-MU01 น้องข้าวต้มดนตรี 32 หน้า รับ PDF ทันที + ปลดล็อก 6 แทร็กเสียงฟรีบนเว็บเมื่อเปิดระบบ",
                    "ครบ 12 ไฟล์ PDF (TH/EN × สี/ขาวดำ) ปริ้นท์ซ้ำได้ตลอดชีพในครอบครัว",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-EF01",
                  edition: "MEGA_BUNDLE",
                  lang: "th",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>สั่งซื้อ Mega Bundle 3 เล่ม (249 ฿) ทาง LINE</span>
              </a>
            </div>

            {/* Option 2: Live Duo Pack EF01 + RT01 (179 THB) */}
            <div className="rounded-2xl border border-rose-400/35 bg-slate-950/70 p-5 sm:p-6 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-400/20 border border-rose-400/40 px-3 py-1 text-xs font-bold text-rose-200">
                    <Zap className="w-3.5 h-3.5" />
                    <span>พร้อมใช้งานเว็บ QR 100% วันนี้</span>
                  </span>
                  <span className="text-xs font-mono text-rose-200">
                    64 หน้า • 8 PDF
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    แพ็กคู่พร้อมใช้ทันที EF01 + RT01 (Home)
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5">
                    <span className="text-4xl font-extrabold text-rose-300">
                      179 ฿
                    </span>
                    <span className="text-sm text-white/45 line-through">
                      198 ฿
                    </span>
                    <span className="text-xs text-white/60">
                      (2 เล่มระบบเว็บครบแล้ว 100%)
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-white/85">
                  {[
                    "EDU-EF01 ฝึกเชาวน์ปัญญา EF & โค้ดดิ้งไร้จอ 32 หน้า + Focus Timer",
                    "EDU-RT01 ชุดสร้างวินัย 30 วัน & ตีนตุ๊กแก 32 หน้า + Routine Timer",
                    "เหมาะสำหรับพ่อแม่ที่ต้องการเฉพาะชุดที่เว็บ QR ใช้งานครบ 100% ทันที",
                    "ครบ 8 ไฟล์ PDF (TH/EN × สี/ขาวดำ) ปริ้นท์ A4 & US Letter ไม่ตกขอบ",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-EF01",
                  edition: "DUO_LIVE",
                  lang: "th",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-400/50 bg-rose-500/20 hover:bg-rose-500/30 px-5 py-3.5 text-base font-bold text-rose-100 transition-colors"
              >
                <FaLine className="w-5 h-5 text-[#06C755]" />
                <span>สั่งซื้อแพ็กคู่ EF01 + RT01 (179 ฿) ทาง LINE</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
