import type { Metadata } from "next";
import { Vl01HubView } from "@/components/edu/Vl01HubView";

export const metadata: Metadata = {
  title:
    "EDU-VL01 นักผจญภัยสายภาษา & Phonics กับน้องบ๊อบ — กระดานเสียง A–Z & แจกฟรี 5 หน้า",
  description:
    "หน้า Hybrid QR ประจำชุดสื่อการสอน EDU-VL01 น้องบ๊อบ (อายุ 3–6 ปี): กระดานกดฟังเสียงโฟนิกส์ A–Z และคำศัพท์รอบตัว 6 หมวด 2 ภาษา, ฝึกผสมคำ 3 เสียง CVC, สะสมดาว 5 ด่าน พร้อมดาวน์โหลด Freebie 5 หน้า (TH/EN) ฟรี!",
  keywords: [
    "EDU-VL01",
    "Phonics อนุบาล",
    "โฟนิกส์ A-Z",
    "คำศัพท์ภาษาอังกฤษเด็กเล็ก",
    "แฟลชการ์ด A-Z",
    "ผสมคำ CVC",
    "iAon Edu-Verse",
    "น้องบ๊อบ",
  ],
  openGraph: {
    title:
      "EDU-VL01 นักผจญภัยสายภาษา & Phonics กับน้องบ๊อบ — กระดานเสียง A–Z ฟรี!",
    description:
      "กดฟังเสียง Phonics A–Z & คำศัพท์ 6 หมวด 2 ภาษา คู่ใบงาน 32 หน้าเต็ม + 27 แฟลชการ์ดตัดเล่น พร้อมโหลดฟรี 5 หน้า TH/EN!",
    url: "https://www.aiaon.tech/edu/vl01",
    images: [
      {
        url: "/edu/vl01/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-VL01 Bob's Visual Phonics & Early Vocabulary Adventure",
      },
    ],
    type: "website",
  },
};

export default function EduVl01Page() {
  return <Vl01HubView />;
}
