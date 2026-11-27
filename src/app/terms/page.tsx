import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft, ExternalLink, ShieldCheck, BookOpen, Cpu, Music, Sparkles } from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";
import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";

export const metadata: Metadata = {
  title: "เงื่อนไขการใช้งาน (Terms of Use) | AiAon",
  description:
    "เงื่อนไขและข้อตกลงการใช้งานระบบและสินค้าดิจิทัลครบทั้ง 4 เสาหลักภายใต้แบรนด์ AiAon (AiAon Tech, Edu-Verse, Audio และ Studio)",
};

export default function TermsPage() {
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
                href="/privacy"
                className="px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:border-[#BFDBFE] transition"
              >
                นโยบายความเป็นส่วนตัว
              </Link>
              <Link
                href="/refund"
                className="px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[#475569] hover:text-[#0F172A] hover:border-[#BFDBFE] transition"
              >
                นโยบายการคืนเงิน
              </Link>
            </div>
          </div>

          {/* Page Header */}
          <div className="mb-10 border-b border-[#E2E8F0] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] mb-4">
              <FileText className="w-3.5 h-3.5" />
              ข้อตกลงทางกฎหมาย • AiAon Ecosystem V2.0
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
              เงื่อนไขการใช้งาน (Terms of Use)
            </h1>
            <p className="text-[#475569] text-sm md:text-base leading-relaxed">
              ผู้ให้บริการ: <strong className="text-[#0F172A]">AiAon (AiAon Tech • Edu-Verse • Audio • Studio) โดย นายจิรวัฒน์ เดชเส้ง</strong> | เว็บไซต์:{" "}
              <a href="https://www.aiaon.tech" className="text-[#2563EB] hover:underline">
                https://www.aiaon.tech
              </a>
            </p>
            <p className="text-[#64748B] text-xs mt-2">
              อัปเดตล่าสุด: 27 พฤศจิกายน 2026 (ครอบคลุมสินค้าดิจิทัลและบริการครบทั้ง 4 เสาหลัก)
            </p>
          </div>

          {/* Content Body */}
          <div className="space-y-8 text-[#1E293B] leading-relaxed text-sm md:text-base">
            {/* Section 1 */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-sm font-bold">
                  1
                </span>
                คำนิยาม
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                      <th className="py-2.5 font-semibold w-1/3">คำศัพท์</th>
                      <th className="py-2.5 font-semibold">ความหมาย</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    <tr>
                      <td className="py-3 font-semibold text-[#1D4ED8]">ผู้ให้บริการ</td>
                      <td className="py-3 text-[#475569]">
                        แบรนด์ AiAon (AiAon Tech, AiAon Edu-Verse, AiAon Audio, AiAon Studio) โดยนายจิรวัฒน์ เดชเส้ง (ครูอ้น)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[#1D4ED8]">ผู้ซื้อ / ผู้ใช้งาน</td>
                      <td className="py-3 text-[#475569]">
                        บุคคลทั่วไป ผู้ปกครอง ครู โรงเรียน ร้านค้า หรือหน่วยงานที่สั่งซื้อ ดาวน์โหลด หรือใช้งานระบบและสื่อดิจิทัลจากผู้ให้บริการ
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[#1D4ED8]">สินค้า / บริการ (4 เสาหลัก)</td>
                      <td className="py-3 text-[#475569]">
                        (1) ระบบ Google Apps Script, Google Sheets Templates, Web Apps และบริการ AI Caretaker • (2) สื่อการเรียนรู้ AiAon Edu-Verse (ใบงาน PDF, นิทานภาพ, สมุดระบายสี, แฟลชการ์ด, E-Book และเว็บแอป Hybrid QR) • (3) เพลงช่วยจำและคลังเสียง Royalty-Free BGM • (4) บริการออกแบบสติกเกอร์ LINE 3D, LINE Emoji และ LINE Theme
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[#1D4ED8]">การส่งมอบ</td>
                      <td className="py-3 text-[#475569]">
                        การส่งลิงก์ดาวน์โหลดไฟล์ .ZIP / .PDF, ลิงก์ทำสำเนา Google Sheets, การเปิดสิทธิ์ใช้งาน หรือการส่งมอบผลงานผ่าน LINE OA (@deu6776s) / แพลตฟอร์มจำหน่ายอย่างเป็นทางการโดยสมบูรณ์
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2: 4-Pillar License Scope */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-sm font-bold">
                  2
                </span>
                ขอบเขตสิทธิ์การใช้งานแยกตาม 4 เสาหลัก (4-Pillar License Scope)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pillar 1: Tech */}
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#BFDBFE] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#1D4ED8] text-sm">
                    <Cpu className="w-4 h-4 shrink-0" />
                    <span>01. AiAon Tech (ระบบ GAS / DIY / VIP / Custom)</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#475569]">
                    <li><strong className="text-[#0F172A]">DIY / Bundle:</strong> รับไฟล์ ZIP หรือลิงก์ทำสำเนา + คู่มือติดตั้ง ใช้งานตลอดชีพในองค์กร/โรงเรียนของตนเอง</li>
                    <li><strong className="text-[#0F172A]">VIP Setup / Custom Dev:</strong> ทีมงานติดตั้งและนำเข้าข้อมูลเบื้องต้นให้พร้อมใช้งาน</li>
                    <li>ปรับแต่งโลโก้ ข้อความ และสูตรคำนวณเพื่อใช้ภายในหน่วยงานได้อิสระ</li>
                  </ul>
                </div>

                {/* Pillar 2: Edu-Verse */}
                <div className="p-5 rounded-2xl bg-[#FFFDF7] border border-[#FDE68A] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#92400E] text-sm">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>02. AiAon Edu-Verse (สื่อเด็กเล็ก 15 เล่ม &amp; E-Book)</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#475569]">
                    <li><strong className="text-[#0F172A]">Home Edition:</strong> ใช้ในครอบครัว ปริ้นท์ซ้ำให้บุตรหลานได้ไม่จำกัด + ใช้เว็บแอป Hybrid QR ฟรีตลอดชีพ</li>
                    <li><strong className="text-[#0F172A]">Class Edition:</strong> ลิขสิทธิ์ครู 1 ท่าน ปริ้นท์/ถ่ายเอกสารแจกนักเรียนในห้องของตนได้ไม่จำกัด และเปิดสอนหน้าชั้นเรียนได้</li>
                    <li><strong className="text-[#0F172A]">Freebies (75 หน้า):</strong> โหลดทดลองใช้ฟรี ห้ามนำไปขายต่อหรืออัปโหลดแจกในเว็บอื่น</li>
                  </ul>
                </div>

                {/* Pillar 3: Audio */}
                <div className="p-5 rounded-2xl bg-[#F5FAF9] border border-[#99F6E4] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#0F766E] text-sm">
                    <Music className="w-4 h-4 shrink-0" />
                    <span>03. AiAon Audio (BGM &amp; เพลงช่วยจำ)</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#475569]">
                    <li>อนุญาตให้ใช้ประกอบคลิปการสอน, สื่อ ว.PA, YouTube, TikTok, Reels และกิจกรรมโรงเรียนแบบ Royalty-Free</li>
                    <li>ห้ามนำไฟล์เสียงต้นฉบับไปรีอัปโหลดขายซ้ำ แจกจ่าย หรือจดทะเบียน Content ID แอบอ้างความเป็นเจ้าของ</li>
                  </ul>
                </div>

                {/* Pillar 4: Studio */}
                <div className="p-5 rounded-2xl bg-[#FAF8FF] border border-[#DDD6FE] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#6D28D9] text-sm">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>04. AiAon Studio (สติกเกอร์ LINE 3D / Emoji / Theme)</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-[#475569]">
                    <li>ออกแบบคาแรกเตอร์ต้นแบบให้ตรวจสอบและยืนยันก่อนผลิตครบชุด (16–24 รูป)</li>
                    <li>ส่งตรวจและวางจำหน่ายผ่าน LINE Creators Market ตามหลักเกณฑ์และระยะเวลาพิจารณาของ LY Corporation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Permitted & Prohibited */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-sm font-bold">
                  3
                </span>
                ข้อกำหนดการใช้งานและข้อห้ามเด็ดขาด
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <h4 className="font-bold text-emerald-800 text-sm mb-2">✅ สิ่งที่ผู้ซื้อมีสิทธิ์ทำได้:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-emerald-900/90">
                    <li>ใช้งานสินค้า ระบบ หรือสื่อการเรียนรู้ตามประเภทใบอนุญาตที่ซื้อ (Personal / Home / Class / Organization) ได้ตลอดชีพ</li>
                    <li>สำรองไฟล์ไว้ในอุปกรณ์หรือ Google Drive ส่วนตัวเพื่อป้องกันไฟล์สูญหาย</li>
                    <li>เข้าใช้งานเว็บแอป Hybrid QR คู่ใบงานบนเว็บไซต์ aiaon.tech ได้ฟรี ไม่มีโฆษณาคั่น</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <h4 className="font-bold text-rose-800 text-sm mb-2">❌ สิ่งที่ผู้ซื้อ &quot;ห้าม&quot; ทำโดยเด็ดขาด:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-rose-900/90">
                    <li>ห้ามคัดลอก ส่งต่อไฟล์ต้นฉบับ (PDF / ZIP / Source Code / Audio) ลงกลุ่ม LINE, Facebook Group, เว็บไซต์ หรือแชร์ต่อสาธารณะ</li>
                    <li>ห้ามนำไปจำหน่ายต่อ (Resell), พิมพ์เป็นเล่มจำหน่ายเชิงพาณิชย์ หรือแอบอ้างเป็นผู้สร้าง/เจ้าของลิขสิทธิ์</li>
                    <li>ห้ามนำโค้ด ภาพประกอบคาแรกเตอร์แก๊ง 6 แมว หรือไฟล์งานไปดัดแปลงเพียงเล็กน้อยแล้ววางขายเป็นสินค้าใหม่</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3.1 - AI Caretaker */}
            <section className="bg-[#F0FDFA] p-6 md:p-8 rounded-3xl border border-[#99F6E4]">
              <h2 className="text-xl font-bold text-[#0F766E] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white text-[#0F766E] border border-[#99F6E4] text-sm font-bold">
                  3.1
                </span>
                ข้อกำหนดเฉพาะสำหรับบริการ &quot;AI Caretaker รายเดือน&quot;
              </h2>
              <div className="space-y-3 text-sm text-[#1E293B]">
                <p>สำหรับร้านค้าและธุรกิจที่สมัครใช้บริการดูแลและเฝ้าระวังระบบ AI Caretaker รายเดือน:</p>
                <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-[#475569]">
                  <li>
                    <strong className="text-[#0F172A]">ความเป็นเจ้าของและการเก็บข้อมูล:</strong> ข้อมูลสินค้า ออเดอร์
                    สลิปโอนเงิน และประวัติการสนทนาทั้งหมด จะถูกจัดเก็บอยู่ใน Google Sheets, บัญชี LINE OA, Facebook Page
                    หรือระบบคลาวด์ของร้านค้าผู้ซื้อเองทั้งสิ้น
                  </li>
                  <li>
                    <strong className="text-[#0F172A]">ขอบเขตหน้าที่ของผู้ให้บริการ:</strong> AiAon Tech
                    ทำหน้าที่เป็นผู้ดูแลและเฝ้าระวังความเสถียรทางเทคนิค (Self-Healing Watchdog Engine)
                    และช่วยกู้คืนหัวตารางหรือแก้ไขข้อผิดพลาดตามรอบการทำงานที่ตกลงไว้เท่านั้น
                    ไม่ใช่ผู้รับประกันยอดขายหรือกำไรของร้านค้า
                  </li>
                  <li>
                    <strong className="text-[#0F172A]">การจำกัดความรับผิดชอบ (Limitation of Liability):</strong>{" "}
                    กรณีเกิดเหตุขัดข้องทางเทคนิค การหยุดให้บริการของแพลตฟอร์มบุคคลที่สาม (Google, LINE, Meta)
                    หรือความล่าช้าในการส่งข้อความ ความรับผิดชอบสูงสุดของผู้ให้บริการจะถูกจำกัด
                    <span className="text-[#0F766E] font-semibold">
                      {" "}ไม่เกินจำนวนเงินค่าบริการรายเดือนจริงที่ผู้ซื้อได้ชำระในรอบเดือนที่เกิดความเสียหายนั้นๆ เท่านั้น
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-sm font-bold">
                  4
                </span>
                ข้อจำกัดความรับผิดชอบ (Disclaimer)
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-[#475569]">
                <li>
                  ระบบทำงานบนแพลตฟอร์มบุคคลที่สาม เช่น <strong className="text-[#0F172A]">Google Workspace</strong>, LINE,
                  หรือเบราว์เซอร์ของผู้ใช้งาน (รวมถึงฟีเจอร์เสียงอ่าน Web Speech API ในเว็บแอป Edu-Verse)
                  ผู้ให้บริการไม่สามารถควบคุมการเปลี่ยนแปลงนโยบาย โควตา หรือข้อจำกัดของอุปกรณ์/แพลตฟอร์มภายนอกได้
                </li>
                <li>
                  สินค้าดิจิทัลส่งมอบในสภาพ <strong className="text-[#0F172A]">&quot;ตามที่เป็น&quot; (As-Is)</strong>{" "}
                  โดยผ่านการตรวจสอบคุณภาพ (QA) ก่อนส่งมอบทุกชุด ทั้งนี้เงื่อนไขการคืนเงินเป็นไปตาม{" "}
                  <Link href="/refund" className="text-[#2563EB] font-semibold hover:underline">
                    นโยบายการคืนเงิน
                  </Link>
                </li>
                <li>
                  ผู้ให้บริการไม่รับผิดชอบต่อความเสียหายทางอ้อม (เช่น ข้อมูลสูญหายจากการตั้งค่าผิดพลาดของผู้ซื้อเอง)
                  เกินกว่ามูลค่าสินค้าที่ผู้ซื้อชำระจริง
                </li>
              </ul>
            </section>

            {/* Section 5 - 8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">5. การสนับสนุนหลังการขาย</h2>
                <p className="text-xs md:text-sm text-[#475569]">
                  ให้การช่วยเหลือแก้ปัญหาการติดตั้ง การเปิดไฟล์ PDF/ZIP หรือการใช้งานเบื้องต้นฟรีภายใน{" "}
                  <strong className="text-[#0F172A]">14 วันทำการ</strong> หลังส่งมอบ ผ่าน LINE OA{" "}
                  <code className="text-[#1D4ED8] font-semibold">@deu6776s</code>
                </p>
              </section>

              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">6. ทรัพย์สินทางปัญญา</h2>
                <p className="text-xs md:text-sm text-[#475569]">
                  โค้ดต้นฉบับ การออกแบบ โลโก้ AiAon คาแรกเตอร์ชุด &quot;แก๊ง 6 แมว AiAon Edu-Verse&quot; เนื้อหานิทาน
                  และผลงานเพลงเป็นลิขสิทธิ์ของนายจิรวัฒน์ เดชเส้ง (AiAon) ผู้ซื้อได้รับสิทธิ์การใช้งานตามประเภท License เท่านั้น
                </p>
              </section>

              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">7. การเปลี่ยนแปลงเงื่อนไข</h2>
                <p className="text-xs md:text-sm text-[#475569]">
                  ขอสงวนสิทธิ์ในการปรับปรุงเงื่อนไขนี้ให้สอดคล้องกับสินค้าและกฎหมายที่เปลี่ยนแปลง โดยประกาศฉบับล่าสุดบนเว็บไซต์
                  การปรับปรุงจะไม่กระทบสิทธิ์ของผู้ที่ซื้อไปก่อนหน้า
                </p>
              </section>

              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">8. กฎหมายที่ใช้บังคับ</h2>
                <p className="text-xs md:text-sm text-[#475569]">
                  เงื่อนไขและข้อตกลงการใช้งานนี้อยู่ภายใต้บังคับและการตีความตามกฎหมายแห่งราชอาณาจักรไทย รวมถึง พ.ร.บ.ลิขสิทธิ์ และ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA)
                </p>
              </section>
            </div>

            {/* Contact Box with Authentic Founder Portrait */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#BFDBFE] shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src="/images/kru_aon_profile.png"
                      alt="ครูอ้น จิรวัฒน์ เดชเส้ง — ผู้ก่อตั้ง AiAon"
                      className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-white ring-2 ring-[#BFDBFE] shadow-sm bg-[#ECE9E2]"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#2563EB] text-white flex items-center justify-center ring-2 ring-white">
                      <ShieldCheck className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0F172A]">มีข้อสงสัยเกี่ยวกับเงื่อนไขหรือลิขสิทธิ์การใช้งาน?</h2>
                    <p className="text-xs md:text-sm text-[#475569] mt-0.5">
                      ติดต่อสอบถามครูอ้นโดยตรงได้ทุกวัน (ทั้งสิทธิ์ Home / Class / ใบเสนอราคาโรงเรียน)
                    </p>
                  </div>
                </div>
                <a
                  href={getLineOrderUrl("สวัสดีครับครูอ้น สอบถามเงื่อนไขการใช้งานและลิขสิทธิ์สินค้าบนเว็บ aiaon.tech ครับ 🙏")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-bold text-sm transition-all shadow-xs"
                >
                  ติดต่อผ่าน LINE OA (@deu6776s)
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
