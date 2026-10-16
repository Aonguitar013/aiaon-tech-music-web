/**
 * =========================================================================
 * 🎵 TikTok Commercial & Direct Messaging API Client — 24/7 AI Sales Brain
 * ออกแบบสำหรับช่อง TikTok "iAonTech" (@iaontech) โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
 * รองรับทั้ง Native TikTok Business API และ ManyChat / Webhook Bridge
 * =========================================================================
 */

const TIKTOK_OPEN_API_BASE = "https://open.tiktokapis.com/v2";

export interface TikTokUserProfile {
  openId: string;
  unionId?: string;
  avatarUrl?: string;
  displayName: string;
}

export function getTikTokClientKey(): string {
  return process.env.TIKTOK_CLIENT_KEY || "";
}

export function getTikTokClientSecret(): string {
  return process.env.TIKTOK_CLIENT_SECRET || "";
}

export function getTikTokAccessToken(): string {
  return process.env.TIKTOK_ACCESS_TOKEN || "";
}

/**
 * Send a Direct Message (DM) to a TikTok user (via Official API or ManyChat Bridge)
 */
export async function sendTikTokMessage(
  openId: string,
  message: { text: string; imageUrl?: string }
): Promise<{ success: boolean; error?: string }> {
  const token = getTikTokAccessToken();

  // If token is configured, use native TikTok Direct Messaging API
  if (token) {
    try {
      const res = await fetch(`${TIKTOK_OPEN_API_BASE}/im/messages/send/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_open_id: openId,
          message_type: message.imageUrl ? "image" : "text",
          content: message.imageUrl
            ? JSON.stringify({ image_url: message.imageUrl })
            : JSON.stringify({ text: message.text }),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error?.code !== "ok") {
        console.error("[TikTokService] Native send message error:", data);
        return { success: false, error: data.error?.message || `HTTP ${res.status}` };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[TikTokService] Native send exception:", msg);
      return { success: false, error: msg };
    }
  }

  // Fallback / Webhook Bridge mode (Responses returned directly in HTTP response payload)
  return { success: true };
}

/**
 * Reply to a comment on a TikTok video
 */
export async function replyToTikTokComment(
  commentId: string,
  videoId: string,
  replyText: string
): Promise<{ success: boolean; error?: string }> {
  const token = getTikTokAccessToken();

  if (token) {
    try {
      const res = await fetch(`${TIKTOK_OPEN_API_BASE}/video/comment/reply/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_id: videoId,
          comment_id: commentId,
          text: replyText,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error?.code !== "ok") {
        console.error("[TikTokService] Reply to comment error:", data);
        return { success: false, error: data.error?.message || `HTTP ${res.status}` };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[TikTokService] Reply to comment exception:", msg);
      return { success: false, error: msg };
    }
  }

  // Fallback mode
  return { success: true };
}
