import type { Metadata } from "next";
import { St03HubView } from "@/components/edu/St03HubView";

export const metadata: Metadata = {
  title:
    "EDU-ST03 นิทานกิจวัตรเช้า: เช้าวันใหม่ใจเย็นของแม่ใหญ่ — เสียงเล่านิทาน TH/EN + นาฬิกา 4 โหมด & ขวดโหลดาวทอง",
  description:
    "หน้า Hybrid QR ประจำหนังสือนิทานภาพ EDU-ST03 (ชุดนิทานพลังใจแก๊ง 6 แมว เล่มที่ 3 • แม่ใหญ่ × ชาบู × แซลมอน): Interactive Audio Storybook อ่านออกเสียง TH/EN 11 หน้าเรื่อง + นาฬิกากิจวัตร 4 โหมด + ขวดโหลดาวทอง + โหลดฟรี 5 หน้า!",
  openGraph: {
    title:
      "EDU-ST03 เช้าวันใหม่ใจเย็นของแม่ใหญ่ — นิทานสร้างวินัยกิจวัตรเช้า + นาฬิกา 4 โหมดฟรี",
    description:
      "นิทานภาพสีน้ำ 16 หน้า (แม่ใหญ่ × ชาบู × แซลมอน) เปลี่ยนเช้าสุดวุ่นและเสียงบ่นเป็นเกมเวทมนตร์ 3 ก้าว + ขวดโหลดาวทอง โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/st03",
    images: [
      {
        url: "/edu/st03/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-ST03 Mama Mami's Calm Morning Magic",
      },
    ],
    type: "website",
  },
};

export default function EduSt03Page() {
  return <St03HubView />;
}
