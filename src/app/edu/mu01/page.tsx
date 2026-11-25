import type { Metadata } from "next";
import { Mu01HubView } from "@/components/edu/Mu01HubView";

export const metadata: Metadata = {
  title:
    "EDU-MU01 สนุกกับจังหวะและโน้ตดนตรีกับน้องข้าวต้ม — สื่อดนตรี Hybrid QR 6 แทร็กเสียงจริง",
  description:
    "หน้า Hybrid QR ประจำเล่ม EDU-MU01 น้องข้าวต้มดนตรี: เครื่องเล่นจังหวะ 70/95 BPM, ควิซหูวิเศษ 5 ข้อ, ควิซทายเสียงเครื่องดนตรี 8 ชนิด, เนื้อเพลงธีมวงดนตรีน้องข้าวต้ม พร้อมดาวน์โหลด Freebie 5 หน้า (TH/EN) ฟรี!",
  openGraph: {
    title:
      "EDU-MU01 น้องข้าวต้มดนตรี — Hybrid QR 6 แทร็กเสียงจริง & จังหวะ 70/95 BPM",
    description:
      "ฝึกจังหวะ 4/4, 4 เพื่อนโน้ต และทายเสียงเครื่องดนตรี 8 ชนิดคู่กระดาษ พร้อมโหลดชุดทดลองฟรี 5 หน้า TH/EN!",
    url: "https://www.aiaon.tech/edu/mu01",
    images: [
      {
        url: "/edu/mu01/mockup-01-cover.webp",
        width: 1200,
        height: 1200,
        alt: "EDU-MU01 Khao Tom's Music & Rhythm Adventure",
      },
    ],
    type: "website",
  },
};

export default function EduMu01Page() {
  return <Mu01HubView />;
}
