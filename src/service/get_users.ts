import { aesDecrypt } from "../helpers/aes";

const getUsers = async (): Promise<{
  raw: string;
  clean: string;
}> => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const encryptedResponse = await response.text();
    console.log("Encrypted Response Received:", encryptedResponse);

    if (!encryptedResponse) {
      throw new Error("Empty response received from server");
    }

    const decryptedResponse = aesDecrypt(encryptedResponse);
    console.log("Decrypted Response:", decryptedResponse);

    if (!decryptedResponse) {
      throw new Error("Failed to decrypt the response");
    }

    let data;
    try {
      data = JSON.parse(decryptedResponse);
      console.log("Parsed Data:", data);
    } catch (jsonError) {
      throw new Error(`Failed to parse JSON: ${jsonError}`);
    }

    return { raw: encryptedResponse, clean: JSON.stringify(data, null, 2) };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { raw: "None", clean: `${error}` };
  }
};

export default getUsers;
