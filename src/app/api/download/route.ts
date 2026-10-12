import { NextRequest, NextResponse } from "next/server";
import vaultPackagesData from "@/data/vault-packages.json";
import { verifyDeliverySignature } from "@/utils/delivery-links";

interface VaultPackageEntry {
  code: string;
  title: string;
  sizeBytes: number;
  zipBase64: string;
}

const vaultPackages = vaultPackagesData as Record<string, VaultPackageEntry>;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const codesCsv = (searchParams.get("codes") || "").trim().toUpperCase();
  const ref = (searchParams.get("ref") || "").trim();
  const sig = (searchParams.get("sig") || "").trim();
  const dlCode = (searchParams.get("dl") || "").trim().toUpperCase();

  // 1. Verify HMAC-SHA256 cryptographic signature
  if (!verifyDeliverySignature(codesCsv, ref, sig)) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ลิงก์ดาวน์โหลดไม่ถูกต้อง | AiAon Tech</title>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; background: #020617; color: #f8fafc; font-family: 'Prompt', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
    .card { max-width: 460px; background: rgba(15,23,42,0.9); border: 1px solid rgba(239,68,68,0.4); border-radius: 20px; padding: 28px; text-align: center; }
    .btn { display: inline-block; margin-top: 16px; padding: 12px 24px; background: #06b6d4; color: #020617; font-weight: 700; border-radius: 12px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="color:#f87171;margin-top:0;">🔒 ลิงก์นี้ต้องผ่านการตรวจสอบสลิปก่อนครับ</h2>
    <p style="color:#94a3b8;font-size:14px;line-height:1.6;">กรุณาส่งรูปสลิปโอนเงินในแชต LINE Official Account ของครูอ้น (AiAon Tech) เพื่อรับลิงก์ดาวน์โหลดส่วนบุคคลที่เข้ารหัสถูกต้องครับ</p>
    <a class="btn" href="https://line.me/R/ti/p/@deu6776s">💬 เปิดแชต LINE OA ครูอ้น</a>
  </div>
</body>
</html>`,
      {
        status: 403,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }
    );
  }

  const unlockedCodes = codesCsv
    .split(",")
    .map((c) => c.trim())
    .filter((c) => Boolean(vaultPackages[c]));

  // 2. Direct ZIP Binary Stream if ?dl=CODE is requested
  if (dlCode && unlockedCodes.includes(dlCode)) {
    const pkg = vaultPackages[dlCode];
    const zipBuffer = Buffer.from(pkg.zipBase64, "base64");
    const filename = `AiAonTech_${dlCode}_Package.zip`;

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(zipBuffer.length),
        "Cache-Control": "private, max-age=3600",
      },
    });
  }

  // 3. Render VIP Delivery Portal Page for Mobile & Desktop
  const packageCardsHtml = unlockedCodes
    .map((code) => {
      const pkg = vaultPackages[code];
      const kb = Math.max(1, Math.round(pkg.sizeBytes / 1024));
      const dlUrl = `/api/download?codes=${encodeURIComponent(
        codesCsv
      )}&ref=${encodeURIComponent(ref)}&sig=${sig}&dl=${encodeURIComponent(code)}`;

      return `
      <div class="pkg-card">
        <div class="pkg-info">
          <div class="pkg-badge">📦 รหัสระบบ: ${pkg.code} • ขนาด ${kb} KB</div>
          <div class="pkg-title">${pkg.title}</div>
          <div class="pkg-sub">ภายในไฟล์ .ZIP ประกอบด้วย: คู่มือติดตั้ง 2 นาที (.html/.md) + ตารางฐานข้อมูล (.csv) + โค้ดระบบ (Code.gs / Index.html) + ใบรับรองลิขสิทธิ์</div>
        </div>
        <a class="dl-btn" href="${dlUrl}">
          📥 ดาวน์โหลดไฟล์ชุดติดตั้ง (${pkg.code}.ZIP)
        </a>
      </div>`;
    })
    .join("");

  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ศูนย์รับมอบระบบอัตโนมัติ VIP | AiAon Tech</title>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px 16px 60px;
      background: radial-gradient(circle at top, #0f172a 0%, #020617 70%);
      color: #f8fafc;
      font-family: 'Prompt', sans-serif;
      min-height: 100vh;
    }
    .container {
      max-width: 680px;
      margin: 0 auto;
    }
    .header-box {
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 24px;
      padding: 28px 24px;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(16, 185, 129, 0.12);
      margin-bottom: 24px;
    }
    .verified-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34d399;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 22px;
      margin: 0 0 8px;
      color: #ffffff;
    }
    .ref-text {
      font-size: 13px;
      color: #94a3b8;
      margin: 0;
    }
    .pkg-card {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(6, 182, 212, 0.35);
      border-radius: 20px;
      padding: 22px;
      margin-bottom: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    }
    .pkg-badge {
      display: inline-block;
      font-size: 12px;
      font-weight: 600;
      color: #22d3ee;
      background: rgba(6, 182, 212, 0.12);
      border: 1px solid rgba(6, 182, 212, 0.3);
      padding: 3px 10px;
      border-radius: 8px;
      margin-bottom: 8px;
    }
    .pkg-title {
      font-size: 17px;
      font-weight: 700;
      color: #f8fafc;
      margin-bottom: 6px;
    }
    .pkg-sub {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .dl-btn {
      display: block;
      width: 100%;
      text-align: center;
      padding: 14px 20px;
      border-radius: 14px;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      color: #020617;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    }
    .steps-box {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 20px;
      padding: 20px 22px;
      margin-top: 24px;
      font-size: 13.5px;
      color: #cbd5e1;
      line-height: 1.7;
    }
    .steps-box h3 {
      margin: 0 0 10px;
      font-size: 15px;
      color: #38bdf8;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-box">
      <div class="verified-pill">✅ ตรวจสอบสลิปโอนเงินสำเร็จ (Verified Slip)</div>
      <h1>ศูนย์ดาวน์โหลดชุดติดตั้งระบบ AiAon Tech</h1>
      <p class="ref-text">รหัสอ้างอิงสลิป: ${ref} • สิทธิ์การใช้งานตลอดชีพ (Lifetime License)</p>
    </div>

    ${packageCardsHtml}

    <div class="steps-box">
      <h3>🚀 วิธีติดตั้งใช้งานง่ายๆ ใน 2 นาที:</h3>
      <div>1️⃣ กดปุ่มสีเขียวด้านบนเพื่อดาวน์โหลดไฟล์ <b>.ZIP</b> ลงในคอมพิวเตอร์หรือมือถือ</div>
      <div>2️⃣ แตกไฟล์ (Extract) แล้วเปิดไฟล์ชื่อ <b>01_คู่มือการติดตั้ง_อ่านจบทำตามได้ใน2นาที.html</b></div>
      <div>3️⃣ นำไฟล์ <b>.csv</b> เข้า Google Sheets และคัดลอกโค้ด <b>Code.gs / Index.html</b> ไปวางตามคู่มือได้เลยครับ!</div>
      <div style="margin-top:10px;color:#94a3b8;font-size:12.5px;">💬 หากติดปัญหาขั้นตอนไหน ทักแชต LINE หาครูอ้นได้ตลอดเวลาครับ</div>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
    },
  });
}
