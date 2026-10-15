/**
 * =========================================================================
 * 📘 Meta Graph API Client — Facebook Messenger & Comment Automation
 * ออกแบบสำหรับเพจ AiAon Tech & ร้านค้า SME โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
 * =========================================================================
 */

const GRAPH_API_VERSION = "v21.0";
const GRAPH_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

export interface FacebookUserProfile {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
}

/**
 * Get Page Access Token from environment
 */
export function getFacebookPageAccessToken(): string {
  return (
    process.env.FB_PAGE_ACCESS_TOKEN ||
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    ""
  );
}

/**
 * Send a message via Facebook Messenger to a user (PSID)
 */
export async function sendFacebookMessage(
  recipientId: string,
  message: { text?: string; attachment?: Record<string, unknown> }
): Promise<boolean> {
  const token = getFacebookPageAccessToken();
  if (!token) {
    console.warn("[FacebookMessenger] No FB_PAGE_ACCESS_TOKEN set. Skipping send.");
    return false;
  }

  try {
    const res = await fetch(`${GRAPH_BASE_URL}/me/messages?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        messaging_type: "RESPONSE",
        message,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[FacebookMessenger] sendFacebookMessage Error:", data);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[FacebookMessenger] Network exception in sendFacebookMessage:", err);
    return false;
  }
}

/**
 * Send a Private Reply directly to someone who commented on a Facebook Page Post
 * (Comment-to-Inbox Private Reply)
 */
export async function sendFacebookPrivateReply(
  commentId: string,
  text: string
): Promise<boolean> {
  const token = getFacebookPageAccessToken();
  if (!token) {
    console.warn("[FacebookMessenger] No FB_PAGE_ACCESS_TOKEN set. Skipping private reply.");
    return false;
  }

  try {
    const res = await fetch(`${GRAPH_BASE_URL}/me/messages?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { comment_id: commentId },
        message: { text },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[FacebookMessenger] sendFacebookPrivateReply Error:", data);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[FacebookMessenger] Network exception in sendFacebookPrivateReply:", err);
    return false;
  }
}

/**
 * Post a public reply to a comment on a Page post
 */
export async function sendFacebookCommentReply(
  commentId: string,
  text: string
): Promise<boolean> {
  const token = getFacebookPageAccessToken();
  if (!token) {
    console.warn("[FacebookMessenger] No FB_PAGE_ACCESS_TOKEN set. Skipping comment reply.");
    return false;
  }

  try {
    const res = await fetch(`${GRAPH_BASE_URL}/${commentId}/comments?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[FacebookMessenger] sendFacebookCommentReply Error:", data);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[FacebookMessenger] Network exception in sendFacebookCommentReply:", err);
    return false;
  }
}

/**
 * Fetch Facebook User Profile (First Name, Last Name, Name)
 */
export async function getFacebookUserProfile(psid: string): Promise<FacebookUserProfile> {
  const token = getFacebookPageAccessToken();
  if (!token) {
    return { id: psid, name: "ลูกค้า Facebook" };
  }

  try {
    const res = await fetch(
      `${GRAPH_BASE_URL}/${psid}?fields=first_name,last_name,name,profile_pic&access_token=${token}`
    );
    if (!res.ok) {
      return { id: psid, name: "ลูกค้า Facebook" };
    }
    const data = await res.json();
    return {
      id: psid,
      name: data.name || `${data.first_name || ""} ${data.last_name || ""}`.trim() || "ลูกค้า Facebook",
      first_name: data.first_name,
      last_name: data.last_name,
      profile_pic: data.profile_pic,
    };
  } catch {
    return { id: psid, name: "ลูกค้า Facebook" };
  }
}
