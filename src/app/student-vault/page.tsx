import { StudentVaultView } from "@/components/student-vault/StudentVaultView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คลังไอเทม & ระบบช่วยเรียนสำหรับนักเรียน Gen Z | AiAon Tech",
  description:
    "รวมเทมเพลตเว็บ Portfolio TCAS รอบ 1, ระบบเช็คการบ้านประจำห้อง และคัมภีร์ AI Prompts เสกงานเสร็จใน 3 นาที สำหรับนักเรียนยุคใหม่",
  keywords: [
    "Portfolio TCAS", "พอร์ตโฟลิโอ TCAS รอบ 1", "ระบบเช็คการบ้าน", "AI ทำการบ้าน", "Prompt Canva", "AiAon Tech", "ครูอ้น"
  ],
  openGraph: {
    title: "คลังไอเทม & ระบบช่วยเรียนสำหรับนักเรียน Gen Z | AiAon Tech",
    description:
      "รวมเทมเพลตเว็บ Portfolio TCAS รอบ 1, ระบบเช็คการบ้านประจำห้อง และคัมภีร์ AI Prompts เสกงานเสร็จใน 3 นาที",
    type: "website",
  },
};

export default function StudentVaultPage() {
  return <StudentVaultView />;
}
