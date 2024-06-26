import React, { useState, useRef } from "react";
import Textfield from "../components/Textfield";
import HiddenTextfield from "../components/HiddenTextfield";
import ImageInput from "../components/ImageInput";
import Button from "../components/Button";
import registerUser from "../service/register_user";
import InfoModal from "../components/InfoModal";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [message, setMessage] = useState<{ raw: string; clean: string }>({
    raw: "",
    clean: "",
  });
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageURL(reader.result);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading the file: ", error);
      };
    }
  };

  const handleRegister = async () => {
    try {
      const res = await registerUser(name, email, password, imageURL);
      setMessage({ raw: res.raw, clean: res.clean });
      setName("");
      setEmail("");
      setPassword("");
      setImageURL("");
      if (modalRef.current) {
        modalRef.current.showModal();
      }
    } catch (error) {
      console.error("Error while registering user:", error);
    }
  };

  return (
    <div>
      <h1 className="p-5 font-bold text-3xl">Register Page</h1>
      <br />
      <Textfield hint="Name" value={name} onChange={handleNameChange} />
      <p className="p-2" />
      <Textfield hint="Email" value={email} onChange={handleEmailChange} />
      <p className="p-2" />
      <HiddenTextfield
        hint="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <p className="p-2" />
      <ImageInput hint="Photo Profile" onChange={handleImageChange} />
      <p className="p-2" />
      <Button hint="Register" onClick={handleRegister} />
      <p className="p-10" />
      <a href="/" className="p-1 text-blue-500 link-hover cursor-pointer">
        Go to Login Page
      </a>
      <InfoModal ref={modalRef} message={message} />
    </div>
  );
};

export default RegisterPage;
