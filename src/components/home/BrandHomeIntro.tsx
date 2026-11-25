import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  PawPrint,
  Music,
  ShoppingBag,
  UserRound,
  GraduationCap,
  Guitar,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Brand Bible V2.0 — Phase 2: Warm Premium Editorial home intro
 * (Hero + 5 Universe Gateway Cards + Founder Trust). Server component, no backend touch.
 */

interface Gateway {
  id: string;
  title: string;
  tag: string;
  desc: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  accent: string; // text/icon color (AA on white)
  soft: string; // soft pastel bg for icon chip
  ring: string; // hover border
}

const GATEWAYS: Gateway[] = [
  {
    id: "tech",
    title: "Tech Core",
    tag: "ระบบ & AI",
    desc: "คลังระบบ Google Apps Script 0-Baht, KruRank AI และระบบอัตโนมัติสำหรับครูและธุรกิจ",
    href: "/digital-vault",
    cta: "เข้าสู่ Digital Vault",
    icon: Cpu,
    accent: "text-[#1D4ED8]",
    soft: "bg-blue-50",
    ring: "hover:border-blue-300",
  },
  {
    id: "edu",
    title: "iAon Edu-Verse",
    tag: "สื่อการสอนเด็กเล็ก",
    desc: "จักรวาลแมวน้อยและเพื่อนๆ — เกม แบบฝึก และสื่อ Home / Class สำหรับพ่อแม่และครูอนุบาล",
    href: "/edu",
    cta: "สำรวจ Edu-Verse",
    icon: PawPrint,
    accent: "text-[#B45309]",
    soft: "bg-amber-50",
    ring: "hover:border-amber-300",
  },
  {
    id: "audio",
    title: "AiAon Audio",
    tag: "ดนตรี & เสียง",
    desc: "คลังเพลงลิขสิทธิ์ BGM เพลงช่วยจำ และเทมเพลตดนตรีเพื่อการศึกษา",
    href: "/music-store",
    cta: "ฟังคลังเพลง",
    icon: Music,
    accent: "text-[#6D28D9]",
    soft: "bg-violet-50",
    ring: "hover:border-violet-300",
  },
  {
    id: "studio",
    title: "Digital Goods & Studio",
    tag: "สินค้าดิจิทัล",
    desc: "สติกเกอร์ LINE, E-Book, ของแจกฟรี และงานดีไซน์พร้อมใช้จากสตูดิโอของครูอ้น",
    href: "/line-stickers",
    cta: "เปิดสตูดิโอ",
    icon: ShoppingBag,
    accent: "text-[#BE123C]",
    soft: "bg-rose-50",
    ring: "hover:border-rose-300",
  },
  {
    id: "about",
    title: "About iAon",
    tag: "เบื้องหลังแบรนด์",
    desc: "เรื่องราวของครูอ้น — ครู นักดนตรี และนักสร้างระบบ ที่เชื่อว่าไอเดียต้องใช้ได้จริง",
    href: "/about",
    cta: "รู้จักครูอ้น",
    icon: UserRound,
    accent: "text-[#0F766E]",
    soft: "bg-teal-50",
    ring: "hover:border-teal-300",
  },
];

const TRUST: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: GraduationCap, title: "Teacher", text: "ครู ค.ศ.2 โรงเรียนหาดใหญ่วิทยาลัย ใช้งานจริงในห้องเรียนทุกวัน" },
  { icon: Guitar, title: "Musician", text: "นักดนตรีและโปรดิวเซอร์ ทำเพลงเพื่อการศึกษาและสื่อสร้างสรรค์" },
  { icon: Wrench, title: "Maker", text: "สร้างระบบ AI และเครื่องมืออัตโนมัติ ที่ครูคนอื่นหยิบไปใช้ได้ทันที" },
];

export function BrandHomeIntro() {
  return (
    <div className="bg-[#FAF8F5] text-[#1E293B] font-prompt overflow-x-hidden">
      {/* HERO */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10" aria-label="Hero">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white border border-[#E2E8F0] px-4 py-1.5 text-xs font-semibold tracking-wide text-[#475569]">
            Teacher · Musician · Maker
          </p>
          <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A]">
            Ideas made for <span className="text-[#1D4ED8]">real life.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#475569]">
            จักรวาลของครูอ้น (จิรวัฒน์ เดชเส้ง) — ระบบอัตโนมัติ สื่อการสอน ดนตรี และสินค้าดิจิทัล
            ที่ออกแบบมาให้ใช้ได้จริง เรียบง่าย และไม่เสียเวลา
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/digital-vault"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#1D4ED8] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#1E40AF] transition-colors"
            >
              เริ่มสำรวจระบบ <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/freebies"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-[#E2E8F0] px-6 py-3.5 text-sm font-bold text-[#0F172A] hover:border-[#CBD5E1] transition-colors"
            >
              รับของแจกฟรี
            </Link>
          </div>
        </div>
      </section>

      {/* 5 UNIVERSE GATEWAYS */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8" aria-label="Universe gateways">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">One Universe, Different Worlds.</h2>
        <p className="mt-2 text-sm sm:text-base text-[#475569]">เลือกโลกที่ใช่สำหรับคุณ</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GATEWAYS.map((g) => {
            const Icon = g.icon;
            return (
              <Link
                key={g.id}
                href={g.href}
                className={`group flex flex-col rounded-3xl bg-white border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all ${g.ring}`}
              >
                <span className={`inline-flex w-12 h-12 items-center justify-center rounded-2xl ${g.soft} ${g.accent}`}>
                  <Icon className="w-6 h-6" />
                </span>
                <span className={`mt-4 text-xs font-bold uppercase tracking-wider ${g.accent}`}>{g.tag}</span>
                <h3 className="mt-1 text-xl font-bold text-[#0F172A]">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#475569] grow">{g.desc}</p>
                <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${g.accent}`}>
                  {g.cta} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FOUNDER TRUST */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10" aria-label="Founder">
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-10 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#B45309]">Founder</p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            ครูอ้น — ทำจากปัญหาจริงของครูคนหนึ่ง
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-[#475569]">
            ทุกระบบและทุกสื่อในจักรวาลนี้เริ่มจากงานจริงในโรงเรียน แล้วต่อยอดเป็นเครื่องมือที่ครูและพ่อแม่ใช้ได้ทันที
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {TRUST.map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0] p-5">
                  <Icon className="w-6 h-6 text-[#1D4ED8]" />
                  <h3 className="mt-3 font-bold text-[#0F172A]">{t.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#475569]">{t.text}</p>
                </div>
              );
            })}
          </div>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:underline"
          >
            อ่านเรื่องราวของครูอ้น <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
