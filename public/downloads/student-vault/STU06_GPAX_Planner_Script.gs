/**
 * ==============================================================================
 * 🎓 [STU06] iAon Student GPAX Planner & Homework Tracker Engine
 * ==============================================================================
 * พัฒนาโดย: ครูจิรวัฒน์ เดชเส้ง (ครูอ้น iAon Tech)
 * เว็บไซต์: https://www.aiaon.tech | สโลแกน: ไอทีง่ายๆ สไตล์ไอ้อ้น
 * ลิขสิทธิ์: iAon Tech Student Vault (พร้อมใช้งาน 100% Zero-Tech)
 * 
 * ฟีเจอร์หลัก:
 * 1. เมนูภาษาไทย "🎓 เมนูวัยเรียน iAon" บนแถบเครื่องมือ Google Sheets
 * 2. กดปุ่มเดียวสร้าง Sheet "คำนวณเป้าเกรด GPAX" (ม.ปลาย 6 เทอม / มหาลัย 8 เทอม)
 * 3. สูตรคำนวณ Target GPAX: คำนวณว่าเทอมที่เหลือต้องทำให้ได้เกรดเฉลี่ยเท่าไหร่ถึงจะถึงเป้าหมาย
 * 4. กดปุ่มเดียวสร้าง Sheet "เช็กสถานะงานค้าง & การบ้าน" พร้อมแถบสีไฮไลต์อัตโนมัติ
 * ==============================================================================
 */

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🎓 เมนูวัยเรียน iAon')
    .addItem('📊 1. สร้างตารางคำนวณ GPAX & เกรดเป้าหมาย', 'setupGpaxPlannerSheet')
    .addItem('📝 2. สร้างตารางเช็กการบ้าน & งานค้าง', 'setupHomeworkTrackerSheet')
    .addSeparator()
    .addItem('ℹ️ เกี่ยวกับระบบ / ติดต่อครูอ้น', 'showAboutDialog')
    .addToUi();
}

/**
 * ฟังก์ชันสร้างแผ่นงานคำนวณ GPAX พร้อมสูตรและสีสัน Cyberpunk Slate
 */
function setupGpaxPlannerSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('คำนวณเป้าเกรด_GPAX');
  
  if (sheet) {
    const resp = SpreadsheetApp.getUi().alert(
      '⚠️ พบแผ่นงานเดิมอยู่แล้ว',
      'มีแผ่นงาน "คำนวณเป้าเกรด_GPAX" อยู่แล้ว ต้องการสร้างทับใหม่หรือไม่?',
      SpreadsheetApp.getUi().ButtonSet.YES_NO
    );
    if (resp !== SpreadsheetApp.getUi().Button.YES) return;
    ss.deleteSheet(sheet);
  }
  
  sheet = ss.insertSheet('คำนวณเป้าเกรด_GPAX');
  sheet.setTabColor('#00F2FE');
  sheet.showGridlines(true);

  // 1. หัวเรื่องใหญ่ (Header)
  sheet.getRange('A1:F1').merge()
    .setValue('🎓 แพลนเนอร์คำนวณเป้าหมาย GPAX (ม.ปลาย 6 เทอม / มหาลัย 8 เทอม)')
    .setBackground('#0B1226')
    .setFontColor('#00F2FE')
    .setFontFamily('Prompt')
    .setFontSize(14)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 45);

  // 2. กล่องตั้งเป้าหมาย (Target Box)
  sheet.getRange('A3:B3').merge().setValue('🎯 GPAX เป้าหมายที่ต้องการ:').setFontWeight('bold');
  sheet.getRange('C3').setValue(3.75).setFontWeight('bold').setFontColor('#FF007F').setBackground('#FCE7F3').setHorizontalAlignment('center');
  
  sheet.getRange('A4:B4').merge().setValue('📊 GPAX ปัจจุบันที่ทำได้:').setFontWeight('bold');
  sheet.getRange('C4').setFormula('=IFERROR(SUMPRODUCT(C8:C15, D8:D15)/SUM(C8:C15), 0)')
    .setFontWeight('bold').setFontColor('#059669').setBackground('#D1FAE5').setNumberFormat('0.00').setHorizontalAlignment('center');

  sheet.getRange('A5:B5').merge().setValue('⚡ เกรดเฉลี่ยที่ต้องทำในเทอมที่เหลือ:').setFontWeight('bold');
  sheet.getRange('C5').setFormula('=IFERROR((C3*SUM(C8:C15) - SUMPRODUCT(C8:C15, D8:D15)) / (SUM(C8:C15) - SUMIF(D8:D15, ">0", C8:C15)), "เป้าหมายสำเร็จแล้ว")')
    .setFontWeight('bold').setFontColor('#1D4ED8').setBackground('#DBEAFE').setNumberFormat('0.00').setHorizontalAlignment('center');

  // 3. ตารางรายเทอม (Semester Breakdown)
  const headers = [['ภาคเรียน (Semester)', 'ระดับชั้น', 'หน่วยกิตประจำเทอม', 'เกรดเฉลี่ยที่ได้ (GPA)', 'แต้มคะแนนรวม (GPA x หน่วยกิต)', 'สถานะ']];
  sheet.getRange('A7:F7').setValues(headers)
    .setBackground('#1E293B')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(7, 32);

  const initialRows = [
    ['ม.4 เทอม 1', 'ม.ปลาย', 15.5, 3.65, '=C8*D8', '=IF(D8>0,"บันทึกแล้ว","รอผลการเรียน")'],
    ['ม.4 เทอม 2', 'ม.ปลาย', 16.0, 3.80, '=C9*D9', '=IF(D9>0,"บันทึกแล้ว","รอผลการเรียน")'],
    ['ม.5 เทอม 1', 'ม.ปลาย', 16.0, 3.70, '=C10*D10', '=IF(D10>0,"บันทึกแล้ว","รอผลการเรียน")'],
    ['ม.5 เทอม 2', 'ม.ปลาย', 16.5, 0, '=C11*D11', '=IF(D11>0,"บันทึกแล้ว","รอผลการเรียน")'],
    ['ม.6 เทอม 1', 'ม.ปลาย (ยื่น TCAS 5 เทอม)', 16.0, 0, '=C12*D12', '=IF(D12>0,"บันทึกแล้ว","รอผลการเรียน")'],
    ['ม.6 เทอม 2', 'ม.ปลาย (จบการศึกษา 6 เทอม)', 15.0, 0, '=C13*D13', '=IF(D13>0,"บันทึกแล้ว","รอผลการเรียน")'],
    ['ป.ตรี ปี 1 เทอม 1 (ตัวเลือก)', 'มหาวิทยาลัย', 18.0, 0, '=C14*D14', '=IF(D14>0,"บันทึกแล้ว","รอผลการเรียน")'],
    ['ป.ตรี ปี 1 เทอม 2 (ตัวเลือก)', 'มหาวิทยาลัย', 18.0, 0, '=C15*D15', '=IF(D15>0,"บันทึกแล้ว","รอผลการเรียน")'],
  ];

  sheet.getRange('A8:F15').setValues(initialRows).setFontFamily('Prompt').setFontSize(10);
  sheet.getRange('C8:D15').setHorizontalAlignment('center').setNumberFormat('0.00');
  sheet.getRange('E8:E15').setHorizontalAlignment('right').setNumberFormat('0.00');
  sheet.getRange('F8:F15').setHorizontalAlignment('center');

  // สรุปยอดรวม (Summary Row)
  sheet.getRange('A16:B16').merge().setValue('รวมหน่วยกิตและแต้มสะสมทั้งหมด').setFontWeight('bold').setHorizontalAlignment('right');
  sheet.getRange('C16').setFormula('=SUM(C8:C15)').setFontWeight('bold').setHorizontalAlignment('center');
  sheet.getRange('D16').setFormula('=C4').setFontWeight('bold').setHorizontalAlignment('center').setNumberFormat('0.00');
  sheet.getRange('E16').setFormula('=SUM(E8:E15)').setFontWeight('bold').setHorizontalAlignment('right').setNumberFormat('0.00');
  sheet.getRange('A16:F16').setBackground('#F1F5F9');

  // Auto-fit columns
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 160);
  sheet.setColumnWidth(5, 190);
  sheet.setColumnWidth(6, 140);

  SpreadsheetApp.getUi().alert('✅ สำเร็จ!', 'สร้างตารางคำนวณเป้าหมาย GPAX เรียบร้อยแล้วครับ ลองเปลี่ยนตัวเลขเกรดและเป้าหมายได้เลย!', SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * ฟังก์ชันสร้างแผ่นงานเช็กการบ้านและงานค้าง (Homework & Assignment Tracker)
 */
function setupHomeworkTrackerSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('เช็กงานค้าง_และการบ้าน');
  
  if (sheet) {
    const resp = SpreadsheetApp.getUi().alert(
      '⚠️ พบแผ่นงานเดิมอยู่แล้ว',
      'มีแผ่นงาน "เช็กงานค้าง_และการบ้าน" อยู่แล้ว ต้องการสร้างทับใหม่หรือไม่?',
      SpreadsheetApp.getUi().ButtonSet.YES_NO
    );
    if (resp !== SpreadsheetApp.getUi().Button.YES) return;
    ss.deleteSheet(sheet);
  }
  
  sheet = ss.insertSheet('เช็กงานค้าง_และการบ้าน');
  sheet.setTabColor('#FF007F');
  sheet.showGridlines(true);

  // 1. หัวเรื่อง (Header)
  sheet.getRange('A1:G1').merge()
    .setValue('📝 ระบบเช็กการบ้าน งานค้าง & กำหนดส่ง (Homework & Task Tracker)')
    .setBackground('#0B1226')
    .setFontColor('#FF007F')
    .setFontFamily('Prompt')
    .setFontSize(14)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 45);

  // 2. กล่องสถิติภาพรวม (Overview Cards)
  sheet.getRange('A3:B3').merge().setValue('📌 งานค้างที่ยังไม่เสร็จ:').setFontWeight('bold');
  sheet.getRange('C3').setFormula('=COUNTIF(F7:F20, "ยังไม่เสร็จ")')
    .setFontWeight('bold').setFontColor('#DC2626').setBackground('#FEE2E2').setHorizontalAlignment('center');

  sheet.getRange('D3:E3').merge().setValue('✅ งานที่ส่งเสร็จแล้ว:').setFontWeight('bold');
  sheet.getRange('F3').setFormula('=COUNTIF(F7:F20, "ส่งแล้ว")')
    .setFontWeight('bold').setFontColor('#059669').setBackground('#D1FAE5').setHorizontalAlignment('center');

  // 3. ตารางรายการงาน
  const tableHeaders = [['ลำดับ', 'วิชา', 'ชื่องาน / รายละเอียด', 'ครูผู้สอน', 'กำหนดส่ง (Deadline)', 'สถานะงาน', 'คะแนนเก็บ']];
  sheet.getRange('A6:G6').setValues(tableHeaders)
    .setBackground('#1E293B')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(6, 32);

  const sampleTasks = [
    [1, 'คณิตศาสตร์เพิ่มเติม', 'แบบฝึกหัดทฤษฎีบทเศษเหลือ หน้า 45 ข้อ 1-10', 'ครูสมชาย', '2026-10-25', 'ยังไม่เสร็จ', 10],
    [2, 'ฟิสิกส์ 3', 'รายงานการทดลองการเคลื่อนที่แบบซิมเปิลฮาร์มอนิก', 'ครูอัญชลี', '2026-10-28', 'กำลังทำ', 15],
    [3, 'ภาษาอังกฤษเชิงวิชาการ', 'เขียนเรียงความ Essay หัวข้อ AI in Modern World 300 คำ', 'Teacher Mark', '2026-10-22', 'ยังไม่เสร็จ', 10],
    [4, 'ดนตรีสากล (ศ23102)', 'อัดคลิปปฏิบัติเครื่องสายสากล 1 นาที', 'ครูอ้น', '2026-10-30', 'ส่งแล้ว', 20],
    [5, 'เคมี 3', 'ทำแบบฝึกหัดปริมาณสารสัมพันธ์', 'ครูกมลวรรณ', '2026-10-24', 'ยังไม่เสร็จ', 5],
  ];

  sheet.getRange('A7:G11').setValues(sampleTasks).setFontFamily('Prompt').setFontSize(10);
  sheet.getRange('A7:A11').setHorizontalAlignment('center');
  sheet.getRange('E7:E11').setHorizontalAlignment('center');
  sheet.getRange('F7:F11').setHorizontalAlignment('center');
  sheet.getRange('G7:G11').setHorizontalAlignment('center');

  // Data Validation สำหรับสถานะ (Dropdown)
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['ยังไม่เสร็จ', 'กำลังทำ', 'ส่งแล้ว'])
    .setAllowInvalid(false)
    .build();
  sheet.getRange('F7:F30').setDataValidation(statusRule);

  // Column Widths
  sheet.setColumnWidth(1, 60);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 300);
  sheet.setColumnWidth(4, 140);
  sheet.setColumnWidth(5, 140);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 100);

  SpreadsheetApp.getUi().alert('✅ สำเร็จ!', 'สร้างตารางเช็กการบ้านและงานค้างเรียบร้อยแล้วครับ!', SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * กล่องข้อความแจ้งข้อมูล
 */
function showAboutDialog() {
  const html = HtmlService.createHtmlOutput(
    '<div style="font-family: Prompt, sans-serif; padding: 15px; color: #0F172A;">' +
    '<h3 style="color: #00F2FE; background: #0B1226; padding: 10px; border-radius: 8px; text-align: center;">🎓 iAon Tech Student Vault</h3>' +
    '<p>ระบบคำนวณ GPAX และติดตามการบ้าน พัฒนาขึ้นเพื่อช่วยให้นักเรียน ม.ปลาย และนิสิตนักศึกษาวางแผนการเรียนได้อย่างมีประสิทธิภาพสูงสุด</p>' +
    '<p>🌐 เว็บไซต์: <a href="https://www.aiaon.tech" target="_blank">www.aiaon.tech</a></p>' +
    '<p>💬 LINE Official: <strong>@deu6776s</strong></p>' +
    '<p style="font-size: 11px; color: #64748B;">© 2026 iAon Tech • ไอทีง่ายๆ สไตล์ไอ้อ้น</p>' +
    '</div>'
  ).setWidth(360).setHeight(260);
  SpreadsheetApp.getUi().showModalDialog(html, 'เกี่ยวกับระบบ');
}
