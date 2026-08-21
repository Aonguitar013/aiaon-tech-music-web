# 🚀 Implementation Guide for Code Review Fixes

This guide provides step-by-step instructions to implement the critical security fixes identified in the code audit.

## 📋 Checklist for Implementation

### Phase 1: Critical Fixes (IMMEDIATE - Today)

#### 1. Create New Utility Files ✅
```bash
# Create these files in src/lib/
- auth.ts                   # Centralized auth & authorization
- upload-validation.ts      # File upload validation
- env.ts                    # Environment variable validation
- logger.ts                 # Logging utility

# Create other directories
- src/constants/index.ts    # Application constants
- src/middleware.ts         # Security middleware
- src/types/index.ts        # TypeScript definitions
```

**Status:** These files are already created in `src/` directory.

---

#### 2. Update Environment Variables

**File: `.env.local`**
```env
# Existing variables (verify these)
NEXT_PUBLIC_SUPABASE_URL=https://orjizgjkknluzuinyzri.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_k2RQGvkng_AgljxwWNDDvA_ljR9ryxz
NEXT_PUBLIC_ADMIN_EMAIL=aiaon.tech@gmail.com

# Add these new variables
NEXT_PUBLIC_PROMPTPAY_ID=0835399340  # Move from hardcoded value
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_MAINTENANCE_MODE=false
ALLOWED_DEV_ORIGINS=192.168.1.161,localhost

# Optional: For rate limiting
# UPSTASH_REDIS_REST_URL=https://...
# UPSTASH_REDIS_REST_TOKEN=...

# Optional: For internal API security
# INTERNAL_API_SECRET=generate_a_32_char_random_string

# Optional: For admin notifications
# DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

---

#### 3. Fix Auth Callback Route (Open Redirect)

**File: `src/app/auth/callback/route.ts`** - COMPLETE REPLACEMENT

```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { ROUTES } from '@/constants'
import { logger } from '@/lib/logger'

// Define allowed redirect paths to prevent open redirect attacks
const ALLOWED_REDIRECT_PATHS = Object.values(ROUTES).filter(
  route => route.startsWith('/dashboard') || route === '/'
) as string[]

function isValidRedirectPath(path: string): boolean {
  if (!path.startsWith('/')) return false
  const pathOnly = path.split('?')[0]
  return ALLOWED_REDIRECT_PATHS.some(
    allowed => pathOnly === allowed || pathOnly.startsWith(allowed + '/')
  )
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? ROUTES.DASHBOARD

  try {
    // Validate redirect path to prevent open redirect
    if (!isValidRedirectPath(next)) {
      logger.logSecurityEvent(
        `Open redirect attempt blocked: ${next}`,
        'medium',
        { requestOrigin: origin }
      )
      return NextResponse.redirect(`${origin}${ROUTES.DASHBOARD}`)
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
      } else {
        logger.warn('Auth code exchange failed', { error: error.message })
      }
    }

    return NextResponse.redirect(`${origin}${ROUTES.LOGIN}?error=auth-code-error`)
  } catch (error) {
    logger.error('Auth callback error', error as Error)
    return NextResponse.redirect(`${origin}${ROUTES.LOGIN}?error=server-error`)
  }
}
```

---

#### 4. Fix Login/Signup Actions (Input Validation)

**File: `src/app/login/actions.ts`** - COMPLETE REPLACEMENT

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { ROUTES, MESSAGES, AUTH } from '@/constants'
import { logger } from '@/lib/logger'

// Validation schemas
const emailSchema = z.string()
  .email('Invalid email format')
  .max(AUTH.MAX_EMAIL_LENGTH)
  .toLowerCase()

const passwordSchema = z.string()
  .min(AUTH.MIN_PASSWORD_LENGTH, `Password must be at least ${AUTH.MIN_PASSWORD_LENGTH} characters`)
  .max(AUTH.MAX_PASSWORD_LENGTH)

const nameSchema = z.string()
  .min(1, 'Name is required')
  .max(AUTH.MAX_NAME_LENGTH)
  .trim()

interface LoginResult {
  error?: string
  success?: boolean
}

export async function login(formData: FormData): Promise<LoginResult> {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validate inputs
    const validatedEmail = emailSchema.parse(email)
    const validatedPassword = passwordSchema.parse(password)

    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: validatedEmail,
      password: validatedPassword,
    })

    if (error) {
      // Log the attempt
      logger.logAuthEvent('login', validatedEmail, false, {
        errorCode: error.message,
      })

      // Don't expose specific error details
      return { error: MESSAGES.AUTH.INVALID_EMAIL_OR_PASSWORD }
    }

    // Log successful login
    logger.logAuthEvent('login', validatedEmail, true)

    revalidatePath('/', 'layout')
    redirect(ROUTES.DASHBOARD)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.errors[0]
      logger.warn('Login validation failed', {
        field: fieldError.path.join('.'),
        message: fieldError.message,
      })
      return { error: MESSAGES.AUTH.INVALID_CREDENTIALS }
    }

    logger.error('Login error', error as Error)
    return { error: MESSAGES.AUTH.AUTH_ERROR }
  }
}

export async function signup(formData: FormData): Promise<LoginResult> {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    // Validate inputs
    const validatedEmail = emailSchema.parse(email)
    const validatedPassword = passwordSchema.parse(password)
    const validatedName = nameSchema.parse(fullName)

    const supabase = await createClient()

    // Check if email already exists
    const { data: existingUser } = await supabase.auth.admin.getUserByEmail(validatedEmail)
    if (existingUser) {
      logger.warn('Signup attempted with existing email', { email: validatedEmail })
      return { error: MESSAGES.AUTH.ACCOUNT_EXISTS }
    }

    const { error } = await supabase.auth.signUp({
      email: validatedEmail,
      password: validatedPassword,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.AUTH_CALLBACK}`,
        data: {
          full_name: validatedName,
        },
      },
    })

    if (error) {
      logger.logAuthEvent('signup', validatedEmail, false, {
        errorCode: error.message,
      })
      return { error: MESSAGES.AUTH.ACCOUNT_EXISTS }
    }

    logger.logAuthEvent('signup', validatedEmail, true)

    revalidatePath('/', 'layout')
    // Note: Don't auto-redirect. Instead, require email verification.
    // The client should check and redirect after verification is complete.
    return { 
      success: true,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.warn('Signup validation failed', {
        errors: error.errors,
      })
      return { error: MESSAGES.AUTH.INVALID_CREDENTIALS }
    }

    logger.error('Signup error', error as Error)
    return { error: MESSAGES.AUTH.AUTH_ERROR }
  }
}

export async function logout(): Promise<void> {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase.auth.signOut()
    
    logger.logAuthEvent('logout', user?.email, true)
  } catch (error) {
    logger.error('Logout error', error as Error)
  }

  revalidatePath('/', 'layout')
  redirect(ROUTES.LOGIN)
}
```

---

#### 5. Create Admin Actions with Proper Authorization

**File: `src/app/dashboard/admin/actions.ts`** - COMPLETE REPLACEMENT

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { ORDER_STATUS, MESSAGES } from '@/constants'
import { logger } from '@/lib/logger'
import { z } from 'zod'

// Validation schema for order ID
const orderIdSchema = z.string().uuid('Invalid order ID format')

interface AdminActionResult {
  success: boolean
  error?: string
}

export async function approveOrder(orderId: string): Promise<AdminActionResult> {
  try {
    // Verify admin access
    const { user } = await requireAdmin()

    // Validate order ID
    const validatedOrderId = orderIdSchema.parse(orderId)

    const supabase = await createClient()

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: ORDER_STATUS.COMPLETED })
      .eq('id', validatedOrderId)

    if (updateError) {
      logger.error(MESSAGES.ORDER.APPROVE_FAILED, updateError, {
        orderId: validatedOrderId,
        adminId: user.id,
      })
      return { success: false, error: MESSAGES.ORDER.APPROVE_FAILED }
    }

    logger.info('Order approved', {
      orderId: validatedOrderId,
      adminId: user.id,
    })

    revalidatePath('/dashboard/admin')
    return { success: true }
  } catch (error) {
    logger.error('Approve order error', error as Error)

    if (error instanceof z.ZodError) {
      return { success: false, error: MESSAGES.ORDER.INVALID_ORDER_ID }
    }

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, error: MESSAGES.AUTH.UNAUTHORIZED }
    }

    return { success: false, error: MESSAGES.GENERAL.SOMETHING_WENT_WRONG }
  }
}

export async function rejectOrder(orderId: string): Promise<AdminActionResult> {
  try {
    // Verify admin access
    const { user } = await requireAdmin()

    // Validate order ID
    const validatedOrderId = orderIdSchema.parse(orderId)

    const supabase = await createClient()

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: ORDER_STATUS.REJECTED })
      .eq('id', validatedOrderId)

    if (updateError) {
      logger.error(MESSAGES.ORDER.REJECT_FAILED, updateError, {
        orderId: validatedOrderId,
        adminId: user.id,
      })
      return { success: false, error: MESSAGES.ORDER.REJECT_FAILED }
    }

    logger.info('Order rejected', {
      orderId: validatedOrderId,
      adminId: user.id,
    })

    revalidatePath('/dashboard/admin')
    return { success: true }
  } catch (error) {
    logger.error('Reject order error', error as Error)

    if (error instanceof z.ZodError) {
      return { success: false, error: MESSAGES.ORDER.INVALID_ORDER_ID }
    }

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return { success: false, error: MESSAGES.AUTH.UNAUTHORIZED }
    }

    return { success: false, error: MESSAGES.GENERAL.SOMETHING_WENT_WRONG }
  }
}
```

---

#### 6. Create Admin Notification API Route

**File: `src/app/api/admin-notification/route.ts`** (NEW FILE)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { logger } from '@/lib/logger'

interface AdminNotificationPayload {
  orderId: string
  userId: string
  itemType: 'course' | 'product'
  productTitle: string
  slipUrl: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify internal API secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.INTERNAL_API_SECRET}`

    if (authHeader !== expectedAuth) {
      logger.logSecurityEvent('Unauthorized admin notification request', 'medium')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body: AdminNotificationPayload = await request.json()

    const { orderId, userId, itemType, productTitle, slipUrl } = body

    // Send to Discord (if configured)
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [{
              title: '💰 New Payment Slip Uploaded',
              description: `**Order ID:** ${orderId}\n**User:** ${userId}\n**Item:** ${productTitle}\n**Type:** ${itemType}`,
              url: slipUrl,
              color: 0x00ff00,
              timestamp: new Date().toISOString(),
            }],
          }),
        })
      } catch (discordError) {
        logger.warn('Failed to send Discord notification', {
          orderId,
          error: String(discordError),
        })
      }
    }

    // TODO: Send email notification if configured
    // if (process.env.SENDGRID_API_KEY) {
    //   await sendAdminEmail({ orderId, slipUrl })
    // }

    logger.info('Admin notification sent', {
      orderId,
      userId,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Admin notification error', error as Error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

### Phase 2: High-Priority Fixes (This Week)

#### 7. Update Checkout Page with Authorization

See the complete fixed version in `CODE_REVIEW_AUDIT.md` under issue #6.

#### 8. Update SlipUploader with File Validation

See the complete fixed version in `CODE_REVIEW_AUDIT.md` under issue #4.

---

### Phase 3: Medium-Priority Fixes (Next 2 Weeks)

#### 9. Create Error Boundary Component

See example in `CODE_REVIEW_AUDIT.md` under issue #21.

#### 10. Update next.config.ts

```typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Use environment variable instead of hardcoded IP
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(',')?.map(s => s.trim()) ?? [],

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

---

## 📦 Dependencies to Install

```bash
# Required for validation
npm install zod

# Optional but recommended for rate limiting
npm install @upstash/ratelimit @upstash/redis

# Verify these are installed
npm ls react next typescript

# Run security audit
npm audit
npm audit fix --force  # Use with caution
```

---

## 🧪 Testing Checklist

### Security Testing
- [ ] Test open redirect with various payloads: `?next=//evil.com`, `?next=javascript://`
- [ ] Test file upload with: .exe, .php, oversized files
- [ ] Test XSS in forms: `<script>alert('xss')</script>`
- [ ] Test SQL injection: `'; DROP TABLE orders; --`
- [ ] Test unauthorized access to admin pages

### Functional Testing
- [ ] Login with valid credentials
- [ ] Signup with new email
- [ ] File upload success/failure cases
- [ ] Order approval/rejection flow
- [ ] Admin panel access control

### Performance Testing
- [ ] Monitor bundle size after changes
- [ ] Test with slow network (3G throttling)
- [ ] Database query performance

---

## 📋 Database Migrations

```sql
-- Ensure orders table has numeric amount column
ALTER TABLE orders ALTER COLUMN amount TYPE DECIMAL(10, 2) USING amount::numeric;

-- Add indexes for performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Add RLS policies if not already set
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id OR auth.jwt() -> 'user_metadata' ->> 'role' = 'admin');
```

---

## 🚀 Deployment

1. **Test in staging environment** with all fixes
2. **Run security audit tools:**
   - `npm audit`
   - `npm run lint`
   - Manual code review
3. **Enable rate limiting** in production
4. **Configure webhooks** for admin notifications
5. **Monitor logs** for security events
6. **Gradual rollout** (blue-green deployment)
7. **Post-deployment monitoring** for 24 hours

---

## 📞 Support & Questions

For questions about these fixes, refer to:
- `CODE_REVIEW_AUDIT.md` - Detailed findings
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Next.js Security: https://nextjs.org/docs/advanced-features/security-headers

