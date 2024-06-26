import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_SECRET_KEY);
const iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_AES_IV);
const mode = CryptoJS.mode.CBC;
const padding = CryptoJS.pad.Pkcs7;

const aesEncrypt = (plainText: string): string => {
  try {
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv,
      mode,
      padding,
    });
    return encrypted.toString();
  } catch (error) {
    throw new Error("Error encrypting message");
  }
};

const aesDecrypt = (cipherText: string): string => {
  try {
    const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
      iv,
      mode,
      padding,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new Error("Error decrypting message");
  }
};

export { aesEncrypt, aesDecrypt };
