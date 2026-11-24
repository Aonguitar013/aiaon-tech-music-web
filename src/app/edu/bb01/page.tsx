import type { Metadata } from "next";
import { Bb01HubView } from "@/components/edu/Bb01HubView";

export const metadata: Metadata = {
  title:
    "สมุด Busy Book ลีลามือ & สุขอนามัยกับน้องชาบู (EDU-BB01) — นาฬิกาแปรงฟัน 2 นาที & แจกฟรี 5 หน้า",
  description:
    "หน้า Hybrid QR ประจำชุดสื่อการสอน EDU-BB01 น้องชาบู Busy Book (อายุ 3–5 ปี): นาฬิกาจับเวลาแปรงฟัน 2 นาที & ล้างมือ 20 วินาทีพร้อมเสียงปรบมือรางวัล, เช็กลิสต์ล้างมือ 6 ขั้น WHO, โหลดชุดทดลองฟรี 5 หน้า (รวมบอร์ดแปรงฟันไวท์บอร์ด P15!) และสั่งซื้อเล่มเต็ม 32 หน้า",
  keywords: [
    "EDU-BB01",
    "Busy Book อนุบาล",
    "สมุดตีนตุ๊กแกเด็ก",
    "ลีลามือเตรียมเขียน",
    "บอร์ดแปรงฟันเด็ก",
    "ล้างมือ 6 ขั้นตอน WHO",
    "นาฬิกาจับเวลาแปรงฟัน 2 นาที",
    "iAon Edu-Verse",
    "ครูอ้น",
  ],
  openGraph: {
    title:
      "สมุด Busy Book ลีลามือ & สุขอนามัยกับน้องชาบู (EDU-BB01) — แจกฟรี 5 หน้า!",
    description:
      "นาฬิกาจับเวลาแปรงฟัน 2 นาที + ล้างมือ 6 ขั้น WHO + โหลดฟรี 5 หน้า (รวมบอร์ดแปรงฟันไวท์บอร์ดลบได้ P15!)",
    url: "https://www.aiaon.tech/edu/bb01",
    images: [
      {
        url: "/edu/bb01/mockup-01-cover.webp",
        width: 1080,
        height: 1080,
        alt: "EDU-BB01 Shabu's Busy Book Fine Motor & Hygiene Kit",
      },
    ],
    type: "website",
  },
};

export default function EduBb01Page() {
  return <Bb01HubView />;
}
