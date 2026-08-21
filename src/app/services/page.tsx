import { ServicesView } from "@/components/services/ServicesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "รับออกแบบ & พัฒนาระบบตามสั่งสำหรับโรงเรียน | AiAon Tech",
  description:
    "บริการรับออกแบบและพัฒนาระบบ Google Apps Script & Web App ตามบริบทโรงเรียนของคุณโดยเฉพาะ รันบน Google Workspace ตัวเอง ปลอดภัย ไม่มีค่าบริการรายเดือน",
  keywords: [
    "รับทำระบบโรงเรียน",
    "พัฒนาระบบตามสั่ง",
    "Google Apps Script",
    "ระบบเช็คชื่อ",
    "ระบบยานพาหนะ",
    "เกียรติบัตร QR",
    "AiAon Tech",
    "ครูอ้น"
  ],
  openGraph: {
    title: "รับออกแบบ & พัฒนาระบบตามสั่งสำหรับโรงเรียน | AiAon Tech",
    description:
      "บริการรับออกแบบและพัฒนาระบบ Google Apps Script & Web App ตามบริบทโรงเรียนของคุณโดยเฉพาะ รันบน Google Workspace ตัวเอง",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesView />;
}
