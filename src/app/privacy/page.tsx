import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, ArrowLeft, ExternalLink, Database, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว (PDPA) | AiAon Tech",
  description:
    "นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคลของนักเรียน ครู และลูกค้าธุรกิจ ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)",
};

export default function PrivacyPage() {
  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-28 font-prompt text-white">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 pt-10 md:pt-16 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับสู่หน้าหลัก
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Lock className="w-3.5 h-3.5" />
            การคุ้มครองข้อมูลส่วนบุคคล (PDPA)
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            นโยบายความเป็นส่วนตัว (Privacy Policy)
          </h1>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            ผู้ให้บริการ: <strong className="text-white">AiAon Tech โดย นายจิรวัฒน์ เดชเส้ง</strong> | มาตรฐานการคุ้มครองข้อมูลระดับสูงสุด
          </p>
          <p className="text-white/40 text-xs mt-2">อัปเดตล่าสุด: 16 ตุลาคม 2026</p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-white/80 leading-relaxed text-sm md:text-base">
          {/* Section 1: Overview */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm">
                1
              </span>
              ภาพรวมและเจตนารมณ์
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              เอกสารนี้จัดทำขึ้นเพื่อชี้แจงแนวปฏิบัติที่ระบบภายใต้แบรนด์ <strong>AiAon Tech</strong> เกี่ยวข้องกับข้อมูลส่วนบุคคลของนักเรียน ครู ผู้ปกครอง และลูกค้าองค์กร ตามเจตนารมณ์ของ{" "}
              <strong className="text-cyan-300">พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)</strong>
            </p>
          </section>

          {/* Section 2: Core Principle - Where data lives */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
            <h2 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-emerald-400" />
              2. ประเด็นสำคัญที่สุด: ข้อมูลของท่านถูกจัดเก็บอยู่ที่ไหน?
            </h2>
            <div className="space-y-4 text-sm text-white/80">
              <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30">
                <p className="font-semibold text-emerald-200 mb-2">
                  🛡️ ข้อมูลทั้งหมดอยู่ในบัญชี Google Workspace ของผู้ซื้อเอง 100%
                </p>
                <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                  ระบบทั้งหมดของ AiAon Tech ทำงานบน Google Sheets, Google Drive และ Google Apps Script ในบัญชี Google
                  ของผู้ซื้อเอง <strong>ไม่ใช่เซิร์ฟเวอร์ของ AiAon Tech</strong> ดังนั้น:
                </p>
              </div>

              <ul className="space-y-2.5 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    ข้อมูลนักเรียน (ชื่อ, รูปถ่าย, คะแนน, พฤติกรรม ฯลฯ) ที่กรอกหรือบันทึกเข้าระบบ{" "}
                    <strong>ถูกจัดเก็บอยู่ใน Google Drive ของโรงเรียน/ผู้ซื้อเองทั้งหมด</strong>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    AiAon Tech <strong>ไม่มีสิทธิ์เข้าถึง ไม่ดึงข้อมูล และไม่จัดเก็บสำเนาข้อมูลนักเรียนไว้กับตนเอง</strong>{" "}
                    หลังจากส่งมอบสิทธิ์และโอนความเป็นเจ้าของให้แก่ผู้ซื้อเรียบร้อยแล้ว
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    สถานะของ AiAon Tech คือ <strong>"ผู้พัฒนาและส่งมอบแม่แบบระบบ" (Template Provider)</strong> เท่านั้น
                    ไม่ใช่ผู้ควบคุมข้อมูลส่วนบุคคลตามนิยามของกฎหมาย
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>ผู้ซื้อ (โรงเรียน/ครูผู้ดูแลระบบ) คือ ผู้ควบคุมข้อมูลตัวจริง (Data Controller)</strong>{" "}
                    และมีหน้าที่รับผิดชอบตามระเบียบ PDPA ของหน่วยงาน
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Data Types */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                3
              </span>
              ประเภทข้อมูลที่ระบบอาจเกี่ยวข้อง (ขึ้นอยู่กับระบบที่เลือกใช้)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40">
                    <th className="py-2.5 font-semibold w-1/2">ประเภทข้อมูล</th>
                    <th className="py-2.5 font-semibold">ตัวอย่างระบบที่เกี่ยวข้อง</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 font-medium text-white/90">ชื่อ-นามสกุล, เลขประจำตัว, ชั้น/ห้อง</td>
                    <td className="py-3 text-cyan-300">แทบทุกระบบ (เช็คชื่อ, ปพ.5, เยี่ยมบ้าน)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white/90">รูปถ่ายนักเรียน/ครู</td>
                    <td className="py-3 text-cyan-300">AONE10 (ฝึกจำหน้า), AONA03 (เกียรติบัตร QR)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white/90">บันทึกวินัย / คะแนนความประพฤติ</td>
                    <td className="py-3 text-cyan-300">AONE01, AONE03, AONE04, AONE05</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white/90">คะแนนสอบ & ตัดเกรด</td>
                    <td className="py-3 text-cyan-300">AONE06, AONE07, SYS02 (ปพ.5 GPAX)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-white/90">เบอร์โทรผู้ปกครอง & พิกัด GPS</td>
                    <td className="py-3 text-cyan-300">AONE08 (ใบขออนุญาต), SYS01 (เยี่ยมบ้าน GPS)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Recommendation for Schools */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                4
              </span>
              คำแนะนำสำหรับโรงเรียนและครูผู้ดูแลข้อมูล
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-xs md:text-sm text-white/70">
              <li>จำกัดสิทธิ์การเข้าถึง Google Sheets/Drive เฉพาะบุคลากรที่เกี่ยวข้องในโรงเรียนเท่านั้น</li>
              <li>ขอความยินยอมจากผู้ปกครองหรือนักเรียนตามระเบียบสถานศึกษา ก่อนจัดเก็บภาพถ่ายหรือข้อมูลส่วนบุคคล</li>
              <li>ตั้งค่าการแชร์ไฟล์เป็น "จำกัดเฉพาะบุคคลในองค์กร" ห้ามเปิดสิทธิ์เป็นสาธารณะ (Public)</li>
              <li>ลบหรือเก็บถาวร (Archive) ข้อมูลนักเรียนที่สำเร็จการศึกษาแล้วตามรอบระยะเวลาของโรงเรียน</li>
            </ol>
          </section>

          {/* Section 4.1: AI Caretaker for Merchants */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
            <h2 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm">
                4.1
              </span>
              นโยบายความเป็นส่วนตัวสำหรับบริการ "AI Caretaker รายเดือน"
            </h2>
            <div className="space-y-3 text-xs md:text-sm text-white/80">
              <p>
                สำหรับร้านค้าและธุรกิจที่ใช้บริการ <strong>AI Caretaker ดูแลบอทและระบบหลังบ้านรายเดือน</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>
                  <strong className="text-white">ตำแหน่งจัดเก็บข้อมูล:</strong> รายชื่อสินค้า ราคา คำสั่งซื้อ
                  ยอดสลิปโอนเงิน และข้อมูลลูกค้าปลายทาง จะถูกบันทึกและจัดเก็บอยู่ใน Google Sheets
                  และระบบคลาวด์ที่เป็นกรรมสิทธิ์ของร้านค้าผู้ซื้อเองทั้งหมด
                </li>
                <li>
                  <strong className="text-white">การเข้าถึงของทีมงาน:</strong> AiAon Tech
                  เข้าถึงเฉพาะส่วนที่จำเป็นต่อการเฝ้าระวังทางเทคนิค (Watchdog & Health Monitoring)
                  และการปรับแต่งฟังก์ชันตามที่ร้านค้าร้องขอเท่านั้น
                </li>
                <li>
                  <strong className="text-white">การรักษาความลับ (Confidentiality):</strong> AiAon Tech
                  จะไม่นำข้อมูลทางธุรกิจ สถิติยอดขาย รายชื่อลูกค้า หรือข้อมูลสลิปของร้านค้าไปเปิดเผย
                  นำไปแสวงหาประโยชน์ หรือส่งต่อให้แก่บุคคลที่สามโดยเด็ดขาด 100%
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 & 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="glass-card p-6 rounded-2xl border border-white/10">
              <h2 className="text-base font-bold text-white mb-2">5. ข้อมูลที่ AiAon Tech จัดเก็บจริง</h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                จัดเก็บเฉพาะข้อมูลของผู้สั่งซื้อสินค้า (ชื่อ, อีเมล, เบอร์โทร, ประวัติการสั่งซื้อ)
                เพื่อวัตถุประสงค์ในการออกใบเสร็จ สนับสนุนหลังการขาย และบันทึกประวัติการรับประกันเท่านั้น
                ไม่เกี่ยวข้องกับข้อมูลนักเรียนของโรงเรียนผู้ซื้อ
              </p>
            </section>

            <section className="glass-card p-6 rounded-2xl border border-white/10">
              <h2 className="text-base font-bold text-white mb-2">6. สิทธิของเจ้าของข้อมูล (Data Subject Rights)</h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                ลูกค้าของ AiAon Tech มีสิทธิในการขอเข้าถึง ขอสำเนา ขอแก้ไข หรือขอให้ลบข้อมูลส่วนบุคคลของผู้ซื้อที่จัดเก็บไว้ได้ตลอดเวลา
                โดยติดต่อผ่านช่องทางอย่างเป็นทางการ
              </p>
            </section>
          </div>

          {/* Contact Box */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 text-center">
            <h2 className="text-lg font-bold text-white mb-2">มีข้อสงสัยเกี่ยวกับนโยบายคุ้มครองข้อมูลส่วนบุคคล?</h2>
            <p className="text-xs md:text-sm text-white/60 mb-4">
              ติดต่อสอบถามทีมงานหรือเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของ AiAon Tech ได้โดยตรง
            </p>
            <a
              href="https://line.me/R/oaMessage/@deu6776s/?สวัสดีครับครูอ้น มีข้อสอบถามเกี่ยวกับนโยบายความเป็นส่วนตัวและ PDPA ครับ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              ติดต่อฝ่ายคุ้มครองข้อมูลผ่าน LINE OA (@deu6776s)
              <ExternalLink className="w-4 h-4" />
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
