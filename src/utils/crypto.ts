import CryptoJS from 'crypto-js';

const SECRET_KEY = 'student_registration_system_2026_secure_key';

/**
 * Encrypts data before sending to backend (1st level)
 */
export const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

/**
 * Decrypts data received from backend (final decryption)
 */
export const decryptData = (cipherText: string): any => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) return { error: 'Decryption failed' };
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error('Frontend Decryption Error:', error);
    return { error: 'Malformed data' };
  }
};
