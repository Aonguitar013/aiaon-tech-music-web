import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, CheckCircle2, XCircle, ArrowLeft, ExternalLink, HelpCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "นโยบายการคืนเงิน (Refund Policy) | AiAon Tech",
  description:
    "นโยบายและขั้นตอนการขอคืนเงินสำหรับสินค้าดิจิทัล คอร์สเรียนออนไลน์ และระบบ Google Apps Script ภายใต้แบรนด์ AiAon Tech",
};

export default function RefundPage() {
  return (
    <div className="w-full relative overflow-hidden min-h-screen pb-28 font-prompt text-white">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-500/10 blur-[120px] pointer-events-none rounded-full" />

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            <RefreshCw className="w-3.5 h-3.5" />
            ความโปร่งใสและเป็นธรรม
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            นโยบายการคืนเงิน (Refund Policy)
          </h1>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            ผู้ให้บริการ: <strong className="text-white">AiAon Tech โดย นายจิรวัฒน์ เดชเส้ง</strong> | มาตรฐานการดูแลลูกค้าหลังการขาย
          </p>
          <p className="text-white/40 text-xs mt-2">อัปเดตล่าสุด: 16 ตุลาคม 2026</p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-white/80 leading-relaxed text-sm md:text-base">
          {/* General Principle */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 text-sm">
                1
              </span>
              หลักการทั่วไปของสินค้าดิจิทัล
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              สินค้าและบริการของ <strong>AiAon Tech</strong> เป็น <strong className="text-cyan-300">สินค้าดิจิทัล (Digital Products)</strong>{" "}
              ได้แก่ โค้ดต้นฉบับ Google Apps Script, ไฟล์เทมเพลต, ไฟล์ E-Book PDF, คลังไฟล์เสียงเพลงลิขสิทธิ์ และสิทธิ์เข้าถึงระบบอัตโนมัติ
              ซึ่งเมื่อระบบทำการตรวจสลิปและส่งมอบลิงก์ดาวน์โหลดหรือโอนสิทธิ์ให้แก่ผู้ซื้อแล้ว จะถือว่าสินค้าถูกส่งมอบเสร็จสิ้นสมบูรณ์ในทางเทคนิค
              จึง <strong>ไม่สามารถขอคืนเงินได้</strong> ยกเว้นกรณีที่เข้าเงื่อนไขพิเศษที่ระบุไว้ชัดเจนด้านล่าง
            </p>
          </section>

          {/* Refundable vs Non-refundable Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Refundable */}
            <section className="glass-card p-6 md:p-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/10">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-4">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <h3>กรณีที่สามารถขอคืนเงินได้</h3>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-emerald-100/80">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>
                    ระบบไม่สามารถใช้งานได้จริงอันเกิดจากข้อผิดพลาดของโค้ดต้นฉบับ (Bug) จากฝั่งผู้ให้บริการ
                    และทีมงานไม่สามารถแก้ไขให้ใช้งานได้ภายใน <strong>7 วันทำการ</strong> หลังได้รับแจ้งพร้อมหลักฐาน
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>
                    ผู้ซื้อโอนเงินซ้ำซ้อนโดยไม่ได้ตั้งใจ (คืนเงินเฉพาะยอดส่วนเกินจากราคาสินค้าจริงหลังหักค่าธรรมเนียมธนาคารถ้ามี)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>
                    ผู้ซื้อชำระเงินเรียบร้อยแล้ว แต่ไม่ได้รับการส่งมอบสินค้าหรือติดต่อใดๆ จากระบบเกินกว่า <strong>3 วันทำการ</strong>
                  </span>
                </li>
              </ul>
            </section>

            {/* Non-refundable */}
            <section className="glass-card p-6 md:p-8 rounded-2xl border border-rose-500/20 bg-rose-950/10">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-lg mb-4">
                <XCircle className="w-5 h-5 shrink-0" />
                <h3>กรณีที่ "ไม่" สามารถขอคืนเงินได้</h3>
              </div>
              <ul className="space-y-3 text-xs md:text-sm text-rose-100/80">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>เปลี่ยนใจหรือยกเลิกคำสั่งซื้อหลังจากได้รับไฟล์ ZIP หรือสิทธิ์เข้าถึงระบบไปแล้ว</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>
                    ติดตั้งหรือใช้งานไม่เป็น หรือไม่มีเวลาเรียนรู้คู่มือ (AiAon Tech มีคลิปสอนละเอียด 2-3 นาที และช่องทางช่วยเหลือทางเทคนิคให้)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>
                    ปัญหาที่เกิดจากการตั้งค่าหรือข้อจำกัดของบัญชี Google ของผู้ซื้อเอง (เช่น ใช้อีเมลองค์กรที่แอดมินปิดกั้นสิทธิ์ Apps Script)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>
                    ระบบทำงานสะดุดเนื่องจากการเปลี่ยนแปลงนโยบายหรือโควตาของบุคคลที่สาม (Google, Meta, LINE) ซึ่งอยู่นอกเหนือการควบคุม
                  </span>
                </li>
              </ul>
            </section>
          </div>

          {/* Refund Steps */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              ขั้นตอนและระยะเวลาการดำเนินการขอคืนเงิน
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 relative">
                <div className="text-xs text-cyan-400 font-bold mb-1">ขั้นตอนที่ 1</div>
                <h4 className="font-semibold text-white text-sm mb-2">แจ้งเรื่องและส่งหลักฐาน</h4>
                <p className="text-xs text-white/60">
                  ติดต่อผ่าน LINE OA <code className="text-cyan-300">@deu6776s</code> แนบหลักฐานสลิปโอนเงิน และระบุปัญหาที่พบอย่างละเอียด
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 relative">
                <div className="text-xs text-purple-400 font-bold mb-1">ขั้นตอนที่ 2</div>
                <h4 className="font-semibold text-white text-sm mb-2">ตรวจสอบทางเทคนิค</h4>
                <p className="text-xs text-white/60">
                  ทีมงานตรวจสอบข้อผิดพลาดและประสานงานแก้ไข หรือพิจารณาเงื่อนไขภายใน <strong>3 วันทำการ</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 relative">
                <div className="text-xs text-emerald-400 font-bold mb-1">ขั้นตอนที่ 3</div>
                <h4 className="font-semibold text-white text-sm mb-2">โอนเงินคืน</h4>
                <p className="text-xs text-white/60">
                  หากผ่านเกณฑ์การพิจารณา ระบบจะโอนเงินคืนเข้าบัญชีหรือพร้อมเพย์เดิมที่ใช้ชำระเงินภายใน <strong>7 วันทำการ</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Contact Box */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border border-purple-500/20 bg-purple-950/20 text-center">
            <h2 className="text-lg font-bold text-white mb-2">ต้องการสอบถามข้อมูลการคืนเงินหรือแจ้งปัญหา?</h2>
            <p className="text-xs md:text-sm text-white/60 mb-4">
              ทีมงานยินดีรับฟังและช่วยเหลือแก้ไขปัญหาทางเทคนิคอย่างเต็มที่
            </p>
            <a
              href="https://line.me/R/oaMessage/@deu6776s/?สวัสดีครับครูอ้น ต้องการปรึกษาปัญหาการใช้งานระบบ / การขอคืนเงินครับ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-purple-500/20"
            >
              ติดต่อฝ่ายสนับสนุนผ่าน LINE OA (@deu6776s)
              <ExternalLink className="w-4 h-4" />
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
