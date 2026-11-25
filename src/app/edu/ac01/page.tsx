import type { Metadata } from "next";
import { Ac01HubView } from "@/components/edu/Ac01HubView";

export const metadata: Metadata = {
  title:
    "EDU-AC01 สตูดิโอศิลปะ & พลังใจอ่อนโยนกับน้องดำ — ผสมสีสด + หายใจ 4-4-4 & แจกฟรี 5 หน้า",
  description:
    "หน้า Hybrid QR ประจำชุดสื่อการสอน EDU-AC01 น้องดำ (เล่มที่ 6/6 ปิดครบจักรวาลแก๊ง 6 แมว): ห้องทดลองผสมแม่สีสด, แอนิเมชันหายใจสายรุ้ง 4-4-4, จานสีเช็กอารมณ์ 6 สี, สะสมดาว 5 ด่าน และโหลดชุดทดลองฟรี 5 หน้า TH/EN!",
  openGraph: {
    title:
      "EDU-AC01 สตูดิโอศิลปะ & พลังใจอ่อนโยนกับน้องดำ — เล่ม 6/6 ปิดครบจักรวาล!",
    description:
      "ผสมแม่สีสด + หายใจสายรุ้ง 4-4-4 + ใบงานศิลปะ & SEL 32 หน้าเต็ม (ประหยัดหมึก 100%) โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/ac01",
    images: [
      {
        url: "/edu/ac01/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-AC01 Midnight's Art, Craft & Gentle Feelings Studio",
      },
    ],
    type: "website",
  },
};

export default function EduAc01Page() {
  return <Ac01HubView />;
}
