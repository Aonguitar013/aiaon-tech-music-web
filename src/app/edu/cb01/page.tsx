import type { Metadata } from "next";
import { Cb01HubView } from "@/components/edu/Cb01HubView";

export const metadata: Metadata = {
  title:
    "EDU-CB01 สมุดระบายสีแก๊ง 6 แมว & คาแรกเตอร์พลังใจ (40 หน้า TH/EN) — ระบายสีออนไลน์ & โหลดฟรี 5 หน้า",
  description:
    "หน้า Hybrid QR ประจำชุดสมุดระบายสี EDU-CB01 แก๊ง 6 แมว 40 หน้าเต็ม (เส้นหนาขอบชัดสำหรับวัย 3–6 ปี + คำศัพท์ 2 ภาษา + ประโยคพลังใจ + ใบประกาศฯ): ทดลองจิ้มเลือกสีและระบายแก๊ง 6 แมวสดบนเว็บฟรี พร้อมโหลดชุดทดลองฟรี 5 หน้า TH/EN!",
  openGraph: {
    title:
      "EDU-CB01 สมุดระบายสีแก๊ง 6 แมว & คาแรกเตอร์พลังใจ (40 หน้า • เริ่ม 49฿!)",
    description:
      "36 ภาพเส้นหนาขอบชัด 6 แมวครบแก๊ง + คำศัพท์ 2 ภาษา + ประโยคพลังใจ + เว็บระบายสีออนไลน์ฟรี โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/cb01",
    images: [
      {
        url: "/edu/cb01/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-CB01 The 6 Cats Gentle Heart Coloring Book (40 Pages)",
      },
    ],
    type: "website",
  },
};

export default function EduCb01Page() {
  return <Cb01HubView />;
}
