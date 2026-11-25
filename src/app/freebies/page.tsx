import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";
import { createClient } from "@/utils/supabase/server";
import { FreebiesView, Freebie } from "@/components/freebies/FreebiesView";
import type { Metadata } from "next";
import { getLineOrderUrl } from "@/lib/line";
import { SHOW_DB_FREEBIES } from "@/config/catalogVisibility";

export const metadata: Metadata = {
  title: "คลังของแจกฟรี — โค้ด Google Apps Script, เทมเพลต และ AI Prompts | AiAon Tech",
  description:
    "ดาวน์โหลดทรัพยากรดิจิทัลฟรี 100% — ระบบ Google Apps Script, เทมเพลต Google Sheets ตัดเกรด, คัมภีร์ AI Prompts สำหรับครูและนักเรียน และ Backing Track ดนตรี",
  keywords: ["ของแจกฟรี", "Google Apps Script ฟรี", "เทมเพลตชีต", "AI Prompt ครู", "AiAon Tech", "ครูอ้น"],
  openGraph: {
    title: "คลังของแจกฟรี — โค้ด Google Apps Script, เทมเพลต และ AI Prompts | AiAon Tech",
    description: "ดาวน์โหลดทรัพยากรดิจิทัลฟรี 100% จาก AiAon Tech โดย ครูอ้น",
    type: "website",
  },
};

const REAL_BUILTIN_FREEBIES: Freebie[] = [
  {
    id: "freebie-gas-sar-aona07",
    title: "ระบบจัดการเอกสารประเมินตนเอง SAR & ว.PA 15 ตัวชี้วัด อัตโนมัติ (AONA07)",
    description: "ระบบ Web App สรุปความก้าวหน้า 15 ตัวชี้วัด, คลังหลักฐานเชื่อม Google Drive, สร้างเล่มรายงานดิจิทัลจัดพิมพ์ A4, ส่งออก Google Docs อัตโนมัติ พร้อมระบบลงนามรับรองผลโดยกรรมการด้วยรหัส PIN",
    category: "tech",
    icon_name: "BookOpenCheck",
    color_from: "from-emerald-500",
    color_to: "to-teal-700",
    glow_color: "rgba(16,185,129,0.35)",
    border_color: "border-emerald-500/30",
    text_color: "text-emerald-400",
    bg_color: "bg-emerald-500/10",
    tag: "AONA07 (ระบบบริหารงานวิชาการ & ว.PA)",
    file_size: "2.8 MB",
    file_type: "GAS Web App & SAR Docs",
    download_url: "https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgDJlCMMPrrsT41Ts0p0_mG3ARQDzg2jFhgxYKp8p5n6gNA?e=X8Nj74",
  },
  {
    id: "freebie-gas-active-shooter",
    title: "ระบบเช็กชื่อเผชิญเหตุฉุกเฉิน & Active Shooter (Auto Safe Zone)",
    description: "ระบบเช็กชื่อออนไลน์ Real-time แผนเผชิญเหตุฉุกเฉิน คัดกรองกลุ่มเปราะบางเข้า Safe Zone อัตโนมัติ เช็คมาทุกคน 1 คลิก พร้อม Dashboard สรุปยอด และแบบพิมพ์รายงาน A4 เสนอผู้บริหาร",
    category: "tech",
    icon_name: "ShieldAlert",
    color_from: "from-rose-500",
    color_to: "to-red-700",
    glow_color: "rgba(225,29,72,0.35)",
    border_color: "border-rose-500/30",
    text_color: "text-rose-400",
    bg_color: "bg-rose-500/10",
    tag: "AONE12 (ระบบบริหารความปลอดภัยสถานศึกษา)",
    file_size: "1.5 MB",
    file_type: "GAS Web App & A4 Print",
    download_url: "https://1drv.ms/f/c/ce3ad5ba004eb0c7/IgD_Jr6rfSsxSpAKzMlvYwa0AUZTGXnV_mi0Q5WW4ra9jKI?e=6afyzo",
  },
  {
    id: "freebie-gas-3d-flashcard",
    title: "ระบบฝึกจำหน้านักเรียน & คำศัพท์ 3D Flashcard",
    description: "ระบบเว็บแอป Web App สไตล์ 3D หมุนการ์ด ดึงรูปภาพจาก Google Drive และ Google Sheets ซิงค์คะแนนอัตโนมัติ สำหรับเปิดในห้องเรียนหรือให้นักเรียนฝึกจำ",
    category: "tech",
    icon_name: "Code2",
    color_from: "from-cyan-500",
    color_to: "to-blue-600",
    glow_color: "rgba(6,182,212,0.3)",
    border_color: "border-cyan-500/30",
    text_color: "text-cyan-400",
    bg_color: "bg-cyan-500/10",
    tag: "AONE10 (Google Apps Script)",
    file_size: "1.2 MB",
    file_type: "GAS Web App",
    download_url: getLineOrderUrl(
      'สวัสดีครับครูอ้น ปลดล็อกรหัสสำเร็จแล้ว ขอรับลิงก์ดาวน์โหลดไฟล์ฟรี:\n🎁 "[AONE10] ระบบฝึกจำหน้านักเรียน & คำศัพท์ 3D Flashcard" ครับ 🙏'
    ),
  },
  {
    id: "freebie-gas-asset-qr",
    title: "ระบบสร้างป้าย QR Code ติดครุภัณฑ์โรงเรียนอัตโนมัติ (ฟรี!)",
    description: "ระบบสร้างรหัส QR Code ติดอุปกรณ์และครุภัณฑ์โรงเรียนแบบชุดใหญ่ พิมพ์เป็นสติกเกอร์ติดทรัพย์สินได้ใน 1 วินาที สแกนเช็คประวัติได้ทันที",
    category: "tech",
    icon_name: "QrCode",
    color_from: "from-purple-500",
    color_to: "to-pink-600",
    glow_color: "rgba(168,85,247,0.3)",
    border_color: "border-purple-500/30",
    text_color: "text-purple-400",
    bg_color: "bg-purple-500/10",
    tag: "FREE-QR (งานพัสดุ & ครุภัณฑ์)",
    file_size: "850 KB",
    file_type: "GAS & Sheet",
    download_url: getLineOrderUrl(
      'สวัสดีครับครูอ้น ปลดล็อกรหัสสำเร็จแล้ว ขอรับลิงก์ดาวน์โหลดไฟล์ฟรี:\n🎁 "[FREE-QR] ระบบสร้างป้าย QR Code ติดครุภัณฑ์โรงเรียนอัตโนมัติ" ครับ 🙏'
    ),
  },
  {
    id: "freebie-smart-grade-tracker",
    title: "เทมเพลต Google Sheets คำนวณคะแนน & ตัดเกรดอัตโนมัติ",
    description: "ตารางบันทึกคะแนนเก็บและตัดเกรดอัตโนมัติ 8 กลุ่มสาระ พร้อมสูตรคำนวณเกรดเฉลี่ย, สถิติร้อยละ และกราฟแท่งสรุปผลการเรียนแบบมือโปร",
    category: "tech",
    icon_name: "FileSpreadsheet",
    color_from: "from-emerald-500",
    color_to: "to-teal-600",
    glow_color: "rgba(168,85,247,0.3)",
    border_color: "border-emerald-500/30",
    text_color: "text-emerald-400",
    bg_color: "bg-emerald-500/10",
    tag: "Google Sheets Template",
    file_size: "450 KB",
    file_type: "Google Sheet",
    download_url: getLineOrderUrl(
      'สวัสดีครับครูอ้น ปลดล็อกรหัสสำเร็จแล้ว ขอรับลิงก์ดาวน์โหลดไฟล์ฟรี:\n🎁 "เทมเพลต Google Sheets คำนวณคะแนน & ตัดเกรดอัตโนมัติ" ครับ 🙏'
    ),
  },
  {
    id: "freebie-teacher-ai-prompts",
    title: "คัมภีร์ 20 AI Prompts สำหรับครูไทย ยุคใหม่",
    description: "รวมชุดคำสั่ง AI Prompts ภาษาไทย ช่วยคุณครูเขียนแผนการจัดการเรียนรู้, ออกข้อสอบกากบาทพร้อมเฉลย และเขียนรายงานสรุปผลงาน ว.PA ใน 3 นาที",
    category: "tech",
    icon_name: "Sparkles",
    color_from: "from-amber-500",
    color_to: "to-orange-600",
    glow_color: "rgba(245,158,11,0.3)",
    border_color: "border-amber-500/30",
    text_color: "text-amber-400",
    bg_color: "bg-amber-500/10",
    tag: "AI Teacher Mastery",
    file_size: "2.4 MB",
    file_type: "PDF & Prompts",
    download_url: getLineOrderUrl(
      'สวัสดีครับครูอ้น ปลดล็อกรหัสสำเร็จแล้ว ขอรับลิงก์ดาวน์โหลดไฟล์ฟรี:\n🎁 "คัมภีร์ 20 AI Prompts สำหรับครูไทย ยุคใหม่" ครับ 🙏'
    ),
  },
  {
    id: "freebie-student-ai-starter",
    title: "Student AI Prompts Starter Pack (สำหรับนักเรียน)",
    description: "รวมชุดคำสั่ง AI สำหรับนักเรียน ช่วยเสกโครงร่างรายงาน 5 บท, สรุปบทเรียนทำข้อสอบ และเจนเนื้อหาสไลด์ Canva พรีเซนต์ใน 3 นาที",
    category: "tech",
    icon_name: "GraduationCap",
    color_from: "from-pink-500",
    color_to: "to-rose-600",
    glow_color: "rgba(244,63,94,0.3)",
    border_color: "border-pink-500/30",
    text_color: "text-pink-400",
    bg_color: "bg-pink-500/10",
    tag: "สำหรับนักเรียน Gen Z",
    file_size: "1.8 MB",
    file_type: "Digital PDF",
    download_url: getLineOrderUrl(
      'สวัสดีครับครูอ้น ปลดล็อกรหัสสำเร็จแล้ว ขอรับลิงก์ดาวน์โหลดไฟล์ฟรี:\n🎁 "Student AI Prompts Starter Pack (สำหรับนักเรียน)" ครับ 🙏'
    ),
  },
  {
    id: "freebie-guitar-backing-pack",
    title: "ชุดเพลงบรรเลง BGM ปลอดลิขสิทธิ์ 10 เพลง (สำหรับใส่คลิปการสอน / ว.PA)",
    description: "รวม 10 แทร็คเพลงบรรเลง Acoustic & Lo-Fi คุณภาพเสียงสตูดิโอ ปลอดลิขสิทธิ์ 100% ใช้ใส่คลิปการสอน คลิป ว.PA หรือเปิดในห้องเรียนได้ทันที",
    category: "music",
    icon_name: "Music2",
    color_from: "from-purple-600",
    color_to: "to-indigo-600",
    glow_color: "rgba(147,51,234,0.3)",
    border_color: "border-purple-500/30",
    text_color: "text-purple-300",
    bg_color: "bg-purple-500/10",
    tag: "FREE-BGM (เพลงประกอบคลิป ว.PA)",
    file_size: "68 MB",
    file_type: "ZIP Audio (WAV/MP3)",
    download_url: getLineOrderUrl(
      'สวัสดีครับครูอ้น ปลดล็อกรหัสสำเร็จแล้ว ขอรับลิงก์ดาวน์โหลดไฟล์ฟรี:\n🎁 "ชุดเพลงบรรเลง BGM ปลอดลิขสิทธิ์ 10 เพลง (สำหรับใส่คลิปการสอน / ว.PA)" ครับ 🙏'
    ),
  },
];

export default async function FreebiesPage() {
  let dbFreebies: Freebie[] = [];
  if (SHOW_DB_FREEBIES) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('freebies')
      .select('*')
      .order('created_at', { ascending: true });
    dbFreebies = (data as Freebie[]) || [];
  }

  // Merge built-in real systems with optional database freebies (controlled non-destructively via SHOW_DB_FREEBIES)
  const combinedFreebies = [...REAL_BUILTIN_FREEBIES, ...dbFreebies];

  return <PillarThemeWrapper pillar="studio" surface="dark"><FreebiesView initialFreebies={combinedFreebies} /></PillarThemeWrapper>;
}
