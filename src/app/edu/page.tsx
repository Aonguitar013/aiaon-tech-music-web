import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Printer, QrCode, Layers } from "lucide-react";
import { FaLine } from "react-icons/fa6";
import { EDU_CATALOG, getEduOrderLineUrl } from "@/lib/eduCatalog";

export const metadata: Metadata = {
  title: "iAon Edu-Verse — สื่อการสอน Hybrid (กระดาษ + QR เสียง/เว็บแอป) โดยครูอ้น",
  description:
    "คลังสื่อการสอนดิจิทัลแบบ Hybrid กระดาษคู่ QR Code ระดับมาตรฐานครูตัวจริง Zero AI-Slop แยก Home/Class Edition 2 ภาษา TH/EN ปริ้นท์ได้ทั้ง A4 และ US Letter โดยแก๊ง 6 แมว iAon Edu-Verse",
  openGraph: {
    title: "iAon Edu-Verse — สื่อการสอน Hybrid โดยแก๊ง 6 แมว & ครูอ้น",
    description:
      "ใบงานฝึก EF, โค้ดดิ้งไร้จอ และดนตรีเด็กเล็ก Hybrid QR พร้อมเสียงจริงและ Focus Timer",
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
                <span>iAon EDU-VERSE • HYBRID LEARNING FACTORY</span>
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                สื่อการสอน Hybrid{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-cyan-300">
                  กระดาษ + QR มีชีวิต
                </span>
              </h1>

              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                ออกแบบโดยครูตัวจริง ยึดมาตรฐาน <strong>Zero AI-Slop</strong> —
                โจทย์ทุกข้อผ่านการตรวจสอบ 100% พัฒนาคู่กับแก๊ง 6 แมวสุดคิวต์
                รองรับทั้งภาษาไทย-อังกฤษ และเวอร์ชันสี-ขาวดำประหยัดหมึก
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="/edu/ef01"
                  className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 px-5 py-3 text-sm sm:text-base font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-colors"
                >
                  <span>เปิดใช้งาน EDU-EF01 (แจกฟรี 5 หน้า)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
              desc: "สแกนเปิด Focus Timer หรือฟังเสียงดนตรีจริงได้ทันที ไม่มีลิงก์ตาย",
            },
            {
              icon: ShieldCheck,
              title: "Zero AI-Slop 100%",
              desc: "เขาวงกต ซูโดกุ และโน้ตดนตรีตรวจถูกต้องตามหลักวิชาการทุกหน้า",
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
                <p className="text-xs text-white/65 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </section>

        {/* Catalog Grid */}
        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">คลังสื่อการสอน (SKU Catalog)</h2>
              <p className="text-sm text-white/65">
                เลือกชุดสื่อเพื่อเปิดเครื่องมือ Hybrid QR หรือดาวน์โหลดชุดทดลองฟรี
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDU_CATALOG.map((item) => {
              const isLive = item.status === "live";
              return (
                <div
                  key={item.sku}
                  className={`rounded-3xl border p-6 flex flex-col justify-between gap-6 ${
                    isLive
                      ? "border-amber-400/40 bg-gradient-to-b from-amber-500/10 to-slate-950"
                      : "border-fuchsia-400/30 bg-gradient-to-b from-fuchsia-500/10 to-slate-950"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-mono font-bold text-white">
                        {item.sku}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isLive
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/35"
                            : "bg-fuchsia-500/20 text-fuchsia-200 border border-fuchsia-400/35"
                        }`}
                      >
                        {item.badgeTh}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-full bg-[#fffdf7] p-2 ring-2 ring-amber-400/45 shadow-lg overflow-hidden flex items-center justify-center shrink-0">
                        <img
                          src={item.heroImage}
                          alt={item.characterNameEn}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h3 className="text-lg font-bold text-white leading-snug">
                          {item.titleTh}
                        </h3>
                        <p className="text-xs text-amber-200/80">{item.ageRangeTh}</p>
                        <p className="text-xs text-white/65 leading-relaxed">
                          {item.subtitleTh}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                    <div className="text-xs text-white/70">
                      Home{" "}
                      <strong className="text-base text-amber-300">
                        {item.priceHomeThb} ฿
                      </strong>{" "}
                      • Class{" "}
                      <strong className="text-base text-sky-300">
                        {item.priceClassThb} ฿
                      </strong>
                    </div>

                    {isLive ? (
                      <Link
                        href={`/edu/${item.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors"
                      >
                        <span>เปิดหน้า Hybrid QR & โหลดฟรี</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href={getEduOrderLineUrl({
                          sku: item.sku,
                          edition: "BUNDLE",
                          lang: "th",
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/40 bg-fuchsia-500/15 hover:bg-fuchsia-500/25 px-4 py-2.5 text-sm font-semibold text-fuchsia-100 transition-colors"
                      >
                        <FaLine className="w-4 h-4 text-[#06C755]" />
                        <span>จองแพ็กคู่ EF01+MU01 (199 ฿)</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
