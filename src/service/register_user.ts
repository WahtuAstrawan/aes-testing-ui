import { aesEncrypt, aesDecrypt } from "../helpers/aes";

const registerUser = async (
  name: string,
  email: string,
  password: string,
  photo: string
): Promise<string> => {
  try {
    const payload = { name, email, password, photo };
    const encryptedPayload = aesEncrypt(JSON.stringify(payload));

    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      body: encryptedPayload,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const encryptedResponse = await response.text();
    const decryptedResponse = aesDecrypt(encryptedResponse);
    const data = JSON.parse(decryptedResponse);
    return JSON.stringify(data);
  } catch (error) {
    console.error("Error registering user:", error);
    return `${error}`;
  }
};

export default registerUser;
