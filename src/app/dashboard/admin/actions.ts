'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function approveOrder(orderId: string) {
  const supabase = await createClient()

  // RBAC: Verify the caller is an admin before mutating
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthenticated' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin' || user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
  if (!isAdmin) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('orders')
    .update({ status: 'completed' })
    .eq('id', orderId)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/admin')
  return { success: true }
}

export async function rejectOrder(orderId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthenticated' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin' || user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
  if (!isAdmin) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('orders')
    .update({ status: 'rejected' })
    .eq('id', orderId)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/admin')
  return { success: true }
}
