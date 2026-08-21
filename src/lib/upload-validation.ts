/**
 * File upload validation utilities
 * Provides both client and server-side validation for secure file uploads
 */

export const ALLOWED_FILE_TYPES = {
  image: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    extensions: ['jpg', 'jpeg', 'png', 'webp'],
    description: 'JPG, PNG, WebP'
  },
  avatar: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    extensions: ['jpg', 'jpeg', 'png', 'webp'],
    description: 'JPG, PNG, WebP'
  }
}

export const MAX_FILE_SIZES = {
  avatar: 3 * 1024 * 1024, // 3MB
  paymentSlip: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
}

export interface FileValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validates file upload against type and size constraints
 * @param file - File object to validate
 * @param maxSize - Maximum file size in bytes
 * @param allowedTypes - Array of allowed MIME types
 */
export function validateFileUpload(
  file: File,
  maxSize: number = MAX_FILE_SIZES.paymentSlip,
  allowedTypes: string[] = ALLOWED_FILE_TYPES.image.mimeTypes
): FileValidationResult {
  // Validate file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Accepted formats: ${ALLOWED_FILE_TYPES.image.description}`
    }
  }

  // Validate file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / 1024 / 1024).toFixed(1)
    const fileSizeMB = (file.size / 1024 / 1024).toFixed(2)
    return {
      valid: false,
      error: `File size must be less than ${maxSizeMB}MB. Current: ${fileSizeMB}MB`
    }
  }

  // Validate file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (
    extension &&
    !ALLOWED_FILE_TYPES.image.extensions.includes(extension)
  ) {
    return {
      valid: false,
      error: 'File extension does not match allowed formats'
    }
  }

  return { valid: true }
}

/**
 * Validates avatar file specifically
 */
export function validateAvatarFile(file: File): FileValidationResult {
  return validateFileUpload(
    file,
    MAX_FILE_SIZES.avatar,
    ALLOWED_FILE_TYPES.avatar.mimeTypes
  )
}

/**
 * Validates payment slip file
 */
export function validatePaymentSlipFile(file: File): FileValidationResult {
  return validateFileUpload(
    file,
    MAX_FILE_SIZES.paymentSlip,
    ALLOWED_FILE_TYPES.image.mimeTypes
  )
}

/**
 * Generates secure random filename
 * @param userId - User ID for file prefix
 * @param extension - File extension (without dot)
 */
export function generateSecureFilename(userId: string, extension: string): string {
  const timestamp = Date.now()
  const randomBytes = Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

  return `${userId}-${timestamp}-${randomBytes}.${extension.toLowerCase()}`
}

/**
 * Get file extension safely
 */
export function getFileExtension(filename: string): string | null {
  const parts = filename.split('.')
  if (parts.length < 2) return null
  return parts[parts.length - 1].toLowerCase()
}
