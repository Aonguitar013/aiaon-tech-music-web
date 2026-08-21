/**
 * TypeScript type definitions for the application
 * Provides type safety and better IDE support
 */

/**
 * Database models
 */
export interface User {
  id: string
  email: string
  created_at: string
}

export interface Profile {
  id: string
  user_id: string
  role: 'user' | 'admin'
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  description: string | null
  price: string // stored as string in DB, parse to number when needed
  category: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  title: string
  description: string | null
  price: string
  category: string | null
  image_url: string | null
  created_at: string
  updated_at: string
}

export interface Lesson {
  id: string
  course_id: string
  title: string
  description: string | null
  video_url: string | null
  order: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  course_id: string | null
  product_id: string | null
  amount: number // stored as numeric in DB
  slip_url: string | null
  status: 'pending' | 'completed' | 'rejected'
  created_at: string
  updated_at: string
}

/**
 * API Response types
 */
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  pages: number
}

/**
 * Form submission results
 */
export interface FormResult<T = any> {
  success: boolean
  data?: T
  error?: string
  errors?: Record<string, string>
}

/**
 * Authentication responses
 */
export interface AuthResult {
  success: boolean
  error?: string
  message?: string
}

export interface LoginResult extends AuthResult {
  redirectUrl?: string
}

export interface SignupResult extends AuthResult {
  message?: string
}

/**
 * File upload types
 */
export interface FileUploadResult {
  success: boolean
  fileName: string
  publicUrl?: string
  error?: string
}

/**
 * Component Props types
 */
export interface AuthLayoutProps {
  children: React.ReactNode
}

export interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Utility types
 */
export type Optional<T> = T | null | undefined

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type AsyncResult<T> = Promise<[T, null] | [null, Error]>

/**
 * Supabase client types for better type safety
 */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: DeepPartial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>
      }
      courses: {
        Row: Course
        Insert: Omit<Course, 'id' | 'created_at' | 'updated_at'>
        Update: DeepPartial<Omit<Course, 'id' | 'created_at' | 'updated_at'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>
        Update: DeepPartial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>
      }
      lessons: {
        Row: Lesson
        Insert: Omit<Lesson, 'id' | 'created_at' | 'updated_at'>
        Update: DeepPartial<Omit<Lesson, 'id' | 'created_at' | 'updated_at'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at'>
        Update: DeepPartial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
}
