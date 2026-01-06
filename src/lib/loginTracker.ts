// Login tracking system for admin dashboard access monitoring

export interface LoginRecord {
  userId: string;
  email: string;
  timestamp: number;
  date: string;
  time: string;
  type: 'dashboard' | 'admin';
}

const LOGIN_STORAGE_KEY = 'ntfly_login_records';
const MAX_RECORDS = 100;

/**
 * Get all login records
 */
export function getLoginRecords(): LoginRecord[] {
  try {
    const stored = localStorage.getItem(LOGIN_STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as LoginRecord[];
  } catch {
    return [];
  }
}

/**
 * Record a dashboard login
 */
export function recordLogin(userId: string, email: string, type: 'dashboard' | 'admin' = 'dashboard'): void {
  try {
    const records = getLoginRecords();
    const now = new Date();
    
    const newRecord: LoginRecord = {
      userId,
      email,
      timestamp: now.getTime(),
      date: now.toLocaleDateString('ar-MA'),
      time: now.toLocaleTimeString('ar-MA'),
      type,
    };
    
    // Add new record at the beginning
    records.unshift(newRecord);
    
    // Keep only the last MAX_RECORDS
    const trimmedRecords = records.slice(0, MAX_RECORDS);
    
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(trimmedRecords));
  } catch {
    // Silent fail - don't break the app for tracking
  }
}

/**
 * Get login statistics
 */
export function getLoginStats(): {
  totalLogins: number;
  todayLogins: number;
  weekLogins: number;
  recentRecords: LoginRecord[];
} {
  const records = getLoginRecords();
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const weekMs = 7 * dayMs;
  
  const todayStart = now - dayMs;
  const weekStart = now - weekMs;
  
  return {
    totalLogins: records.length,
    todayLogins: records.filter(r => r.timestamp > todayStart).length,
    weekLogins: records.filter(r => r.timestamp > weekStart).length,
    recentRecords: records.slice(0, 10),
  };
}

/**
 * Clear all login records (admin only)
 */
export function clearLoginRecords(): void {
  localStorage.removeItem(LOGIN_STORAGE_KEY);
}
