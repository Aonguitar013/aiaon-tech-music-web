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
    "iAon Edu-Verse — สื่อการสอน Hybrid ครบ 4 ชุดเปิดตัว (EF + วินัย 30 วัน + Busy Book + ดนตรี)",
  description:
    "คลังสื่อการสอนดิจิทัลแบบ Hybrid กระดาษคู่ QR Code มาตรฐานครูตัวจริง Zero AI-Slop ครบ 4 ชุดเปิดตัว: น้องแซลมอน EF, แม่ใหญ่สร้างวินัย 30 วัน, น้องชาบู Busy Book 45 การ์ด และน้องข้าวต้มดนตรี แจกฟรีรวม 15 หน้า!",
  openGraph: {
    title: "iAon Edu-Verse — สื่อการสอน Hybrid ครบ 4 ชุดโดยแก๊ง 6 แมว & ครูอ้น",
    description:
      "ใบงานฝึก EF, ชุดสร้างวินัย 30 วัน, Busy Book ตีนตุ๊กแก 45 การ์ด & บอร์ดแปรงฟัน และดนตรีเด็กเล็ก แจกฟรีรวม 15 หน้า!",
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
                <span>iAon EDU-VERSE • 4 LAUNCH KITS (128 PAGES)</span>
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                สื่อการสอน Hybrid{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300">
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
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-amber-400 hover:bg-amber-300 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-colors"
                >
                  <span>EF01 แซลมอน (ฟรี 5 หน้า)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/edu/rt01"
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-rose-400 hover:bg-rose-300 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-rose-500/20 transition-colors"
                >
                  <span>RT01 แม่ใหญ่ (ฟรี 5 หน้า)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/edu/bb01"
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-pink-400 hover:bg-pink-300 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-lg shadow-pink-500/20 transition-colors"
                >
                  <span>BB01 ชาบู (ฟรี 5 หน้า)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#mega-bundle"
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-amber-200 transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  <span>โปรเหมาสุดคุ้ม (249฿ / 319฿)</span>
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
              desc: "สแกนเปิด Focus Timer, Routine Timer, นาฬิกาแปรงฟัน 2 นาที หรือฟังเสียงดนตรีได้ทันที",
            },
            {
              icon: ShieldCheck,
              title: "Zero AI-Slop 100%",
              desc: "เขาวงกต ซูโดกุ บอร์ดตีนตุ๊กแก 45 ชิ้น และโน้ตดนตรีตรวจถูกต้องทุกหน้า",
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

        {/* 4-SKU Balanced 2x2 Catalog Grid */}
        <section className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">
                คลังสื่อการสอนครบ 4 เล่มเปิดตัว (SKU Catalog)
              </h2>
              <p className="text-sm text-white/65">
                เลือกชุดสื่อเพื่อเปิดเครื่องมือ Hybrid QR บนเว็บ หรือดาวน์โหลดชุดทดลองฟรี (รวม 15 หน้า!)
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              <span>3 เล่มพร้อมใช้เต็มระบบ • 1 เล่มรออัปเสียง</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDU_CATALOG.map((item) => {
              const isLive = item.status === "live";
              const cardBorder =
                item.accent === "amber"
                  ? "border-amber-400/40 bg-gradient-to-b from-amber-500/10 to-slate-950"
                  : item.accent === "rose"
                    ? "border-rose-400/40 bg-gradient-to-b from-rose-500/10 to-slate-950"
                    : item.accent === "pink"
                      ? "border-pink-400/40 bg-gradient-to-b from-pink-500/10 to-slate-950"
                      : "border-fuchsia-400/30 bg-gradient-to-b from-fuchsia-500/10 to-slate-950";

              const ringAccent =
                item.accent === "amber"
                  ? "ring-amber-400/60"
                  : item.accent === "rose"
                    ? "ring-rose-400/60"
                    : item.accent === "pink"
                      ? "ring-pink-400/60"
                      : "ring-fuchsia-400/60";

              const ctaBg =
                item.accent === "rose"
                  ? "bg-rose-400 hover:bg-rose-300 text-slate-950"
                  : item.accent === "pink"
                    ? "bg-pink-400 hover:bg-pink-300 text-slate-950"
                    : "bg-amber-400 hover:bg-amber-300 text-slate-950";

              return (
                <div
                  key={item.sku}
                  className={`rounded-3xl border p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-xl ${cardBorder}`}
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

                    {/* Horizontal split on desktop inside card for crisp scannability */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-5 rounded-2xl overflow-hidden border border-white/10 bg-slate-900 aspect-square">
                        <img
                          src={item.coverImage}
                          alt={item.titleTh}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="sm:col-span-7 space-y-2.5">
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
                            <div className="text-[11px] font-semibold text-white/60">
                              {item.characterNameTh}
                            </div>
                            <div className="text-xs font-semibold text-amber-200">
                              {item.ageRangeTh}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {item.titleTh}
                        </h3>

                        <p className="text-xs text-white/65 leading-relaxed">
                          {item.subtitleTh}
                        </p>
                      </div>
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
                      <span className="text-white/45">• {item.pages} หน้า (4 PDF) •</span>
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
                            edition: "ALL4_BUNDLE",
                            lang: "th",
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-fuchsia-400/45 bg-fuchsia-500/20 hover:bg-fuchsia-500/30 px-4 py-2.5 text-sm font-semibold text-fuchsia-100 transition-colors"
                        >
                          <FaLine className="w-4 h-4 text-[#06C755]" />
                          <span>รับพร้อม All-4 Bundle ครบ 4 เล่ม (319 ฿)</span>
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

        {/* Honest Launch Bundles Section */}
        <section
          id="mega-bundle"
          className="rounded-3xl border border-amber-400/35 bg-gradient-to-br from-amber-950/35 via-slate-900/95 to-pink-950/35 p-6 sm:p-8 shadow-2xl space-y-6"
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

            {/* Mini 4-book visual stack */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap">
              {EDU_CATALOG.map((item) => (
                <div
                  key={item.sku}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/20 shadow-lg bg-slate-900"
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
            {/* Option 1: 3-Book Live Trio Pack (249 THB — 100% Live Today!) */}
            <div className="rounded-2xl border border-emerald-400/50 bg-slate-950/80 p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400 px-3 py-1 text-xs font-extrabold text-slate-950">
                    <Zap className="w-3.5 h-3.5" />
                    <span>แนะนำ • เว็บ QR พร้อมใช้ 100% วันนี้!</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-200">
                    96 หน้า • 12 PDF
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    แพ็ก 3 เล่มพร้อมใช้ทันที (EF01 + RT01 + BB01)
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5">
                    <span className="text-4xl font-extrabold text-emerald-300">
                      249 ฿
                    </span>
                    <span className="text-sm text-white/45 line-through">
                      297 ฿
                    </span>
                    <span className="text-xs text-white/60">
                      (ประหยัด 48 ฿ • เฉลี่ยเล่มละ 83 ฿)
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-white/85">
                  {[
                    "EDU-EF01 น้องแซลมอน EF 32 หน้า + เว็บ Focus Timer ใช้ได้ทันที",
                    "EDU-RT01 แม่ใหญ่สร้างวินัย 30 วัน 32 หน้า + Routine Timer ใช้ได้ทันที",
                    "EDU-BB01 น้องชาบู Busy Book 45 การ์ด + บอร์ดแปรงฟัน + Brush Timer ใช้ได้ทันที",
                    "ครบ 12 ไฟล์ PDF (TH/EN × สี/ขาวดำ) ไม่มีเล่มรออัปเดต พร้อมลุยวันนี้เลย!",
                  ].map((line) => (
                    <li key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={getEduOrderLineUrl({
                  sku: "EDU-EF01",
                  edition: "TRIO_LIVE",
                  lang: "th",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-colors"
              >
                <FaLine className="w-5 h-5" />
                <span>สั่งซื้อแพ็ก 3 เล่มพร้อมใช้ (249 ฿) ทาง LINE</span>
              </a>
            </div>

            {/* Option 2: All-4 Universe Bundle (319 THB — Save 107 THB!) */}
            <div className="rounded-2xl border border-amber-400/45 bg-slate-950/75 p-5 sm:p-6 flex flex-col justify-between gap-5 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-extrabold text-slate-950">
                    🔥 เหมาครบจักรวาล 4 เล่ม (ประหยัด 107 ฿)
                  </span>
                  <span className="text-xs font-mono text-amber-200">
                    128 หน้า • 16 PDF
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    All-4 Universe Bundle (EF01 + RT01 + BB01 + MU01)
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2.5">
                    <span className="text-4xl font-extrabold text-amber-300">
                      319 ฿
                    </span>
                    <span className="text-sm text-white/45 line-through">
                      426 ฿
                    </span>
                    <span className="text-xs text-white/60">
                      (เฉลี่ยเพียงเล่มละ 79.75 ฿!)
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-white/85">
                  {[
                    "ได้ครบทั้ง 3 เล่มพร้อมใช้ทันที (EF01 + RT01 + BB01 = 96 หน้า)",
                    "บวกเล่มที่ 4 EDU-MU01 น้องข้าวต้มดนตรี 32 หน้า รับไฟล์ PDF ทันที",
                    "ปลดล็อก 6 แทร็กเสียงจริงของ MU01 ฟรีอัตโนมัติบนเว็บเมื่อเปิดระบบ",
                    "ครบ 16 ไฟล์ PDF (TH/EN × สี/ขาวดำ) ปริ้นท์ซ้ำได้ตลอดชีพในครอบครัว",
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
                  edition: "ALL4_BUNDLE",
                  lang: "th",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/60 bg-amber-400/20 hover:bg-amber-400/30 px-5 py-3.5 text-base font-bold text-amber-100 transition-colors"
              >
                <FaLine className="w-5 h-5 text-[#06C755]" />
                <span>สั่งซื้อ All-4 Bundle ครบ 4 เล่ม (319 ฿) ทาง LINE</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
