import { NextRequest, NextResponse } from "next/server";
import zlib from "zlib";
import vaultPackagesData from "@/data/vault-packages.json";
import ebookMusicPackagesData from "@/data/ebook-music-packages.json";
import { verifyDeliverySignature } from "@/utils/delivery-links";

interface VaultPackageEntry {
  code: string;
  title: string;
  category?: "system" | "ebook" | "music";
  sizeBytes: number;
  zipBase64: string;
  readerGzipBase64?: string;
}

const vaultPackages = vaultPackagesData as Record<string, VaultPackageEntry>;
const ebookMusicPackages = ebookMusicPackagesData as Record<string, VaultPackageEntry>;
const allPackages: Record<string, VaultPackageEntry> = {
  ...vaultPackages,
  ...ebookMusicPackages,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const codesCsv = (searchParams.get("codes") || "").trim().toUpperCase();
  const ref = (searchParams.get("ref") || "").trim();
  const sig = (searchParams.get("sig") || "").trim();
  const dlCode = (searchParams.get("dl") || "").trim().toUpperCase();
  const viewMode = (searchParams.get("view") || "").trim().toLowerCase();
  const isVipSetup = searchParams.get("vip") === "1";

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
    <a class="btn" href="https://line.me/R/ti/p/%40deu6776s">💬 เปิดแชต LINE OA ครูอ้น</a>
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
    .filter((c) => Boolean(allPackages[c]));

  // 2A. Direct Interactive A4 E-Book Reader / Print-to-PDF Stream (?dl=EBxx&view=reader)
  if (dlCode && viewMode === "reader" && unlockedCodes.includes(dlCode)) {
    const pkg = allPackages[dlCode];
    if (pkg?.readerGzipBase64) {
      const htmlBuffer = zlib.gunzipSync(Buffer.from(pkg.readerGzipBase64, "base64"));
      return new NextResponse(htmlBuffer, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "private, max-age=3600",
        },
      });
    }
  }

  // 2B. Direct ZIP Binary Stream if ?dl=CODE is requested
  if (dlCode && unlockedCodes.includes(dlCode)) {
    const pkg = allPackages[dlCode];
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

  const hasPrep = unlockedCodes.includes("PREP01");
  const hasAiCaretaker = unlockedCodes.includes("AIC01") || unlockedCodes.includes("AIC02");
  const showOnboardingBox = hasAiCaretaker || isVipSetup;

  // 3. Render Special Action Boxes (PREP01 Telegram VIP & VIP Setup / AI Caretaker Onboarding)
  const prepVipBoxHtml = hasPrep
    ? `
    <div class="special-box prep-box">
      <div class="special-badge">👑 สิทธิ์พิเศษเฉพาะสมาชิก AiAon Prep VIP Pass</div>
      <div class="special-title">เข้ากลุ่มติวสอบครูผู้ช่วย VIP & ระบบบอทติวข้อสอบ Telegram</div>
      <div class="special-desc">
        นอกจากไฟล์คลังข้อสอบและแผนอ่านหนังสือด้านล่างแล้ว ท่านได้รับสิทธิ์เข้า <b>กลุ่มติวสอบครูผู้ช่วย VIP (Telegram)</b> เพื่อฝึกทำข้อสอบเสมือนจริงและรับอัปเดตเก็งข้อสอบกฎหมายการศึกษาปี 2569 ตลอดชีพครับ
      </div>
      <a class="special-btn prep-btn" href="https://line.me/R/oaMessage/%40deu6776s/?%E0%B9%81%E0%B8%88%E0%B9%89%E0%B8%87%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%20PREP01%20(${encodeURIComponent(
        ref
      )})%20%E0%B8%82%E0%B8%AD%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A5%E0%B8%B4%E0%B8%87%E0%B8%81%E0%B9%8C%E0%B9%80%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%81%E0%B8%A5%E0%B8%B8%E0%B9%88%E0%B8%A1%20Telegram%20VIP%20%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B8%9A" target="_blank" rel="noopener noreferrer">
        🚀 กดรับลิงก์เข้ากลุ่มลับ Telegram VIP & บอทติวข้อสอบทันที
      </a>
    </div>`
    : "";

  const onboardingBoxHtml = showOnboardingBox
    ? `
    <div class="special-box vip-box">
      <div class="special-badge">🛠️ บริการติดตั้งพร้อมใช้งาน (VIP Setup / AI Caretaker Onboarding)</div>
      <div class="special-title">ส่งข้อมูลบรีฟเพื่อเริ่มติดตั้งระบบให้พร้อมใช้งาน 100%</div>
      <div class="special-desc">
        ทีมงานครูอ้นพร้อมดำเนินการเซ็ตอัประบบ ผูกฐานข้อมูล และตั้งค่าแบรนด์ให้ครบวงจร (เสร็จภายใน 24 ชม.) กรุณากดปุ่มด้านล่างเพื่อส่งข้อมูลบรีฟเบื้องต้น:
        <ul style="margin:8px 0 0;padding-left:20px;color:#e2e8f0;">
          <li>ชื่อโรงเรียน / ชื่อร้านค้า หรือหน่วยงาน และโลโก้</li>
          <li>อีเมล (Gmail) สำหรับโอนสิทธิ์เจ้าของระบบ Google Sheets / Drive</li>
          <li>ลิงก์หรือชื่อเพจ Facebook / LINE OA (กรณีติดตั้ง AI Caretaker)</li>
        </ul>
      </div>
      <a class="special-btn vip-btn" href="https://line.me/R/oaMessage/%40deu6776s/?%E0%B8%AA%E0%B9%88%E0%B8%87%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5%E0%B8%9A%E0%B8%A3%E0%B8%B5%E0%B8%9F%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B9%89%E0%B8%87%20VIP%20Setup%20%E0%B8%A3%E0%B8%AB%E0%B8%B1%E0%B8%AA%E0%B8%AA%E0%B8%A5%E0%B8%B4%E0%B8%9B%20(${encodeURIComponent(
        ref
      )})%20%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B8%AB%E0%B8%99%E0%B9%88%E0%B8%A7%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%99/%E0%B8%AD%E0%B8%B5%E0%B9%80%E0%B8%A1%E0%B8%A5%3A%20" target="_blank" rel="noopener noreferrer">
        📋 กดส่งข้อมูลบรีฟติดตั้งระบบ (VIP Setup / AI Caretaker)
      </a>
    </div>`
    : "";

  // 4. Render Package Cards for Systems, E-Books, and Music
  const packageCardsHtml = unlockedCodes
    .map((code) => {
      const pkg = allPackages[code];
      const kb = Math.max(1, Math.round(pkg.sizeBytes / 1024));
      const dlUrl = `/api/download?codes=${encodeURIComponent(
        codesCsv
      )}&ref=${encodeURIComponent(ref)}&sig=${sig}&dl=${encodeURIComponent(code)}`;
      const readerUrl = `${dlUrl}&view=reader`;

      if (pkg.category === "ebook" || /^EB\d{2}$/.test(code)) {
        return `
      <div class="pkg-card ebook-card">
        <div class="pkg-info">
          <div class="pkg-badge ebook-badge">📚 รหัส E-Book: ${pkg.code} • ขนาด ${kb} KB</div>
          <div class="pkg-title">${pkg.title}</div>
          <div class="pkg-sub">ภายในประกอบด้วย: ไฟล์ E-Book A4 ฉบับสมบูรณ์พร้อมพิมพ์ PDF (.html) + ต้นฉบับเนื้อหาและ Prompt (.md) + ปกความละเอียดสูง + ใบรับรองลิขสิทธิ์</div>
        </div>
        <div class="btn-group">
          ${
            pkg.readerGzipBase64
              ? `<a class="reader-btn" href="${readerUrl}" target="_blank" rel="noopener noreferrer">
            📖 เปิดอ่าน E-Book ออนไลน์ & พิมพ์เป็น PDF (A4)
          </a>`
              : ""
          }
          <a class="dl-btn" href="${dlUrl}">
            📥 ดาวน์โหลดชุดไฟล์ E-Book ครบชุด (${pkg.code}.ZIP)
          </a>
        </div>
      </div>`;
      }

      if (pkg.category === "music" || /^(?:MUS|BGM|CUS)-/.test(code) || /^STU-0[12]$/.test(code)) {
        return `
      <div class="pkg-card music-card">
        <div class="pkg-info">
          <div class="pkg-badge music-badge">🎵 รหัสคลังดนตรี/สตูดิโอ: ${pkg.code} • ขนาด ${kb} KB</div>
          <div class="pkg-title">${pkg.title}</div>
          <div class="pkg-sub">ภายในไฟล์ .ZIP ประกอบด้วย: พอร์ทัลดาวน์โหลดไฟล์เสียง Master WAV/MP3 + โน้ต/คอร์ด/เนื้อร้อง + ใบรับรองลิขสิทธิ์ Commercial Royalty-Free License (A4)</div>
        </div>
        <a class="dl-btn" href="${dlUrl}">
          🎵 ดาวน์โหลดแพ็กเกจเสียง & ใบอนุญาตลิขสิทธิ์ (${pkg.code}.ZIP)
        </a>
      </div>`;
      }

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
  <title>ศูนย์รับมอบสินค้าและระบบอัตโนมัติ VIP | AiAon Tech</title>
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
    .special-box {
      border-radius: 20px;
      padding: 22px;
      margin-bottom: 20px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    }
    .prep-box {
      background: linear-gradient(145deg, rgba(30, 27, 75, 0.92), rgba(15, 23, 42, 0.95));
      border: 1px solid rgba(245, 158, 11, 0.5);
    }
    .vip-box {
      background: linear-gradient(145deg, rgba(6, 78, 59, 0.45), rgba(15, 23, 42, 0.95));
      border: 1px solid rgba(16, 185, 129, 0.5);
    }
    .special-badge {
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid rgba(245, 158, 11, 0.45);
      color: #fbbf24;
      margin-bottom: 10px;
    }
    .special-title {
      font-size: 18px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .special-desc {
      font-size: 13.5px;
      color: #cbd5e1;
      line-height: 1.6;
      margin-bottom: 16px;
    }
    .special-btn {
      display: block;
      width: 100%;
      text-align: center;
      padding: 14px 20px;
      border-radius: 14px;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
    }
    .prep-btn {
      background: linear-gradient(135deg, #f59e0b 0%, #eab308 100%);
      color: #020617;
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
    }
    .vip-btn {
      background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
      color: #020617;
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    }
    .pkg-card {
      background: rgba(15, 23, 42, 0.9);
      border: 1px solid rgba(6, 182, 212, 0.35);
      border-radius: 20px;
      padding: 22px;
      margin-bottom: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    }
    .ebook-card {
      border-color: rgba(168, 85, 247, 0.4);
    }
    .music-card {
      border-color: rgba(245, 158, 11, 0.4);
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
    .ebook-badge {
      color: #c084fc;
      background: rgba(168, 85, 247, 0.14);
      border-color: rgba(168, 85, 247, 0.35);
    }
    .music-badge {
      color: #fbbf24;
      background: rgba(245, 158, 11, 0.14);
      border-color: rgba(245, 158, 11, 0.35);
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
    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .reader-btn {
      display: block;
      width: 100%;
      text-align: center;
      padding: 13px 20px;
      border-radius: 14px;
      background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
      color: #ffffff;
      font-weight: 700;
      font-size: 14.5px;
      text-decoration: none;
      box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
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
      <h1>ศูนย์รับมอบสินค้าและระบบอัตโนมัติ AiAon Tech</h1>
      <p class="ref-text">รหัสอ้างอิงสลิป: ${ref} • สิทธิ์การใช้งานตลอดชีพ (Lifetime License)</p>
    </div>

    ${prepVipBoxHtml}
    ${onboardingBoxHtml}
    ${packageCardsHtml}

    <div class="steps-box">
      <h3>🚀 คำแนะนำการใช้งานและการรับสิทธิ์อัปเดต:</h3>
      <div>1️⃣ <b>กรณีซื้อ E-Book:</b> กดปุ่มสีม่วงเพื่อเปิดอ่านและสั่งพิมพ์เป็น PDF ขนาด A4 ได้ทันที หรือกดปุ่มสีเขียวเพื่อโหลดไฟล์ .ZIP เก็บไว้ในเครื่อง</div>
      <div>2️⃣ <b>กรณีซื้อระบบ Google Apps Script / Web App:</b> แตกไฟล์ .ZIP แล้วเปิดไฟล์ <b>01_คู่มือการติดตั้ง_อ่านจบทำตามได้ใน2นาที.html</b> เพื่อทำตามทีละขั้น</div>
      <div>3️⃣ <b>กรณีซื้อคลังดนตรี / กลุ่มติวสอบ / บริการติดตั้ง VIP:</b> กดปุ่มรับสิทธิ์ด้านบน หรือทักแชต LINE หาครูอ้นได้ตลอดเวลาครับ!</div>
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
