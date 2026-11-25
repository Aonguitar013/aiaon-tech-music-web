import type { Metadata } from "next";
import { EduHubClient } from "@/components/edu/EduHubClient";

export const metadata: Metadata = {
  title:
    "iAon Edu-Verse — เลิกบ่นซ้ำทุกเช้า! สื่อกิจกรรมไร้จอ + QR จับเวลาสำหรับเด็ก 3–6 ปี",
  description:
    "สื่อการสอนเด็กเล็กแบบ Hybrid กระดาษคู่ QR มาตรฐานครูตัวจริง Zero AI-Slop ครบสมบูรณ์ 6/6 เล่มแก๊ง 6 แมว: EF, วินัย 30 วัน, Busy Book, ดนตรี 6 แทร็ก, Phonics A–Z และศิลปะ-SEL น้องดำ แจกฟรีรวม 30 หน้า!",
  openGraph: {
    title:
      "iAon Edu-Verse — ครบ 6/6 เล่ม Live! สื่อกิจกรรมไร้จอ + Hybrid QR สำหรับเด็ก 3–6 ปี",
    description:
      "เลิกบ่นซ้ำทุกเช้า! ครบจักรวาลแก๊ง 6 แมว 192 หน้า (EF, วินัย, Busy Book, ดนตรี, โฟนิกส์, ศิลปะ & SEL) แจกฟรีรวม 30 หน้า!",
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
