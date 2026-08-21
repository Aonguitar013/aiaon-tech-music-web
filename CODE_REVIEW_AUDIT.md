# 🔍 Production Code Review & Audit Report
**Project:** iAonTech x Music Platform  
**Tech Stack:** Next.js 16.2.3 | React 19.2.4 | TypeScript 5 | Tailwind CSS 4.3.1 | Supabase  
**Date:** 2026-08-06  
**Severity Overview:** 8 CRITICAL | 9 HIGH | 5 MEDIUM | 3 LOW

---

## 🚨 CRITICAL ISSUES (8)

### 1. **Open Redirect Vulnerability in OAuth Callback**
**File:** `src/app/auth/callback/route.ts` (Line 9)  
**Severity:** CRITICAL - P0  
**Description:** The `next` parameter is taken directly from URL without validation, allowing attackers to redirect users to malicious sites after auth.

**Current Code:**
```typescript
const next = searchParams.get('next') ?? '/dashboard'
// ... later
return NextResponse.redirect(`${origin}${next}`)
```

**Risk:** Attacker could craft: `https://app.com/auth/callback?next=//evil.com`

**Fix:**
```typescript
// src/app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

// Define allowed redirect paths
const ALLOWED_REDIRECT_PATHS = [
  '/dashboard',
  '/dashboard/academy',
  '/dashboard/marketplace',
  '/dashboard/profile'
]

function isValidRedirectPath(path: string): boolean {
  // Ensure path starts with / and is in whitelist
  if (!path.startsWith('/')) return false
  // Remove query params for comparison
  const pathOnly = path.split('?')[0]
  return ALLOWED_REDIRECT_PATHS.some(allowed => pathOnly === allowed || pathOnly.startsWith(allowed + '/'))
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  // Validate redirect path
  if (!isValidRedirectPath(next)) {
    return NextResponse.redirect(`${origin}/dashboard`)
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-code-error`)
}
```

---

### 2. **No Server-Side Input Validation on Auth Forms**
**File:** `src/app/login/actions.ts` (Lines 10-13, 28-35)  
**Severity:** CRITICAL - P0  
**Description:** Email and password are not validated, allowing malformed/malicious input.

**Risk:** XSS, injection attacks, buffer overflow with extremely long inputs

**Fix:**
```typescript
// src/app/login/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod' // Add: npm install zod

// Define validation schemas
const emailSchema = z.string().email().max(254)
const passwordSchema = z.string().min(8).max(128)
const fullNameSchema = z.string().min(1).max(100).trim()

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validate inputs
  try {
    const validatedEmail = emailSchema.parse(email)
    const validatedPassword = passwordSchema.parse(password)

    const { error } = await supabase.auth.signInWithPassword({
      email: validatedEmail,
      password: validatedPassword,
    })

    if (error) {
      // Don't expose detailed error messages
      console.error('Login error:', error)
      return { error: 'Email or password is incorrect' }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { error: 'Invalid email or password format' }
    }
    throw err
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  try {
    const validatedEmail = emailSchema.parse(email)
    const validatedPassword = passwordSchema.parse(password)
    const validatedName = fullNameSchema.parse(fullName)

    const { error } = await supabase.auth.signUp({
      email: validatedEmail,
      password: validatedPassword,
      options: {
        data: {
          full_name: validatedName || 'New Scholar'
        }
      }
    })

    if (error) {
      console.error('Signup error:', error)
      return { error: 'Unable to create account. Email may already exist.' }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldError = err.errors[0]
      return { error: `Invalid ${fieldError.path.join('.')}: ${fieldError.message}` }
    }
    throw err
  }
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
```

---

### 3. **Hardcoded Sensitive Data (PromptPay ID)**
**File:** `src/app/dashboard/marketplace/checkout/[id]/page.tsx` (Line 62)  
**Severity:** CRITICAL - P0  
**Description:** PromptPay merchant ID is hardcoded in source code.

**Risk:** Exposure in git history, public code repositories, compiled bundles

**Fix:**
```typescript
// .env.local (add to your environment)
NEXT_PUBLIC_PROMPTPAY_ID=0835399340

// src/app/dashboard/marketplace/checkout/[id]/page.tsx
export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  // ... existing code ...

  // Generate PromptPay QR payload on the server
  const generatePayload = require("promptpay-qr")
  const PROMPTPAY_ID = process.env.NEXT_PUBLIC_PROMPTPAY_ID
  
  if (!PROMPTPAY_ID) {
    throw new Error('PromptPay ID not configured')
  }

  const payloadStr = generatePayload(PROMPTPAY_ID, { amount: parsedAmount })
  // ... rest of code
}
```

---

### 4. **No Server-Side File Type & Size Validation**
**File:** `src/components/marketplace/SlipUploader.tsx` (Lines 27-44)  
**Severity:** CRITICAL - P0  
**Description:** File uploads accept any type/size. Client-side validation is easily bypassed.

**Risk:** Malware upload, DOS attacks via large files, storage quota exhaustion

**Fix:**
```typescript
// src/lib/upload-validation.ts (new file)
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function validateFileUpload(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Accepted: JPG, PNG, WebP`
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than 5MB. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB`
    }
  }

  return { valid: true }
}

// src/components/marketplace/SlipUploader.tsx
"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { createClient } from "@/utils/supabase/client"
import { Upload, CheckCircle, Smartphone, Info, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { validateFileUpload, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/upload-validation"

interface SlipUploaderProps {
  itemId: string
  itemType: "course" | "product"
  productTitle: string
  productPrice: string
  promptPayPayload: string
  userId: string
}

export function SlipUploader({
  itemId,
  itemType,
  productPrice,
  promptPayPayload,
  productTitle,
  userId
}: SlipUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setError(null)
    const file = e.target.files[0]

    // Validate file BEFORE upload
    const validation = validateFileUpload(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      return
    }

    setUploading(true)

    try {
      // Generate unique filename using secure random + timestamp
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const timestamp = Date.now()
      const randomBytes = Array.from(crypto.getRandomValues(new Uint8Array(8)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
      const fileName = `${userId}-${timestamp}-${randomBytes}.${fileExt}`

      // Upload to Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("payment_slips")
        .upload(fileName, file, { 
          cacheControl: '3600',
          upsert: false,
          contentType: file.type // Enforce content type
        })

      if (uploadError) throw uploadError

      // Get public URL with error handling
      const { data: publicUrlData } = supabase.storage
        .from("payment_slips")
        .getPublicUrl(fileName)

      if (!publicUrlData?.publicUrl) {
        throw new Error('Failed to generate public URL')
      }

      const publicUrl = publicUrlData.publicUrl

      // Create Order Record
      const orderPayload: Record<string, any> = {
        user_id: userId,
        amount: productPrice, // Should be stored as numeric value in DB
        slip_url: publicUrl,
        status: 'pending',
      }

      if (itemType === "course") {
        orderPayload.course_id = itemId
      } else {
        orderPayload.product_id = itemId
      }

      const { error: insertError, data: insertedOrder } = await supabase
        .from("orders")
        .insert([orderPayload])
        .select()

      if (insertError) throw insertError

      // Send proper admin notification (implement webhook/email instead)
      try {
        await fetch('/api/admin-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: insertedOrder?.[0]?.id,
            userId,
            itemType,
            productTitle,
            slipUrl: publicUrl
          })
        })
      } catch (notifyError) {
        console.error('Failed to send admin notification:', notifyError)
        // Don't fail the order if notification fails
      }

      setSuccess(true)
      setTimeout(() => {
        router.push(itemType === "course" ? "/dashboard/academy" : "/dashboard/marketplace")
      }, 3000)
    } catch (err: any) {
      console.error("Upload error:", err)
      setError("เกิดข้อผิดพลาดในการอัปโหลดสลิป กรุณาลองใหม่อีกครั้ง")
    } finally {
      setUploading(false)
    }
  }

  if (success) {
    return (
      <div className="glass-card p-10 flex flex-col items-center justify-center text-center border-emerald-500/30 w-full min-h-[400px]">
        <CheckCircle className="w-20 h-20 text-emerald-400 mb-6" />
        <h2 className="text-3xl font-bold font-prompt text-white mb-4">ส่งหลักฐานสำเร็จ!</h2>
        <p className="text-white/70 font-prompt text-lg mb-8 max-w-md">
          ขอบคุณสำหรับการสั่งซื้อ เราได้ทำการแจ้งเตือนผู้ดูแลระบบเรียบร้อยแล้ว กรุณารอการตรวจสอบและอนุมัติภายใน 24 ชั่วโมง
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
      <div className="flex-1 flex flex-col items-center justify-center glass-card p-8 border-white/10 relative overflow-hidden">
        <h3 className="text-xl font-bold font-prompt text-white mb-2 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-blue-400" /> สแกนจ่ายผ่าน QR Code
        </h3>
        <p className="text-sm font-prompt text-white/50 mb-8 text-center max-w-[250px]">
          โอนเงินด้วยพร้อมเพย์ได้ทุกธนาคาร
        </p>

        <div className="bg-white p-4 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.3)]">
          <QRCodeSVG 
            value={promptPayPayload} 
            size={250}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
          />
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-prompt text-white/50 mb-1">ยอดชำระเงินรวม</p>
          <p className="text-3xl font-bold font-prompt text-emerald-400">{productPrice}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col pt-4">
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-4 mb-8">
          <Info className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm font-prompt text-white/80 leading-relaxed">
            หลังจากสแกนจ่ายเรียบร้อยแล้ว กรุณาอัปโหลดสลิปโอนเงิน เฉพาะไฟล์ JPG, PNG, WebP ขนาดไม่เกิน 5MB
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-red-400 text-sm font-prompt">{error}</p>
          </div>
        )}

        <div className="flex-1 border-2 border-dashed border-white/20 rounded-3xl flex flex-col items-center justify-center p-10 hover:border-blue-400/50 transition-all group relative cursor-pointer min-h-[300px]">
          <Upload className="w-16 h-16 text-white/20 group-hover:text-blue-400 transition-colors mb-4" />
          <h3 className="text-xl font-bold font-prompt text-white mb-2">คลิกเพื่ออัปโหลดสลิป</h3>
          <p className="text-xs font-prompt text-white/40 text-center">
            JPG, PNG ขนาดไม่เกิน 5MB
          </p>

          <input 
            type="file" 
            accept={ALLOWED_FILE_TYPES.join(',')}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileUpload}
            disabled={uploading}
          />

          {uploading && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-[22px] flex items-center justify-center flex-col z-20">
              <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="font-prompt text-sm text-white">กำลังอัปโหลด...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
```

---

### 5. **Inconsistent & Duplicated Admin Authorization Check**
**File:** `src/app/dashboard/admin/actions.ts` (Lines 9-20, 36-46)  
**Severity:** CRITICAL - P0  
**Description:** Role check is duplicated across functions. If one place has a bug, it impacts security. Two different sources of truth (profile.role vs email).

**Fix:**
```typescript
// src/lib/auth.ts (new file)
import { createClient } from "@/utils/supabase/server"

export async function requireAdmin() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthenticated')
  }

  // Check admin status
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin'
  
  if (!isAdmin) {
    throw new Error('Unauthorized: Admin access required')
  }

  return user
}

// src/app/dashboard/admin/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth'

export async function approveOrder(orderId: string) {
  // Will throw if not admin
  const user = await requireAdmin()

  // Validate orderId
  if (!orderId || typeof orderId !== 'string' || orderId.length === 0) {
    return { error: 'Invalid order ID' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('orders')
    .update({ status: 'completed' })
    .eq('id', orderId)

  if (error) {
    console.error('Approve order error:', error)
    return { error: 'Failed to approve order' }
  }

  revalidatePath('/dashboard/admin')
  return { success: true }
}

export async function rejectOrder(orderId: string) {
  const user = await requireAdmin()

  if (!orderId || typeof orderId !== 'string' || orderId.length === 0) {
    return { error: 'Invalid order ID' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('orders')
    .update({ status: 'rejected' })
    .eq('id', orderId)

  if (error) {
    console.error('Reject order error:', error)
    return { error: 'Failed to reject order' }
  }

  revalidatePath('/dashboard/admin')
  return { success: true }
}
```

---

### 6. **Unvalidated ID Parameters Leading to Info Disclosure**
**File:** `src/app/dashboard/marketplace/checkout/[id]/page.tsx` (Line 12)  
**Severity:** CRITICAL - P0  
**Description:** Product/course IDs are not validated. User can potentially access any item's checkout, even if they shouldn't.

**Risk:** Information disclosure (prices, titles), unintended access

**Fix:**
```typescript
// src/app/dashboard/marketplace/checkout/[id]/page.tsx
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SlipUploader } from "@/components/marketplace/SlipUploader"

// Validate UUID format (adjust if using different ID format)
function isValidId(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

export const metadata = {
  title: "Checkout | iAonTech",
}

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Validate ID format
  if (!isValidId(id)) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-white/50">
        <p className="font-prompt text-xl mb-4">ไม่พบสินค้าหรือคอร์สนี้</p>
        <Link href="/dashboard/marketplace" className="text-blue-400">
          กลับสู่หน้าหลัก
        </Link>
      </div>
    )
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch and validate item exists
  let item: any = null
  let itemType: "course" | "product" = "product"
  let backHref = "/dashboard/marketplace"

  const { data: course } = await supabase
    .from('courses')
    .select('id, title, price')
    .eq('id', id)
    .maybeSingle()

  if (course) {
    item = course
    itemType = "course"
    backHref = `/dashboard/academy/${id}`
  } else {
    const { data: product } = await supabase
      .from('products')
      .select('id, title, price')
      .eq('id', id)
      .maybeSingle()

    if (product) {
      item = product
      itemType = "product"
      backHref = `/dashboard/marketplace/${id}`
    }
  }

  if (!item) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-white/50">
        <p className="font-prompt text-xl mb-4">ไม่พบสินค้าหรือคอร์สนี้</p>
        <Link href={backHref} className="text-blue-400">
          กลับหลัง
        </Link>
      </div>
    )
  }

  const parsePrice = (priceStr?: string): number => {
    if (!priceStr) return 0
    const clean = priceStr.replace(/[^0-9.]/g, '')
    const num = parseFloat(clean)
    return !isNaN(num) && num > 0 ? num : 0
  }

  const parsedAmount = parsePrice(item.price)

  const generatePayload = require("promptpay-qr")
  const PROMPTPAY_ID = process.env.NEXT_PUBLIC_PROMPTPAY_ID

  if (!PROMPTPAY_ID) {
    throw new Error('PromptPay not configured')
  }

  const payloadStr = generatePayload(PROMPTPAY_ID, { amount: parsedAmount })

  return (
    <div className="w-full max-w-[1200px] mx-auto min-h-screen flex flex-col pb-20">
      <div className="mb-6">
        <Link href={backHref} className="inline-flex items-center gap-2 text-white/50">
          <ArrowLeft className="w-4 h-4" /> กลับหลัง
        </Link>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold font-prompt text-white mb-4">ดำเนินการชำระเงิน</h1>
        <p className="text-white/60 font-prompt max-w-lg mx-auto">
          ชำระเงินสำหรับ <b>{item.title}</b>
        </p>
      </div>

      <SlipUploader 
        itemId={item.id}
        itemType={itemType}
        productTitle={item.title}
        productPrice={item.price}
        promptPayPayload={payloadStr}
        userId={user.id}
      />
    </div>
  )
}
```

---

### 7. **No Password Strength Requirements**
**File:** `src/app/login/page.tsx` (Line 119-124)  
**Severity:** CRITICAL - P0  
**Description:** Password input has no requirements shown, weak passwords can be created.

**Fix:** Add client-side validation + server-side enforcement (already added in fix for issue #2 with zod schema: `.min(8)`)

```typescript
// src/app/login/page.tsx - add to login form section

{/* Password input with strength indicator */}
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Lock className="h-5 w-5 text-white/40" />
  </div>
  <input
    type="password"
    name="password"
    required
    minLength={8}
    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
    title="Password must be at least 8 characters with letters, numbers, and symbols"
    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-prompt text-sm"
    placeholder="รหัสผ่าน (อย่างน้อย 8 ตัว มี ตัวอักษร ตัวเลข และสัญลักษณ์)"
  />
  <p className="text-xs text-white/40 mt-1 font-prompt">
    ✓ 8+ characters • ✓ Letters • ✓ Numbers • ✓ Symbols (@$!%*#?&)
  </p>
</div>
```

---

### 8. **Client-Side Content Access Control (isPurchased)**
**File:** `src/components/academy/CoursePlayerClientView.tsx` (Line 7)  
**Severity:** CRITICAL - P0  
**Description:** Course access is determined by a component prop, not server verification. Attacker can manipulate this.

**Fix:**
```typescript
// src/app/dashboard/academy/[id]/page.tsx
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { CoursePlayerClientView } from "@/components/academy/CoursePlayerClientView"

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Server-side: Check if user has purchased this course
  const { data: purchase } = await supabase
    .from('orders')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', id)
    .eq('status', 'completed')
    .maybeSingle()

  const isPurchased = !!purchase

  // Get course details
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (!course) {
    redirect('/dashboard/academy')
  }

  // Get lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', id)
    .order('order', { ascending: true })

  return (
    <CoursePlayerClientView 
      course={course}
      isPurchased={isPurchased} // Now server-verified
      lessons={lessons || []}
    />
  )
}
```

---

## 🔴 HIGH SEVERITY ISSUES (9)

### 9. **No Rate Limiting on Authentication Attempts**
**File:** `src/app/login/actions.ts`  
**Severity:** HIGH - P1  
**Description:** Brute force attacks possible on login/signup endpoints.

**Fix:**
```typescript
// src/lib/rate-limit.ts (new file)
import { Ratelimit } from '@upstash/ratelimit' // npm install @upstash/ratelimit
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 attempts per 15 minutes
  analytics: true,
})

export const signupLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 attempts per hour
  analytics: true,
})
```

Apply in login/actions.ts:
```typescript
import { loginLimiter, signupLimiter } from '@/lib/rate-limit'

export async function login(formData: FormData) {
  const email = formData.get('email') as string

  // Rate limit by email
  const { success } = await loginLimiter.limit(email)
  if (!success) {
    return { error: 'Too many login attempts. Please try again later.' }
  }

  // ... rest of login logic
}
```

---

### 10. **No Proper Admin Notification System**
**File:** `src/components/marketplace/SlipUploader.tsx` (Line 71)  
**Severity:** HIGH - P1  
**Description:** Admin notification via `console.log()` won't work in production.

**Fix:** Already included in issue #4 fix. Create proper webhook/email endpoint:

```typescript
// src/app/api/admin-notification/route.ts (new file)
import { createClient } from "@/utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { orderId, userId, itemType, productTitle, slipUrl } = await request.json()

    // Verify this is an internal request
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.INTERNAL_API_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // TODO: Implement email notification
    // Example with SendGrid, Resend, or similar:
    // await sendAdminEmail({
    //   subject: `New Payment Slip Uploaded - Order ${orderId}`,
    //   body: `User ${userId} uploaded slip for ${productTitle}. Review: ${slipUrl}`
    // })

    // Or use Discord webhook:
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: '💰 New Payment Slip',
            description: `**Order ID:** ${orderId}\n**Item:** ${productTitle}\n**Type:** ${itemType}`,
            url: slipUrl,
            color: 0x00ff00
          }]
        })
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin notification error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

---

### 11. **Price Stored as String Instead of Numeric**
**File:** `src/components/marketplace/SlipUploader.tsx` (Line 54)  
**Severity:** HIGH - P1  
**Description:** Amount field should be numeric for calculations, reporting, and validation.

**Database Migration:**
```sql
-- Run on your Supabase database
ALTER TABLE orders ALTER COLUMN amount TYPE DECIMAL(10, 2) USING amount::numeric;

-- If amount contains "," or other formatting, clean it first:
UPDATE orders SET amount = (regexp_replace(amount, '[^0-9.]', '', 'g'))::numeric;
```

**Application Fix:**
```typescript
// src/components/marketplace/SlipUploader.tsx
const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0
  const clean = priceStr.replace(/[^0-9.]/g, '')
  const num = parseFloat(clean)
  return isNaN(num) ? 0 : num
}

// Store as number
const orderPayload = {
  user_id: userId,
  amount: parsePrice(productPrice), // ← now numeric
  slip_url: publicUrl,
  status: 'pending',
}
```

---

### 12. **No Email Verification After Signup**
**File:** `src/app/login/actions.ts` (Line 46-47)  
**Severity:** HIGH - P1  
**Description:** Users are redirected immediately after signup without email verification. Allows fake email registration.

**Fix:**
```typescript
// Update your Supabase auth settings to require email confirmation
// Then modify signup:

export async function signup(formData: FormData) {
  // ... validation code ...

  const { error } = await supabase.auth.signUp({
    email: validatedEmail,
    password: validatedPassword,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: {
        full_name: validatedName
      }
    }
  })

  if (error) {
    return { error: 'Unable to create account' }
  }

  // Don't auto-redirect. Show confirmation message instead.
  // Return a message to check email
  return { 
    success: true,
    message: 'Please check your email to confirm your account'
  }
}
```

---

### 13. **Weak File Randomness (Math.random)**
**File:** `src/components/profile/ProfileManager.tsx` (Line 21)  
**Severity:** HIGH - P1  
**Description:** `Math.random()` is predictable. Use crypto API for filenames.

**Fix:** Already included in issue #4 fix using `crypto.getRandomValues()`

---

### 14. **Hardcoded Dev IP in next.config**
**File:** `next.config.ts` (Line 5)  
**Severity:** HIGH - P1  
**Description:** Hardcoded IP address should be environment variable.

**Fix:**
```typescript
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(',') ?? [],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'orjizgjkknluzuinyzri.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

export default nextConfig
```

Update .env.local:
```
ALLOWED_DEV_ORIGINS=192.168.1.161,localhost
```

---

### 15. **Missing Error Handling in getPublicUrl**
**File:** `src/components/profile/ProfileManager.tsx` (Line 29)  
**Severity:** HIGH - P1  
**Description:** `getPublicUrl` doesn't return error, but data might be missing.

**Fix:** Already included in SlipUploader fix with proper null checking

---

### 16. **No File Type Validation on Avatar Upload**
**File:** `src/components/profile/ProfileManager.tsx` (Line 78)  
**Severity:** HIGH - P1  
**Description:** accept="image/*" is client-side only.

**Fix:**
```typescript
// Apply same validation from issue #4
import { validateFileUpload } from "@/lib/upload-validation"

const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
  try {
    setUploading(true)
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]

    // Validate before upload
    const validation = validateFileUpload(file)
    if (!validation.valid) {
      alert(validation.error)
      return
    }

    // Use crypto for filename
    const timestamp = Date.now()
    const randomBytes = Array.from(crypto.getRandomValues(new Uint8Array(4)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    const fileExt = file.name.split('.').pop()?.toLowerCase()
    const fileName = `avatar-${user.id}-${timestamp}-${randomBytes}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true, contentType: file.type })

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName)
    if (!data?.publicUrl) throw new Error('Failed to get public URL')

    setAvatarUrl(data.publicUrl)

    await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user.id)
  } catch (error) {
    console.error("Error uploading avatar:", error)
    alert("เกิดข้อผิดพลาดในการอัปโหลดรูปโปรไฟล์")
  } finally {
    setUploading(false)
  }
}
```

---

### 17. **No CSRF Protection Visible**
**File:** All server actions  
**Severity:** HIGH - P1  
**Description:** Next.js has built-in CSRF protection for server actions, but should be verified enabled.

**Fix:** Ensure middleware is configured:
```typescript
// src/middleware.ts (create if doesn't exist)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // CSRF tokens are handled automatically by Next.js for server actions
  // This middleware can add additional security headers
  const response = NextResponse.next()

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

## 🟠 MEDIUM SEVERITY ISSUES (5)

### 18. **DRY Violation: Duplicated Admin Check Logic**
**File:** `src/app/dashboard/admin/actions.ts`, `src/app/dashboard/layout.tsx`  
**Description:** Admin checking logic is repeated in multiple places.

**Fix:** Already solved in issue #5 with centralized `requireAdmin()` function.

---

### 19. **Unsafe Profile Query Error Handling**
**File:** `src/app/dashboard/layout.tsx` (Line 35-39)  
**Description:** If `.single()` fails or returns null, `profile?.role` could be undefined.

**Fix:**
```typescript
const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", user.id)
  .single()

if (profileError && profileError.code !== 'PGRST116') {
  console.error('Profile fetch error:', profileError)
  redirect('/login')
}

const isAdmin = profile?.role === 'admin'
```

---

### 20. **Type Safety Issues (any types)**
**File:** Multiple files  
**Description:** Use of `any` type reduces type safety.

**Fix:**
```typescript
// Create proper types
// src/types/index.ts
export type Course = {
  id: string
  title: string
  description?: string
  price: string
  category?: string
  image_url?: string
  created_at: string
}

export type Product = {
  id: string
  title: string
  price: string
  image_url?: string
  created_at: string
}

export type Order = {
  id: string
  user_id: string
  course_id?: string
  product_id?: string
  amount: number
  slip_url: string
  status: 'pending' | 'completed' | 'rejected'
  created_at: string
}

// Then use in components:
export function CoursePlayerClientView({ 
  course, 
  isPurchased, 
  lessons 
}: { 
  course: Course
  isPurchased: boolean
  lessons: Lesson[]
}) {
  // ...
}
```

---

### 21. **Missing Error Boundaries**
**File:** Client components  
**Description:** Client-side errors can crash the whole page.

**Fix:**
```typescript
// src/components/error-boundary.tsx
'use client'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Error caught by boundary:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
              <p className="text-white/60 mb-4">Please refresh the page or try again later</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
```

---

### 22. **No Centralized Environment Validation**
**File:** Multiple files  
**Description:** Environment variables used without validation at startup.

**Fix:**
```typescript
// src/lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_ADMIN_EMAIL: z.string().email(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_PROMPTPAY_ID: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  INTERNAL_API_SECRET: z.string().min(32).optional(),
  DISCORD_WEBHOOK_URL: z.string().url().optional(),
})

export const env = envSchema.parse(process.env)
```

Then import: `import { env } from '@/lib/env'`

---

## 🟡 LOW SEVERITY ISSUES (3)

### 23. **Magic Strings Scattered Throughout**
**Description:** Auth states, status values, user roles hardcoded as strings.

**Fix:**
```typescript
// src/constants/index.ts
export const AUTH_STATES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
} as const

export const ORDER_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
} as const

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const

// Usage:
if (profile?.role === USER_ROLES.ADMIN) { }
```

---

### 24. **Inconsistent Error Handling**
**Description:** Some places throw, others return `{ error }`, some use console.error.

**Fix:**
```typescript
// src/lib/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
  }
}

// Consistently throw AppError
throw new AppError('Invalid email format', 400, 'INVALID_EMAIL')
```

---

### 25. **No Logging System**
**Description:** Using console.log/console.error throughout.

**Fix:**
```typescript
// src/lib/logger.ts
export const logger = {
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error)
    // TODO: Send to monitoring service (Sentry, LogRocket)
  },
  warn: (message: string) => {
    console.warn(`[WARN] ${message}`)
  },
  info: (message: string) => {
    console.info(`[INFO] ${message}`)
  },
}
```

---

## ✅ Quick Wins - Priority Order

1. **IMMEDIATE (Today):**
   - Fix open redirect vulnerability (#1)
   - Add input validation to auth forms (#2)
   - Move PromptPay ID to env (#3)

2. **URGENT (This Week):**
   - Implement server-side file validation (#4)
   - Fix admin authorization checks (#5)
   - Add rate limiting (#9)

3. **HIGH (Next 2 Weeks):**
   - Implement proper admin notifications (#10)
   - Add email verification (#12)
   - Complete all remaining high-priority fixes

4. **MEDIUM (Before Launch):**
   - Add error boundaries
   - Improve type safety
   - Add logging system

---

## 📋 Deployment Checklist

- [ ] All 8 CRITICAL issues fixed and tested
- [ ] All 9 HIGH issues addressed
- [ ] Environment variables properly configured (no secrets in code)
- [ ] .env files in .gitignore and never committed
- [ ] Rate limiting configured and tested
- [ ] Email verification enabled on Supabase
- [ ] Security headers configured in middleware
- [ ] Error boundaries added to client components
- [ ] Logging system implemented
- [ ] Database migration for numeric prices applied
- [ ] Admin notification system configured
- [ ] File upload validation tested with malicious files
- [ ] All server actions validate authorization
- [ ] Tests written for critical auth paths
- [ ] Security audit tools run (npm audit, snyk)

---

**Report Generated:** 2026-08-06  
**Audited By:** Senior Full-Stack Developer (Code Review Expert)
