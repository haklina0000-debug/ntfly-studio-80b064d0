// دوال تشفير/فك تشفير باستخدام Web Crypto API (AES-GCM مع PBKDF2)
// تعليقات: الدوال مصممة للعمل في المتصفح فقط (Front-end).

export interface EncryptedData {
  iv: number[];
  salt: number[];
  cipher: number[];
  ts: number;
}

export async function deriveKeyFromPassphrase(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: 250000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export function toUint8(array: number[] | Uint8Array): Uint8Array {
  return new Uint8Array(array);
}

export function ab2str(buf: ArrayBuffer): string {
  return new TextDecoder().decode(new Uint8Array(buf));
}

export function str2ab(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

export async function encryptJSON(payload: unknown, passphrase: string): Promise<EncryptedData> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKeyFromPassphrase(passphrase, salt);
  const dataToEncrypt = str2ab(JSON.stringify(payload));
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    dataToEncrypt as BufferSource
  );
  return {
    iv: Array.from(iv),
    salt: Array.from(salt),
    cipher: Array.from(new Uint8Array(cipherBuffer)),
    ts: Date.now()
  };
}

export async function decryptJSON<T = unknown>(encrypted: EncryptedData, passphrase: string): Promise<T> {
  const iv = toUint8(encrypted.iv);
  const salt = toUint8(encrypted.salt);
  const cipher = toUint8(encrypted.cipher);
  const key = await deriveKeyFromPassphrase(passphrase, salt);
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    cipher as BufferSource
  );
  const text = ab2str(plain);
  return JSON.parse(text) as T;
}

// دالة لتشفير نص بسيط
export async function encryptText(text: string, passphrase: string): Promise<EncryptedData> {
  return encryptJSON(text, passphrase);
}

// دالة لفك تشفير نص بسيط
export async function decryptText(encrypted: EncryptedData, passphrase: string): Promise<string> {
  return decryptJSON<string>(encrypted, passphrase);
}
