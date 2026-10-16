import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  executeSlipVerification,
  pendingOrders,
} from "@/services/slip-verification";
import { buildSignedDeliveryUrl } from "@/utils/delivery-links";

function parseServerPrice(priceStr?: string | number | null): number {
  if (typeof priceStr === "number") return priceStr;
  if (!priceStr) return 0;
  const clean = String(priceStr).replace(/[^0-9.]/g, "");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

function getServerVipSetupPrice(title: string): number {
  const upper = (title || "").toUpperCase();
  if (
    upper.includes("AONE09") ||
    upper.includes("ห้องเรียนสีขาว") ||
    upper.includes("AONA02") ||
    upper.includes("ยานพาหนะ")
  ) {
    return 690;
  }
  if (
    upper.includes("AONA01") ||
    upper.includes("AONA03") ||
    upper.includes("เกียรติบัตร") ||
    upper.includes("AONE01") ||
    upper.includes("AONE02") ||
    upper.includes("AONE05") ||
    upper.includes("AONE08") ||
    upper.includes("AONE10") ||
    upper.includes("3D") ||
    upper.includes("AONM01") ||
    upper.includes("AONA06")
  ) {
    return 350;
  }
  return 190;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, slipUrl } = body;

    if (!orderId || !slipUrl) {
      return NextResponse.json(
        { success: false, verified: false, error: "ข้อมูลคำสั่งซื้อหรือลิงก์สลิปไม่ครบถ้วน" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 1. Fetch Order & True Product/Course Price from Supabase Server-Side (Never trust client expectedAmount alone)
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .select("id, user_id, product_id, course_id, amount, status")
      .eq("id", orderId)
      .maybeSingle();

    if (orderErr || !order) {
      return NextResponse.json(
        { success: false, verified: false, error: "ไม่พบรายการสั่งซื้อนี้ในระบบฐานข้อมูล" },
        { status: 404 }
      );
    }

    if (user && order.user_id && order.user_id !== user.id) {
      return NextResponse.json(
        { success: false, verified: false, error: "คุณไม่มีสิทธิ์ตรวจสอบรายการสั่งซื้อนี้" },
        { status: 403 }
      );
    }

    let itemTitle = "รายการสั่งซื้อเว็บไซต์ AiAon Tech";
    let baseAmount = 0;
    let itemFileUrl: string | null = null;

    if (order.product_id) {
      const { data: product } = await supabase
        .from("products")
        .select("id, title, price, file_url")
        .eq("id", order.product_id)
        .maybeSingle();

      if (product) {
        itemTitle = product.title || itemTitle;
        baseAmount = parseServerPrice(product.price);
        itemFileUrl = product.file_url || null;
      }
    } else if (order.course_id) {
      const { data: course } = await supabase
        .from("courses")
        .select("id, title, price")
        .eq("id", order.course_id)
        .maybeSingle();

      if (course) {
        itemTitle = course.title || itemTitle;
        baseAmount = parseServerPrice(course.price);
      }
    }

    if (baseAmount <= 0) {
      baseAmount = parseServerPrice(order.amount);
    }

    const vipAmount = getServerVipSetupPrice(itemTitle);
    const isVipSelected = String(order.amount || "").includes("VIP Setup");

    // 2. Fetch Slip Image Binary
    let imageBuffer: ArrayBuffer;
    let contentType = "image/jpeg";

    try {
      const imgRes = await fetch(slipUrl);
      if (!imgRes.ok) throw new Error(`HTTP ${imgRes.status} fetching slip image`);
      const headerType = imgRes.headers.get("content-type");
      if (headerType) contentType = headerType;
      imageBuffer = await imgRes.arrayBuffer();
    } catch (fetchErr) {
      console.error("[Checkout Verify-Slip] Error fetching slip image:", fetchErr);
      return NextResponse.json({
        success: true,
        verified: false,
        status: "manual_review",
        message: "บันทึกสลิปสำเร็จ กำลังส่งให้ผู้ดูแลระบบตรวจสอบ",
      });
    }

    // 3. Register Server-Verified Pending Order & Execute 5-Layer Slip Verification Engine
    const verifyUserId = `web_${order.user_id || user?.id || orderId}`;
    const customerName = user?.email || `WebUser-${String(order.user_id || orderId).slice(0, 8)}`;

    pendingOrders.set(verifyUserId, {
      userId: verifyUserId,
      itemTitle,
      baseAmount,
      vipAmount,
      isVipSelected,
      orderedAt: new Date().toISOString(),
      status: "pending_slip",
      customerEmail: user?.email,
    });

    const verification = await executeSlipVerification({
      imageBuffer,
      contentType,
      userId: verifyUserId,
      customerName,
      channel: "Website Checkout",
    });

    // 4. Handle Approved -> Update Order to 'completed' & Return Signed Instant Delivery URL
    if (verification.status === "approved") {
      const { error: updateError } = await supabase
        .from("orders")
        .update({ status: "completed" })
        .eq("id", orderId);

      if (updateError) {
        console.error("[Checkout Verify-Slip] Supabase update error:", updateError);
      }

      const fallbackSigned = buildSignedDeliveryUrl(
        itemTitle,
        verification.transRef || String(orderId)
      );
      const signedDeliveryUrl =
        verification.deliveryUrl ||
        (isVipSelected ? `${fallbackSigned.url}&vip=1` : fallbackSigned.url);

      return NextResponse.json({
        success: true,
        verified: true,
        status: "approved",
        deliveryUrl: signedDeliveryUrl,
        extraOneDriveLink: verification.extraOneDriveLink || itemFileUrl || null,
        unlockedCodes: verification.unlockedCodes || fallbackSigned.codes,
        transRef: verification.transRef || "",
        bankName: verification.bankName || "",
        actualSlipAmount: verification.actualSlipAmount || baseAmount,
        message:
          "✅ ตรวจสอบสลิป 5 ชั้นสำเร็จ! อนุมัติคำสั่งซื้อและปลดล็อกลิงก์ดาวน์โหลดชุดไฟล์ (.ZIP) ทันที",
      });
    }

    // 5. Handle Manual Review -> Keep Order as 'pending'
    if (verification.status === "manual_review") {
      return NextResponse.json({
        success: true,
        verified: false,
        status: "manual_review",
        message: verification.replyText,
      });
    }

    // 6. Handle Rejected / Payment QR / Invalid Slip -> Mark Order 'rejected' & Return Error
    await supabase
      .from("orders")
      .update({ status: "rejected" })
      .eq("id", orderId);

    return NextResponse.json(
      {
        success: false,
        verified: false,
        status: verification.status,
        error: verification.replyText,
        message: verification.replyText,
      },
      { status: 400 }
    );
  } catch (err) {
    console.error("[Checkout Verify-Slip Route Error]:", err);
    return NextResponse.json({
      success: true,
      verified: false,
      status: "manual_review",
      message: "บันทึกสลิปสำเร็จ รอแอดมินตรวจสอบ",
    });
  }
}
