/**
 * =========================================================================
 * 🔑 YouTube OAuth 2.0 Permanent Token Generator (1-Click Setup)
 * เครื่องมือเชื่อมต่อบัญชี YouTube ช่อง "iAon Tech" เพื่อรับ Refresh Token ถาวร
 * =========================================================================
 */

import http from 'http';
import { exec } from 'child_process';
import readline from 'readline';

const REDIRECT_PORT = 8888;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/oauth2callback`;
const SCOPES = [
  'https://www.googleapis.com/auth/youtube.force-ssl',
  'https://www.googleapis.com/auth/youtube.readonly',
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function main() {
  console.clear();
  console.log('================================================================');
  console.log('🔴 AiAon Tech — YouTube OAuth 2.0 Permanent Token Generator');
  console.log('================================================================\n');

  let clientId = process.env.YOUTUBE_CLIENT_ID;
  let clientSecret = process.env.YOUTUBE_CLIENT_SECRET;

  if (!clientId) {
    console.log('📌 ขั้นตอนเตรียมการ:');
    console.log('1. ไปที่ Google Cloud Console: https://console.cloud.google.com/apis/credentials');
    console.log('2. เลือกโปรเจกต์ของคุณ -> เมนู "Credentials" (ข้อมูลรับรอง)');
    console.log('3. กด "Create Credentials" -> "OAuth client ID" -> เลือก "Web application"');
    console.log(`4. ในช่อง "Authorized redirect URIs" ใส่ลิงก์: ${REDIRECT_URI}\n`);
    clientId = await question('👉 วาง OAuth Client ID ของคุณที่นี่: ');
  }

  if (!clientSecret) {
    clientSecret = await question('👉 วาง OAuth Client Secret ของคุณที่นี่: ');
  }

  clientId = clientId.trim();
  clientSecret = clientSecret.trim();

  if (!clientId || !clientSecret) {
    console.error('❌ ข้อมูลไม่ครบถ้วน กรุณาลองใหม่อีกครั้ง');
    process.exit(1);
  }

  // สร้าง Server ชั่วคราวรอรับ Code จาก Google OAuth
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);

    if (url.pathname === '/oauth2callback') {
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h2>❌ เกิดข้อผิดพลาดจาก Google: ${error}</h2>`);
        console.error('❌ Google Error:', error);
        return;
      }

      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h2>❌ ไม่พบรหัส Authorization Code</h2>`);
        return;
      }

      try {
        // แลก Code เป็น Refresh Token ถาวร
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
          }),
        });

        const tokenData = await tokenRes.json();

        if (!tokenRes.ok) {
          throw new Error(tokenData.error_description || tokenData.error || 'Token exchange failed');
        }

        const refreshToken = tokenData.refresh_token;

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
          <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #10B981;">🎉 เชื่อมต่อ YouTube สำเร็จ 100%!</h1>
            <p>ระบบได้รับ Permanent Refresh Token เรียบร้อยแล้ว</p>
            <p style="color: #6B7280;">คุณสามารถปิดหน้าต่างเบราว์เซอร์นี้ และกลับไปดูที่หน้าจอดำ (Terminal) ได้เลยครับ</p>
          </div>
        `);

        console.log('\n================================================================');
        console.log('🎉 ยินดีด้วยครับ! แลกรับ Permanent Refresh Token สำเร็จแล้ว!');
        console.log('================================================================');
        console.log('\n📋 คัดลอกค่าเหล่านี้ไปวางใน .env.local และ Render Environment Variables:\n');
        console.log(`YOUTUBE_CLIENT_ID=${clientId}`);
        console.log(`YOUTUBE_CLIENT_SECRET=${clientSecret}`);
        console.log(`YOUTUBE_REFRESH_TOKEN=${refreshToken}`);
        console.log(`YOUTUBE_CHANNEL_ID=UCGodApXmVP-_BicC4xHhc-Q\n`);
        console.log('================================================================\n');

        setTimeout(() => {
          server.close();
          process.exit(0);
        }, 1500);
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h2>❌ แลก Token ไม่สำเร็จ: ${err.message}</h2>`);
        console.error('❌ Token Exchange Exception:', err.message);
      }
    }
  });

  server.listen(REDIRECT_PORT, () => {
    const authUrl =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      new URLSearchParams({
        client_id: clientId,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: SCOPES.join(' '),
        access_type: 'offline',
        prompt: 'consent',
      }).toString();

    console.log(`🌐 กำลังเปิดเบราว์เซอร์ไปที่ Google Login...`);
    console.log(`🔗 หากเบราว์เซอร์ไม่เปิดอัตโนมัติ ให้คลิกลิงก์นี้:\n${authUrl}\n`);

    // สั่งเปิดเบราว์เซอร์บน Windows
    exec(`start "" "${authUrl}"`);
  });
}

main().catch((err) => {
  console.error('Exception:', err);
  process.exit(1);
});
