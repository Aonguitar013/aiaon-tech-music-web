/**
 * =========================================================================
 * 🔴 Google YouTube Data API v3 Client — 24/7 AI Sales Brain & Comment Automation
 * ออกแบบสำหรับช่อง YouTube "iAon Tech" (@aiaontech) โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น)
 * Channel ID: UCGodApXmVP-_BicC4xHhc-Q
 * =========================================================================
 */

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
export const DEFAULT_YOUTUBE_CHANNEL_ID = "UCGodApXmVP-_BicC4xHhc-Q";

export interface YouTubeCommentItem {
  threadId: string;
  commentId: string;
  videoId?: string;
  authorDisplayName: string;
  authorChannelId?: string;
  authorProfileImageUrl?: string;
  textDisplay: string;
  textOriginal: string;
  publishedAt: string;
  updatedAt: string;
  likeCount: number;
  totalReplyCount: number;
}

export interface YouTubeReplyResult {
  success: boolean;
  commentId?: string;
  error?: string;
}

// In-memory token cache to avoid spamming Google OAuth
let cachedAccessToken = "";
let tokenExpiresAt = 0;

export function getYoutubeClientId(): string {
  return process.env.YOUTUBE_CLIENT_ID || "";
}

export function getYoutubeClientSecret(): string {
  return process.env.YOUTUBE_CLIENT_SECRET || "";
}

export function getYoutubeRefreshToken(): string {
  return process.env.YOUTUBE_REFRESH_TOKEN || "";
}

export function getYoutubeApiKey(): string {
  return (
    process.env.YOUTUBE_API_KEY ||
    process.env.GEMINI_API_KEY ||
    ""
  );
}

export function getYoutubeChannelId(): string {
  return process.env.YOUTUBE_CHANNEL_ID || DEFAULT_YOUTUBE_CHANNEL_ID;
}

/**
 * Exchange refresh_token for a fresh access_token via Google OAuth 2.0
 */
export async function getFreshYoutubeAccessToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  const clientId = getYoutubeClientId();
  const clientSecret = getYoutubeClientSecret();
  const refreshToken = getYoutubeRefreshToken();

  if (!refreshToken || !clientId || !clientSecret) {
    return null;
  }

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error("[YouTubeService] Token Refresh Error:", res.status, errData);
      return null;
    }

    const data = await res.json();
    cachedAccessToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in || 3600) * 1000;
    return cachedAccessToken;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[YouTubeService] Token Refresh Exception:", msg);
    return null;
  }
}

/**
 * Check if the comment was posted by the channel owner (Kru Aon / AiAon)
 */
export function isChannelOwnerComment(
  authorChannelId?: string,
  authorDisplayName?: string
): boolean {
  const ownerChannelId = getYoutubeChannelId();
  if (authorChannelId && authorChannelId === ownerChannelId) {
    return true;
  }
  const name = (authorDisplayName || "").toLowerCase();
  return (
    name.includes("aiaon") ||
    name.includes("iaon") ||
    name.includes("ครูอ้น") ||
    name.includes("จิรวัฒน์")
  );
}

/**
 * Get recent top-level comment threads on the channel (videos + shorts)
 */
export async function getRecentChannelComments(options?: {
  channelId?: string;
  maxResults?: number;
}): Promise<YouTubeCommentItem[]> {
  const channelId = options?.channelId || getYoutubeChannelId();
  const maxResults = Math.min(options?.maxResults || 20, 50);

  const accessToken = await getFreshYoutubeAccessToken();
  const apiKey = getYoutubeApiKey();

  // Prefer Bearer Token if available, otherwise use API Key for public comments
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const queryParams = new URLSearchParams({
    part: "snippet",
    allThreadsRelatedToChannelId: channelId,
    order: "time",
    maxResults: String(maxResults),
  });

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  } else if (apiKey) {
    queryParams.append("key", apiKey);
  } else {
    console.warn("[YouTubeService] Neither OAuth Refresh Token nor API Key configured. Cannot list comments.");
    return [];
  }

  try {
    const url = `${YOUTUBE_API_BASE}/commentThreads?${queryParams.toString()}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[YouTubeService] getRecentChannelComments API error:", res.status, err);
      return [];
    }

    const data = await res.json();
    const items = data.items || [];

    const parsedComments: YouTubeCommentItem[] = [];
    for (const item of items) {
      const topLevel = item.snippet?.topLevelComment?.snippet;
      if (!topLevel) continue;

      parsedComments.push({
        threadId: item.id,
        commentId: item.snippet.topLevelComment.id,
        videoId: item.snippet.videoId,
        authorDisplayName: topLevel.authorDisplayName || "ผู้ชม YouTube",
        authorChannelId: topLevel.authorChannelId?.value,
        authorProfileImageUrl: topLevel.authorProfileImageUrl,
        textDisplay: topLevel.textDisplay || "",
        textOriginal: topLevel.textOriginal || "",
        publishedAt: topLevel.publishedAt || new Date().toISOString(),
        updatedAt: topLevel.updatedAt || new Date().toISOString(),
        likeCount: topLevel.likeCount || 0,
        totalReplyCount: item.snippet.totalReplyCount || 0,
      });
    }

    return parsedComments;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[YouTubeService] getRecentChannelComments Exception:", msg);
    return [];
  }
}

/**
 * Post a reply to a YouTube comment
 */
export async function replyToYouTubeComment(
  parentId: string,
  replyText: string
): Promise<YouTubeReplyResult> {
  const accessToken = await getFreshYoutubeAccessToken();
  if (!accessToken) {
    return {
      success: false,
      error: "Missing or invalid OAuth access token (YOUTUBE_REFRESH_TOKEN required)",
    };
  }

  try {
    const res = await fetch(`${YOUTUBE_API_BASE}/comments?part=snippet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet: {
          parentId,
          textOriginal: replyText,
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[YouTubeService] replyToYouTubeComment Error:", res.status, data);
      return {
        success: false,
        error: data.error?.message || `HTTP ${res.status}`,
      };
    }

    return {
      success: true,
      commentId: data.id,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[YouTubeService] replyToYouTubeComment Exception:", msg);
    return {
      success: false,
      error: msg,
    };
  }
}
