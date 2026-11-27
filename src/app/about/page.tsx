import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";
import { AboutMasterView } from "@/components/about/AboutMasterView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา & Brand Kit V2.0 | AiAon (ครูอ้น จิรวัฒน์ เดชเส้ง)",
  description:
    "เรื่องราวและปรัชญา Creative Laziness ของครูอ้น จิรวัฒน์ เดชเส้ง ผู้ก่อตั้ง AiAon ครบทั้ง 4 เสาหลัก (Tech, Edu-Verse, Audio, Studio) พร้อมดาวน์โหลด Brand Kit V2.0, ใบรับรอง AI และช่องทางทางการทั้งหมด",
  keywords: [
    "เกี่ยวกับเรา",
    "ครูอ้น",
    "จิรวัฒน์ เดชเส้ง",
    "โรงเรียนหาดใหญ่วิทยาลัย",
    "AiAon",
    "AiAon Tech",
    "AiAon Edu-Verse",
    "AiAon Audio",
    "AiAon Studio",
    "Brand Kit V2.0",
    "Smart School Automation",
  ],
  openGraph: {
    title: "The Story of AiAon | ครูอ้น จิรวัฒน์ เดชเส้ง",
    description:
      "เมื่อคนขี้เกียจทำงานเอกสาร เสกโค้ดให้คอมทำงานแทน — Teacher · Musician · Maker ผู้ก่อตั้งระบบนิเวศ AiAon 4 เสาหลัก",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <PillarThemeWrapper pillar="about">
      <AboutMasterView />
    </PillarThemeWrapper>
  );
}
