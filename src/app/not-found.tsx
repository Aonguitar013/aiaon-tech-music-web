import Link from "next/link";
import { Home, BookOpen, Cpu, MessageCircle, Compass } from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] w-full bg-[#FAF8F5] text-[#1E293B] font-prompt flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl rounded-[32px] bg-white border border-[#E2E8F0] shadow-[0_12px_36px_rgba(15,23,42,0.06)] p-8 sm:p-12 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF9EF] border border-[#FDE68A] text-[#92400E] text-xs font-bold tracking-wider uppercase">
          <Compass className="w-4 h-4 text-[#D97706]" />
          <span>404 • ไม่พบหน้าที่คุณค้นหา</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            อ๊ะ! หน้านี้ย้ายบ้านแล้วครับ 🐾
          </h1>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-lg mx-auto">
            ลิงก์ที่คุณเปิดอาจพิมพ์ตัวอักษรตกหล่น หรือถูกจัดระเบียบใหม่ภายใต้ระบบนิเวศ{" "}
            <strong className="text-[#0F172A]">AiAon Brand V2.0</strong> — เลือกไปต่อจากปุ่มด้านล่างได้เลยครับ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-sm transition shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>กลับสู่หน้าหลัก (Home)</span>
          </Link>

          <Link
            href="/edu"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#FEF9EF] hover:bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-bold text-sm transition"
          >
            <BookOpen className="w-4 h-4 text-[#D97706]" />
            <span>คลังสื่อเด็กเล็ก Edu-Verse (ฟรี 75 หน้า)</span>
          </Link>

          <Link
            href="/digital-vault"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFDBFE] text-[#1D4ED8] font-bold text-sm transition"
          >
            <Cpu className="w-4 h-4 text-[#2563EB]" />
            <span>คลังระบบโรงเรียน (Digital Vault)</span>
          </Link>

          <a
            href={getLineOrderUrl("สวัสดีครับครูอ้น แจ้งเรื่องลิงก์บนเว็บไซต์ aiaon.tech ครับ 🙏")}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-extrabold text-sm transition shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>ทัก LINE ครูอ้น (@deu6776s)</span>
          </a>
        </div>

        <div className="pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center justify-center gap-4 text-xs text-[#64748B]">
          <Link href="/about" className="hover:text-[#0F172A] transition">เกี่ยวกับครูอ้น</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-[#0F172A] transition">เงื่อนไขการใช้งาน</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-[#0F172A] transition">PDPA</Link>
          <span>•</span>
          <Link href="/refund" className="hover:text-[#0F172A] transition">นโยบายคืนเงิน</Link>
        </div>
      </div>
    </div>
  );
}
