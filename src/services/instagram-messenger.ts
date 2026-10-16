/**
 * =========================================================================
 * 📸 Meta Graph API Client — Instagram Direct Messaging & Comment Automation
 * ออกแบบสำหรับเพจและบัญชี Instagram AiAon Tech โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
 * =========================================================================
 */

const GRAPH_API_VERSION = "v21.0";
const GRAPH_BASE_URL = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

export interface InstagramUserProfile {
  id: string;
  name?: string;
  username?: string;
  profile_pic?: string;
}

const DEFAULT_IG_PAGE_ACCESS_TOKEN =
  "EAAOPtSM4dCkBSrOO9AR3ZC31ZB9qwzngFrD7kTV2vJP2ZAFZCzZAfZAmfJcabvfSQ4UK4lo7ldq7BwtjT7UnUqsmVIw12dCFdTo8LPf0ZA12wpxENaggPBZAf5n5q2th2ehdFSMFSdLcBb7drzipuXiEHMvuoSY1QNuob6vz6cqSxKeI8fqKW3i5Pw83mC1gOqzzobqQwBKK1O2EJ1NOReze8mKMYaUFBZCZAxLrin6PUl";

/**
 * Get Page/Instagram Access Token from environment (shared with Facebook Page Token)
 */
export function getInstagramAccessToken(): string {
  return (
    process.env.IG_ACCESS_TOKEN ||
    process.env.INSTAGRAM_ACCESS_TOKEN ||
    process.env.FB_PAGE_ACCESS_TOKEN ||
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN ||
    DEFAULT_IG_PAGE_ACCESS_TOKEN
  );
}

/**
 * Send a Direct Message (DM) via Instagram Messaging API to an IGSID (Instagram Scoped ID)
 */
export async function sendInstagramMessage(
  recipientId: string,
  message: { text?: string; attachment?: Record<string, unknown> }
): Promise<boolean> {
  const token = getInstagramAccessToken();
  if (!token) {
    console.warn("[InstagramMessenger] No Access Token found. Skipping send.");
    return false;
  }

  try {
    const res = await fetch(`${GRAPH_BASE_URL}/me/messages?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[InstagramMessenger] sendInstagramMessage Error:", data);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[InstagramMessenger] Network exception in sendInstagramMessage:", err);
    return false;
  }
}

/**
 * Send a Private Reply directly to someone who commented on an Instagram Post or Reel
 * (Instagram Comment-to-DM Private Reply)
 */
export async function sendInstagramPrivateReply(
  commentId: string,
  text: string
): Promise<boolean> {
  const token = getInstagramAccessToken();
  if (!token) {
    console.warn("[InstagramMessenger] No Access Token set. Skipping private reply.");
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
      console.error("[InstagramMessenger] sendInstagramPrivateReply Error:", data);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[InstagramMessenger] Network exception in sendInstagramPrivateReply:", err);
    return false;
  }
}

/**
 * Post a public reply to a comment on an Instagram Post or Reel
 */
export async function sendInstagramCommentReply(
  commentId: string,
  text: string
): Promise<boolean> {
  const token = getInstagramAccessToken();
  if (!token) {
    console.warn("[InstagramMessenger] No Access Token set. Skipping comment reply.");
    return false;
  }

  try {
    const res = await fetch(`${GRAPH_BASE_URL}/${commentId}/replies?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[InstagramMessenger] sendInstagramCommentReply Error:", data);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[InstagramMessenger] Network exception in sendInstagramCommentReply:", err);
    return false;
  }
}

/**
 * Fetch Instagram User Profile (Name, Username, Profile Pic)
 */
export async function getInstagramUserProfile(igsid: string): Promise<InstagramUserProfile> {
  const token = getInstagramAccessToken();
  if (!token) {
    return { id: igsid, name: "ลูกค้า Instagram", username: "instagram_user" };
  }

  try {
    const res = await fetch(
      `${GRAPH_BASE_URL}/${igsid}?fields=name,username,profile_pic&access_token=${token}`
    );
    if (!res.ok) {
      return { id: igsid, name: "ลูกค้า Instagram", username: "instagram_user" };
    }
    const data = await res.json();
    return {
      id: igsid,
      name: data.name || data.username || "ลูกค้า Instagram",
      username: data.username,
      profile_pic: data.profile_pic,
    };
  } catch {
    return { id: igsid, name: "ลูกค้า Instagram", username: "instagram_user" };
  }
}
