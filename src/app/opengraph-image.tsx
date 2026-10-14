import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "AiAon Tech — คลังระบบ Google Apps Script & สื่อการสอน AI โดย ครูอ้น";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.22) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.22) 0%, transparent 50%)",
          fontFamily: "sans-serif",
          color: "white",
          border: "4px solid rgba(6, 182, 212, 0.35)",
        }}
      >
        {/* Top Header Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #06B6D4, #3B82F6, #A855F7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: 900,
                color: "#030712",
                boxShadow: "0 0 25px rgba(6, 182, 212, 0.6)",
              }}
            >
              iA
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "-0.5px", color: "white" }}>
                AiAon Tech
              </span>
              <span style={{ fontSize: "16px", color: "#22D3EE", fontWeight: 600 }}>
                ไอทีง่ายๆ สไตล์ไอ้อ้น • EdTech & AI Studio
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              borderRadius: "9999px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34D399",
              fontSize: "15px",
              fontWeight: 700,
            }}
          >
            <span>✓ OFFICIAL PLATFORM</span>
          </div>
        </div>

        {/* Center Hero Punchline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.18,
              letterSpacing: "-1px",
              background: "linear-gradient(90deg, #FFFFFF 20%, #A5F3FC 60%, #E9D5FF 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            เสกงานเอกสารโรงเรียน & สื่อการสอน AI
            <br />
            เสร็จในคลิกเดียว ไม่มีรายเดือน
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "4px" }}>
            {[
              "📦 คลัง 20 ระบบ Google Apps Script",
              "🎓 กลุ่มติวสอบครูผู้ช่วย Telegram VIP",
              "🎵 เพลงช่วยจำข้อสอบ Suno & เสียงตามสาย",
              "🛡️ ว.PA & ปลอดลิขสิทธิ์ 100%",
            ].map((pill, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px 18px",
                  borderRadius: "14px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  color: "#E2E8F0",
                  fontSize: "17px",
                  fontWeight: 600,
                }}
              >
                {pill}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer Info Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "18px", color: "#FCD34D", fontWeight: 700 }}>
              ★ นายจิรวัฒน์ เดชเส้ง (ครูอ้น)
            </span>
            <span style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.6)" }}>
              ครู ค.ศ.2 (ชำนาญการ) โรงเรียนหาดใหญ่วิทยาลัย
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "18px", color: "#06C755", fontWeight: 800 }}>
              LINE: @deu6776s
            </span>
            <span style={{ fontSize: "18px", color: "#38BDF8", fontWeight: 800 }}>
              www.aiaon.tech
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
