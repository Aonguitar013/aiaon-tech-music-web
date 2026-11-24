import type { Metadata } from "next";
import { Ef01HubView } from "@/components/edu/Ef01HubView";

export const metadata: Metadata = {
  title: "นักสืบสมองไวกับน้องแซลมอน (EDU-EF01) — Focus Timer & สื่อฝึก EF 32 หน้า",
  description:
    "หน้า Hybrid QR ประจำชุดสื่อการสอน EDU-EF01 นักสืบสมองไวกับน้องแซลมอน (อายุ 4–6 ปี): นาฬิกาจับเวลาสมาธิ 5 นาทีพร้อมเสียงปรบมือรางวัล, สะสมดาว 5 ด่าน EF, ดาวน์โหลดชุดทดลองฟรี 5 หน้า (TH/EN) และสั่งซื้อเล่มเต็ม 32 หน้า",
  keywords: [
    "EDU-EF01",
    "นักสืบสมองไวกับน้องแซลมอน",
    "ใบงานฝึก EF อนุบาล",
    "แบบฝึกหัดเชาวน์ปัญญา 4-6 ปี",
    "Unplugged Coding เด็กเล็ก",
    "Focus Timer เด็ก",
    "iAon Edu-Verse",
    "ครูอ้น",
  ],
  openGraph: {
    title: "นักสืบสมองไวกับน้องแซลมอน (EDU-EF01) — Focus Timer & แจกฟรี 5 หน้า",
    description:
      "นาฬิกาจับเวลาสมาธิไร้หน้าจอ 5 นาที + เสียงปรบมือรางวัล + โหลดฟรี 5 หน้า (TH/EN) จากจักรวาลสื่อการสอน iAon Edu-Verse",
    url: "https://www.aiaon.tech/edu/ef01",
    images: [
      {
        url: "/edu/ef01/mockup-01-cover.webp",
        width: 1080,
        height: 1080,
        alt: "EDU-EF01 Detective Salmon's Brain & EF Booster",
      },
    ],
    type: "website",
  },
};

export default function EduEf01Page() {
  return <Ef01HubView />;
}
