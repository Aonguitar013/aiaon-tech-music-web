import { TeacherPrepView } from "@/components/prep/TeacherPrepView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "กลุ่ม Telegram & บอท AI ติวสอบครูผู้ช่วย (AiAon Prep) | AiAon Tech",
  description:
    "เตรียมสอบครูผู้ช่วยยุคใหม่ด้วย Telegram Daily Quiz Bot ยิงข้อสอบเก็งแม่นยำ 3 เวลา (เช้า-เที่ยง-ค่ำ) พร้อม AI อธิบายเฉลยเชิงลึก และคลังเพลงช่วยจำกฎหมายครู โดย ครูอ้น (iAon Tech)",
  keywords: [
    "สอบครูผู้ช่วย",
    "กลุ่ม Telegram สอบครูผู้ช่วย",
    "บอทข้อสอบครูผู้ช่วย",
    "เพลงช่วยจำกฎหมายการศึกษา",
    "ติวสอบครูผู้ช่วย AI",
    "AiAon Prep",
    "ครูอ้น",
  ],
  openGraph: {
    title: "กลุ่ม Telegram & บอท AI ติวสอบครูผู้ช่วย (AiAon Prep) | AiAon Tech",
    description:
      "บอทส่งข้อสอบครูผู้ช่วยเข้า Telegram วันละ 3 เวลา พร้อม AI อธิบายเฉลยรายข้อ และเพลงช่วยจำ พ.ร.บ. ฟังติดหู สอบติดในรอบเดียว!",
    type: "website",
  },
};

export default function TeacherPrepPage() {
  return <TeacherPrepView />;
}
