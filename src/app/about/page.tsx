import { AboutMasterView } from "@/components/about/AboutMasterView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา & รวมช่องทางทางการ | AiAon Tech x Music (ครูอ้น)",
  description:
    "ประวัติ นวัตกรรม Smart School Automation, AI Caretaker และศูนย์รวมทุกช่องทางโซเชียลมีเดีย พร้อมหน้าร้านอุปกรณ์ไอทีของแท้ 3 แพลตฟอร์ม โดย ครูอ้น (จิรวัฒน์ เดชเส้ง) โรงเรียนหาดใหญ่วิทยาลัย",
  keywords: [
    "เกี่ยวกับเรา",
    "ครูอ้น",
    "จิรวัฒน์ เดชเส้ง",
    "โรงเรียนหาดใหญ่วิทยาลัย",
    "ไอทีง่ายๆ สไตล์ iAon",
    "iAonTech",
    "AI Caretaker",
    "Smart School Automation",
    "TikTok Shop iAonTech",
    "Shopee iAonTech",
    "Lazada iAonTech",
  ],
  openGraph: {
    title: "เกี่ยวกับเรา & รวมช่องทางทางการ | AiAon Tech x Music (ครูอ้น)",
    description:
      "เมื่อคนขี้เกียจทำงานเอกสาร เสกโค้ดให้คอมทำงานแทน! รวมประวัติ ช่องทางทางการ 7 ช่องทาง และหน้าร้านอุปกรณ์ไอทีครูอ้นในหน้าเดียว",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutMasterView />;
}
