import { BundlesView } from "@/components/bundles/BundlesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "แพ็กเกจเหมาสุดคุ้ม (Bundle Packages) | AiAon Tech",
  description:
    "รวมชุดระบบ Google Apps Script สำเร็จรูป สำหรับคุณครูและสถานศึกษา คุ้มค่า ประหยัดสูงสุดกว่า 50% พร้อมใช้งานทันที",
  keywords: [
    "แพ็กเกจระบบครู", "Google Apps Script", "Bundle", "ระบบเช็คชื่อ", "เกียรติบัตร", "AiAon Tech", "ครูอ้น"
  ],
  openGraph: {
    title: "แพ็กเกจเหมาสุดคุ้ม (Bundle Packages) | AiAon Tech",
    description:
      "รวมชุดระบบ Google Apps Script สำเร็จรูป สำหรับคุณครูและสถานศึกษา คุ้มค่า ประหยัดสูงสุดกว่า 50%",
    type: "website",
  },
};

export default function BundlesPage() {
  return <BundlesView />;
}
