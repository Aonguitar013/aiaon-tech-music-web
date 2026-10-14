/**
 * Environment variable validation and schema
 * Ensures all required environment variables are properly configured at runtime
 */
import { z } from 'zod'

const envSchema = z.object({
  // Supabase Configuration (Required)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anon key is required'),

  // Site Configuration (Required)
  NEXT_PUBLIC_SITE_URL: z.string().url('Invalid site URL'),
  NEXT_PUBLIC_ADMIN_EMAIL: z.string().email('Invalid admin email'),

  // Payment Configuration (Required)
  NEXT_PUBLIC_PROMPTPAY_ID: z.string().min(1, 'PromptPay ID is required'),

  // Maintenance Mode (Optional)
  NEXT_PUBLIC_MAINTENANCE_MODE: z.string().default('false').transform(v => v === 'true'),

  // Development Configuration (Optional)
  ALLOWED_DEV_ORIGINS: z.string().optional().transform(v => v?.split(',').map(s => s.trim()) ?? []),

  // Rate Limiting (Optional)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Internal Security (Optional)
  INTERNAL_API_SECRET: z.string().min(32).optional(),

  // Notifications (Optional)
  DISCORD_WEBHOOK_URL: z.string().url().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  ADMIN_NOTIFICATION_EMAIL: z.string().email().optional(),

  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
})

type Env = z.infer<typeof envSchema>

let validatedEnv: Env

/**
 * Validates and returns environment variables
 * Throws detailed error if validation fails
 */
export function getEnv(): Env {
  if (!validatedEnv) {
    try {
      validatedEnv = envSchema.parse(process.env)
    } catch (error) {
      if (error instanceof z.ZodError) {
        type EnvIssue = { path?: PropertyKey[]; message: string }
        const zodError = error as unknown as { issues?: EnvIssue[]; errors?: EnvIssue[] }
        const issues: EnvIssue[] = zodError.issues || zodError.errors || []
        const missingVars = issues
          .map((e) => `${e.path?.join('.') || 'env'}: ${e.message}`)
          .join('\n')

        throw new Error(`Invalid environment configuration:\n${missingVars}`)
      }
      throw error
    }
  }

  return validatedEnv
}

/**
 * Gets environment variable with fallback
 */
export function getEnvOrThrow(key: keyof Env): string {
  const env = getEnv()
  const value = env[key]

  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`)
  }

  return String(value)
}

/**
 * Checks if running in production
 */
export function isProduction(): boolean {
  return getEnv().NODE_ENV === 'production'
}

/**
 * Checks if running in development
 */
export function isDevelopment(): boolean {
  return getEnv().NODE_ENV === 'development'
}

/**
 * Checks if maintenance mode is enabled
 */
export function isMaintenanceMode(): boolean {
  return getEnv().NEXT_PUBLIC_MAINTENANCE_MODE
}

// Export validated env as default
export const env = getEnv()
