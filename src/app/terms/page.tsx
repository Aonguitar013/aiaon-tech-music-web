import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowLeft, ExternalLink, HelpCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "เงื่อนไขการใช้งาน (Terms of Use) | AiAon Tech",
  description:
    "เงื่อนไขและข้อตกลงการใช้งานระบบ Google Apps Script, สินค้าดิจิทัล และบริการ AI Caretaker ภายใต้แบรนด์ AiAon Tech",
};

export default function TermsPage() {
  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-28 font-prompt text-white">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[120px] pointer-events-none rounded-full" />

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            <FileText className="w-3.5 h-3.5" />
            ข้อตกลงทางกฎหมาย
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            เงื่อนไขการใช้งาน (Terms of Use)
          </h1>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            ผู้ให้บริการ: <strong className="text-white">AiAon Tech โดย นายจิรวัฒน์ เดชเส้ง</strong> | เว็บไซต์:{" "}
            <a href="https://www.aiaon.tech" className="text-cyan-400 hover:underline">
              https://www.aiaon.tech
            </a>
          </p>
          <p className="text-white/40 text-xs mt-2">อัปเดตล่าสุด: 16 ตุลาคม 2026</p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-white/80 leading-relaxed text-sm md:text-base">
          {/* Section 1 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                1
              </span>
              คำนิยาม
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/40">
                    <th className="py-2.5 font-semibold w-1/3">คำศัพท์</th>
                    <th className="py-2.5 font-semibold">ความหมาย</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 font-medium text-cyan-300">ผู้ให้บริการ</td>
                    <td className="py-3 text-white/70">AiAon Tech โดยนายจิรวัฒน์ เดชเส้ง (ครูอ้น)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-cyan-300">ผู้ซื้อ / ผู้ใช้งาน</td>
                    <td className="py-3 text-white/70">
                      บุคคล ครู โรงเรียน หรือหน่วยงานที่สั่งซื้อระบบ/เทมเพลต/บริการจากผู้ให้บริการ
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-cyan-300">ระบบ / สินค้า</td>
                    <td className="py-3 text-white/70">
                      โค้ด Google Apps Script, เทมเพลต Google Sheets, ไฟล์ HTML, E-Book, คลังเพลง และคู่มือที่ส่งมอบ
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-cyan-300">การส่งมอบ</td>
                    <td className="py-3 text-white/70">
                      การส่งลิงก์ดาวน์โหลดไฟล์ .ZIP หรือลิงก์ทำสำเนา Google Sheets แก่ผู้ซื้อโดยสมบูรณ์
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                2
              </span>
              รูปแบบสินค้าและการส่งมอบ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <h3 className="font-bold text-cyan-400 mb-1">DIY (ซื้อโค้ดไปติดตั้งเอง)</h3>
                <p className="text-xs text-white/60">
                  รับชุดไฟล์ ZIP หรือลิงก์ทำสำเนา Google Sheets พร้อมคลิปคู่มือการติดตั้ง 2-3 นาที ผู้ซื้อติดตั้งเอง
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <h3 className="font-bold text-purple-400 mb-1">VIP Setup (ช่างติดตั้งให้)</h3>
                <p className="text-xs text-white/60">
                  ทีมงานช่วยนำเข้ารายชื่อ นำเข้าข้อมูลโรงเรียน และติดตั้ง Web App ให้พร้อมใช้งานทันที
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <h3 className="font-bold text-amber-400 mb-1">Bundle / All-in-One</h3>
                <p className="text-xs text-white/60">
                  ชุดรวมหลายระบบตามแพ็กเกจ ส่งมอบไฟล์ครบทุกระบบทันทีหลังระบบตรวจสลิปผ่าน
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                3
              </span>
              ขอบเขตสิทธิ์การใช้งาน (License Scope)
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <h4 className="font-bold text-emerald-400 text-sm mb-2">✅ สิ่งที่ผู้ซื้อมีสิทธิ์ทำได้:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-emerald-200/80">
                  <li>ใช้งานระบบภายในองค์กร ห้องเรียน หรือโรงเรียนของตนเองได้ตลอดชีพ (Lifetime License)</li>
                  <li>ปรับแต่งข้อความ โลโก้ สีสัน และแบบฟอร์มให้เข้ากับโรงเรียนหรือร้านค้าของตนเองได้เต็มที่</li>
                  <li>อัปเกรดและต่อยอดสูตรการคำนวณตามบริบทของสถานศึกษาได้อิสระ</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <h4 className="font-bold text-rose-400 text-sm mb-2">❌ สิ่งที่ผู้ซื้อ "ห้าม" ทำโดยเด็ดขาด:</h4>
                <ul className="list-disc list-inside space-y-1 text-xs md:text-sm text-rose-200/80">
                  <li>ห้ามคัดลอก แจกจ่าย เผยแพร่ต่อสาธารณะ หรือขายต่อโค้ดต้นฉบับแก่บุคคลอื่นในเชิงพาณิชย์</li>
                  <li>ห้ามแอบอ้างตนเองเป็นผู้พัฒนาหรือเจ้าของลิขสิทธิ์ระบบ</li>
                  <li>ห้ามนำโค้ดไปดัดแปลงเพียงเล็กน้อยแล้วนำไปวางจำหน่ายเป็นผลิตภัณฑ์ใหม่ภายใต้ชื่ออื่น</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3.1 - AI Caretaker */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-cyan-500/20 bg-cyan-950/10">
            <h2 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm">
                3.1
              </span>
              ข้อกำหนดเฉพาะสำหรับบริการ "AI Caretaker รายเดือน"
            </h2>
            <div className="space-y-3 text-sm text-white/80">
              <p>
                สำหรับร้านค้าและธุรกิจที่สมัครใช้บริการดูแลและเฝ้าระวังระบบ AI Caretaker รายเดือน:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-white/70">
                <li>
                  <strong className="text-white">ความเป็นเจ้าของและการเก็บข้อมูล:</strong> ข้อมูลสินค้า ออเดอร์
                  สลิปโอนเงิน และประวัติการสนทนาทั้งหมด จะถูกจัดเก็บอยู่ใน Google Sheets, บัญชี LINE OA, Facebook Page
                  หรือระบบคลาวด์ของร้านค้าผู้ซื้อเองทั้งสิ้น
                </li>
                <li>
                  <strong className="text-white">ขอบเขตหน้าที่ของผู้ให้บริการ:</strong> AiAon Tech
                  ทำหน้าที่เป็นผู้ดูแลและเฝ้าระวังความเสถียรทางเทคนิค (Self-Healing Watchdog Engine)
                  และช่วยกู้คืนหัวตารางหรือแก้ไขข้อผิดพลาดตามรอบการทำงานที่ตกลงไว้เท่านั้น
                  ไม่ใช่ผู้รับประกันยอดขายหรือกำไรของร้านค้า
                </li>
                <li>
                  <strong className="text-white">การจำกัดความรับผิดชอบ (Limitation of Liability):</strong>{" "}
                  กรณีเกิดเหตุขัดข้องทางเทคนิค การหยุดให้บริการของแพลตฟอร์มบุคคลที่สาม (Google, LINE, Meta)
                  หรือความล่าช้าในการส่งข้อความ ความรับผิดชอบสูงสุดของผู้ให้บริการจะถูกจำกัด
                  <span className="text-cyan-300 font-semibold">
                    {" "}ไม่เกินจำนวนเงินค่าบริการรายเดือนจริงที่ผู้ซื้อได้ชำระในรอบเดือนที่เกิดความเสียหายนั้นๆ เท่านั้น
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                4
              </span>
              ข้อจำกัดความรับผิดชอบ (Disclaimer)
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-white/70">
              <li>
                ระบบทำงานบนแพลตฟอร์ม <strong className="text-white">Google Workspace</strong> (Google Sheets, Apps
                Script, Drive) ซึ่งเป็นบริการของบุคคลที่สาม (Google LLC) ผู้ให้บริการไม่สามารถควบคุมการเปลี่ยนแปลงนโยบาย
                โควตาการใช้งาน หรือการหยุดให้บริการของ Google ได้ และไม่รับผิดชอบต่อผลกระทบที่เกิดจากการเปลี่ยนแปลงฝั่ง Google
              </li>
              <li>
                สินค้าส่งมอบในสภาพ <strong className="text-white">"ตามที่เป็น" (As-Is)</strong>{" "}
                โดยผ่านการทดสอบตามมาตรฐานก่อนส่งมอบ แต่ไม่สามารถรับประกันว่าจะปราศจากข้อผิดพลาด 100% ในทุกสภาพแวดล้อม
              </li>
              <li>
                ผู้ให้บริการไม่รับผิดชอบต่อความเสียหายทางอ้อม (เช่น ข้อมูลสูญหายจากการตั้งค่าผิดพลาดของผู้ซื้อเอง)
                เกินกว่ามูลค่าสินค้าที่ซื้อจริง
              </li>
            </ul>
          </section>

          {/* Section 5 - 9 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="glass-card p-6 rounded-2xl border border-white/10">
              <h2 className="text-base font-bold text-white mb-2">5. การสนับสนุนหลังการขาย</h2>
              <p className="text-xs md:text-sm text-white/70">
                ให้การช่วยเหลือแก้ปัญหาการติดตั้งเบื้องต้นฟรีภายใน <strong>14 วันทำการ</strong> หลังส่งมอบ ผ่าน LINE OA{" "}
                <code className="text-cyan-400">@deu6776s</code>
              </p>
            </section>

            <section className="glass-card p-6 rounded-2xl border border-white/10">
              <h2 className="text-base font-bold text-white mb-2">6. ทรัพย์สินทางปัญญา</h2>
              <p className="text-xs md:text-sm text-white/70">
                โค้ดต้นฉบับ การออกแบบ และสิทธิบัตรทางความคิดเป็นกรรมสิทธิ์ของ AiAon Tech โดยผู้ซื้อได้รับสิทธิ์การใช้งาน
                (License) ตลอดชีพ
              </p>
            </section>

            <section className="glass-card p-6 rounded-2xl border border-white/10">
              <h2 className="text-base font-bold text-white mb-2">7. การเปลี่ยนแปลงเงื่อนไข</h2>
              <p className="text-xs md:text-sm text-white/70">
                ขอสงวนสิทธิ์ในการปรับปรุงเงื่อนไขนี้ได้ตลอดเวลา โดยประกาศฉบับล่าสุดบนเว็บไซต์
                การปรับปรุงจะไม่กระทบสิทธิ์ของผู้ที่ซื้อไปก่อนหน้า
              </p>
            </section>

            <section className="glass-card p-6 rounded-2xl border border-white/10">
              <h2 className="text-base font-bold text-white mb-2">8. กฎหมายที่ใช้บังคับ</h2>
              <p className="text-xs md:text-sm text-white/70">
                เงื่อนไขและข้อตกลงการใช้งานนี้อยู่ภายใต้บังคับและการตีความตามกฎหมายแห่งราชอาณาจักรไทย
              </p>
            </section>
          </div>

          {/* Contact Box */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-blue-500/20 bg-blue-950/20 text-center">
            <h2 className="text-lg font-bold text-white mb-2">มีข้อสงสัยเกี่ยวกับเงื่อนไขการใช้งาน?</h2>
            <p className="text-xs md:text-sm text-white/60 mb-4">
              ติดต่อปรึกษาหรือสอบถามรายละเอียดเพิ่มเติมกับครูอ้นได้โดยตรง
            </p>
            <a
              href="https://line.me/R/oaMessage/@deu6776s/?สวัสดีครับครูอ้น สอบถามเงื่อนไขการใช้งานระบบครับ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20"
            >
              ติดต่อผ่าน LINE OA (@deu6776s)
              <ExternalLink className="w-4 h-4" />
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
