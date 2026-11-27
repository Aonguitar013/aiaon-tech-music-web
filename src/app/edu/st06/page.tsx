import type { Metadata } from "next";
import { St06HubView } from "@/components/edu/St06HubView";

export const metadata: Metadata = {
  title:
    "EDU-ST06 นิทานฝึกสมาธิ EF: นักสืบแซลมอนกับปริศนาที่หายไป — เสียงเล่านิทาน TH/EN + นาฬิกา Focus Timer 5 นาที",
  description:
    "หน้า Hybrid QR ประจำหนังสือนิทานภาพ EDU-ST06 (ชุดนิทานพลังใจแก๊ง 6 แมว เล่มที่ 6 ปิดซีซัน 1 • น้องแซลมอน × แม่ใหญ่): Interactive Audio Storybook อ่านออกเสียง TH/EN 11 หน้าเรื่อง + นาฬิกา Focus Timer 5 นาที + โหลดฟรี 5 หน้า!",
  openGraph: {
    title:
      "EDU-ST06 นักสืบแซลมอนกับปริศนาที่หายไป — นิทานฝึกสมาธิ การรอคอย & ไม่ยอมแพ้ (เล่มปิดซีซัน 1)",
    description:
      "นิทานภาพสีน้ำ 16 หน้า (น้องแซลมอน × แม่ใหญ่) ฝึกสมอง EF ด้วยสูตรนักสืบใจเย็น 3 ขั้น พร้อมนาฬิกา Focus Timer 5 นาที โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/st06",
    images: [
      {
        url: "/edu/st06/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-ST06 Detective Salmon's Patient Clue Hunt",
      },
    ],
    type: "website",
  },
};

export default function EduSt06Page() {
  return <St06HubView />;
}
