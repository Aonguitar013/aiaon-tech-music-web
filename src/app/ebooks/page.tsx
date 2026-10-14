import { EbooksCatalogView } from "@/components/ebooks/EbooksCatalogView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คลัง 30 สุดยอด E-Book นวัตกรรม & คู่มือครูไทย 2026 | AiAon Tech",
  description:
    "ยกระดับวิชาชีพครูไทยด้วยคลัง 30 E-Book นวัตกรรมการสอน ว.PA ผ่านฉลุย 100%, 100 คำสั่ง AI ลับเสกงานครู, วิจัยในชั้นเรียน 3 วันเสร็จ, Google Sheets อัตโนมัติ โดย ครูอ้น (iAon Tech)",
  keywords: [
    "E-book ครูไทย",
    "คู่มือ ว.PA",
    "คัมภีร์ ว.PA ผ่านฉลุย",
    "100 คำสั่ง AI งานครู",
    "วิจัยในชั้นเรียน CAR 5 บท",
    "Google Sheets จัดการเรียนการสอน",
    "Canva สำหรับครู",
    "AiAon Tech",
    "ครูอ้น จิรวัฒน์ เดชเส้ง",
  ],
  openGraph: {
    title: "คลัง 30 สุดยอด E-Book นวัตกรรม & คู่มือครูไทย 2026 | AiAon Tech",
    description:
      "แก้ปัญหาตรงจุด เพิ่มความก้าวหน้าในวิชาชีพ คืนเวลาชีวิตให้ครูไทย ราคาเริ่มต้นเพียง 250 บาท พร้อมรับสิทธิ์อ่านออนไลน์และพิมพ์ PDF A4 ได้ทันที",
    type: "website",
  },
};

export default function EbooksPage() {
  return <EbooksCatalogView />;
}
