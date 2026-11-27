import type { Metadata } from "next";
import { Sn01HubView } from "@/components/edu/Sn01HubView";

export const metadata: Metadata = {
  title:
    "EDU-SN01 ติวเข้มสอบเข้า ป.1 กับแก๊ง 6 แมว (Level 2) — ห้องสอบจำลองมีเสียงอ่านโจทย์ 20 ข้อ + จับเวลา 15 นาที",
  description:
    "หน้า Hybrid QR ประจำชุดติวสอบเข้า ป.1 EDU-SN01 (Level 2 อายุ 5–7 ปี): Audio Exam Simulator อ่านโจทย์ Mock Exam 20 ข้อ TH/EN + นาฬิกาจับเวลาสอบ 15 นาที + ตารางตรวจคำตอบ OMR สรุปคะแนนความพร้อม 4 ด้าน + โหลดชุดทดลองฟรี 5 หน้า!",
  openGraph: {
    title:
      "EDU-SN01 ติวเข้มสอบเข้า ป.1 (Level 2) — Audio Exam Simulator 20 ข้อ + จับเวลา 15 นาที",
    description:
      "ครบ 4 วิชาสอบเข้า ป.1 (คณิต, เชาวน์-บล็อก 3D, ภาษา, รอบตัว) + Mock Exam 20 ข้อ + เว็บอ่านโจทย์ให้ฟังฟรีไม่มีโฆษณา โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/sn01",
    images: [
      {
        url: "/edu/sn01/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-SN01 Grade 1 Entrance & Readiness Exam Prep (Level 2)",
      },
    ],
    type: "website",
  },
};

export default function EduSn01Page() {
  return <Sn01HubView />;
}
