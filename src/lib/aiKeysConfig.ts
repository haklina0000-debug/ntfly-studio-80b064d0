// AI Keys Configuration Storage with Encryption
import { encryptJSON, decryptJSON, type EncryptedData } from './crypto';

export interface AIKeysConfig {
  chatgpt: { key: string; enabled: boolean };
  gemini: { key: string; enabled: boolean };
  claude: { key: string; enabled: boolean };
  sonnet: { key: string; enabled: boolean };
}

const STORAGE_KEY = 'encrypted_ai_keys_config';

// حفظ المفاتيح المشفرة
export async function saveAIKeysConfig(config: AIKeysConfig, passphrase: string): Promise<void> {
  const encrypted = await encryptJSON(config, passphrase);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(encrypted));
}

// تحميل المفاتيح المشفرة
export function loadEncryptedAIKeysConfig(): EncryptedData | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as EncryptedData;
  } catch {
    return null;
  }
}

// فك تشفير المفاتيح
export async function decryptAIKeysConfig(passphrase: string): Promise<AIKeysConfig | null> {
  const encrypted = loadEncryptedAIKeysConfig();
  if (!encrypted) return null;
  try {
    return await decryptJSON<AIKeysConfig>(encrypted, passphrase);
  } catch (e) {
    console.error('Failed to decrypt AI keys config:', e);
    return null;
  }
}

// حذف المفاتيح المشفرة
export function clearAIKeysConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// التحقق من وجود مفاتيح محفوظة
export function hasAIKeysConfig(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

// الإعدادات الافتراضية
export const defaultAIKeysConfig: AIKeysConfig = {
  chatgpt: { key: '', enabled: false },
  gemini: { key: '', enabled: false },
  claude: { key: '', enabled: false },
  sonnet: { key: '', enabled: false },
};
