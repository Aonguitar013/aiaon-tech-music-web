import type { Metadata } from "next";
import { St02HubView } from "@/components/edu/St02HubView";

export const metadata: Metadata = {
  title:
    "EDU-ST02 นิทานแปรงฟัน: ภารกิจปราบแมงกินฟันของน้องชาบู — เสียงเล่านิทาน TH/EN + นาฬิกาแปรงฟัน 2 นาที",
  description:
    "หน้า Hybrid QR ประจำหนังสือนิทานภาพ EDU-ST02 (ชุดนิทานพลังใจแก๊ง 6 แมว เล่มที่ 2 • น้องชาบู × แม่ใหญ่): Interactive Audio Storybook อ่านออกเสียง TH/EN 11 หน้าเรื่อง + นาฬิกาแปรงฟัน 2 นาที 3 ด่าน + 3 คำถามชวนคุย + โหลดฟรี 5 หน้า!",
  openGraph: {
    title:
      "EDU-ST02 ภารกิจปราบแมงกินฟันของน้องชาบู — นิทานสร้างวินัยแปรงฟัน + นาฬิกา 2 นาทีฟรี",
    description:
      "นิทานภาพสีน้ำ 16 หน้า (น้องชาบู × แม่ใหญ่) เปลี่ยนการบังคับแปรงฟันเป็นเกมกัปตันฟองดาว 3 ด่าน 2 นาที โหลดฟรี 5 หน้า!",
    url: "https://www.aiaon.tech/edu/st02",
    images: [
      {
        url: "/edu/st02/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-ST02 Shabu's Sparkle-Tooth Mission",
      },
    ],
    type: "website",
  },
};

export default function EduSt02Page() {
  return <St02HubView />;
}
