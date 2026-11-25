import type { Metadata } from "next";
import { EduHubClient } from "@/components/edu/EduHubClient";

export const metadata: Metadata = {
  title:
    "iAon Edu-Verse — เลิกบ่นซ้ำทุกเช้า! สื่อกิจกรรมไร้จอ + QR จับเวลาสำหรับเด็ก 3–6 ปี",
  description:
    "สื่อการสอนเด็กเล็กแบบ Hybrid กระดาษคู่ QR มาตรฐานครูตัวจริง Zero AI-Slop ครบ 5 ชุด Live: น้องแซลมอน EF, แม่ใหญ่สร้างวินัย 30 วัน, น้องชาบู Busy Book, น้องข้าวต้มดนตรี และน้องบ๊อบ Phonics A–Z แจกฟรีรวม 25 หน้า!",
  openGraph: {
    title:
      "iAon Edu-Verse — สื่อกิจกรรมไร้จอ + Hybrid QR สำหรับเด็ก 3–6 ปี โดยแก๊ง 6 แมว & ครูอ้น",
    description:
      "เลิกบ่นซ้ำทุกเช้า! ครบ 5 เล่ม Live: EF, วินัย 30 วัน, Busy Book 45 การ์ด, ดนตรี 6 แทร็ก และ Phonics A–Z น้องบ๊อบ แจกฟรีรวม 25 หน้า!",
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
  return <EduHubClient />;
}
