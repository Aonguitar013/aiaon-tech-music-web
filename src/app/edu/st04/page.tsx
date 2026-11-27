import type { Metadata } from "next";
import { St04HubView } from "@/components/edu/St04HubView";

export const metadata: Metadata = {
  title:
    "EDU-ST04 นิทานดนตรีคุมพลังล้น: จังหวะหัวใจของน้องข้าวต้ม — เสียงเล่านิทาน TH/EN + กลองจังหวะหัวใจ 70 BPM",
  description:
    "หน้า Hybrid QR ประจำหนังสือนิทานภาพ EDU-ST04 (ชุดนิทานพลังใจแก๊ง 6 แมว เล่มที่ 4 • น้องข้าวต้ม × แม่ใหญ่): Interactive Audio Storybook อ่านออกเสียง TH/EN 11 หน้าเรื่อง + กลองจังหวะหัวใจ 3 สปีด (70/95/120 BPM) + โหลดฟรี 5 หน้า!",
  openGraph: {
    title:
      "EDU-ST04 จังหวะหัวใจของน้องข้าวต้ม — นิทานคุมพลังงานล้นด้วยดนตรี + กลอง 70 BPM ฟรี",
    description:
      "นิทานภาพสีน้ำ 16 หน้า (น้องข้าวต้ม × แม่ใหญ่) เปลี่ยนเด็กพลังล้นไม่นิ่งเป็นวาทยกรคุมจังหวะหัวใจด้วยกลอง 3 สปีด โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/st04",
    images: [
      {
        url: "/edu/st04/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-ST04 Khao Tom's Steady Heartbeat Drum",
      },
    ],
    type: "website",
  },
};

export default function EduSt04Page() {
  return <St04HubView />;
}
