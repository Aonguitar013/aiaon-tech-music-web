import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, CheckCircle2, XCircle, ArrowLeft, ExternalLink, Clock, ShieldCheck, BookOpen, Sparkles } from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";
import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";

export const metadata: Metadata = {
  title: "นโยบายการคืนเงิน (Refund Policy) | AiAon",
  description:
    "นโยบายและขั้นตอนการขอคืนเงินสำหรับสินค้าดิจิทัลครบทั้ง 4 เสาหลักภายใต้แบรนด์ AiAon (Tech, Edu-Verse, Audio และ Studio)",
};

export default function RefundPage() {
  return (
    <PillarThemeWrapper pillar="about">
      <div className="w-full relative overflow-hidden min-h-screen pb-24 font-prompt text-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 pt-10 md:pt-14 relative z-10">
          {/* Navigation Breadcrumb */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              กลับสู่หน้าหลัก
            </Link>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Link
                href="/terms"
                className="px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:border-[#BFDBFE] transition"
              >
                เงื่อนไขการใช้งาน
              </Link>
              <Link
                href="/privacy"
                className="px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:border-[#BFDBFE] transition"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-10 border-b border-[#E2E8F0] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF5FF] text-[#6D28D9] border border-[#DDD6FE] mb-4">
              <RefreshCw className="w-3.5 h-3.5" />
              ความโปร่งใสและเป็นธรรม • AiAon Ecosystem V2.0
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
              นโยบายการคืนเงิน (Refund Policy)
            </h1>
            <p className="text-[#475569] text-sm md:text-base leading-relaxed">
              ผู้ให้บริการ: <strong className="text-[#0F172A]">AiAon (AiAon Tech • Edu-Verse • Audio • Studio) โดย นายจิรวัฒน์ เดชเส้ง</strong> | มาตรฐานการดูแลลูกค้าหลังการขาย
            </p>
            <p className="text-[#64748B] text-xs mt-2">
              อัปเดตล่าสุด: 27 พฤศจิกายน 2026 (ครอบคลุมสินค้าดิจิทัลและงานออกแบบสั่งทำครบทั้ง 4 เสาหลัก)
            </p>
          </div>

          {/* Content Body */}
          <div className="space-y-8 text-[#1E293B] leading-relaxed text-sm md:text-base">
            {/* General Principle */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-3 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#FAF5FF] text-[#6D28D9] text-sm font-bold">
                  1
                </span>
                หลักการทั่วไปของสินค้าดิจิทัล
              </h2>
              <p className="text-[#475569] text-sm md:text-base leading-relaxed">
                สินค้าและบริการของ <strong className="text-[#0F172A]">AiAon</strong> เป็น{" "}
                <strong className="text-[#1D4ED8]">สินค้าดิจิทัลและงานออกแบบตามสั่ง (Digital Products &amp; Custom Services)</strong>{" "}
                ได้แก่ โค้ด Google Apps Script, เทมเพลตโรงเรียน, สื่อการเรียนรู้เด็กเล็ก AiAon Edu-Verse (PDF ใบงาน, นิทานภาพ, สมุดระบายสี, แฟลชการ์ด), E-Book, คลังเสียง Royalty-Free Audio และสติกเกอร์ LINE 3D
                ซึ่งเมื่อส่งมอบลิงก์ดาวน์โหลดหรือเริ่มผลิตงานตามบรีฟแล้ว จะถือว่าการส่งมอบสมบูรณ์ในทางเทคนิค
                จึง <strong className="text-[#0F172A]">ไม่สามารถขอคืนเงินได้</strong> ยกเว้นกรณีที่เข้าเงื่อนไขพิเศษที่ระบุไว้ชัดเจนด้านล่าง
              </p>
            </section>

            {/* Pillar-Specific Notes: Edu-Verse & Studio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-[#FFFDF7] p-6 rounded-3xl border border-[#FDE68A] shadow-xs">
                <h3 className="text-base font-bold text-[#92400E] mb-2.5 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#D97706] shrink-0" />
                  <span>เงื่อนไขเฉพาะ AiAon Edu-Verse (สื่อ PDF 15 เล่ม)</span>
                </h3>
                <ul className="space-y-1.5 text-xs md:text-sm text-[#475569]">
                  <li>• เรามี <strong className="text-[#0F172A]">ชุดทดลองฟรี 75 หน้า (ครบ 15 เล่ม)</strong> ที่ <Link href="/edu" className="text-[#D97706] font-semibold hover:underline">/edu</Link> ให้ลองปริ้นท์และเทสเว็บแอป QR ฟรีก่อนตัดสินใจซื้อ</li>
                  <li>• หากไฟล์ PDF/ZIP เสียหาย เปิดไม่ได้ หรือลิงก์เสีย ทีมงานจัดส่งไฟล์ใหม่/แก้ไขให้ฟรีภายใน 24 ชม. (หรือคืนเงินเต็มจำนวนหากแก้ไขไม่ได้)</li>
                </ul>
              </section>

              <section className="bg-[#FAF8FF] p-6 rounded-3xl border border-[#DDD6FE] shadow-xs">
                <h3 className="text-base font-bold text-[#6D28D9] mb-2.5 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#7C3AED] shrink-0" />
                  <span>เงื่อนไขเฉพาะ AiAon Studio (สติกเกอร์ LINE 3D)</span>
                </h3>
                <ul className="space-y-1.5 text-xs md:text-sm text-[#475569]">
                  <li>• หลังลูกค้าตรวจสอบและยืนยันคาแรกเตอร์ต้นแบบเพื่อผลิตชุดเต็ม (16–24 รูป) หรือส่งตรวจขึ้น LINE Creators Market แล้ว ไม่สามารถยกเลิก/คืนเงินได้</li>
                  <li>• กรณีทีมงาน LINE ตีกลับด้วยเหตุผลทางเทคนิค ทีมงานแก้ไขและส่งตรวจใหม่ให้ฟรีจนกว่าจะผ่านเกณฑ์</li>
                </ul>
              </section>
            </div>

            {/* Refundable vs Non-refundable Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Refundable */}
              <section className="bg-emerald-50/70 p-6 md:p-8 rounded-3xl border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg mb-4">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h3>กรณีที่สามารถขอคืนเงินได้</h3>
                </div>
                <ul className="space-y-3 text-xs md:text-sm text-emerald-950/85">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>
                      ระบบหรือไฟล์สินค้าไม่สามารถใช้งานได้จริงอันเกิดจากข้อผิดพลาดจากฝั่งผู้ให้บริการ (Bug / ไฟล์เสียหาย)
                      และทีมงานไม่สามารถแก้ไขให้ใช้งานได้ภายใน <strong>7 วันทำการ</strong> หลังได้รับแจ้งพร้อมหลักฐาน
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>
                      ผู้ซื้อโอนเงินซ้ำซ้อนโดยไม่ได้ตั้งใจ (คืนเงินเฉพาะยอดส่วนเกินจากราคาสินค้าจริงหลังหักค่าธรรมเนียมธนาคารถ้ามี)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>
                      ผู้ซื้อชำระเงินเรียบร้อยแล้ว แต่ไม่ได้รับการส่งมอบสินค้าหรือติดต่อใดๆ จากระบบเกินกว่า <strong>3 วันทำการ</strong>
                    </span>
                  </li>
                </ul>
              </section>

              {/* Non-refundable */}
              <section className="bg-rose-50/70 p-6 md:p-8 rounded-3xl border border-rose-200">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-lg mb-4">
                  <XCircle className="w-5 h-5 shrink-0" />
                  <h3>กรณีที่ &quot;ไม่&quot; สามารถขอคืนเงินได้</h3>
                </div>
                <ul className="space-y-3 text-xs md:text-sm text-rose-950/85">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>เปลี่ยนใจหรือยกเลิกคำสั่งซื้อหลังจากได้รับไฟล์ ZIP / PDF หรือสิทธิ์เข้าถึงระบบไปแล้ว</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>
                      ติดตั้งหรือใช้งานไม่เป็น หรือไม่มีเวลาเรียนรู้คู่มือ (AiAon มีคู่มือภาษาไทยและช่องทางช่วยเหลือฟรี 14 วันผ่าน LINE OA)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>
                      ปัญหาที่เกิดจากการตั้งค่าหรือข้อจำกัดของบัญชี Google / เครื่องปริ้นท์ / อุปกรณ์ของผู้ซื้อเอง
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>
                      ระบบทำงานสะดุดเนื่องจากการเปลี่ยนแปลงนโยบายหรือโควตาของบุคคลที่สาม (Google, Meta, LINE) ซึ่งอยู่นอกเหนือการควบคุม
                    </span>
                  </li>
                </ul>
              </section>
            </div>

            {/* Refund Steps */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#6D28D9]" />
                ขั้นตอนและระยะเวลาการดำเนินการขอคืนเงิน
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
                  <div className="text-xs text-[#1D4ED8] font-bold mb-1">ขั้นตอนที่ 1</div>
                  <h4 className="font-bold text-[#0F172A] text-sm mb-2">แจ้งเรื่องและส่งหลักฐาน</h4>
                  <p className="text-xs text-[#475569]">
                    ติดต่อผ่าน LINE OA <code className="text-[#1D4ED8] font-semibold">@deu6776s</code> แนบหลักฐานสลิปโอนเงิน และระบุปัญหาที่พบอย่างละเอียด
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
                  <div className="text-xs text-[#6D28D9] font-bold mb-1">ขั้นตอนที่ 2</div>
                  <h4 className="font-bold text-[#0F172A] text-sm mb-2">ตรวจสอบทางเทคนิค</h4>
                  <p className="text-xs text-[#475569]">
                    ทีมงานตรวจสอบข้อผิดพลาดและประสานงานแก้ไข หรือพิจารณาเงื่อนไขภายใน <strong className="text-[#0F172A]">3 วันทำการ</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
                  <div className="text-xs text-emerald-700 font-bold mb-1">ขั้นตอนที่ 3</div>
                  <h4 className="font-bold text-[#0F172A] text-sm mb-2">โอนเงินคืน</h4>
                  <p className="text-xs text-[#475569]">
                    หากผ่านเกณฑ์การพิจารณา ระบบจะโอนเงินคืนเข้าบัญชีหรือพร้อมเพย์เดิมที่ใช้ชำระเงินภายใน <strong className="text-[#0F172A]">7 วันทำการ</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Box with Authentic Founder Portrait */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#DDD6FE] shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src="/images/kru_aon_profile.png"
                      alt="ครูอ้น จิรวัฒน์ เดชเส้ง — ผู้ก่อตั้ง AiAon"
                      className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-white ring-2 ring-[#DDD6FE] shadow-sm bg-[#ECE9E2]"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6D28D9] text-white flex items-center justify-center ring-2 ring-white">
                      <ShieldCheck className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0F172A]">ต้องการแจ้งปัญหาไฟล์ หรือสอบถามการคืนเงิน?</h2>
                    <p className="text-xs md:text-sm text-[#475569] mt-0.5">
                      ครูอ้นยินดีดูแลและช่วยเหลือแก้ไขปัญหาทางเทคนิคให้เต็มที่ครับ
                    </p>
                  </div>
                </div>
                <a
                  href={getLineOrderUrl("สวัสดีครับครูอ้น ต้องการปรึกษาปัญหาการใช้งานสินค้า / การขอคืนเงินครับ 🙏")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-bold text-sm transition-all shadow-xs"
                >
                  ติดต่อฝ่ายสนับสนุน LINE OA (@deu6776s)
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PillarThemeWrapper>
  );
}
