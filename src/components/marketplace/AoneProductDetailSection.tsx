"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck, CheckCircle2, Zap, ArrowRight, Gift, ShoppingCart,
  Clock, AlertTriangle, Sparkles, UserCheck, HelpCircle, FileText,
  Lock, Laptop, RefreshCw, MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DvdCaseMockup, AONE_SYSTEM_META } from "@/components/marketplace/DvdCaseMockup";
import { useLineModal, isMobileDevice } from "@/components/ui/LineOrderModal";
import { getLineOrderUrl } from "@/lib/line";

interface AoneDetailData {
  code: string;
  headline: string;
  subheadline: string;
  beforePain: string;
  afterBenefit: string;
  timeSaved: string;
  features: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const AONE_DETAILS: Record<string, AoneDetailData> = {
  AONE01: {
    code: "AONE01",
    headline: "ระบบเช็คชื่อ & พฤติกรรม ม.3 V2: เช็คชื่อ ตรวจเครื่องแบบ ส่งสรุป LINE ผู้ปกครองใน 1 นาที",
    subheadline: "เปลี่ยนการเช็คชื่อบนสมุดกระดาษที่เสี่ยงตกหล่น ให้กลายเป็นระบบดิจิทัลอัตโนมัติบน Google Sheets",
    beforePain: "เดินถือสมุดกระดาษติ๊กทีละช่อง ตกเย็นต้องมานั่งกดเครื่องคิดเลขรวมยอด ขาด ลา มาสาย ส่งฝ่ายปกครองช้า",
    afterBenefit: "ติ๊กเช็คชื่อในมือถือ 1 คลิก ยิงแจ้งเตือนผู้ปกครองทาง LINE/Telegram ทันที สรุปยอดร้อยละมาเรียนอัตโนมัติ",
    timeSaved: "ประหยัดเวลาครูประจำชั้น 45 นาที/วัน",
    features: [
      { title: "เช็คชื่อ & บันทึกพฤติกรรมในจอเดียว", desc: "เลือกสถานะ มา, ขาด, ลา, ป่วย, มาสาย พร้อมปุ่มบันทึกเร็วทั้งห้อง" },
      { title: "แจ้งเตือน LINE / Telegram อัตโนมัติ", desc: "ส่งสรุปรายวันตรงถึงกลุ่มผู้ปกครองหรือฝ่ายกิจการนักเรียนทันที" },
      { title: "สรุปสถิติร้อยละเวลาเรียนส่ง ปพ.5", desc: "คำนวณเปอร์เซ็นต์เวลาเรียน 80% อัตโนมัติ ป้องกันนักเรียนหมดสิทธิ์สอบ" },
    ],
    faqs: [
      { q: "ถ้าห้องเรียนมีนักเรียน 40-50 คน ระบบจะช้าไหม?", a: "ไม่ช้าครับ ระบบประมวลผลผ่าน Google Apps Script ฝั่ง Server รวดเร็วและเสถียรมาก" },
      { q: "ใช้กับโทรศัพท์มือถือ iPhone หรือ Android ได้ไหม?", a: "ใช้ได้ 100% ครับ หน้าจอเว็บแอปเป็น Responsive ออกแบบมาสำหรับกดบนมือถือด้วยมือเดียวได้อย่างสะดวกสบาย" },
    ]
  },
  AONE02: {
    code: "AONE02",
    headline: "ระบบแบ่งฝ่ายงานคอนเสิร์ต & ส่งงานการสอน: จัดสรรฝ่ายงานกิจกรรม พร้อมระบบรหัส PIN",
    subheadline: "ให้นักเรียนเลือกฝ่ายงาน อัปโหลดรูปโปรไฟล์ และส่งการบ้านออนไลน์โดยไม่ต้องสร้างกลุ่มส่งงานซ้ำซ้อน",
    beforePain: "นักเรียนแย่งฝ่ายงานกัน เอกสารใบรายชื่อหาย ครูต้องมานั่งทวงรูปและตามงานทีละคนในแชตกลุ่ม",
    afterBenefit: "นักเรียนใส่รหัส PIN ล็อกอินเลือกฝ่ายงาน อัปโหลดรูป และส่งลิงก์งาน ครูเปิดตรวจในแดชบอร์ดเดียวจบ",
    timeSaved: "ประหยัดเวลาจัดฝ่ายงานและตามการบ้าน 15+ ชั่วโมง/กิจกรรม",
    features: [
      { title: "ระบบยืนยันตัวตนด้วยรหัส PIN", desc: "ป้องกันนักเรียนเลือกแทนกัน หรือแก้ไขข้อมูลของเพื่อนโดยไม่ได้รับอนุญาต" },
      { title: "จำกัดโควตาแต่ละฝ่ายงาน Real-time", desc: "ฝ่ายไหนเต็มแล้วระบบจะปิดรับทันที ไม่ต้องมีปัญหานักเรียนกองอยู่ฝ่ายเดียว" },
      { title: "แดชบอร์ดตรวจงานพร้อมส่งออก CSV", desc: "สรุปรายชื่อแต่ละฝ่ายงานและสถานะการส่งงานพร้อมพิมพ์ส่งฝ่ายวิชาการ" },
    ],
    faqs: [
      { q: "นำไปประยุกต์ใช้กับกิจกรรมอื่นที่ไม่ใช่คอนเสิร์ตได้ไหม?", a: "ได้แน่นอนครับ เช่น กิจกรรมวันวิทยาศาสตร์, กีฬาสี, วันภาษาไทย หรือค่ายวิชาการ เพียงเปลี่ยนชื่อฝ่ายงานใน Google Sheet" },
      { q: "รูปภาพนักเรียนเก็บไว้ที่ไหน?", a: "จัดเก็บเข้าสู่โฟลเดอร์ Google Drive ของคุณครูโดยตรงอย่างเป็นระเบียบครับ" },
    ]
  },
  AONE03: {
    code: "AONE03",
    headline: "ระบบตรวจติดตามเครื่องแต่งกาย ม.3: ตรวจระเบียบวินัย พร้อมระบบปลดสถานะแก้ตัวอัตโนมัติ",
    subheadline: "ติดตามเครื่องแบบ ทรงผม ถุงเท้า รองเท้า แบบโปร่งใส ตรวจซ้ำแล้วล้างสถานะความผิดทันที",
    beforePain: "จดบันทึกใส่สมุด เมื่อเด็กมาแก้ตัวแล้วครูลืมขีดฆ่า สรุปคะแนนพฤติกรรมปลายเทอมเกิดข้อโต้แย้ง",
    afterBenefit: "บันทึกรายข้อผ่านมือถือ นักเรียนมาแก้ไขแล้วกด 'ปลดสถานะแก้ตัว' ระบบคืนแต้มและบันทึกประวัติทันที",
    timeSaved: "ลดข้อพิพาทและประหยัดเวลาตัดคะแนนพฤติกรรม 100%",
    features: [
      { title: "บันทึกตรวจเครื่องแต่งกายแยกหมวด", desc: "ทรงผม, เสื้อผ้า, เข็มขัด, กระโปรง/กางเกง, รองเท้า/ถุงเท้า ตรวจได้ละเอียด" },
      { title: "ระบบปลดสถานะแก้ตัว (Correction Pass)", desc: "เมื่อนักเรียนแก้ไขความเรียบร้อย สามารถบันทึกปลดโทษพร้อมประวัติการแก้ตัว" },
      { title: "สรุปสถิติส่งครูฝ่ายปกครอง", desc: "แสดงรายชื่อนักเรียนที่ยังไม่แก้ไข เพื่อส่งต่อครูหัวหน้าระดับและผู้ปกครอง" },
    ],
    faqs: [
      { q: "สามารถปรับแก้รายการข้อตรวจระเบียบเองได้ไหม?", a: "ได้ครับ สามารถเพิ่มหรือแก้หัวข้อตรวจได้ตามระเบียบของแต่ละโรงเรียนใน Google Sheet" },
      { q: "ผู้ปกครองสามารถดูผลการตรวจได้ไหม?", a: "สามารถส่งลิงก์หน้าแดชบอร์ดหรือพิมพ์สรุป PDF ให้ผู้ปกครองดูได้ทันทีครับ" },
    ]
  },
  AONE04: {
    code: "AONE04",
    headline: "ระบบเช็คชื่อ & ตรวจเครื่องแบบ ม.3 V1: พร้อมระบบแจ้งลาล่วงหน้า (LeaveForm) และมาสาย",
    subheadline: "จัดการการลาป่วย ลากิจ และการมาสายหน้าประตูโรงเรียนแบบดิจิทัล มี Digital Slip ยืนยัน",
    beforePain: "ผู้ปกครองส่งใบลามาทางกระดาษแล้วหาย หรือโทรมาบอกครูลืมบันทึก เด็กอ้างว่าลาแล้ว",
    afterBenefit: "ผู้ปกครอง/นักเรียนยื่นใบลาล่วงหน้าออนไลน์แนบหลักฐาน ครูอนุมัติ 1 คลิก ข้อมูลซิงค์ลงตารางทันที",
    timeSaved: "ประหยัดเวลาจัดการเอกสารใบลา 10+ ชั่วโมง/เดือน",
    features: [
      { title: "แบบฟอร์มยื่นลาล่วงหน้า (LeaveForm)", desc: "แนบใบรับรองแพทย์หรือภาพถ่ายใบลาเข้า Google Drive ได้ทันที" },
      { title: "ระบบบันทึกมาสายหน้าประตู (LateEntry)", desc: "ครูเวรประตูโรงเรียนบันทึกเวลามาสายแบบ Real-time ซิงค์หาครูประจำชั้น" },
      { title: "Digital Slip ยืนยันสิทธิ์", desc: "ออกสลิปดิจิทัลยืนยันว่าได้รับอนุญาตให้ลาหรือเข้าห้องเรียนเรียบร้อย" },
    ],
    faqs: [
      { q: "AONE01 กับ AONE04 ต่างกันอย่างไร?", a: "AONE04 มีจุดเด่นพิเศษคือระบบยื่นใบลาล่วงหน้า LeaveForm และระบบมาสายหน้าประตู ส่วน AONE01 จะเน้นเช็คชื่อเข้าแถวรายวันแบบรวดเร็วครับ" },
    ]
  },
  AONE05: {
    code: "AONE05",
    headline: "ระบบบันทึกพฤติกรรม & แต้มความประพฤติ: แนบภาพหลักฐานบีบอัด ส่ง LINE ฝ่ายปกครอง",
    subheadline: "ตัดแต้มและคืนแต้มตามเกณฑ์กระทรวงศึกษาธิการ พร้อมภาพหลักฐานบีบอัด ไม่เปลืองพื้นที่ Google Drive",
    beforePain: "ตัดแต้มเด็กไม่มีภาพถ่ายหลักฐาน ผู้ปกครองไม่เชื่อถือ บันทึกช้าทำให้แก้พฤติกรรมไม่ทันท่วงที",
    afterBenefit: "ถ่ายรูปแนบหลักฐาน (Canvas บีบอัดอัตโนมัติ) ตัดแต้มตามเกณฑ์ แจ้งเตือนฝ่ายปกครองและผู้ปกครองทันที",
    timeSaved: "ลดเวลาทำบันทึกฝ่ายปกครองและสร้างความโปร่งใส 100%",
    features: [
      { title: "เอนจินบีบอัดรูปภาพ Canvas", desc: "รูปถ่ายจากกล้องมือถือ 10MB บีบอัดเหลือ 150KB โดยภาพยังคมชัด ประหยัดพื้นที่ Drive" },
      { title: "ระบบคำนวณหัก/คืนแต้มตามเกณฑ์", desc: "ตั้งเกณฑ์ความผิดลหุโทษ-อุกฤษฏ์ และระบบบันทึกทำความดีเพื่อกู้แต้มคืน" },
      { title: "หนังสือแจ้งผู้ปกครองอัตโนมัติ", desc: "ออกหนังสือแจ้งเตือนเมื่อแต้มพฤติกรรมลดลงถึงเกณฑ์ที่ต้องเชิญผู้ปกครอง" },
    ],
    faqs: [
      { q: "พื้นที่ Google Drive จะเต็มไหมเมื่อนักเรียนส่งรูปเยอะๆ?", a: "ไม่เต็มง่ายแน่นอนครับ เพราะมีโค้ด Canvas Image Compressor ย่อภาพให้เหลือขนาดเล็กจิ๋ว แต่ยังเห็นหลักฐานชัดเจนครับ" },
    ]
  },
  AONE06: {
    code: "AONE06",
    headline: "ระบบตรวจสอบคะแนนสอบวิชาดนตรี ม.4: ป้องกันการสุ่มรหัส + วงแหวน Animated Ring",
    subheadline: "ให้นักเรียนตรวจสอบผลสอบส่วนตัวอย่างปลอดภัย ไม่เห็นคะแนนเพื่อน พร้อมเอฟเฟกต์ฉลองสอบผ่าน",
    beforePain: "แปะบอร์ดคะแนนหน้าห้อง เด็กอายเพื่อน ละเมิดสิทธิ์ PDPA หรือส่งไฟล์ Excel ในกลุ่มแอบดูเกรดกัน",
    afterBenefit: "กรอกเลขประจำตัว + PIN ดูเฉพาะของตนเอง กราฟวงแหวนสวยงาม มีระบบ Rate Limiting กันเดารหัส",
    timeSaved: "ปลอดภัยตาม PDPA และประหยัดเวลาตอบแชตถามคะแนนสอบ 100%",
    features: [
      { title: "Rate Limiting ป้องกันแฮก/สุ่มเดา", desc: "กรอกรหัสผิดเกิน 3 ครั้งระบบจะหน่วงเวลาทันที ป้องกันเพื่อนแอบสุ่มดูคะแนน" },
      { title: "วงแหวน Animated Ring + Confetti", desc: "แสดงผลคะแนนเก็บ คะแนนปลายภาค เกรดเฉลี่ย และจุดพลุฉลองเมื่อสอบผ่าน" },
      { title: "คำแนะนำการพัฒนาตนเองเฉพาะบุคคล", desc: "แสดงข้อความแนะนำว่าต้องสอบแก้ตัวจุดไหน หรือได้เกรดอะไร" },
    ],
    faqs: [
      { q: "นักเรียนสามารถดูคะแนนของเพื่อนได้ไหม?", a: "ไม่ได้เด็ดขาดครับ ระบบถูกออกแบบตามหลักความเป็นส่วนตัว (PDPA) ดูได้เฉพาะรหัสของตนเองเท่านั้น" },
    ]
  },
  AONE07: {
    code: "AONE07",
    headline: "ระบบตรวจสอบคะแนนสอบวิชาดนตรี ม.3: ซิงค์รูปถ่าย นร. + Anonymous Percentile Rank",
    subheadline: "รู้ตำแหน่งของตนเองในระดับชั้น (Percentile Badge) พร้อมระบบตรวจสอบสิทธิ์สอบแก้ตัวตามเกณฑ์ 80%",
    beforePain: "นักเรียนไม่รู้ว่าตัวเองอยู่เกณฑ์ไหนของห้อง ครูต้องมานั่งตอบคำถามซ้ำๆ ว่าใครมีสิทธิ์สอบแก้ตัวบ้าง",
    afterBenefit: "ซิงค์รูปถ่าย นร. อัตโนมัติ แสดงป้าย Percentile Rank แบบไม่เปิดเผยชื่อคนอื่น และคำนวณสิทธิ์สอบแก้ทันที",
    timeSaved: "ประหยัดเวลาจัดสอบแก้ตัวและประกาศผล 100%",
    features: [
      { title: "ซิงค์รูปถ่ายจาก Google Drive ออโต้", desc: "ดึงภาพถ่ายนักเรียนตามรหัสประจำตัวมาแสดงบนบัตรผลการเรียนทันที" },
      { title: "Anonymous Percentile Rank Badge", desc: "แสดงว่านักเรียนอยู่ Top 10%, Top 25% หรือผ่านเกณฑ์ โดยไม่ละเมิดสิทธิ์เพื่อน" },
      { title: "เกณฑ์สอบแก้ตัว (Retest Ceiling)", desc: "แสดงลิงก์ข้อสอบแก้ตัวเฉพาะคนที่ได้คะแนนต่ำกว่า 80% (16 เต็ม 20) ตามระเบียบวิชาการ" },
    ],
    faqs: [
      { q: "คนที่ได้คะแนนเกิน 80% แล้วจะเห็นเมนูสอบแก้ตัวไหม?", a: "ระบบจะซ่อนเมนูสอบแก้ตัวอัตโนมัติสำหรับนักเรียนที่ผ่านเกณฑ์ 80% ตามระเบียบฝ่ายวิชาการครับ" },
    ]
  },
  AONE08: {
    code: "AONE08",
    headline: "ระบบรับส่งใบขออนุญาตผู้ปกครอง ม.3: แนบภาพถ่าย/PDF ยินยอมเข้าร่วมกิจกรรมลง Drive",
    subheadline: "แก้ปัญหาใบขออนุญาตพานักเรียนไปนอกสถานที่สูญหาย ตรวจเช็คสถานะการยินยอมแบบ Real-time",
    beforePain: "พิมพ์ใบขออนุญาตแจกเด็ก 200 คน เด็กทำหาย ผู้ปกครองเซ็นไม่ทัน รวบรวมส่ง สพม. ไม่ทันกำหนด",
    afterBenefit: "ผู้ปกครองอ่านกำหนดการผ่านมือถือ เซ็นชื่อและแนบภาพใบยินยอม ครูดาวน์โหลดเป็นเล่มหลักฐานใน 1 คลิก",
    timeSaved: "ประหยัดเวลารวบรวมและพิมพ์เอกสารขออนุญาตกว่า 20 ชั่วโมง",
    features: [
      { title: "รับส่งใบขออนุญาตดิจิทัล", desc: "แสดงรายละเอียดกิจกรรม กำหนดการ และสถานที่ พร้อมช่องทางตอบรับของผู้ปกครอง" },
      { title: "จัดเก็บไฟล์แนบเข้า Google Drive ทันที", desc: "ไฟล์ภาพถ่ายหรือ PDF หนังสือยินยอมจะถูกจัดเก็บแยกโฟลเดอร์ตามห้องเรียน" },
      { title: "แดชบอร์ดสรุปยอดการยินยอมส่งเขต", desc: "แสดงยอดจำนวนนักเรียนที่ได้รับอนุญาต และออกตารางรายชื่อส่ง สพฐ./สพม." },
    ],
    faqs: [
      { q: "ใช้กับการขออนุญาตพานักเรียนไปค้างคืนได้ไหม?", a: "ใช้ได้ครับ ครอบคลุมทั้งกรณีไป-กลับวันเดียว และกรณีพักแรมค้างคืนตามระเบียบ สพฐ." },
    ]
  },
  AONE09: {
    code: "AONE09",
    headline: "ระบบแกนนำห้องเรียนสีขาว & Auto-Report: เสกเล่มรายงาน 37 หน้า (Docs/PDF) ใน 1 คลิก!",
    subheadline: "นวัตกรรมระดับ Hero System บริหารแกนนำ 4 ฝ่าย 25 ตำแหน่ง ผังรังผึ้ง Interactive พร้อมสร้างเล่มสมบูรณ์",
    beforePain: "ครูที่ปรึกษานั่งพิมพ์ Word ทีละหน้า ตามรูปกิจกรรม 4 ฝ่ายข้ามคืน จัดหน้าเพี้ยน เสียเวลา 20-30 ชม.",
    afterBenefit: "นักเรียนกรอกข้อมูลในเว็บ 5 นาที ผังองค์กรขึ้นทันที กด 1 คลิก ระบบสร้างเล่ม Docs/PDF 37 หน้าพร้อมส่ง ผอ.",
    timeSaved: "ประหยัดเวลาครูที่ปรึกษามากกว่า 20+ ชั่วโมงต่อเทอม!",
    features: [
      { title: "ผังองค์กรแกนนำ 4 ฝ่าย Interactive", desc: "ฝ่ายการเรียน, ฝ่ายการงาน, ฝ่ายสารวัตรนักเรียน, ฝ่ายกิจกรรม พร้อมรูปและหน้าที่" },
      { title: "ระบบบันทึก 8 กิจกรรมสำคัญ", desc: "บันทึกกิจกรรมห้องเรียนสีขาว พร้อมอัปโหลดภาพกิจกรรม 4 ภาพต่อกิจกรรม" },
      { title: "เสกเล่มรายงาน 37 หน้า Google Docs & PDF", desc: "ดึงข้อมูล ผังองค์กร และภาพกิจกรรม ใส่ในเล่มเทมเพลตมาตรฐาน สพฐ. อัตโนมัติ" },
    ],
    faqs: [
      { q: "เล่มรายงาน 37 หน้า ถูกต้องตามเกณฑ์ สพฐ. ไหม?", a: "ถูกต้อง 100% ครับ โครงสร้างเล่มอ้างอิงตามคู่มือการดำเนินงานโครงการห้องเรียนสีขาวของกระทรวงศึกษาธิการ" },
      { q: "สามารถแก้ไขข้อความในเล่มรายงานได้ไหม?", a: "ได้เต็มที่ครับ ระบบสร้างออกมาเป็นไฟล์ Google Docs คุณครูสามารถปรับแต่งรูปเล่มและข้อความเพิ่มเติมได้อิสระ" },
    ]
  },
  AONE10: {
    code: "AONE10",
    headline: "ระบบฝึกจำหน้านักเรียน 3D Flashcard: จำชื่อและหน้าเด็กทั้งห้องได้แม่นยำใน 3 วัน!",
    subheadline: "สื่อนวัตกรรม Lead Magnet ยอดนิยม การ์ด 3D หมุนได้ 360 องศา พร้อมเกมทายชื่อ Speed Challenge 60 วินาที",
    beforePain: "เปิดเทอมใหม่จำชื่อเด็กไม่ได้ 2-3 สัปดาห์ เรียกชื่อผิดจนเด็กเสียความมั่นใจ ครูเสียเวลาท่องจำ",
    afterBenefit: "เล่นเกมทายชื่อผ่านการ์ด 3D Flashcard วันละ 5 นาที จำชื่อและหน้าตานักเรียนทั้งห้องได้ตั้งแต่วันแรกๆ",
    timeSaved: "จำชื่อนักเรียน 200+ คนได้เร็วขึ้น 5 เท่า สร้างความประทับใจให้เด็กๆ",
    features: [
      { title: "3D Flashcard หมุนได้ 360 องศา", desc: "การ์ดภาพนักเรียนพลิกหน้า-หลัง แสดงรูปถ่าย ชื่อเล่น ชื่อจริง และเลขประจำตัว" },
      { title: "โหมดเกม Quiz Speed Challenge 60s", desc: "เกมทายชื่อจากภาพ จับเวลา 60 วินาที ฝึกสมองและความไวของครูผู้สอน" },
      { title: "ซิงค์รายชื่อจาก Google Sheet 1 คลิก", desc: "เพียงแค่วางลิงก์รูปภาพในชีต ระบบจะเรนเดอร์เป็นการ์ด 3D ให้อัตโนมัติ" },
    ],
    faqs: [
      { q: "ระบบนี้แจกฟรีจริงไหม?", a: "แจกฟรี 100% ครับ คุณครูสามารถกดรับโค้ดและเทมเพลตไปติดตั้งบน Google Drive ตัวเองได้ทันทีโดยไม่มีค่าใช้จ่าย" },
    ]
  },
  AONE11: {
    code: "AONE11",
    headline: "ระบบจองคิวสอบปฏิบัติ & Digital Pass: จัดการคิวสอบทักษะ ออกบัตรนัดสอบดิจิทัล",
    subheadline: "บอกลาเด็กยืนออหน้าห้องสอบ แย่งคิวสอบปฏิบัติวิชาดนตรี ศิลปะ พละ หรือโครงงาน ด้วยบอร์ดคิว Real-time",
    beforePain: "นักเรียนยืนออส่งเสียงดังหน้าห้อง แย่งคิวสอบ ครูต้องคอยจัดคิวและให้คะแนนในกระดาษที่เสี่ยงตกหล่น",
    afterBenefit: "นักเรียนเลือกช่วงเวลาสอบในมือถือ ออกบัตร Digital Exam Pass แดชบอร์ดเรียกคิวสด ครูบันทึกคะแนนรูบริกส์",
    timeSaved: "ประหยัดเวลาคุมสอบและตัดปัญหาเสียงดังรบกวน 100%",
    features: [
      { title: "ระบบจองช่วงเวลาสอบปฏิบัติ", desc: "กำหนดจำนวนนักเรียนต่อรอบ เช่น รอบละ 3 คน ทุก 15 นาที ป้องกันการแออัด" },
      { title: "บัตรนัดสอบดิจิทัล (Digital Exam Pass)", desc: "แสดงลำดับคิว เวลาที่นัดสอบ และเกณฑ์รูบริกส์ที่ต้องเตรียมตัว" },
      { title: "แดชบอร์ดเรียกคิวและบันทึกคะแนน", desc: "หน้าจอสำหรับครูกดเรียกคิวถัดไป พร้อมช่องให้คะแนนรูบริกส์ซิงค์ลง Google Sheets ทันที" },
    ],
    faqs: [
      { q: "ใช้กับการสอบวิชาอื่นได้ไหม?", a: "ใช้ได้กับทุกวิชาที่มีการสอบปฏิบัติครับ เช่น วิชาคอมพิวเตอร์, ภาษาอังกฤษ (Speaking Test), พลศึกษา หรือการนำเสนอโครงงาน" },
    ]
  },
  AONE12: {
    code: "AONE12",
    headline: "ระบบเช็กชื่อเผชิญเหตุฉุกเฉิน & Active Shooter: เช็กชื่อความปลอดภัย Safe Zone ใน 1 คลิก",
    subheadline: "นวัตกรรมเพื่อความปลอดภัยสูงสุดในสถานศึกษา นับยอดนักเรียนปลอดภัยแบบ Real-time พร้อมออกรายงาน A4",
    beforePain: "เกิดเหตุเพลิงไหม้ ภัยธรรมชาติ หรือเหตุรุนแรง ไม่สามารถเช็คยอดเด็กได้ทันที ไม่รู้ว่าใครติดอยู่ในอาคาร",
    afterBenefit: "ครูประจำจุดปลอดภัยกดเช็คชื่อ 1 คลิก แดชบอร์ดศูนย์บัญชาการรู้ยอดเด็กปลอดภัยและเด็กที่ติดค้างทันที",
    timeSaved: "ช่วยชีวิตและลดเวลาประสานงานในภาวะวิกฤติตัดสินความเป็นความตาย",
    features: [
      { title: "ระบบ 1 คลิกนับยอด Safe Zone", desc: "ครูประจำชั้นหรือครูประจำจุดรวมพล กดติ๊กนักเรียนที่อยู่ในจุดปลอดภัยได้ในไม่กี่วินาที" },
      { title: "แดชบอร์ดศูนย์บัญชาการ Real-time", desc: "แสดงภาพรวมทั้งโรงเรียน จำนวนนักเรียนปลอดภัย และรายชื่อนักเรียนที่ยังไม่พบตัว" },
      { title: "ออกรายงานเหตุฉุกเฉิน A4 ทันที", desc: "สร้างรายงานสรุปพร้อมพิมพ์ส่งเจ้าหน้าที่กู้ภัย ตำรวจ หรือผู้บริหารสถานศึกษา" },
    ],
    faqs: [
      { q: "ระบบนี้แจกฟรีจริงไหม?", a: "แจกฟรี 100% ครับ เพื่อเป็นสาธารณประโยชน์และความปลอดภัยของนักเรียนและครูไทยทุกคน" },
      { q: "ใช้งานตอนไม่มีอินเทอร์เน็ตได้ไหม?", a: "ระบบมีโหมดออฟไลน์แคชชั่วคราว เมื่ออุปกรณ์เชื่อมต่อสัญญาณเน็ตจะซิงค์ข้อมูลเข้าสู่ศูนย์บัญชาการทันทีครับ" },
    ]
  },
};

interface AoneProductDetailSectionProps {
  code: string;
  title: string;
  price: string;
  cleanPrice: string;
  vipPrice: string;
  isFree: boolean;
  vipSetup: { priceText: string; tierName: string; badge: string; description: string };
  product: { id: string; title: string; price: string };
}

export function AoneProductDetailSection({
  code,
  title,
  price,
  cleanPrice,
  vipPrice,
  isFree,
  vipSetup,
  product,
}: AoneProductDetailSectionProps) {
  const { openLineModal } = useLineModal();

  const cleanCode = (code || "AONE09").toUpperCase().trim();
  const matchedKey = Object.keys(AONE_DETAILS).find((k) => cleanCode.includes(k)) || "AONE09";
  const data = AONE_DETAILS[matchedKey];
  const meta = AONE_SYSTEM_META[matchedKey] || AONE_SYSTEM_META["AONE09"];

  const lineOrderMessage = isFree
    ? `สวัสดีครับครูอ้น ขอรับระบบและโค้ดแจกฟรี:\n🎁 "[${data.code}] ${title}"\nรบกวนขอรหัสปลดล็อกและลิงก์ดาวน์โหลดด้วยครับ 🙏`
    : `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบอัตโนมัติ:\n📦 "[${data.code}] ${title}"\n💰 ราคา: ${cleanPrice} (มีออปชันครูอ้นติดตั้งให้พร้อมใช้ ${vipPrice})\nรบกวนขอเลขบัญชี / PromptPay QR Code เพื่อชำระเงินและรับไฟล์ระบบด้วยครับ 🙏`;

  const vipLineOrderMessage = `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบพร้อมบริการให้ครูอ้นติดตั้งให้ (VIP Setup):\n🛠️ "[${data.code}] ${title}"\n💰 ราคาตัวระบบ ${cleanPrice} + บริการติดตั้งพร้อมใช้ (${vipPrice})\nรบกวนขอเลขบัญชี / PromptPay QR Code ด้วยครับ 🙏`;

  const lineOrderUrl = getLineOrderUrl(lineOrderMessage);
  const vipLineOrderUrl = getLineOrderUrl(vipLineOrderMessage);

  const handleOrderClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `[${data.code}] ${title}`,
        price: cleanPrice,
        itemCode: data.code,
        message: lineOrderMessage,
      });
    }
  };

  const handleVipClick = (e: React.MouseEvent) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      openLineModal({
        title: `[${data.code}] ${title} (VIP Setup)`,
        price: `${cleanPrice} + ${vipPrice}`,
        itemCode: data.code,
        message: vipLineOrderMessage,
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-10 font-prompt">
      
      {/* ══════════════════════════════════════════════════════════
          1. ABOVE THE FOLD: 3D DVD MOCKUP & OUTCOME HEADLINE
          ══════════════════════════════════════════════════════════ */}
      <div className="glass-card p-6 md:p-10 border-white/10 rounded-3xl bg-slate-950/80 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none -mr-24 -mt-24" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left: 3D DVD Acrylic Case Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-slate-900/60 to-black/60 border border-white/10 shadow-inner">
            <DvdCaseMockup
              code={data.code}
              title={title}
              tagline={meta.tagline}
              glowColor={meta.glow}
              heroBadge={data.code === "AONE09" ? "⭐ HERO SYSTEM" : isFree ? "FREE LEAD 🎁" : "SMART APP"}
            />
            <span className="text-[11px] text-cyan-300 font-mono mt-3 flex items-center gap-1.5 opacity-80">
              <span>💿</span> คลิกที่แผ่นดิสก์เพื่อดึงเข้า/ออก
            </span>
          </div>

          {/* Right: Outcome Headline & Key Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold tracking-wider">
                [{data.code}] {meta.shortName}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                ⏱️ {data.timeSaved}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4">
              {data.headline}
            </h1>

            <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed mb-6">
              {data.subheadline}
            </p>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center mb-6">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="text-[11px] font-bold text-white">Google Drive 100%</span>
                <span className="text-[9px] text-slate-400">ข้อมูลไม่รั่วไหล</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="text-[11px] font-bold text-white">ไม่มีรายเดือน</span>
                <span className="text-[9px] text-slate-400">จ่ายครั้งเดียวตลอดชีพ</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center">
                <Sparkles className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-bold text-white">VIP Setup พร้อมใช้</span>
                <span className="text-[9px] text-slate-400">ครูอ้นติดตั้งให้</span>
              </div>
            </div>

            {/* Instant Action CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={lineOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOrderClick}
                data-line-title={`[${data.code}] ${title}`}
                data-line-price={cleanPrice}
                data-line-code={data.code}
                className={cn(
                  "w-full sm:flex-1 py-4 px-6 rounded-2xl font-prompt font-extrabold text-base transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl cursor-pointer",
                  isFree
                    ? "bg-linear-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-zinc-950 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
                    : "bg-linear-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:via-teal-200 hover:to-cyan-300 text-zinc-950 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:scale-[1.01]"
                )}
              >
                {isFree ? <Gift className="w-5 h-5 text-zinc-950" /> : <ShoppingCart className="w-5 h-5 text-zinc-950" />}
                <span>{isFree ? "รับระบบและโค้ดฟรีทาง LINE ทันที" : `สั่งซื้อรับระบบทันที ${cleanPrice} (LINE)`}</span>
                <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
              </a>

              {!isFree && (
                <a
                  href={vipLineOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleVipClick}
                  data-line-title={`[${data.code}] ${title} (VIP Setup)`}
                  data-line-price={`${cleanPrice} + ${vipPrice}`}
                  data-line-code={data.code}
                  className="w-full sm:w-auto py-4 px-5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-sm hover:scale-[1.01]"
                >
                  <span>🛠️ ครูอ้นติดตั้งให้ ({vipPrice})</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          2. BEFORE vs AFTER: THE PAIN & RELIEF COMPARISON
          ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pain: แบบเดิมที่ต้องทนเหนื่อย */}
        <div className="p-6 md:p-8 rounded-3xl bg-red-950/20 border border-red-500/30 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center gap-2 text-red-400 font-bold text-base mb-4">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>ก่อนมีระบบ (วิธีเดิมที่เหนื่อยล้า):</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {data.beforePain}
          </p>
          <div className="pt-3 border-t border-red-500/20 text-xs text-red-300/80 font-mono">
            ❌ เสียเวลา &bull; ผิดพลาดง่าย &bull; เครียดสะสม
          </div>
        </div>

        {/* Relief: แบบใหม่ด้วย iAon Tech */}
        <div className="p-6 md:p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/40 relative overflow-hidden flex flex-col justify-between shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base mb-4">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>เมื่อใช้ระบบ iAon Tech (ทางรอดแบบอัตโนมัติ):</span>
          </div>
          <p className="text-white text-sm leading-relaxed mb-4 font-medium">
            {data.afterBenefit}
          </p>
          <div className="pt-3 border-t border-emerald-500/20 text-xs text-emerald-300 font-bold font-mono">
            ✅ 1 คลิกเสร็จ &bull; สรุปผล Real-time &bull; ปลอดภัย 100%
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════
          3. VISUAL PROOF & 3 CORE CAPABILITIES
          ══════════════════════════════════════════════════════════ */}
      <div className="glass-card p-6 md:p-10 border-white/10 rounded-3xl bg-slate-950/70">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <Zap className="w-4 h-4" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          3 ฟีเจอร์ทรงพลังที่ออกแบบมาเพื่อคุณครูโดยเฉพาะ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.features.map((feat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-bold font-mono text-sm mb-3">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          4. UNBOXING: WHAT YOU GET IN THE ZIP PACKAGE
          ══════════════════════════════════════════════════════════ */}
      <div className="glass-card p-6 md:p-10 border-white/10 rounded-3xl bg-slate-950/70">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>Unboxing The Package</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
          สิ่งที่คุณครูจะได้รับในแพ็กเกจดาวน์โหลด .ZIP:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { step: "1", title: "Clean Source Code", desc: "โค้ด Google Apps Script 100% แก้ไขได้อิสระ" },
            { step: "2", title: "Sheets Database", desc: "ตารางฐานข้อมูลพร้อมสูตรและหัวคอลัมน์" },
            { step: "3", title: "Document Template", desc: "แม่แบบเอกสาร Docs/PDF ตามมาตรฐาน สพฐ." },
            { step: "4", title: "2-Min Setup Guide", desc: "คู่มือการติดตั้ง 3 สเต็ปเสร็จใน 2 นาที" },
            { step: "5", title: "Lifetime License", desc: "สิทธิ์การใช้งานตลอดชีพ ไม่จำกัดจำนวนเด็ก" },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <span className="text-cyan-400 font-mono font-bold text-sm mb-1">ITEM #{item.step}</span>
              <div className="font-bold text-white text-xs mb-1">{item.title}</div>
              <div className="text-[11px] text-slate-400 leading-tight">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          5. ELIMINATING 3 BIG FEARS (NO CODE / PRIVACY / NO FEES)
          ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-4">
            <Laptop className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-2">1. เขียนโค้ดไม่เป็น ใช้ได้ไหม?</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            ไม่ต้องแตะโค้ดแม้แต่บรรทัดเดียวครับ เพียงทำตามคู่มือ 3 ขั้นตอน หรือเลือกบริการ <strong className="text-amber-300">VIP Setup</strong> ให้ครูอ้นติดตั้งให้พร้อมใช้งานได้ทันที
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-2">2. ข้อมูลนักเรียนปลอดภัยไหม?</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            ปลอดภัย 100% ครับ ข้อมูลทั้งหมดบันทึกอยู่บน <strong className="text-cyan-300">Google Drive ของคุณครูเอง</strong> ไม่มีเซิร์ฟเวอร์คนกลางแอบเก็บข้อมูลนักเรียนเด็ดขาด
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-base mb-2">3. มีค่าบริการรายเดือนไหม?</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            ไม่มีค่าธรรมเนียมรายเดือนหรือรายปี จ่ายครั้งเดียวจบ ได้สิทธิ์ใช้งานตลอดชีพ รองรับการใช้งานของโรงเรียนได้ไม่จำกัดจำนวนห้อง
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          6. CREATOR PROFILE & AUTHORITY: ครูอ้น ญ.ว.
          ══════════════════════════════════════════════════════════ */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-cyan-950/30 to-slate-950 flex flex-col sm:flex-row items-center gap-6 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-600 p-1 shrink-0 shadow-lg">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-2xl font-bold text-cyan-300">
            ครูอ้น
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="font-bold text-lg text-white">ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/40">
              ผู้พัฒนา &bull; โรงเรียนหาดใหญ่วิทยาลัย
            </span>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
            ครูกลุ่มสาระการเรียนรู้ศิลปะ (ดนตรีสากล) โรงเรียนหาดใหญ่วิทยาลัย (ญ.ว.) ผู้พัฒนาระบบ Google Apps Script มากกว่า 59+ ระบบเพื่อทุ่นแรงคุณครูไทย
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-400 font-semibold">
            <UserCheck className="w-4 h-4" />
            <span>ครูอ้นตอบเองทุกข้อความ &bull; มีปัญหาการใช้งานปรึกษาได้ตลอดเวลา</span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          7. SMART OBJECTIONS & FAQS
          ══════════════════════════════════════════════════════════ */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border-white/10 bg-slate-950/70">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white mb-5">
          คำถามที่พบบ่อยเกี่ยวกับระบบ [{data.code}]
        </h2>

        <div className="space-y-4">
          {data.faqs.map((faq, fIdx) => (
            <div key={fIdx} className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <h4 className="text-sm font-bold text-white mb-1.5 flex items-start gap-2">
                <span className="text-cyan-400">Q:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-5">
                <span className="text-emerald-400 font-bold">A:</span> {faq.a}
              </p>
            </div>
          ))}

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <h4 className="text-sm font-bold text-white mb-1.5 flex items-start gap-2">
              <span className="text-cyan-400">Q:</span>
              <span>ใช้กับอีเมลองค์กรหรือเมลโรงเรียน (@obec.go.th / @school.ac.th) ได้ไหม?</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pl-5">
              <span className="text-emerald-400 font-bold">A:</span> ใช้ได้ทั้งอีเมลโรงเรียน (Google Workspace for Education) และอีเมล Gmail ทั่วไป 100% ครับ
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FINAL BOTTOM CTA BAR
          ══════════════════════════════════════════════════════════ */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-950 to-indigo-950 border border-cyan-500/40 text-center flex flex-col items-center justify-center gap-4 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
            พร้อมเปลี่ยนงานเอกสารให้เสร็จในคลิกเดียวแล้วหรือยัง?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            รับระบบ [{data.code}] วันนี้ ประหยัดเวลาทำงานทันที ปรึกษาและสั่งซื้อกับครูอ้นโดยตรง
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <a
            href={lineOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOrderClick}
            data-line-title={`[${data.code}] ${title}`}
            data-line-price={cleanPrice}
            data-line-code={data.code}
            className={cn(
              "w-full py-4 px-6 rounded-2xl font-prompt font-extrabold text-base transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl cursor-pointer",
              isFree
                ? "bg-linear-to-r from-emerald-400 to-teal-400 text-zinc-950 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                : "bg-linear-to-r from-cyan-400 via-teal-300 to-cyan-400 text-zinc-950 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            )}
          >
            <MessageSquare className="w-5 h-5 text-zinc-950" />
            <span>{isFree ? "รับระบบฟรีผ่าน LINE" : `สั่งซื้อทันที ${cleanPrice} (LINE)`}</span>
            <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

    </div>
  );
}
