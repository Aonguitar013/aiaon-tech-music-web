import type { Metadata } from "next";
import { EduHubClient } from "@/components/edu/EduHubClient";

export const metadata: Metadata = {
  title:
    "AiAon Edu-Verse — สื่อกิจกรรมไร้จอ นิทานภาพ ระบายสี & แฟลชการ์ด + Hybrid QR ครบ 15 เล่ม Live (วัย 3–7 ปี)",
  description:
    "สื่อการสอนเด็กเล็ก นิทานภาพ สมุดระบายสี และแฟลชการ์ดแก๊ง 6 แมวแบบ Hybrid กระดาษคู่ QR มาตรฐานครูตัวจริง Zero AI-Slop ครบ 15 เล่ม Live: ใบงาน 7 เล่ม + นิทานภาพ 6 เล่ม + สมุดระบายสี 40 หน้า + แฟลชการ์ด 48 การ์ด แจกฟรีรวม 75 หน้า!",
  openGraph: {
    title:
      "AiAon Edu-Verse — ครบ 15 เล่ม Live! สื่อกิจกรรมไร้จอ + นิทานภาพ + ระบายสี + แฟลชการ์ดแก๊ง 6 แมว",
    description:
      "เลิกบ่นซ้ำทุกเช้า! ครบ 15 เล่ม Live (ใบงาน 7 + นิทาน 6 + ระบายสี 40 หน้า + แฟลชการ์ด 48 ใบ เริ่ม 49฿) แจกฟรีรวม 75 หน้า!",
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
