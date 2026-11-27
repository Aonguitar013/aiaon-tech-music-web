import type { Metadata } from "next";
import { EduHubClient } from "@/components/edu/EduHubClient";

export const metadata: Metadata = {
  title:
    "AiAon Edu-Verse — สื่อกิจกรรมไร้จอ & นิทานภาพ + Hybrid QR ครบ 13 เล่ม Live (วัย 3–7 ปี)",
  description:
    "สื่อการสอนเด็กเล็กและนิทานภาพแก๊ง 6 แมวแบบ Hybrid กระดาษคู่ QR มาตรฐานครูตัวจริง Zero AI-Slop ครบ 13 เล่ม Live: ใบงาน Level 1 ครบ 6 เล่ม + Level 2 ติวสอบเข้า ป.1 + นิทานภาพ Season 1 ครบ 6/6 เล่ม แจกฟรีรวม 65 หน้า!",
  openGraph: {
    title:
      "AiAon Edu-Verse — ครบ 13 เล่ม Live! สื่อกิจกรรมไร้จอ + นิทานภาพแก๊ง 6 แมว 6/6 เล่ม (วัย 3–7 ปี)",
    description:
      "เลิกบ่นซ้ำทุกเช้า! ครบ 13 เล่ม Live (ใบงาน 7 เล่ม + นิทานภาพแก๊ง 6 แมว Season 1 ครบ 6/6 เล่ม) แจกฟรีรวม 65 หน้า!",
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
