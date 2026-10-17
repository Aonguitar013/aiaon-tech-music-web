/**
 * Master LINE Official Account Utilities for AiAon Tech
 * Single Source of Truth for LINE IDs, URLs, and Click-to-Chat Orders
 */

export const LINE_OA_ID = "@deu6776s";
export const LINE_OA_ENCODED_ID = "%40deu6776s";
export const LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/%40deu6776s";
export const LINE_SHORTLINK = "https://lin.ee/poMESoP";

/**
 * Builds the official LINE click-to-chat URL with pre-filled message.
 * Must use %40deu6776s (percent-encoded @) so mobile browsers and LINE app
 * parse the account ID correctly without "ไม่สามารถเพิ่มเพื่อนได้" error.
 */
export function getLineOrderUrl(message: string): string {
  return `https://line.me/R/oaMessage/${LINE_OA_ENCODED_ID}/?${encodeURIComponent(message)}`;
}

/**
 * Builds the standard purchase message for Teacher & School Systems (AONE/AONA/AONM)
 * Exactly matching Image 2 standard:
 *
 * สวัสดีครับครูอ้น สนใจสั่งซื้อระบบอัตโนมัติ:
 * 📦 "[AONE01] ระบบเช็คชื่อและพฤติกรรมนักเรียน ม.3 V2"
 * 💰 ราคา: 490 ฿ (มีออปชันครูอ้นติดตั้งให้พร้อมใช้ +350 ฿)
 * รบกวนขอเลขบัญชี / PromptPay QR Code เพื่อชำระเงินและรับไฟล์ระบบด้วยครับ 🙏
 */
export function buildSystemOrderMessage(params: {
  title: string;
  code?: string;
  price: string;
  vipPrice?: string;
  isFree?: boolean;
}): string {
  const codePrefix = params.code && !params.title.includes(params.code) ? `[${params.code}] ` : "";
  const fullTitle = `${codePrefix}${params.title}`.trim();

  if (params.isFree) {
    return `สวัสดีครับครูอ้น ขอรับระบบและโค้ดแจกฟรี:\n🎁 "${fullTitle}"\nรบกวนขอรหัสปลดล็อกและลิงก์ดาวน์โหลดด้วยครับ 🙏`;
  }

  const vipText = params.vipPrice ? ` (มีออปชันครูอ้นติดตั้งให้พร้อมใช้ ${params.vipPrice})` : "";
  return `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบอัตโนมัติ:\n📦 "${fullTitle}"\n💰 ราคา: ${params.price}${vipText}\nรบกวนขอเลขบัญชี / PromptPay QR Code เพื่อชำระเงินและรับไฟล์ระบบด้วยครับ 🙏`;
}

/**
 * Builds VIP Setup order message
 */
export function buildVipSetupOrderMessage(params: {
  title: string;
  code?: string;
  price: string;
  vipPrice: string;
}): string {
  const codePrefix = params.code && !params.title.includes(params.code) ? `[${params.code}] ` : "";
  const fullTitle = `${codePrefix}${params.title}`.trim();

  return `สวัสดีครับครูอ้น สนใจสั่งซื้อระบบพร้อมบริการให้ครูอ้นติดตั้งให้ (VIP Setup):\n🛠️ "${fullTitle}"\n💰 ราคาตัวระบบ ${params.price} + บริการติดตั้งพร้อมใช้ (${params.vipPrice})\nรบกวนขอเลขบัญชี / PromptPay QR Code ด้วยครับ 🙏`;
}
