import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";
import { LineStickersView } from "@/components/services/line-stickers/LineStickersView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รับออกแบบสติกเกอร์ LINE คาแรกเตอร์ครู 3D ครบวงจร | AiAon Tech โดยครูอ้น",
  description:
    "บริการรับทำสติกเกอร์ LINE คาแรกเตอร์ประจำตัวครูและบุคลากร 3D/การ์ตูนพรีเมียม ครบวงจร ปั้นจากภาพถ่ายจริง เลือกชุดข้าราชการ/ชุดประจำวิชา กำหนดคำพูดได้เอง ดูแลส่งตรวจจนวางขายบน LINE STORE สำเร็จ 100%",
  keywords: [
    "รับทำสติกเกอร์ไลน์ครู",
    "รับออกแบบสติกเกอร์ LINE",
    "สติกเกอร์ไลน์คาแรกเตอร์ครู",
    "สติกเกอร์ไลน์ 3D",
    "LINE Creators Market",
    "สติกเกอร์ครูอ้น",
    "AiAon Tech",
    "ครูอ้น",
  ],
  openGraph: {
    title: "รับออกแบบสติกเกอร์ LINE คาแรกเตอร์ครู 3D ครบวงจร | AiAon Tech",
    description:
      "เปลี่ยนรูปถ่ายคุณครูเป็นสติกเกอร์ LINE 3D สุดคิวต์ ครบทุกอารมณ์การสอน ดูแลส่งตรวจจนขึ้นขายบน LINE STORE พร้อมแถมไฟล์ PNG ความละเอียดสูงแต่งสไลด์และปก ว.PA",
    type: "website",
  },
};

export default function LineStickersServicePage() {
  return <PillarThemeWrapper pillar="studio" surface="dark"><LineStickersView /></PillarThemeWrapper>;
}
