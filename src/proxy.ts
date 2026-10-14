import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/proxy'

// Routes whose server code reads the Supabase session (or that must redirect by auth state).
const SESSION_PREFIXES = [
  '/academy',
  '/dashboard',
  '/login',
  '/auth',
  '/api',
  '/courses',
  '/presentation',
  '/merch',
  '/saas',
  '/freebies',
  '/digital-vault',
]

function needsSession(pathname: string) {
  return SESSION_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))
}

export async function proxy(request: NextRequest) {
  // Fast-path for LINE OA Webhook & Signed Download API routes so they respond in <50ms without Supabase latency
  if (
    request.nextUrl.pathname.startsWith('/api/line-webhook') ||
    request.nextUrl.pathname.startsWith('/api/download')
  ) {
    return NextResponse.next()
  }

  // Fast-path for public marketing pages: they never read the session on the
  // server (Navbar resolves auth client-side), so skip the Supabase round-trip
  // and let the CDN serve them from cache.
  if (!needsSession(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // In dev: pass through requests from local network IP without interference.
  // This lets phones on the same Wi-Fi load pages before Supabase cookies
  // are fully established over the local IP address.
  if (process.env.NODE_ENV === 'development') {
    const host = request.headers.get('host') ?? ''
    if (host.startsWith('192.168.')) {
      return NextResponse.next()
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/line-webhook (LINE OA Webhook fast-path)
     * - api/download (Signed Instant Product Delivery fast-path)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data  (RSC / HMR data routes)
     * - favicon.ico (favicon file)
     */
    '/((?!api/line-webhook|api/download|_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

