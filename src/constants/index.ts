/**
 * Application constants
 * Centralized definitions for magic strings, status codes, and configuration
 */

export const AUTH = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MAX_EMAIL_LENGTH: 254,
  MAX_NAME_LENGTH: 100,
  PASSWORD_REQUIREMENTS: {
    minLength: 8,
    requireUppercase: false,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
  },
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

export const ITEM_TYPES = {
  COURSE: 'course',
  PRODUCT: 'product',
} as const

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  DASHBOARD_ACADEMY: '/dashboard/academy',
  DASHBOARD_MARKETPLACE: '/dashboard/marketplace',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_SETTINGS: '/dashboard/settings',
  DASHBOARD_ADMIN: '/dashboard/admin',
  AUTH_CALLBACK: '/auth/callback',
} as const

export const API_ROUTES = {
  ADMIN_NOTIFICATION: '/api/admin-notification',
} as const

export const MESSAGES = {
  AUTH: {
    INVALID_EMAIL_OR_PASSWORD: 'Email or password is incorrect',
    INVALID_CREDENTIALS: 'Invalid email or password format',
    ACCOUNT_EXISTS: 'Email already registered. Please log in.',
    SIGNUP_SUCCESS: 'Please check your email to confirm your account',
    LOGOUT_SUCCESS: 'You have been logged out',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    AUTH_ERROR: 'Authentication failed. Please try again.',
    UNAUTHENTICATED: 'You must be logged in to access this resource',
    UNAUTHORIZED: 'You do not have permission to access this resource',
  },
  FILE_UPLOAD: {
    INVALID_FILE_TYPE: 'File type not allowed',
    FILE_TOO_LARGE: 'File size exceeds maximum limit',
    UPLOAD_FAILED: 'Failed to upload file. Please try again.',
    UPLOAD_SUCCESS: 'File uploaded successfully',
    MAX_SIZE_MESSAGE: (max: string) => `Maximum file size: ${max}`,
  },
  ORDER: {
    INVALID_ORDER_ID: 'Invalid order ID',
    ORDER_NOT_FOUND: 'Order not found',
    ORDER_APPROVED: 'Order approved successfully',
    ORDER_REJECTED: 'Order rejected successfully',
    APPROVE_FAILED: 'Failed to approve order',
    REJECT_FAILED: 'Failed to reject order',
  },
  PROFILE: {
    UPDATE_SUCCESS: 'Profile updated successfully',
    UPDATE_FAILED: 'Failed to update profile',
    AVATAR_UPLOAD_ERROR: 'Error uploading avatar',
  },
  GENERAL: {
    SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
    TRY_AGAIN_LATER: 'Please try again later',
    NO_RESULTS: 'No results found',
    LOADING: 'Loading...',
  },
} as const

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER_ERROR: 'SERVER_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
} as const

export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW_MINUTES: 15,
  SIGNUP_ATTEMPTS: 3,
  SIGNUP_WINDOW_HOURS: 1,
  FILE_UPLOAD_ATTEMPTS: 10,
  FILE_UPLOAD_WINDOW_MINUTES: 60,
} as const

export const REDIRECT_PATHS_WHITELIST = [
  ROUTES.DASHBOARD,
  ROUTES.DASHBOARD_ACADEMY,
  ROUTES.DASHBOARD_MARKETPLACE,
  ROUTES.DASHBOARD_PROFILE,
  ROUTES.DASHBOARD_SETTINGS,
] as const

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

export const CACHE = {
  USER_PROFILE: 60, // seconds
  COURSE_LIST: 300,
  PRODUCT_LIST: 300,
} as const
