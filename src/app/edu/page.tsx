import type { Metadata } from "next";
import { EduHubClient } from "@/components/edu/EduHubClient";

export const metadata: Metadata = {
  title:
    "iAon Edu-Verse — สื่อกิจกรรมไร้จอ & นิทานภาพ + Hybrid QR ครบ 8 เล่ม (วัย 3–7 ปี)",
  description:
    "สื่อการสอนเด็กเล็กและนิทานก่อนนอนแบบ Hybrid กระดาษคู่ QR มาตรฐานครูตัวจริง Zero AI-Slop ครบ 8 เล่ม Live: Level 1 ครบ 6 เล่มแก๊ง 6 แมว + Level 2 ติวเข้มสอบเข้า ป.1 + NEW นิทานภาพเสียงอ่าน 'คืนที่ก้อนเมฆสีเทาหายไป' แจกฟรีรวม 40 หน้า!",
  openGraph: {
    title:
      "iAon Edu-Verse — ครบ 8 เล่ม Live! สื่อกิจกรรมไร้จอ + นิทานภาพ Hybrid QR (วัย 3–7 ปี)",
    description:
      "เลิกบ่นซ้ำทุกเช้า! ครบ 8 เล่ม (Level 1 ครบ 6 เล่ม + Level 2 ติวสอบเข้า ป.1 + นิทานก่อนนอนพลังใจ SEL) แจกฟรีรวม 40 หน้า!",
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
