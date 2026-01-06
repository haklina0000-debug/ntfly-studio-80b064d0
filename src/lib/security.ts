// Security utilities for input sanitization, XSS protection, and rate limiting

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#x60;')
    .replace(/=/g, '&#x3D;')
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Password too long' };
  }
  return { valid: true };
}

/**
 * Check for potentially malicious patterns in input
 */
export function containsMaliciousPatterns(input: string): boolean {
  const maliciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:\s*text\/html/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /expression\s*\(/gi,
    /eval\s*\(/gi,
  ];
  
  return maliciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Rate limiting storage
 */
interface RateLimitEntry {
  count: number;
  firstAttempt: number;
  blocked: boolean;
  blockedUntil?: number;
}

const rateLimitStore: Map<string, RateLimitEntry> = new Map();

const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,
  windowMs: 60000, // 1 minute
  blockDurationMs: 300000, // 5 minutes
};

/**
 * Check if action is rate limited
 */
export function checkRateLimit(key: string): { allowed: boolean; remainingAttempts: number; blockedUntil?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  
  // No previous attempts
  if (!entry) {
    rateLimitStore.set(key, { count: 1, firstAttempt: now, blocked: false });
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts - 1 };
  }
  
  // Currently blocked
  if (entry.blocked && entry.blockedUntil) {
    if (now < entry.blockedUntil) {
      return { allowed: false, remainingAttempts: 0, blockedUntil: entry.blockedUntil };
    }
    // Block expired, reset
    rateLimitStore.set(key, { count: 1, firstAttempt: now, blocked: false });
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts - 1 };
  }
  
  // Window expired, reset
  if (now - entry.firstAttempt > RATE_LIMIT_CONFIG.windowMs) {
    rateLimitStore.set(key, { count: 1, firstAttempt: now, blocked: false });
    return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts - 1 };
  }
  
  // Within window
  entry.count++;
  
  if (entry.count > RATE_LIMIT_CONFIG.maxAttempts) {
    entry.blocked = true;
    entry.blockedUntil = now + RATE_LIMIT_CONFIG.blockDurationMs;
    rateLimitStore.set(key, entry);
    return { allowed: false, remainingAttempts: 0, blockedUntil: entry.blockedUntil };
  }
  
  rateLimitStore.set(key, entry);
  return { allowed: true, remainingAttempts: RATE_LIMIT_CONFIG.maxAttempts - entry.count };
}

/**
 * Reset rate limit for a key (on successful login)
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

/**
 * Validate and sanitize form data
 */
export function validateFormData(data: Record<string, unknown>): { 
  valid: boolean; 
  sanitized: Record<string, string>; 
  errors: string[] 
} {
  const errors: string[] = [];
  const sanitized: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      if (containsMaliciousPatterns(value)) {
        errors.push(`Invalid input detected in ${key}`);
        continue;
      }
      sanitized[key] = sanitizeInput(value);
    }
  }
  
  return {
    valid: errors.length === 0,
    sanitized,
    errors,
  };
}
