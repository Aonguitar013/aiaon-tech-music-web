import type { Metadata } from "next";
import Link from "next/link";
import { Lock, ArrowLeft, ExternalLink, Database, CheckCircle2 } from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";
import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว (PDPA) | AiAon Tech",
  description:
    "นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของนักเรียน ครู และลูกค้าธุรกิจ ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)",
};

export default function PrivacyPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-4">
              <Lock className="w-3.5 h-3.5" />
              การคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
              นโยบายความเป็นส่วนตัว (Privacy Policy)
            </h1>
            <p className="text-[#475569] text-sm md:text-base leading-relaxed">
              ผู้ให้บริการ: <strong className="text-[#0F172A]">AiAon Tech โดย นายจิรวัฒน์ เดชเส้ง</strong> | มาตรฐานการคุ้มครองข้อมูลระดับสูงสุด
            </p>
            <p className="text-[#64748B] text-xs mt-2">อัปเดตล่าสุด: 16 ตุลาคม 2026</p>
          </div>

          {/* Content Body */}
          <div className="space-y-8 text-[#1E293B] leading-relaxed text-sm md:text-base">
            {/* Section 1 */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold">
                  1
                </span>
                ภาพรวมและเจตนารมณ์
              </h2>
              <p className="text-[#475569] text-sm md:text-base">
                เอกสารนี้จัดทำขึ้นเพื่อชี้แจงแนวปฏิบัติที่ระบบภายใต้แบรนด์ <strong className="text-[#0F172A]">AiAon Tech</strong> เกี่ยวข้องกับข้อมูลส่วนบุคคลของนักเรียน ครู ผู้ปกครอง และลูกค้าองค์กร ตามเจตนารมณ์ของ{" "}
                <strong className="text-[#0F766E]">พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)</strong>
              </p>
            </section>

            {/* Section 2 */}
            <section className="bg-emerald-50/70 p-6 md:p-8 rounded-3xl border border-emerald-200">
              <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2.5">
                <Database className="w-6 h-6 text-emerald-700" />
                2. ประเด็นสำคัญที่สุด: ข้อมูลของท่านถูกจัดเก็บอยู่ที่ไหน?
              </h2>
              <div className="space-y-4 text-sm text-[#1E293B]">
                <div className="p-4 rounded-2xl bg-white border border-emerald-200">
                  <p className="font-bold text-emerald-900 mb-1.5">
                    🛡️ ข้อมูลทั้งหมดอยู่ในบัญชี Google Workspace ของผู้ซื้อเอง 100%
                  </p>
                  <p className="text-[#475569] text-xs md:text-sm leading-relaxed">
                    ระบบทั้งหมดของ AiAon Tech ทำงานบน Google Sheets, Google Drive และ Google Apps Script ในบัญชี Google
                    ของผู้ซื้อเอง <strong className="text-[#0F172A]">ไม่ใช่เซิร์ฟเวอร์ของ AiAon Tech</strong> ดังนั้น:
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs md:text-sm text-[#1E293B]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      ข้อมูลนักเรียน (ชื่อ, รูปถ่าย, คะแนน, พฤติกรรม ฯลฯ) ที่กรอกหรือบันทึกเข้าระบบ{" "}
                      <strong>ถูกจัดเก็บอยู่ใน Google Drive ของโรงเรียน/ผู้ซื้อเองทั้งหมด</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      AiAon Tech <strong>ไม่มีสิทธิ์เข้าถึง ไม่ดึงข้อมูล และไม่จัดเก็บสำเนาข้อมูลนักเรียนไว้กับตนเอง</strong>{" "}
                      หลังจากส่งมอบสิทธิ์และโอนความเป็นเจ้าของให้แก่ผู้ซื้อเรียบร้อยแล้ว
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      สถานะของ AiAon Tech คือ <strong>&quot;ผู้พัฒนาและส่งมอบแม่แบบระบบ&quot; (Template Provider)</strong> เท่านั้น
                      ไม่ใช่ผู้ควบคุมข้อมูลส่วนบุคคลตามนิยามของกฎหมาย
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>ผู้ซื้อ (โรงเรียน/ครูผู้ดูแลระบบ) คือ ผู้ควบคุมข้อมูลตัวจริง (Data Controller)</strong>{" "}
                      และมีหน้าที่รับผิดชอบตามระเบียบ PDPA ของหน่วยงาน
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-sm font-bold">
                  3
                </span>
                ประเภทข้อมูลที่ระบบอาจเกี่ยวข้อง (ขึ้นอยู่กับระบบที่เลือกใช้)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[#64748B]">
                      <th className="py-2.5 font-semibold w-1/2">ประเภทข้อมูล</th>
                      <th className="py-2.5 font-semibold">ตัวอย่างระบบที่เกี่ยวข้อง</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    <tr>
                      <td className="py-3 font-medium text-[#0F172A]">ชื่อ-นามสกุล, เลขประจำตัว, ชั้น/ห้อง</td>
                      <td className="py-3 text-[#0F766E] font-medium">แทบทุกระบบ (เช็คชื่อ, ปพ.5, เยี่ยมบ้าน)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-[#0F172A]">รูปถ่ายนักเรียน/ครู</td>
                      <td className="py-3 text-[#0F766E] font-medium">AONE10 (ฝึกจำหน้า), AONA03 (เกียรติบัตร QR)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-[#0F172A]">บันทึกวินัย / คะแนนความประพฤติ</td>
                      <td className="py-3 text-[#0F766E] font-medium">AONE01, AONE03, AONE04, AONE05</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-[#0F172A]">คะแนนสอบ &amp; ตัดเกรด</td>
                      <td className="py-3 text-[#0F766E] font-medium">AONE06, AONE07, SYS02 (ปพ.5 GPAX)</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium text-[#0F172A]">เบอร์โทรผู้ปกครอง &amp; พิกัด GPS</td>
                      <td className="py-3 text-[#0F766E] font-medium">AONE08 (ใบขออนุญาต), SYS01 (เยี่ยมบ้าน GPS)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#1D4ED8] text-sm font-bold">
                  4
                </span>
                คำแนะนำสำหรับโรงเรียนและครูผู้ดูแลข้อมูล
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-xs md:text-sm text-[#475569]">
                <li>จำกัดสิทธิ์การเข้าถึง Google Sheets/Drive เฉพาะบุคลากรที่เกี่ยวข้องในโรงเรียนเท่านั้น</li>
                <li>ขอความยินยอมจากผู้ปกครองหรือนักเรียนตามระเบียบสถานศึกษา ก่อนจัดเก็บภาพถ่ายหรือข้อมูลส่วนบุคคล</li>
                <li>ตั้งค่าการแชร์ไฟล์เป็น &quot;จำกัดเฉพาะบุคคลในองค์กร&quot; ห้ามเปิดสิทธิ์เป็นสาธารณะ (Public)</li>
                <li>ลบหรือเก็บถาวร (Archive) ข้อมูลนักเรียนที่สำเร็จการศึกษาแล้วตามรอบระยะเวลาของโรงเรียน</li>
              </ol>
            </section>

            {/* Section 4.1 */}
            <section className="bg-[#F0FDFA] p-6 md:p-8 rounded-3xl border border-[#99F6E4]">
              <h2 className="text-xl font-bold text-[#0F766E] mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white text-[#0F766E] border border-[#99F6E4] text-sm font-bold">
                  4.1
                </span>
                นโยบายความเป็นส่วนตัวสำหรับบริการ &quot;AI Caretaker รายเดือน&quot;
              </h2>
              <div className="space-y-3 text-xs md:text-sm text-[#1E293B]">
                <p>สำหรับร้านค้าและธุรกิจที่ใช้บริการ <strong>AI Caretaker ดูแลบอทและระบบหลังบ้านรายเดือน</strong>:</p>
                <ul className="list-disc list-inside space-y-2 text-[#475569]">
                  <li>
                    <strong className="text-[#0F172A]">ตำแหน่งจัดเก็บข้อมูล:</strong> รายชื่อสินค้า ราคา คำสั่งซื้อ
                    ยอดสลิปโอนเงิน และข้อมูลลูกค้าปลายทาง จะถูกบันทึกและจัดเก็บอยู่ใน Google Sheets
                    และระบบคลาวด์ที่เป็นกรรมสิทธิ์ของร้านค้าผู้ซื้อเองทั้งหมด
                  </li>
                  <li>
                    <strong className="text-[#0F172A]">การเข้าถึงของทีมงาน:</strong> AiAon Tech
                    เข้าถึงเฉพาะส่วนที่จำเป็นต่อการเฝ้าระวังทางเทคนิค (Watchdog &amp; Health Monitoring)
                    และการปรับแต่งฟังก์ชันตามที่ร้านค้าร้องขอเท่านั้น
                  </li>
                  <li>
                    <strong className="text-[#0F172A]">การรักษาความลับ (Confidentiality):</strong> AiAon Tech
                    จะไม่นำข้อมูลทางธุรกิจ สถิติยอดขาย รายชื่อลูกค้า หรือข้อมูลสลิปของร้านค้าไปเปิดเผย
                    นำไปแสวงหาประโยชน์ หรือส่งต่อให้แก่บุคคลที่สามโดยเด็ดขาด 100%
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5 & 6 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">5. ข้อมูลที่ AiAon Tech จัดเก็บจริง</h2>
                <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
                  จัดเก็บเฉพาะข้อมูลของผู้สั่งซื้อสินค้า (ชื่อ, อีเมล, เบอร์โทร, ประวัติการสั่งซื้อ)
                  เพื่อวัตถุประสงค์ในการออกใบเสร็จ สนับสนุนหลังการขาย และบันทึกประวัติการรับประกันเท่านั้น
                  ไม่เกี่ยวข้องกับข้อมูลนักเรียนของโรงเรียนผู้ซื้อ
                </p>
              </section>

              <section className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-xs">
                <h2 className="text-base font-bold text-[#0F172A] mb-2">6. สิทธิของเจ้าของข้อมูล (Data Subject Rights)</h2>
                <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
                  ลูกค้าของ AiAon Tech มีสิทธิในการขอเข้าถึง ขอสำเนา ขอแก้ไข หรือขอให้ลบข้อมูลส่วนบุคคลของผู้ซื้อที่จัดเก็บไว้ได้ตลอดเวลา
                  โดยติดต่อผ่านช่องทางอย่างเป็นทางการ
                </p>
              </section>
            </div>

            {/* Contact Box */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#99F6E4] text-center shadow-xs">
              <h2 className="text-lg font-bold text-[#0F172A] mb-2">มีข้อสงสัยเกี่ยวกับนโยบายคุ้มครองข้อมูลส่วนบุคคล?</h2>
              <p className="text-xs md:text-sm text-[#475569] mb-4">
                ติดต่อสอบถามทีมงานหรือเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของ AiAon Tech ได้โดยตรง
              </p>
              <a
                href={getLineOrderUrl("สวัสดีครับครูอ้น มีข้อสอบถามเกี่ยวกับนโยบายความเป็นส่วนตัวและ PDPA ครับ")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-bold text-sm transition-all shadow-xs"
              >
                ติดต่อฝ่ายคุ้มครองข้อมูลผ่าน LINE OA (@deu6776s)
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          </div>
        </div>
      </div>
    </PillarThemeWrapper>
  );
}
