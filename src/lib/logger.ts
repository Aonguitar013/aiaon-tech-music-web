/**
 * Centralized logging utility
 * Provides consistent logging across the application
 * Can be extended to integrate with monitoring services (Sentry, LogRocket, etc.)
 */

export type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
  error?: Error
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatMessage(level: LogLevel, message: string, context?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? ` | ${JSON.stringify(context)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
    }
  }

  /**
   * Log error - use for exceptions and critical issues
   */
  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error(this.formatMessage('error', message, context))
    if (error) {
      console.error(err)
    }

    // TODO: Send to monitoring service (Sentry, etc.)
    // this.sendToMonitoring(logEntry)
  }

  /**
   * Log warning - use for potentially problematic situations
   */
  warn(message: string, context?: Record<string, unknown>) {
    console.warn(this.formatMessage('warn', message, context))

    // TODO: Send to monitoring service if critical
    // this.sendToMonitoring(logEntry)
  }

  /**
   * Log info - use for important application events
   */
  info(message: string, context?: Record<string, unknown>) {
    console.log(this.formatMessage('info', message, context))

    // TODO: Send to logging service for analytics
    // this.sendToLogging(logEntry)
  }

  /**
   * Log debug - use for detailed diagnostic information (dev only)
   */
  debug(message: string, context?: Record<string, unknown>) {
    if (!this.isDevelopment) return

    console.debug(this.formatMessage('debug', message, context))
  }

  /**
   * Log authentication event
   */
  logAuthEvent(action: string, userId?: string, success: boolean = true, context?: Record<string, unknown>) {
    const level = success ? 'info' : 'warn'
    const status = success ? 'success' : 'failed'
    const message = `Auth: ${action} - ${status}`

    this[level](message, {
      userId,
      action,
      success,
      ...context,
    })
  }

  /**
   * Log database operation
   */
  logDbOperation(operation: string, table: string, success: boolean = true, error?: Error) {
    const message = `DB: ${operation} on ${table}`

    if (success) {
      this.debug(message, { operation, table })
    } else {
      this.error(message, error, { operation, table })
    }
  }

  /**
   * Log file upload
   */
  logFileUpload(fileName: string, fileSize: number, success: boolean = true, userId?: string, error?: Error) {
    const message = `File upload: ${fileName}`

    if (success) {
      this.info(message, {
        fileName,
        fileSize,
        userId,
      })
    } else {
      this.error(message, error, {
        fileName,
        fileSize,
        userId,
      })
    }
  }

  /**
   * Log API request
   */
  logApiRequest(method: string, path: string, statusCode: number, duration: number) {
    const level = statusCode >= 400 ? 'warn' : 'debug'
    const message = `API: ${method} ${path} - ${statusCode}`

    this[level](message, {
      method,
      path,
      statusCode,
      duration: `${duration}ms`,
    })
  }

  /**
   * Log security event
   */
  logSecurityEvent(event: string, severity: 'low' | 'medium' | 'high' | 'critical', context?: Record<string, unknown>) {
    const level = severity === 'critical' ? 'error' : severity === 'high' ? 'warn' : 'info'
    const message = `SECURITY: ${event} [${severity.toUpperCase()}]`

    this[level](message, context)

    // TODO: Always send critical security events to monitoring
    // if (severity === 'critical') {
    //   this.sendToMonitoring({ level, message, severity, context })
    // }
  }
}

export const logger = new Logger()
