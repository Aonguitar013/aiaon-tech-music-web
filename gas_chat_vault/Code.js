/**
 * =========================================================================
 * 🧠 AiAon Tech — LINE OA Chat Harvester & Golden Dataset Engine
 * โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น) — AiAon Tech (@deu6776s)
 * =========================================================================
 */

const SHEET_ALL_CHATS = "All_Chats";
const SHEET_GOLDEN = "Golden_Dataset";

function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureSheetsSetup(ss);

    const allSheet = ss.getSheetByName(SHEET_ALL_CHATS);
    const goldenSheet = ss.getSheetByName(SHEET_GOLDEN);

    const now = new Date();
    const timeFormatted = Utilities.formatDate(now, "Asia/Bangkok", "yyyy-MM-dd HH:mm:ss");

    const senderLabel =
      data.sender === "customer"
        ? "👤 ลูกค้า"
        : data.sender === "kru_aon_manual"
        ? "👑 ครูอ้น (ตอบเอง)"
        : "🤖 AI Brain (ครูอ้น)";

    // 1. บันทึกลงตาราง All_Chats
    allSheet.appendRow([
      timeFormatted,
      data.userId || "",
      data.displayName || "ลูกค้า",
      senderLabel,
      data.message || "",
      data.intent || "",
      data.status || "inquiry",
      data.product || "",
      data.amount || "",
      data.isGoldenCase ? "🏆 GOLD" : ""
    ]);

    // 2. ถ้าเป็นเคสปิดการขายสำเร็จ (สลิปผ่าน) ให้ดึงเข้าแท็บ Golden_Dataset
    if (data.isGoldenCase) {
      // ค้นหาคำถามล่าสุดของลูกค้ารายนี้จาก All_Chats
      const lastCustomerQuestion = findLastCustomerQuestion(allSheet, data.userId);

      goldenSheet.appendRow([
        timeFormatted,
        data.displayName || "ลูกค้า",
        data.product || "นวัตกรรม AiAon Tech",
        data.amount || 0,
        lastCustomerQuestion || "ลูกค้าสั่งซื้อโดยตรง",
        data.message || "ปิดการขายสำเร็จ",
        "✅ พร้อมใช้เทรน AI",
        data.userId || ""
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheetsSetup(ss);

  // รองรับการ Export ข้อมูล Golden Dataset ไปให้ AI นำไปเทรนต่อ
  if (e && e.parameter && e.parameter.action === "export_golden") {
    const goldenSheet = ss.getSheetByName(SHEET_GOLDEN);
    const rows = goldenSheet.getDataRange().getValues();
    const result = [];

    // แถวที่ 1 เป็น Header
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[0] && row[6] === "✅ พร้อมใช้เทรน AI") {
        result.push({
          date: row[0],
          customer: row[1],
          product: row[2],
          amount: row[3],
          customerQuestion: row[4],
          successfulAnswer: row[5],
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", count: result.length, goldenCases: result }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput("AiAon Tech Chat Harvester & Golden Dataset Webhook is ACTIVE! 🚀")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * ค้นหาคำถามล่าสุดของลูกค้าใน All_Chats
 */
function findLastCustomerQuestion(sheet, userId) {
  if (!userId) return "";
  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][1] === userId && data[i][3].includes("ลูกค้า")) {
      return data[i][4]; // ข้อความที่ลูกค้าเคยพิมพ์
    }
  }
  return "";
}

/**
 * สร้างหัวตารางและจัดฟอร์แมตอัตโนมัติหากยังไม่มีชีต
 */
function ensureSheetsSetup(ss) {
  let allSheet = ss.getSheetByName(SHEET_ALL_CHATS);
  if (!allSheet) {
    allSheet = ss.insertSheet(SHEET_ALL_CHATS);
    const headers = [
      "วันเวลา", "User ID", "ชื่อลูกค้า", "ผู้ส่ง", "ข้อความ", 
      "เจตนา (Intent)", "สถานะ (Status)", "สินค้าที่สนใจ", "ยอดเงิน (บาท)", "เคสทองคำ"
    ];
    allSheet.appendRow(headers);
    allSheet.getRange(1, 1, 1, headers.length)
      .setBackground("#1e293b")
      .setFontColor("#38bdf8")
      .setFontWeight("bold");
    allSheet.setFrozenRows(1);
  }

  let goldenSheet = ss.getSheetByName(SHEET_GOLDEN);
  if (!goldenSheet) {
    goldenSheet = ss.insertSheet(SHEET_GOLDEN);
    const goldenHeaders = [
      "วันที่ปิดการขาย", "ชื่อลูกค้า", "สินค้าที่ซื้อ", "ยอดเงิน (บาท)", 
      "คำถามสำคัญของลูกค้า", "คำตอบที่ทำให้โอนเงิน", "สถานะเทรน AI", "User ID"
    ];
    goldenSheet.appendRow(goldenHeaders);
    goldenSheet.getRange(1, 1, 1, goldenHeaders.length)
      .setBackground("#064e3b")
      .setFontColor("#34d399")
      .setFontWeight("bold");
    goldenSheet.setFrozenRows(1);
  }
}

function setupSheetHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheetsSetup(ss);
  Logger.log("✅ Sheet headers setup complete!");
  return "OK";
}

