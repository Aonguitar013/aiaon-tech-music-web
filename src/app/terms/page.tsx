import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft, ExternalLink } from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";
import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";

export const metadata: Metadata = {
  title: "เงื่อนไขการใช้งาน (Terms of Use) | AiAon Tech",
  description:
    "เงื่อนไขและข้อตกลงการใช้งานระบบ Google Apps Script, สินค้าดิจิทัล และบริการ AI Caretaker ภายใต้แบรนด์ AiAon Tech",
};

export default function TermsPage() {
  return (
    <PillarThemeWrapper pillar="about">
      <div className="w-full relative overflow-hidden min-h-screen pb-24 font-prompt text-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 pt-10 md:pt-14 relative z-10">
          {/* Navigation Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              กลับสู่หน้าหลัก
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-10 border-b border-[#E2E8F0] pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] mb-4">
              <FileText className="w-3.5 h-3.5" />
              ข้อตกลงทางกฎหมาย
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
              เงื่อนไขการใช้งาน (Terms of Use)
            </h1>
            <p className="text-[#475569] text-sm md:text-base leading-relaxed">
              ผู้ให้บริการ: <strong className="text-[#0F172A]">AiAon Tech โดย นายจิรวัฒน์ เดชเส้ง</strong> | เว็บไซต์:{" "}
              <a href="https://www.aiaon.tech" className="text-[#2563EB] hover:underline">
                https://www.aiaon.tech
              </a>
            </p>
            <p className="text-[#64748B] text-xs mt-2">อัปเดตล่าสุด: 16 ตุลาคม 2026</p>
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
                      <td className="py-3 text-[#475569]">AiAon Tech โดยนายจิรวัฒน์ เดชเส้ง (ครูอ้น)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[#1D4ED8]">ผู้ซื้อ / ผู้ใช้งาน</td>
                      <td className="py-3 text-[#475569]">
                        บุคคล ครู โรงเรียน หรือหน่วยงานที่สั่งซื้อระบบ/เทมเพลต/บริการจากผู้ให้บริการ
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[#1D4ED8]">ระบบ / สินค้า</td>
                      <td className="py-3 text-[#475569]">
                        โค้ด Google Apps Script, เทมเพลต Google Sheets, ไฟล์ HTML, E-Book, คลังเพลง และคู่มือที่ส่งมอบ
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[#1D4ED8]">การส่งมอบ</td>
                      <td className="py-3 text-[#475569]">
                        การส่งลิงก์ดาวน์โหลดไฟล์ .ZIP หรือลิงก์ทำสำเนา Google Sheets แก่ผู้ซื้อโดยสมบูรณ์
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 2 */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-sm font-bold">
                  2
                </span>
                รูปแบบสินค้าและการส่งมอบ
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
                  <h3 className="font-bold text-[#1D4ED8] mb-1">DIY (ซื้อโค้ดไปติดตั้งเอง)</h3>
                  <p className="text-xs text-[#475569]">
                    รับชุดไฟล์ ZIP หรือลิงก์ทำสำเนา Google Sheets พร้อมคลิปคู่มือการติดตั้ง 2-3 นาที ผู้ซื้อติดตั้งเอง
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
                  <h3 className="font-bold text-[#6D28D9] mb-1">VIP Setup (ช่างติดตั้งให้)</h3>
                  <p className="text-xs text-[#475569]">
                    ทีมงานช่วยนำเข้ารายชื่อ นำเข้าข้อมูลโรงเรียน และติดตั้ง Web App ให้พร้อมใช้งานทันที
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2E8F0]">
                  <h3 className="font-bold text-[#92400E] mb-1">Bundle / All-in-One</h3>
                  <p className="text-xs text-[#475569]">
                    ชุดรวมหลายระบบตามแพ็กเกจ ส่งมอบไฟล์ครบทุกระบบทันทีหลังระบบตรวจสลิปผ่าน
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-sm font-bold">
                  3
                </span>
                ขอบเขตสิทธิ์การใช้งาน (License Scope)
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <h4 className="font-bold text-emerald-800 text-sm mb-2">✅ สิ่งที่ผู้ซื้อมีสิทธิ์ทำได้:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-emerald-900/90">
                    <li>ใช้งานระบบภายในองค์กร ห้องเรียน หรือโรงเรียนของตนเองได้ตลอดชีพ (Lifetime License)</li>
                    <li>ปรับแต่งข้อความ โลโก้ สีสัน และแบบฟอร์มให้เข้ากับโรงเรียนหรือร้านค้าของตนเองได้เต็มที่</li>
                    <li>อัปเกรดและต่อยอดสูตรการคำนวณตามบริบทของสถานศึกษาได้อิสระ</li>
                  </ul>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <h4 className="font-bold text-rose-800 text-sm mb-2">❌ สิ่งที่ผู้ซื้อ &quot;ห้าม&quot; ทำโดยเด็ดขาด:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-rose-900/90">
                    <li>ห้ามคัดลอก แจกจ่าย เผยแพร่ต่อสาธารณะ หรือขายต่อโค้ดต้นฉบับแก่บุคคลอื่นในเชิงพาณิชย์</li>
                    <li>ห้ามแอบอ้างตนเองเป็นผู้พัฒนาหรือเจ้าของลิขสิทธิ์ระบบ</li>
                    <li>ห้ามนำโค้ดไปดัดแปลงเพียงเล็กน้อยแล้วนำไปวางจำหน่ายเป็นผลิตภัณฑ์ใหม่ภายใต้ชื่ออื่น</li>
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
                  ระบบทำงานบนแพลตฟอร์ม <strong className="text-[#0F172A]">Google Workspace</strong> (Google Sheets, Apps
                  Script, Drive) ซึ่งเป็นบริการของบุคคลที่สาม (Google LLC) ผู้ให้บริการไม่สามารถควบคุมการเปลี่ยนแปลงนโยบาย
                  โควตาการใช้งาน หรือการหยุดให้บริการของ Google ได้ และไม่รับผิดชอบต่อผลกระทบที่เกิดจากการเปลี่ยนแปลงฝั่ง Google
                </li>
                <li>
                  สินค้าส่งมอบในสภาพ <strong className="text-[#0F172A]">&quot;ตามที่เป็น&quot; (As-Is)</strong>{" "}
                  โดยผ่านการทดสอบตามมาตรฐานก่อนส่งมอบ แต่ไม่สามารถรับประกันว่าจะปราศจากข้อผิดพลาด 100% ในทุกสภาพแวดล้อม
                </li>
                <li>
                  ผู้ให้บริการไม่รับผิดชอบต่อความเสียหายทางอ้อม (เช่น ข้อมูลสูญหายจากการตั้งค่าผิดพลาดของผู้ซื้อเอง)
                  เกินกว่ามูลค่าสินค้าที่ซื้อจริง
                </li>
              </ul>
            </section>

            {/* Section 5 - 8 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">5. การสนับสนุนหลังการขาย</h2>
                <p className="text-xs md:text-sm text-[#475569]">
                  ให้การช่วยเหลือแก้ปัญหาการติดตั้งเบื้องต้นฟรีภายใน <strong className="text-[#0F172A]">14 วันทำการ</strong> หลังส่งมอบ ผ่าน LINE OA{" "}
                  <code className="text-[#1D4ED8] font-semibold">@deu6776s</code>
                </p>
              </section>

              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">6. ทรัพย์สินทางปัญญา</h2>
                <p className="text-xs md:text-sm text-[#475569]">
                  โค้ดต้นฉบับ การออกแบบ และสิทธิบัตรทางความคิดเป็นกรรมสิทธิ์ของ AiAon Tech โดยผู้ซื้อได้รับสิทธิ์การใช้งาน
                  (License) ตลอดชีพ
                </p>
              </section>

              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">7. การเปลี่ยนแปลงเงื่อนไข</h2>
                <p className="text-xs md:text-sm text-[#475569]">
                  ขอสงวนสิทธิ์ในการปรับปรุงเงื่อนไขนี้ได้ตลอดเวลา โดยประกาศฉบับล่าสุดบนเว็บไซต์
                  การปรับปรุงจะไม่กระทบสิทธิ์ของผู้ที่ซื้อไปก่อนหน้า
                </p>
              </section>

              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">8. กฎหมายที่ใช้บังคับ</h2>
                <p className="text-xs md:text-sm text-[#475569]">
                  เงื่อนไขและข้อตกลงการใช้งานนี้อยู่ภายใต้บังคับและการตีความตามกฎหมายแห่งราชอาณาจักรไทย
                </p>
              </section>
            </div>

            {/* Contact Box */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#BFDBFE] text-center shadow-xs">
              <h2 className="text-lg font-bold text-[#0F172A] mb-2">มีข้อสงสัยเกี่ยวกับเงื่อนไขการใช้งาน?</h2>
              <p className="text-xs md:text-sm text-[#475569] mb-4">
                ติดต่อปรึกษาหรือสอบถามรายละเอียดเพิ่มเติมกับครูอ้นได้โดยตรง
              </p>
              <a
                href={getLineOrderUrl("สวัสดีครับครูอ้น สอบถามเงื่อนไขการใช้งานระบบครับ")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-bold text-sm transition-all shadow-xs"
              >
                ติดต่อผ่าน LINE OA (@deu6776s)
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          </div>
        </div>
      </div>
    </PillarThemeWrapper>
  );
}
