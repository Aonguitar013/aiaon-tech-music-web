import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, CheckCircle2, XCircle, ArrowLeft, ExternalLink, Clock } from "lucide-react";
import { getLineOrderUrl } from "@/lib/line";
import { PillarThemeWrapper } from "@/components/layout/PillarThemeWrapper";

export const metadata: Metadata = {
  title: "นโยบายการคืนเงิน (Refund Policy) | AiAon Tech",
  description:
    "นโยบายและขั้นตอนการขอคืนเงินสำหรับสินค้าดิจิทัล คอร์สเรียนออนไลน์ และระบบ Google Apps Script ภายใต้แบรนด์ AiAon Tech",
};

export default function RefundPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF5FF] text-[#6D28D9] border border-[#DDD6FE] mb-4">
              <RefreshCw className="w-3.5 h-3.5" />
              ความโปร่งใสและเป็นธรรม
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-3">
              นโยบายการคืนเงิน (Refund Policy)
            </h1>
            <p className="text-[#475569] text-sm md:text-base leading-relaxed">
              ผู้ให้บริการ: <strong className="text-[#0F172A]">AiAon Tech โดย นายจิรวัฒน์ เดชเส้ง</strong> | มาตรฐานการดูแลลูกค้าหลังการขาย
            </p>
            <p className="text-[#64748B] text-xs mt-2">อัปเดตล่าสุด: 16 ตุลาคม 2026</p>
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
                สินค้าและบริการของ <strong className="text-[#0F172A]">AiAon Tech</strong> เป็น{" "}
                <strong className="text-[#1D4ED8]">สินค้าดิจิทัล (Digital Products)</strong>{" "}
                ได้แก่ โค้ดต้นฉบับ Google Apps Script, ไฟล์เทมเพลต, ไฟล์ E-Book PDF, คลังไฟล์เสียงเพลงลิขสิทธิ์ และสิทธิ์เข้าถึงระบบอัตโนมัติ
                ซึ่งเมื่อระบบทำการตรวจสลิปและส่งมอบลิงก์ดาวน์โหลดหรือโอนสิทธิ์ให้แก่ผู้ซื้อแล้ว จะถือว่าสินค้าถูกส่งมอบเสร็จสิ้นสมบูรณ์ในทางเทคนิค
                จึง <strong className="text-[#0F172A]">ไม่สามารถขอคืนเงินได้</strong> ยกเว้นกรณีที่เข้าเงื่อนไขพิเศษที่ระบุไว้ชัดเจนด้านล่าง
              </p>
            </section>

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
                      ระบบไม่สามารถใช้งานได้จริงอันเกิดจากข้อผิดพลาดของโค้ดต้นฉบับ (Bug) จากฝั่งผู้ให้บริการ
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
                    <span>เปลี่ยนใจหรือยกเลิกคำสั่งซื้อหลังจากได้รับไฟล์ ZIP หรือสิทธิ์เข้าถึงระบบไปแล้ว</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>
                      ติดตั้งหรือใช้งานไม่เป็น หรือไม่มีเวลาเรียนรู้คู่มือ (AiAon Tech มีคลิปสอนละเอียด 2-3 นาที และช่องทางช่วยเหลือทางเทคนิคให้)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>
                      ปัญหาที่เกิดจากการตั้งค่าหรือข้อจำกัดของบัญชี Google ของผู้ซื้อเอง (เช่น ใช้อีเมลองค์กรที่แอดมินปิดกั้นสิทธิ์ Apps Script)
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

            {/* Contact Box */}
            <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#DDD6FE] text-center shadow-xs">
              <h2 className="text-lg font-bold text-[#0F172A] mb-2">ต้องการสอบถามข้อมูลการคืนเงินหรือแจ้งปัญหา?</h2>
              <p className="text-xs md:text-sm text-[#475569] mb-4">
                ทีมงานยินดีรับฟังและช่วยเหลือแก้ไขปัญหาทางเทคนิคอย่างเต็มที่
              </p>
              <a
                href={getLineOrderUrl("สวัสดีครับครูอ้น ต้องการปรึกษาปัญหาการใช้งานระบบ / การขอคืนเงินครับ")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-[#052E16] font-bold text-sm transition-all shadow-xs"
              >
                ติดต่อฝ่ายสนับสนุนผ่าน LINE OA (@deu6776s)
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          </div>
        </div>
      </div>
    </PillarThemeWrapper>
  );
}
