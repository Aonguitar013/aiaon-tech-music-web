/**
 * =========================================================================
 * 🧠 AiAon Tech — LINE OA Chat Harvester, Golden Dataset & Cloud State Vault
 * โดย ครูจิรวัฒน์ เดชเส้ง (ครูอ้น) — AiAon Tech (@deu6776s)
 * =========================================================================
 */

const SHEET_ALL_CHATS = "All_Chats";
const SHEET_GOLDEN = "Golden_Dataset";
const SHEET_USED_SLIPS = "Used_Slips";
const SHEET_LEADS_STATE = "Leads_State";

function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureSheetsSetup(ss);

    const now = new Date();
    const timeFormatted = Utilities.formatDate(now, "Asia/Bangkok", "yyyy-MM-dd HH:mm:ss");

    // Action 1: Upsert LeadRecord into Leads_State
    if (data.action === "upsert_lead" && data.lead && data.lead.userId) {
      const leadsSheet = ss.getSheetByName(SHEET_LEADS_STATE);
      upsertLeadRow(leadsSheet, data.lead, now.toISOString());

      if (data.usedSlipRef) {
        const slipsSheet = ss.getSheetByName(SHEET_USED_SLIPS);
        recordUsedSlipRow(slipsSheet, {
          timeFormatted: timeFormatted,
          transRef: data.usedSlipRef,
          userId: data.lead.userId,
          amount: data.lead.lastAmount || 0,
          product: data.lead.lastItem || "",
          timestamp: now.toISOString(),
        });
      }

      return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "upsert_lead" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Action 2: Record Used Slip Reference into Used_Slips
    if (data.action === "record_slip" && data.transRef) {
      const slipsSheet = ss.getSheetByName(SHEET_USED_SLIPS);
      recordUsedSlipRow(slipsSheet, {
        timeFormatted: timeFormatted,
        transRef: data.transRef,
        userId: data.userId || "",
        amount: data.amount || 0,
        product: data.product || "",
        timestamp: data.timestamp || now.toISOString(),
      });

      return ContentService.createTextOutput(JSON.stringify({ status: "success", action: "record_slip" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Default Action: Log Chat Message to All_Chats (& Golden_Dataset)
    const allSheet = ss.getSheetByName(SHEET_ALL_CHATS);
    const goldenSheet = ss.getSheetByName(SHEET_GOLDEN);

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

    // 2. ถ้าเป็นเคสปิดการขายสำเร็จ (สลิปผ่าน) ให้ดึงเข้าแท็บ Golden_Dataset และบันทึก Used_Slips
    if (data.isGoldenCase) {
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

      if (data.transRef) {
        const slipsSheet = ss.getSheetByName(SHEET_USED_SLIPS);
        recordUsedSlipRow(slipsSheet, {
          timeFormatted: timeFormatted,
          transRef: data.transRef,
          userId: data.userId || "",
          amount: data.amount || 0,
          product: data.product || "",
          timestamp: now.toISOString(),
        });
      }
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

  const action = e && e.parameter ? e.parameter.action : "";

  // 1. รองรับการ Export ข้อมูล Golden Dataset ไปให้ AI นำไปเทรนต่อ
  if (action === "export_golden") {
    const goldenSheet = ss.getSheetByName(SHEET_GOLDEN);
    const rows = goldenSheet.getDataRange().getValues();
    const result = [];

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

  // 2. รองรับการเช็กสลิปซ้ำจาก Used_Slips (?action=check_slip&ref=XXX)
  if (action === "check_slip") {
    const ref = (e.parameter.ref || "").trim();
    const slipsSheet = ss.getSheetByName(SHEET_USED_SLIPS);
    const rows = slipsSheet.getDataRange().getValues();
    let isUsed = false;

    if (ref) {
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][1] || "").trim() === ref) {
          isUsed = true;
          break;
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", ref: ref, used: isUsed }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 3. รองรับการดึงข้อมูล Leads_State และ Used_Slips ทั้งหมดให้ Vercel Hydrate ตอน Cold Start (?action=export_leads)
  if (action === "export_leads") {
    const leadsSheet = ss.getSheetByName(SHEET_LEADS_STATE);
    const leadRows = leadsSheet.getDataRange().getValues();
    const leads = [];

    for (let i = 1; i < leadRows.length; i++) {
      const jsonStr = leadRows[i][5];
      if (jsonStr) {
        try {
          leads.push(JSON.parse(String(jsonStr)));
        } catch (err) {
          // ignore malformed row
        }
      }
    }

    const slipsSheet = ss.getSheetByName(SHEET_USED_SLIPS);
    const slipRows = slipsSheet.getDataRange().getValues();
    const usedSlipRefs = [];

    for (let i = 1; i < slipRows.length; i++) {
      const refVal = String(slipRows[i][1] || "").trim();
      if (refVal) {
        usedSlipRefs.push(refVal);
      }
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        leadsCount: leads.length,
        slipsCount: usedSlipRefs.length,
        leads: leads,
        usedSlipRefs: usedSlipRefs,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput("AiAon Tech Chat Harvester & Cloud State Vault Webhook is ACTIVE! 🚀")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * บันทึกหรืออัปเดตข้อมูล LeadRecord ราย userId แบบ Upsert ลงในแท็บ Leads_State
 */
function upsertLeadRow(sheet, lead, fallbackIso) {
  const userId = String(lead.userId || "").trim();
  if (!userId) return;

  const rowValues = [
    userId,
    lead.displayName || "ลูกค้า",
    lead.status || "inquiry",
    lead.lastSeenAt || fallbackIso,
    lead.followUpCount || 0,
    JSON.stringify(lead),
  ];

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0] || "").trim() === userId) {
      sheet.getRange(i + 1, 1, 1, rowValues.length).setValues([rowValues]);
      return;
    }
  }

  sheet.appendRow(rowValues);
}

/**
 * บันทึกเลขที่อ้างอิงสลิป (transRef) ลงในแท็บ Used_Slips โดยไม่บันทึกซ้ำ
 */
function recordUsedSlipRow(sheet, item) {
  const ref = String(item.transRef || "").trim();
  if (!ref) return;

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][1] || "").trim() === ref) {
      return;
    }
  }

  sheet.appendRow([
    item.timeFormatted || "",
    ref,
    item.userId || "",
    item.amount || 0,
    item.product || "",
    item.timestamp || new Date().toISOString(),
  ]);
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

  let slipsSheet = ss.getSheetByName(SHEET_USED_SLIPS);
  if (!slipsSheet) {
    slipsSheet = ss.insertSheet(SHEET_USED_SLIPS);
    const slipHeaders = [
      "วันเวลา", "transRef", "userId", "amount", "product", "timestamp"
    ];
    slipsSheet.appendRow(slipHeaders);
    slipsSheet.getRange(1, 1, 1, slipHeaders.length)
      .setBackground("#4c0519")
      .setFontColor("#fda4af")
      .setFontWeight("bold");
    slipsSheet.setFrozenRows(1);
  }

  let leadsSheet = ss.getSheetByName(SHEET_LEADS_STATE);
  if (!leadsSheet) {
    leadsSheet = ss.insertSheet(SHEET_LEADS_STATE);
    const leadHeaders = [
      "userId", "displayName", "status", "lastSeenAt", "followUpCount", "leadJson"
    ];
    leadsSheet.appendRow(leadHeaders);
    leadsSheet.getRange(1, 1, 1, leadHeaders.length)
      .setBackground("#1e1b4b")
      .setFontColor("#c4b5fd")
      .setFontWeight("bold");
    leadsSheet.setFrozenRows(1);
  }
}

function setupSheetHeaders() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheetsSetup(ss);
  Logger.log("✅ Sheet headers setup complete!");
  return "OK";
}

