import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Settings,
  Shield,
  Bell,
  Palette,
  KeyRound,
  Trash2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Settings | AiAon Tech",
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const sections = [
    {
      title: "บัญชีและความปลอดภัย",
      subtitle: "จัดการข้อมูลบัญชีและรหัสผ่านของคุณ",
      icon: Shield,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      items: [
        {
          label: "เปลี่ยนรหัสผ่าน",
          description: "อัปเดตรหัสผ่านสำหรับเข้าสู่ระบบ",
          href: null,
          badge: "เร็วๆ นี้",
          badgeColor: "text-white/40 bg-white/5 border-white/10",
        },
        {
          label: "อีเมลการแจ้งเตือน",
          description: user.email ?? "",
          href: null,
          badge: "ยืนยันแล้ว",
          badgeColor:
            "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        },
        {
          label: "จัดการโปรไฟล์",
          description: "แก้ไขชื่อที่แสดงผลและรูปโปรไฟล์",
          href: "/dashboard/profile",
          badge: null,
          badgeColor: "",
        },
      ],
    },
    {
      title: "การแจ้งเตือน",
      subtitle: "เลือกว่าต้องการรับการแจ้งเตือนใดบ้าง",
      icon: Bell,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      items: [
        {
          label: "แจ้งเตือนคำสั่งซื้อ",
          description: "รับอีเมลเมื่อคำสั่งซื้อได้รับการอนุมัติ",
          href: null,
          badge: "เร็วๆ นี้",
          badgeColor: "text-white/40 bg-white/5 border-white/10",
        },
        {
          label: "แจ้งเตือนคอร์สใหม่",
          description: "รับข่าวสารเมื่อมีคอร์สหรือสินค้าใหม่",
          href: null,
          badge: "เร็วๆ นี้",
          badgeColor: "text-white/40 bg-white/5 border-white/10",
        },
      ],
    },
    {
      title: "การแสดงผล",
      subtitle: "ปรับแต่งหน้าตาและภาษาของแพลตฟอร์ม",
      icon: Palette,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      items: [
        {
          label: "ธีมสี",
          description: "Dark Mode (ค่าเริ่มต้น)",
          href: null,
          badge: "Dark Mode",
          badgeColor: "text-white/60 bg-white/5 border-white/10",
        },
        {
          label: "ภาษา",
          description: "ภาษาที่ใช้แสดงผลในระบบ",
          href: null,
          badge: "ภาษาไทย",
          badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        },
      ],
    },
    {
      title: "ความปลอดภัยขั้นสูง",
      subtitle: "ตัวเลือกความปลอดภัยเพิ่มเติมสำหรับบัญชีของคุณ",
      icon: KeyRound,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      items: [
        {
          label: "Session ที่ใช้งานอยู่",
          description: "ดูและจัดการ Session การเข้าสู่ระบบทั้งหมด",
          href: null,
          badge: "เร็วๆ นี้",
          badgeColor: "text-white/40 bg-white/5 border-white/10",
        },
        {
          label: "Two-Factor Authentication (2FA)",
          description: "เพิ่มความปลอดภัยขั้นสูงด้วยการยืนยันตัวตน 2 ชั้น",
          href: null,
          badge: "เร็วๆ นี้",
          badgeColor: "text-white/40 bg-white/5 border-white/10",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto pb-20">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Settings className="w-6 h-6 text-blue-400" />
          </div>
          <h1 className="font-prompt text-3xl md:text-4xl font-bold text-white">
            ตั้งค่าระบบ (Settings)
          </h1>
        </div>
        <p className="text-white/60 font-prompt ml-[60px]">
          จัดการบัญชี ความปลอดภัย และการแสดงผลของแพลตฟอร์ม
        </p>
      </div>

      {/* Account Info Banner */}
      <div className="glass-card p-5 border-blue-500/15 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold uppercase text-lg shrink-0">
          {user.email?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/50 font-prompt">บัญชีที่ใช้งานอยู่</p>
          <p className="text-white font-prompt font-medium truncate">
            {user.email}
          </p>
          <p className="text-xs text-white/30 font-prompt">
            ID: {user.id.slice(0, 16)}...
          </p>
        </div>
        <Link
          href="/dashboard/profile"
          className="shrink-0 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white font-prompt text-sm transition-all flex items-center gap-1.5"
        >
          แก้ไข <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Setting Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="glass-card border-white/10 overflow-hidden">
            {/* Section Header */}
            <div className={`px-6 py-4 border-b border-white/10 flex items-center gap-3`}>
              <div
                className={`w-9 h-9 rounded-lg ${section.bg} border ${section.border} flex items-center justify-center shrink-0`}
              >
                <section.icon className={`w-4 h-4 ${section.color}`} />
              </div>
              <div>
                <h2 className="font-prompt font-bold text-white text-base">
                  {section.title}
                </h2>
                <p className="text-xs text-white/40 font-prompt">
                  {section.subtitle}
                </p>
              </div>
            </div>

            {/* Section Items */}
            <div className="divide-y divide-white/5">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="px-6 py-4 flex items-center justify-between gap-4 group hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-prompt font-medium text-white/90 text-sm">
                      {item.label}
                    </p>
                    <p className="text-xs text-white/40 font-prompt mt-0.5 truncate">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {item.badge && (
                      <span
                        className={`text-[11px] font-prompt px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="mt-8 glass-card border-red-500/20 bg-red-500/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-500/15 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Trash2 className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h2 className="font-prompt font-bold text-red-400 text-base">
              Danger Zone
            </h2>
            <p className="text-xs text-white/40 font-prompt">
              การกระทำเหล่านี้ไม่สามารถย้อนกลับได้
            </p>
          </div>
        </div>
        <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-prompt font-medium text-white/80 text-sm">
              ลบบัญชีผู้ใช้
            </p>
            <p className="text-xs text-white/40 font-prompt mt-0.5">
              ลบบัญชีและข้อมูลทั้งหมดของคุณออกจากระบบอย่างถาวร
            </p>
          </div>
          <button
            disabled
            className="shrink-0 px-5 py-2 rounded-lg border border-red-500/30 text-red-400/50 font-prompt text-sm cursor-not-allowed opacity-50 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> ลบบัญชี
          </button>
        </div>
      </div>

      <p className="text-center text-white/20 font-prompt text-xs mt-10" suppressHydrationWarning>
        AiAon Tech Ecosystem · v0.1.0 · © {new Date().getFullYear()}
      </p>
    </div>
  );
}
