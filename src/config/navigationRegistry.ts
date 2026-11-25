/**
 * 🧭 AiAon Tech — 4-Pillar International Mega Navigation Registry (V2.2)
 * Single Source of Truth driving Desktop 2-Column Mega Menu & Mobile Accordion.
 * Every href is verified against real Next.js App Router pages in src/app/.
 */
import { NAVBAR_FLAGS } from "@/config/catalogVisibility";

export type PillarId = "tech" | "edu" | "audio" | "studio" | "about";

export type NavIconKey =
  | "crown"
  | "database"
  | "sparkles"
  | "shield-check"
  | "briefcase"
  | "paw-print"
  | "book-open"
  | "graduation-cap"
  | "target"
  | "backpack"
  | "music"
  | "cat"
  | "sliders"
  | "radio"
  | "user-round"
  | "zap"
  | "scroll-text";

export interface NavRegistryItem {
  id: string;
  label: string;
  description: string;
  href: string;
  badge?: string;
  badgeTone?: "blue" | "amber" | "violet" | "teal" | "rose";
  icon: NavIconKey;
}

export interface NavPillarGroup {
  id: string;
  number: string;
  label: string;
  thaiLabel: string;
  pillar: PillarId;
  accentHex: string;
  items: NavRegistryItem[];
}

export const NAVIGATION_PILLARS: NavPillarGroup[] = [
  {
    id: "products",
    number: "01",
    label: "Products",
    thaiLabel: "ระบบ & เทคโนโลยี",
    pillar: "tech",
    accentHex: "#2563EB",
    items: [
      {
        id: "krurank",
        label: "KruRank AI",
        description: "ซ้อมสอบ AI วิเคราะห์จุดหลอก + ทำเนียบว่าที่ครูผู้ช่วย",
        href: "/krurank",
        badge: "AI App",
        badgeTone: "blue",
        icon: "crown",
      },
      {
        id: "digital-vault",
        label: "Digital Vault (20 ระบบ)",
        description: "คลังระบบงานโรงเรียน Google Apps Script 0-Baht",
        href: "/digital-vault",
        badge: "Popular",
        badgeTone: "amber",
        icon: "database",
      },
      {
        id: "bundles",
        label: "แพ็กเกจเหมาสุดคุ้ม (Bundles)",
        description: "ประหยัดสูงสุด 51% ปลดล็อกระบบโรงเรียนยกชุด",
        href: "/bundles",
        badge: "คุ้มสุด",
        badgeTone: "violet",
        icon: "sparkles",
      },
      {
        id: "ai-caretaker",
        label: "AI Caretaker",
        description: "แอดมิน AI ตอบแชท ตรวจสลิป เฝ้าระวังร้านค้า 24 ชม.",
        href: "/ai-caretaker",
        badge: "990฿/ด.",
        badgeTone: "teal",
        icon: "shield-check",
      },
      {
        id: "enterprise",
        label: "Custom Enterprise",
        description: "รับออกแบบและพัฒนาระบบโรงเรียน/องค์กรตามโจทย์จริง",
        href: "/services",
        icon: "briefcase",
      },
    ],
  },
  {
    id: "education",
    number: "02",
    label: "Education",
    thaiLabel: "สื่อ & สถาบัน",
    pillar: "edu",
    accentHex: "#D97706",
    items: [
      {
        id: "edu-verse",
        label: "iAon Edu-Verse",
        description: "สื่อเด็กเล็ก Hybrid QR 6 โลกการเรียนรู้ (แจกฟรี 30 หน้า!)",
        href: "/edu",
        badge: "ใหม่! 99฿",
        badgeTone: "rose",
        icon: "paw-print",
      },
      {
        id: "ebooks",
        label: "E-Books & Research",
        description: "คู่มือ ว.PA ผ่านฉลุย, 100 AI Prompts, วิจัย 5 บท",
        href: "/ebooks",
        badge: "Bestseller",
        badgeTone: "amber",
        icon: "book-open",
      },
      {
        id: "teacher-prep",
        label: "Teacher Prep Clinic",
        description: "ติวสอบครูผู้ช่วย AI & อัลบั้มเพลงช่วยจำ พ.ร.บ.",
        href: "/teacher-prep",
        badge: "สอบติดไว",
        badgeTone: "blue",
        icon: "target",
      },
      {
        id: "student-vault",
        label: "Student Vault & TCAS 3D",
        description: "Web Portfolio 3D ยื่นมหาวิทยาลัย & ระบบเช็คการบ้าน",
        href: "/student-vault",
        badge: "เริ่มต้น 129฿",
        badgeTone: "rose",
        icon: "backpack",
      },
      ...(NAVBAR_FLAGS.showAcademy
        ? [
            {
              id: "academy",
              label: "AiAon Academy",
              description: "คอร์สเรียนออนไลน์ AI & การเขียนโปรแกรมเพื่อการศึกษา",
              href: "/academy",
              badge: "เปิดใหม่",
              badgeTone: "blue" as const,
              icon: "graduation-cap" as const,
            },
          ]
        : []),
    ],
  },
  {
    id: "studio",
    number: "03",
    label: "Studio",
    thaiLabel: "เสียง & อาร์ต 3D",
    pillar: "studio",
    accentHex: "#7C3AED",
    items: [
      {
        id: "line-stickers",
        label: "3D Mascots & LINE Stickers",
        description: "ปั้นสติกเกอร์ LINE 3D จากรูปจริง & คลัง 30+ On Sale",
        href: "/line-stickers",
        badge: "🔥 ฮิต! 990฿+",
        badgeTone: "violet",
        icon: "cat",
      },
      {
        id: "music-store",
        label: "Music & BGM Store",
        description: "ร้านเพลงช่วยจำกฎหมายครู & BGM คลิป ว.PA ปลอดลิขสิทธิ์",
        href: "/music-store",
        badge: "ปลอดลิขสิทธิ์",
        badgeTone: "teal",
        icon: "music",
      },
      {
        id: "music-templates",
        label: "Audio & DAW Templates",
        description: "เทมเพลตงานเสียงและซาวด์ดีไซน์สำหรับครีเอเตอร์",
        href: "/music-templates",
        icon: "sliders",
      },
      {
        id: "band-grooving",
        label: "School Band & Groove",
        description: "โปรเจกต์ดนตรีโรงเรียน ซาวด์ประกอบ และ AI Music",
        href: "/band-grooving",
        icon: "radio",
      },
    ],
  },
  {
    id: "about",
    number: "04",
    label: "About",
    thaiLabel: "เกี่ยวกับเรา",
    pillar: "about",
    accentHex: "#92400E",
    items: [
      {
        id: "story",
        label: "The Story of iAon",
        description: "เรื่องราวของครูอ้น: Teacher · Musician · Maker",
        href: "/about",
        icon: "user-round",
      },
      {
        id: "philosophy",
        label: "Creative Laziness Philosophy",
        description: "สร้างระบบ AI อัตโนมัติ เพื่อคืนเวลาให้ชีวิต",
        href: "/about#philosophy",
        icon: "zap",
      },
      {
        id: "legal",
        label: "Legal & PDPA Compliance",
        description: "เงื่อนไขการใช้งาน, นโยบายความเป็นส่วนตัว และคืนเงิน",
        href: "/terms",
        icon: "scroll-text",
      },
    ],
  },
];
