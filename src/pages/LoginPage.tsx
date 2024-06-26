import Button from "../components/Button";
import HiddenTextfield from "../components/HiddenTextfield";
import InfoModal from "../components/InfoModal";
import Textfield from "../components/Textfield";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginUser from "../service/login_user";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{ raw: string; clean: string }>({
    raw: "",
    clean: "",
  });
  const modalRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      setMessage({ raw: res.raw, clean: res.clean });
      setEmail("");
      setPassword("");
      if (modalRef.current) {
        modalRef.current.showModal();
      }
    } catch (error) {
      console.error("Error while login user:", error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("auth");
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold p-5">Login Page</h1>
      <br />
      <Textfield hint="Email" value={email} onChange={handleEmailChange} />
      <p className="p-2" />
      <HiddenTextfield
        hint="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <p className="p-2" />
      <Button hint="Login" onClick={handleLogin} />
      {localStorage.getItem("auth") === "granted" ? (
        <>
          <p className="p-2" />
          <a
            onClick={() => navigate("/home")}
            className="p-1 text-blue-500 link-hover cursor-pointer"
          >
            Access Granted!, Go to Home Page
          </a>
        </>
      ) : (
        <></>
      )}
      <p className="p-10" />
      <a
        href="/register"
        className="p-1 text-blue-500 link-hover cursor-pointer"
      >
        Go to Register Page
      </a>
      <InfoModal ref={modalRef} message={message} />
    </div>
  );
};

export default LoginPage;
