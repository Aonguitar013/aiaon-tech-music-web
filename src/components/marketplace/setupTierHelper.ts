export type SetupTier = "zero-tech" | "easy-setup" | "vip-enterprise";

export interface SetupTierInfo {
  tier: SetupTier;
  label: string;
  filterLabel: string;
  badgeText: string;
  badgeStyle: string;
  glowColor: string;
  textColor: string;
  borderColor: string;
}

/**
 * 🟢 'zero-tech': พร้อมใช้ทันที ไม่ต้องแก้โค้ด ก๊อปปี้ชีตใช้ได้ทันที
 */
export const ZERO_TECH_CODES = [
  "SYS02",
  "SYS05",
  "SYS08",
  "SYS09",
  "SYS11",
  "SYS18",
  "SYS21",
  "SYS27",
  "AONE06",
  "AONE07",
  "AONE09",
  "AONA01",
  "AONA04",
  "AONM01",
  "STU02",
  "STU03",
  "STU04",
  "STU05",
  "STU06",
  "BUNDLE-STU",
  "MUS-01",
  "BGM-01",
];

/**
 * 🔴 'vip-enterprise': บริการติดตั้ง VIP / ระบบใหญ่ระดับโรงเรียน
 */
export const VIP_ENTERPRISE_CODES = [
  "SYS06",
  "SYS17",
  "SYS23",
  "SYS25",
  "SYS26",
  "SYS30",
  "AONA02",
  "AONE01",
  "AONE04",
  "AONE10",
  "AONE11",
  "AONE12",
  "SYS07",
  "AIC01",
  "AIC02",
  "PREP01",
];

/**
 * Helper to determine setup tier from id, code, or title
 */
export function getProductSetupTier(idOrCode?: string, title?: string): SetupTier {
  const combined = `${idOrCode || ""} ${title || ""}`.toUpperCase();

  // 1. Check zero-tech codes
  for (const code of ZERO_TECH_CODES) {
    if (combined.includes(code.toUpperCase())) {
      return "zero-tech";
    }
  }

  // 2. Check VIP enterprise codes
  for (const code of VIP_ENTERPRISE_CODES) {
    if (combined.includes(code.toUpperCase())) {
      return "vip-enterprise";
    }
  }

  // 3. Fallback to easy-setup
  return "easy-setup";
}

/**
 * Returns visual styling and metadata for the badge
 */
export function getSetupTierInfo(tier: SetupTier): SetupTierInfo {
  switch (tier) {
    case "zero-tech":
      return {
        tier: "zero-tech",
        label: "ก๊อปปี้ใช้ได้ทันที (Zero-Tech)",
        filterLabel: "🟢 ก๊อปปี้ใช้ได้ทันที (Zero-Tech)",
        badgeText: "🟢 พร้อมใช้ทันที (ไม่ต้องแก้โค้ด)",
        badgeStyle:
          "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.35)]",
        glowColor: "rgba(16,185,129,0.35)",
        textColor: "text-emerald-400",
        borderColor: "border-emerald-500/40",
      };
    case "vip-enterprise":
      return {
        tier: "vip-enterprise",
        label: "ระบบระดับโรงเรียน / VIP",
        filterLabel: "🔴 ระบบระดับโรงเรียน / VIP",
        badgeText: "🔴 ระบบใหญ่ / บริการติดตั้ง VIP",
        badgeStyle:
          "bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.35)]",
        glowColor: "rgba(168,85,247,0.35)",
        textColor: "text-purple-400",
        borderColor: "border-purple-500/40",
      };
    case "easy-setup":
    default:
      return {
        tier: "easy-setup",
        label: "ตั้งค่าใน 3 นาที",
        filterLabel: "🟡 ตั้งค่าใน 3 นาที",
        badgeText: "🟡 ตั้งค่าใน 3 นาที (มีเมนูไทย)",
        badgeStyle:
          "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
        glowColor: "rgba(245,158,11,0.3)",
        textColor: "text-amber-400",
        borderColor: "border-amber-500/40",
      };
  }
}
