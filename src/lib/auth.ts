/**
 * Centralized authentication and authorization utilities
 * Ensures consistent security checks across the application
 */
import { createClient } from "@/utils/supabase/server"

export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 401
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

/**
 * Requires user to be authenticated
 * Throws AuthError if not authenticated
 */
export async function requireAuth() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    throw new AuthError('Unauthenticated', 'UNAUTHENTICATED', 401)
  }

  return user
}

/**
 * Requires user to be an admin
 * Throws AuthError if not admin
 */
export async function requireAdmin() {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Check for actual errors (not "not found")
  if (profileError && profileError.code !== 'PGRST116') {
    console.error('Profile fetch error:', profileError)
    throw new AuthError('Failed to verify admin status', 'PROFILE_FETCH_ERROR', 500)
  }

  const isAdmin = profile?.role === 'admin'

  if (!isAdmin) {
    throw new AuthError('Unauthorized: Admin access required', 'UNAUTHORIZED', 403)
  }

  return { user, profile }
}

/**
 * Get user profile with role information
 */
export async function getUserProfile() {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return { user, profile }
}
