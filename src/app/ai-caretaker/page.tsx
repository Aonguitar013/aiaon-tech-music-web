import { AICaretakerView } from "@/components/services/AICaretakerView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รับติดตั้ง & เฝ้าดูแลระบบ AI รายเดือน (AI Caretaker) | AiAon Tech",
  description:
    "บริการติดตั้งแอดมิน AI ตอบแชท ตรวจสลิป รับจองคิว พร้อมระบบ AI Watchdog และครูอ้นคอยเฝ้าดูแลแก้ปัญหาให้ตลอด 24 ชม. สำหรับพ่อค้าแม่ค้าและร้านค้า SME เริ่มต้นเพียงวันละ 33 บาท",
  keywords: [
    "รับดูแลระบบ AI",
    "รับทำ AI ร้านค้า",
    "แอดมิน AI ตอบแชท",
    "ตรวจสลิปอัตโนมัติ LINE OA",
    "ระบบจองคิว AI",
    "AI Caretaker",
    "AiAon Tech",
    "ครูอ้น",
  ],
  openGraph: {
    title: "รับติดตั้ง & เฝ้าดูแลระบบ AI รายเดือน (AI Caretaker) | AiAon Tech",
    description:
      "อยากใช้ AI แต่กลัวทำพัง? เราเซตระบบให้ + เฝ้าดูแล AI ให้ทุกเดือน เริ่มต้นแค่วันละ 33 บาท!",
    type: "website",
  },
};

export default function AICaretakerPage() {
  return <AICaretakerView />;
}
