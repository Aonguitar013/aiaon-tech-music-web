import { TeacherVideoView } from "@/components/services/teacher-video/TeacherVideoView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ที่ปรึกษาและผลิตสื่อวิดีโอวิทยฐานะสำหรับครู (PA) | AiAon Tech",
  description:
    "บริการวางแผนแผนการสอน ถ่ายทำและตัดต่อสื่อวิดีโอเสนอสภาพปัญหา (คลิป 10 นาที) และที่ปรึกษาบันทึกคลิปการสอนตามเกณฑ์ ก.ค.ศ. PA ล่าสุด โดยทีมงานครูจริงและผู้เชี่ยวชาญนวัตกรรม",
  keywords: [
    "วิทยฐานะครู",
    "ประเมิน PA",
    "ผลิตคลิปการสอน",
    "คลิปสภาพปัญหา",
    "ที่ปรึกษา PA",
    "แผนการสอน PA",
    "แผนการจัดการเรียนรู้",
    "AiAon Tech",
    "คลิปการสอน กคศ"
  ],
  openGraph: {
    title: "ที่ปรึกษาและผลิตสื่อวิดีโอวิทยฐานะสำหรับครู (PA) | AiAon Tech",
    description:
      "ช่วยการประเมินวิทยฐานะครูให้เป็นเรื่องง่าย ผลิตวิดีโอและวางแผนตามเกณฑ์ ก.ค.ศ. PA ล่าสุด มั่นใจผ่านประเมิน 100% โดยเพื่อนร่วมวิชาชีพ",
    type: "website",
  },
};

export default function ServicesPage() {
  return <TeacherVideoView />;
}
