import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUsers from "../service/get_users";

const HomePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ raw: string; clean: string }>({
    raw: "",
    clean: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setMessage({ raw: res.raw, clean: res.clean });
    } catch (error) {
      console.error("Error while fetchin users:", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  useEffect(() => {
    if (localStorage.getItem("auth") === "granted") {
      fetchUsers();
      return;
    }

    navigate("/", { replace: true });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold p-5">Home Page</h1>
      <div className="py-7">
        <h3 className="font-bold text-lg">Raw Users (Before Decrypt):</h3>
        <div className="flex justify-between items-center">
          <code className="block w-full truncate bg-gray-100 p-2 rounded text-black">
            {message.raw}
          </code>
          <button
            className="btn btn-sm ml-2"
            onClick={() => copyToClipboard(message.raw)}
          >
            Copy
          </button>
        </div>
      </div>
      <div className="py-4">
        <h3 className="font-bold text-lg">Plain Users (After Decrypt):</h3>
        <div className="flex justify-between items-center">
          <code className="block w-full truncate bg-gray-100 p-2 rounded text-black">
            {message.clean}
          </code>
          <button
            className="btn btn-sm ml-2"
            onClick={() => copyToClipboard(message.clean)}
          >
            Copy
          </button>
        </div>
      </div>
      <p className="p-10" />
      <a
        onClick={() => navigate("/", { replace: true })}
        className="p-1 text-blue-500 link-hover cursor-pointer"
      >
        Go to Login Page
      </a>
    </div>
  );
};

export default HomePage;
