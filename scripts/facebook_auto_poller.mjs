/**
 * =========================================================================
 * 🤖 AiAon Tech — Omnichannel 24/7 AI Sales Brain Auto-Polling Engine
 * เอนจินเฝ้ากล่องข้อความ Facebook Messenger & Instagram Direct ตลอด 24 ชม.
 * ตอบกลับลูกค้าทุกคนบนโลกอัตโนมัติ โดยไม่ต้องรอการอนุมัติสิทธิ์ Meta App Review!
 * =========================================================================
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGE_ID = process.env.FB_PAGE_ID || '1083641784827447';
const IG_BUSINESS_ID = process.env.IG_BUSINESS_ACCOUNT_ID || '17841425761151400';
const GRAPH_API_VERSION = 'v21.0';

const PAGE_TOKEN =
  process.env.FB_PAGE_ACCESS_TOKEN ||
  process.env.IG_ACCESS_TOKEN ||
  'EAAOPtSM4dCkBSkdfiqEuZCY4881Qc6f5z68GCoEST8jZAatIr37OtNI6cw7C5tTZB0ck3tAe2IsZBZA0yPZBQyE3SZBaAjGM8y6WG51LhegObCWirBFcRNkRVl6ESkvLbVTfoHBtUQDnZCxs4ZASD9XRUv7ZC7MqzqjAI6n05Le8TRaZB9xi8LpZC9s6GqWImpDZAZAZBHaXF3K';

const FB_WEBHOOK_URL =
  process.env.FB_WEBHOOK_URL || process.env.WEBHOOK_URL || 'https://www.aiaon.tech/api/facebook-webhook';
const IG_WEBHOOK_URL =
  process.env.IG_WEBHOOK_URL || 'https://www.aiaon.tech/api/instagram-webhook';

const POLL_INTERVAL_MS = 3500; // เช็คทุก 3.5 วินาที
const STATE_FILE = path.join(__dirname, '.poller_state.json');
const PORT = process.env.PORT || 8080;

// เก็บประวัติ ID ข้อความที่เคยประมวลผลแล้ว
let processedIds = new Set();
try {
  if (fs.existsSync(STATE_FILE)) {
    const raw = fs.readFileSync(STATE_FILE, 'utf8');
    processedIds = new Set(JSON.parse(raw));
  }
} catch {
  processedIds = new Set();
}

// สร้าง HTTP Healthcheck Endpoint สำหรับ Cloud Container (Render, Koyeb, Railway)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      status: 'active',
      service: 'AiAon Tech Omnichannel 24/7 AI Sales Brain Poller (Facebook + Instagram)',
      pageId: PAGE_ID,
      igBusinessId: IG_BUSINESS_ID,
      processedCount: processedIds.size,
      time: new Date().toISOString(),
    })
  );
});

server.listen(PORT, () => {
  console.log(`🌐 Cloud Healthcheck Server กำลังทำงานที่ Port ${PORT}`);
});

// Self-Ping Keep-Alive ป้องกัน Render Free Tier หลับ ทุกๆ 10 นาที
const KEEPALIVE_URL = process.env.RENDER_EXTERNAL_URL || 'https://aiaon-tech-music-web.onrender.com';
setInterval(() => {
  fetch(KEEPALIVE_URL)
    .then(() => console.log(`[KeepAlive] [${getThaiTime()}] ปิงตัวเองเพื่อคงสถานะตื่นตลอด 24 ชม. สำเร็จ 🟢`))
    .catch(() => {});
}, 10 * 60 * 1000);

function saveState() {
  try {
    const arr = Array.from(processedIds).slice(-500); // เก็บ 500 รายการล่าสุด
    fs.writeFileSync(STATE_FILE, JSON.stringify(arr, null, 2), 'utf8');
  } catch (err) {
    console.error('[AutoPoller] บันทึก State ล้มเหลว:', err.message);
  }
}

function getThaiTime() {
  return new Date().toLocaleTimeString('th-TH', { timeZone: 'Asia/Bangkok' });
}

let isPolling = false;

async function pollChannel({ name, platformParam, webhookUrl, defaultRecipientId }) {
  const platformQuery = platformParam ? `&platform=${platformParam}` : '';
  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/me/conversations?fields=id,snippet,updated_time,participants,messages.limit(1){id,message,from,created_time,attachments}${platformQuery}&access_token=${PAGE_TOKEN}`;

  const res = await fetch(url);
  if (!res.ok) {
    if (res.status !== 500 && res.status !== 502) {
      console.warn(`[AutoPoller] [${getThaiTime()}] ${name} Graph API เตือน status: ${res.status}`);
    }
    return;
  }

  const data = await res.json();
  const convs = data.data || [];

  for (const conv of convs) {
    const latestMsg = conv.messages?.data?.[0];
    if (!latestMsg) continue;

    const msgId = latestMsg.id;
    const senderId = latestMsg.from?.id;
    const senderName = latestMsg.from?.name || (name === 'Instagram' ? 'ลูกค้า Instagram' : 'ลูกค้า Facebook');

    // 1. ถ้าข้อความส่งมาจาก "เพจ/บัญชี IG ของเราเอง" แปลว่าตอบไปแล้ว -> ข้ามได้เลย
    if (
      senderId === PAGE_ID ||
      senderId === IG_BUSINESS_ID ||
      senderName === 'AiAon Tech' ||
      senderName === 'aiaontech'
    ) {
      continue;
    }

    // 2. ถ้าข้อความนี้เคยส่งเข้า AI ประมวลผลไปแล้ว -> ข้าม
    if (processedIds.has(msgId)) continue;

    console.log(`\n⚡ [${getThaiTime()}] [${name}] ตรวจพบข้อความใหม่จาก: ${senderName} (${senderId})`);

    // มาร์กไว้ก่อนเพื่อป้องกันการยิงซ้ำ
    processedIds.add(msgId);
    saveState();

    // สกัดข้อความและรูปภาพแนบ (สลิป/สติกเกอร์)
    let textContent = latestMsg.message?.trim();
    const attachments = [];

    if (latestMsg.attachments?.data) {
      for (const att of latestMsg.attachments.data) {
        if (att.image_data?.url) {
          attachments.push({
            type: 'image',
            payload: { url: att.image_data.url },
          });
        }
      }
    }

    // ถ้าเป็นสติกเกอร์ (ไม่มีข้อความตัวอักษรและไม่ใช่รูปสลิป)
    if (!textContent && attachments.length === 0) {
      textContent = '👍 (ส่งสติกเกอร์ทักทาย)';
    }

    console.log(`💬 ข้อความ [${name}]: "${textContent || '[รูปภาพสลิป/ไฟล์แนบ]'}"`);

    // 3. จำลอง Webhook Event ส่งเข้า Production ของ aiaon.tech
    const webhookPayload = {
      object: name === 'Instagram' ? 'instagram' : 'page',
      entry: [
        {
          id: defaultRecipientId,
          time: Date.now(),
          messaging: [
            {
              sender: { id: senderId },
              recipient: { id: defaultRecipientId },
              timestamp: new Date(latestMsg.created_time).getTime(),
              message: {
                mid: msgId,
                text: textContent,
                attachments: attachments.length > 0 ? attachments : undefined,
              },
            },
          ],
        },
      ],
    };

    try {
      const whRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
      });

      if (whRes.ok) {
        console.log(`✅ [${getThaiTime()}] [${name}] AI Sales Brain ตอบกลับและส่งเข้าแชตสำเร็จ! 🚀`);
      } else {
        console.error(`❌ [${getThaiTime()}] [${name}] Webhook ตอบกลับ code: ${whRes.status}`);
      }
    } catch (postErr) {
      console.error(`❌ [${getThaiTime()}] [${name}] ข้อผิดพลาดในการยิง Webhook:`, postErr.message);
    }
  }
}

async function pollAllChannels() {
  if (isPolling) return;
  isPolling = true;
  try {
    // 1. ตรวจกล่องข้อความ Facebook Messenger
    await pollChannel({
      name: 'Facebook',
      platformParam: null,
      webhookUrl: FB_WEBHOOK_URL,
      defaultRecipientId: PAGE_ID,
    });

    // 2. ตรวจกล่องข้อความ Instagram Direct
    await pollChannel({
      name: 'Instagram',
      platformParam: 'instagram',
      webhookUrl: IG_WEBHOOK_URL,
      defaultRecipientId: IG_BUSINESS_ID,
    });
  } catch (err) {
    console.error(`[AutoPoller] [${getThaiTime()}] Loop Exception:`, err.message);
  } finally {
    isPolling = false;
  }
}

console.log('================================================================');
console.log('🤖 AiAon Tech — Omnichannel 24/7 AI Sales Brain Auto-Poller');
console.log(`📡 ตรวจสอบกล่องข้อความ Facebook เพจ: ${PAGE_ID}`);
console.log(`📸 ตรวจสอบกล่องข้อความ Instagram: ${IG_BUSINESS_ID} (@aiaontech)`);
console.log(`⏱️ ความถี่: ตรวจสอบทุกๆ ${POLL_INTERVAL_MS / 1000} วินาที`);
console.log(`🌐 Facebook Webhook: ${FB_WEBHOOK_URL}`);
console.log(`🌐 Instagram Webhook: ${IG_WEBHOOK_URL}`);
console.log('🚀 พร้อมรับลูกค้าทั้ง Facebook + Instagram ตลอด 24 ชม. 100%!');
console.log('================================================================\n');

// รันครั้งแรกทันที
pollAllChannels();

// ลูปตรวจทุก 3.5 วินาที
setInterval(pollAllChannels, POLL_INTERVAL_MS);
