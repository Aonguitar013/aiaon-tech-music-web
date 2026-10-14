"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaLine } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function getContextLineConfig(pathname: string): {
  badge: string;
  label: string;
  message: string;
} {
  if (pathname.startsWith("/ai-caretaker")) {
    return {
      badge: "AI Caretaker VIP",
      label: "จองคิวติดตั้ง AI เลขาส่วนตัว",
      message:
        "สวัสดีครับครูอ้น สนใจบริการติดตั้งระบบ AI ผู้ช่วยส่วนตัวดูแลเครื่อง 24 ชม. (AI Caretaker VIP) อยากปรึกษาสเปกคอมและแพ็กเกจที่เหมาะสมครับ 🙏",
    };
  }
  if (pathname.startsWith("/teacher-prep")) {
    return {
      badge: "AiAon Prep ครูผู้ช่วย",
      label: "สมัคร VIP ติวสอบ / รับข้อสอบ",
      message:
        "สวัสดีครับครูอ้น สนใจเข้ากลุ่มติวสอบครูผู้ช่วย Telegram VIP และคลังข้อสอบของ AiAon Prep ครับ รบกวนขอรายละเอียดการสมัครด้วยครับ 🙏",
    };
  }
  if (pathname.startsWith("/music-store") || pathname.startsWith("/music-templates")) {
    return {
      badge: "AiAon Music Studio",
      label: "สั่งซื้อเพลง / จ้างทำเพลงใหม่",
      message:
        "สวัสดีครับครูอ้น สนใจสั่งซื้อเพลงลิขสิทธิ์ (Commercial Audio) / สอบถามเรทสั่งทำเพลงประจำโรงเรียนและองค์กร (Custom Song) ครับ 🎵🙏",
    };
  }
  if (pathname.startsWith("/bundles")) {
    return {
      badge: "VIP Bundle Deals",
      label: "ปรึกษาแพ็กเกจเหมาสุดคุ้ม",
      message:
        "สวัสดีครับครูอ้น สนใจโปรโมชันมัดรวมระบบ (VIP Bundle Deals) อยากปรึกษาว่าควรเลือกแพ็กเกจไหนให้เหมาะกับโรงเรียนครับ 🙏",
    };
  }
  if (pathname.startsWith("/digital-vault")) {
    return {
      badge: "Digital Vault 20 ระบบ",
      label: "สอบถาม / สั่งซื้อระบบครู",
      message:
        "สวัสดีครับครูอ้น กำลังดูคลังระบบอัตโนมัติ (Digital Vault 20 ระบบ) อยากปรึกษาการเลือกซื้อระบบและออปชันติดตั้งพร้อมใช้ (VIP Setup) ครับ 🙏",
    };
  }
  if (pathname.startsWith("/student-vault")) {
    return {
      badge: "Student Hub คลังนักเรียน",
      label: "สั่งซื้อเว็บพอร์ต / คัมภีร์ AI",
      message:
        "สวัสดีครับครูอ้น สนใจระบบในคลังนักเรียน (เว็บพอร์ตฟอลิโอ TCAS 3D / ระบบเช็คการบ้าน / คัมภีร์ AI) รบกวนขอคำแนะนำและวิธีสั่งซื้อครับ 🙏",
    };
  }
  if (pathname.startsWith("/services")) {
    return {
      badge: "Custom Dev & Speaker",
      label: "จ้างพัฒนาระบบ / เชิญวิทยากร",
      message:
        "สวัสดีครับครูอ้น สนใจจ้างพัฒนาระบบ Web App ตามสั่ง / เชิญเป็นวิทยากรอบรม AI ให้กับหน่วยงาน รบกวนขอใบเสนอราคาและคิวว่างครับ 🙏",
    };
  }
  if (pathname.startsWith("/freebies")) {
    return {
      badge: "คลังของแจกฟรี",
      label: "ขอรหัสปลดล็อกไฟล์ฟรี",
      message:
        "สวัสดีครับครูอ้น ทักมาจากหน้าคลังของแจกฟรี (Freebies) รบกวนขอรหัสผ่านปลดล็อกและลิงก์ดาวน์โหลดโค้ดฟรีครับ 🎁🙏",
    };
  }
  if (pathname.startsWith("/channels")) {
    return {
      badge: "AiAon Channels",
      label: "ติดต่องาน / สปอนเซอร์",
      message:
        "สวัสดีครับครูอ้น ติดตามผลงานจากหน้า Channels สนใจติดต่อสอบถามเรื่องระบบดิจิทัล / งานรีวิวและวิทยากรครับ 🙏",
    };
  }

  return {
    badge: "AiAon Tech (@deu6776s)",
    label: "ปรึกษาระบบ / สอบถามฟรี",
    message:
      "สวัสดีครับครูอ้น เข้ามาชมเว็บไซต์ www.aiaon.tech สนใจปรึกษาเรื่องระบบอัตโนมัติสำหรับโรงเรียน / เพลงลิขสิทธิ์ / บริการ AI ครับ 🙏",
  };
}

export function FloatingLINEButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname() || "/";

  // Show button after a short delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const { badge, label, message } = getContextLineConfig(pathname);
  const lineHref = `https://line.me/R/oaMessage/@deu6776s/?${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group pointer-events-auto print:hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip text */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-black/85 backdrop-blur-md text-white border border-green-500/35 px-3.5 py-2 rounded-xl text-xs font-prompt shadow-[0_4px_16px_rgba(0,0,0,0.6)] select-none flex flex-col gap-0.5"
              >
                <span className="font-bold text-green-400 text-[10px] uppercase tracking-wider">
                  {badge}
                </span>
                <span>{label}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Circle Button */}
          <a
            href={lineHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#06C755] hover:bg-[#05b34c] text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_24px_rgba(6,199,85,0.45)] cursor-pointer"
          >
            {/* Pulsing ring animation */}
            <span className="absolute -inset-1.5 rounded-full bg-[#06C755] opacity-25 animate-ping pointer-events-none" />
            <span className="absolute -inset-3 rounded-full bg-[#06C755] opacity-10 animate-pulse pointer-events-none" />

            <FaLine className="w-8.5 h-8.5 text-white filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

