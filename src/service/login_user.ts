import { aesEncrypt, aesDecrypt } from "../helpers/aes";

const loginUser = async (
  email: string,
  password: string
): Promise<{ raw: string; clean: string }> => {
  try {
    const payload = { email, password };
    console.log(`Raw Payload (Before Encrypt): ${payload}`);

    const encryptedPayload = aesEncrypt(JSON.stringify(payload));
    console.log(`Cipher Payload (After Encrypt): ${encryptedPayload}`);

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      body: encryptedPayload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const encryptedResponse = await response.text();
    const decryptedResponse = aesDecrypt(encryptedResponse);
    const data = JSON.parse(decryptedResponse);
    localStorage.setItem("auth", "granted");
    return { raw: encryptedResponse, clean: JSON.stringify(data) };
  } catch (error) {
    console.error("Error login user:", error);
    return { raw: "None", clean: `${error}` };
  }
};

export default loginUser;
