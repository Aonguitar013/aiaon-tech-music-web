import type { Metadata } from "next";
import { Rt01HubView } from "@/components/edu/Rt01HubView";

export const metadata: Metadata = {
  title:
    "ชุดสร้างวินัย & กิจวัตร 30 วันกับแม่ใหญ่ (EDU-RT01) — Routine Timer & แจกฟรี 5 หน้า",
  description:
    "หน้า Hybrid QR ประจำชุดสื่อการสอน EDU-RT01 ชุดสร้างวินัย & กิจวัตร 30 วันกับแม่ใหญ่ (อายุ 3–6 ปี): นาฬิกาจับเวลากิจวัตร 2/5/10/15 นาทีพร้อมเสียงปรบมือรางวัล, เช็กลิสต์เช้า-บ่าย-ก่อนนอน, ขวดโหลสะสมดาว, ดาวน์โหลดฟรี 5 หน้า (TH/EN) และสั่งซื้อเล่มเต็ม 32 หน้า",
  keywords: [
    "EDU-RT01",
    "ชุดสร้างวินัยเด็ก",
    "ตารางกิจวัตรเด็ก",
    "สื่อตีนตุ๊กแกอนุบาล",
    "ขวดโหลสะสมดาว",
    "มุมสงบใจ SEL",
    "Routine Visual Timer",
    "iAon Edu-Verse",
    "ครูอ้น",
  ],
  openGraph: {
    title:
      "ชุดสร้างวินัย & กิจวัตร 30 วันกับแม่ใหญ่ (EDU-RT01) — Routine Timer & แจกฟรี 5 หน้า",
    description:
      "นาฬิกาจับเวลากิจวัตรไร้หน้าจอ + เช็กลิสต์สะสมดาว + โหลดชุดทดลองฟรี 5 หน้า (บอร์ดตอนเช้า + ตารางดาว 7 วัน + การ์ดตีนตุ๊กแก 8 ใบ)",
    url: "https://www.aiaon.tech/edu/rt01",
    images: [
      {
        url: "/edu/rt01/mockup-01-cover.webp",
        width: 1080,
        height: 1080,
        alt: "EDU-RT01 Mama Mami's 30-Day Routine & Star Reward Kit",
      },
    ],
    type: "website",
  },
};

export default function EduRt01Page() {
  return <Rt01HubView />;
}
