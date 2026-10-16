/**
 * =========================================================================
 * 🤖 AiAon Tech — Facebook Messenger Auto-Polling Engine
 * เอนจินเฝ้ากล่องข้อความเพจ AiAon Tech ตลอด 24 ชม.
 * ตอบกลับลูกค้าทุกคนบนโลกอัตโนมัติ โดยไม่ต้องรอการอนุมัติสิทธิ์จาก Meta!
 * =========================================================================
 */

import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGE_ID = process.env.FB_PAGE_ID || '1083641784827447';
const GRAPH_API_VERSION = 'v21.0';
const PAGE_TOKEN =
  process.env.FB_PAGE_ACCESS_TOKEN ||
  'EAAOPtSM4dCkBSqw6ZAIAcrZBz08kDQiUpBLZAsBaC5ZAMC9xSsgM7SgJPVQMGjRQefKzCkkZCAOxF7fLO6DhMbZCW6Rit9hsM1cYaaQHBhWHIrK3gOGZAQdds9sriI9DJliD9uQyL3Ej45OHJQJp9QGZBj3Sz1bK24w4KbGepJIu74Vy6s1GBekqb6koqarZBNI6ATuSTfgZDZD';
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://www.aiaon.tech/api/facebook-webhook';
const POLL_INTERVAL_MS = 3500; // เช็คทุก 3.5 วินาที
const STATE_FILE = path.join(__dirname, '.poller_state.json');
const PORT = process.env.PORT || 8080;

// สร้าง HTTP Healthcheck Endpoint สำหรับ Cloud Container (Render, Koyeb, Railway)
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      status: 'active',
      service: 'AiAon Tech Facebook 24/7 AI Sales Brain Poller',
      pageId: PAGE_ID,
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

async function pollConversations() {
  try {
    const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/me/conversations?fields=id,snippet,updated_time,participants,messages.limit(1){id,message,from,created_time,attachments}&access_token=${PAGE_TOKEN}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[AutoPoller] [${getThaiTime()}] Graph API เตือน status: ${res.status}`);
      return;
    }

    const data = await res.json();
    const convs = data.data || [];

    for (const conv of convs) {
      const latestMsg = conv.messages?.data?.[0];
      if (!latestMsg) continue;

      const msgId = latestMsg.id;
      const senderId = latestMsg.from?.id;
      const senderName = latestMsg.from?.name || 'ลูกค้า Facebook';

      // 1. ถ้าข้อความล่าสุดส่งมาจาก "เพจของเราเอง" แปลว่าตอบไปแล้ว -> ข้ามได้เลย
      if (senderId === PAGE_ID) continue;

      // 2. ถ้าข้อความนี้เคยส่งเข้า AI ประมวลผลไปแล้ว -> ข้าม
      if (processedIds.has(msgId)) continue;

      console.log(`\n⚡ [${getThaiTime()}] ตรวจพบข้อความใหม่จาก: ${senderName} (${senderId})`);

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

      console.log(`💬 ข้อความ: "${textContent || '[รูปภาพสลิป/ไฟล์แนบ]'}"`);

      // 3. จำลอง Event ส่งเข้า Webhook Production ของ aiaon.tech
      const webhookPayload = {
        object: 'page',
        entry: [
          {
            id: PAGE_ID,
            time: Date.now(),
            messaging: [
              {
                sender: { id: senderId },
                recipient: { id: PAGE_ID },
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
        const whRes = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        });

        if (whRes.ok) {
          console.log(`✅ [${getThaiTime()}] AI Sales Brain ตอบกลับและส่งเข้าแชตสำเร็จ! 🚀`);
        } else {
          console.error(`❌ [${getThaiTime()}] Webhook ตอบกลับ code: ${whRes.status}`);
        }
      } catch (postErr) {
        console.error(`❌ [${getThaiTime()}] ข้อผิดพลาดในการยิง Webhook:`, postErr.message);
      }
    }
  } catch (err) {
    console.error(`[AutoPoller] [${getThaiTime()}] Loop Exception:`, err.message);
  }
}

console.log('================================================================');
console.log('🤖 AiAon Tech — Facebook 24/7 AI Sales Brain Auto-Poller');
console.log(`📡 ตรวจสอบกล่องข้อความเพจ: ${PAGE_ID} ทุกๆ ${POLL_INTERVAL_MS / 1000} วินาที`);
console.log(`🌐 เชื่อมต่อสมอง AI สด: ${WEBHOOK_URL}`);
console.log('🚀 พร้อมรับลูกค้าทุกคนบนโลก 100% (ไม่ต้องรออนุมัติ Meta App)');
console.log('================================================================\n');

// รันครั้งแรกทันที
pollConversations();

// ลูปตรวจทุก 3.5 วินาที
setInterval(pollConversations, POLL_INTERVAL_MS);
