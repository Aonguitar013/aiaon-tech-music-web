import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/proxy'

export async function proxy(request: NextRequest) {
  // Fast-path for LINE OA Webhook & API routes so they respond in <50ms without Supabase latency
  if (request.nextUrl.pathname.startsWith('/api/line-webhook')) {
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
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data  (RSC / HMR data routes)
     * - favicon.ico (favicon file)
     */
    '/((?!api/line-webhook|_next/static|_next/image|_next/data|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

