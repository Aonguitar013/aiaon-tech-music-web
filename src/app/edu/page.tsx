import type { Metadata } from "next";
import { EduHubClient } from "@/components/edu/EduHubClient";

export const metadata: Metadata = {
  title:
    "iAon Edu-Verse — เลิกบ่นซ้ำทุกเช้า! สื่อกิจกรรมไร้จอ + QR จับเวลาสำหรับเด็ก 3–6 ปี",
  description:
    "สื่อการสอนเด็กเล็กแบบ Hybrid กระดาษคู่ QR จับเวลา มาตรฐานครูตัวจริง Zero AI-Slop ครบ 4 ชุดเปิดตัว: น้องแซลมอน EF, แม่ใหญ่สร้างวินัย 30 วัน, น้องชาบู Busy Book 45 การ์ด และน้องข้าวต้มดนตรี แจกฟรีรวม 15 หน้า!",
  openGraph: {
    title:
      "iAon Edu-Verse — สื่อกิจกรรมไร้จอ + QR จับเวลาสำหรับเด็ก 3–6 ปี โดยแก๊ง 6 แมว & ครูอ้น",
    description:
      "เลิกบ่นซ้ำทุกเช้า! ใบงานฝึก EF, ชุดสร้างวินัย 30 วัน, Busy Book ตีนตุ๊กแก 45 การ์ด & บอร์ดแปรงฟัน และดนตรีเด็กเล็ก แจกฟรีรวม 15 หน้า!",
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
