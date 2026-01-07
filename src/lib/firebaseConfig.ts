// Firebase Configuration Storage with Encryption
import { encryptJSON, decryptJSON, type EncryptedData } from './crypto';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

const STORAGE_KEY = 'encrypted_firebase_config';

// حفظ التكوين المشفر
export async function saveFirebaseConfig(config: FirebaseConfig, passphrase: string): Promise<void> {
  const encrypted = await encryptJSON(config, passphrase);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(encrypted));
}

// تحميل التكوين المشفر
export function loadEncryptedFirebaseConfig(): EncryptedData | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as EncryptedData;
  } catch {
    return null;
  }
}

// فك تشفير التكوين
export async function decryptFirebaseConfig(passphrase: string): Promise<FirebaseConfig | null> {
  const encrypted = loadEncryptedFirebaseConfig();
  if (!encrypted) return null;
  try {
    return await decryptJSON<FirebaseConfig>(encrypted, passphrase);
  } catch (e) {
    console.error('Failed to decrypt Firebase config:', e);
    return null;
  }
}

// حذف التكوين المشفر
export function clearFirebaseConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// التحقق من وجود تكوين محفوظ
export function hasFirebaseConfig(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

// تصدير متغيرات البيئة (إن وجدت)
export const firebaseEnv = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

export const isFirebaseEnvConfigured = Boolean(
  firebaseEnv.apiKey &&
  firebaseEnv.authDomain &&
  firebaseEnv.projectId &&
  firebaseEnv.appId
);
