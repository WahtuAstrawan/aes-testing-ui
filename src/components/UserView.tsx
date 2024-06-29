import React from "react";
import { User } from "../types/user";

interface UserViewProps {
  user: User;
}

const UserView: React.FC<UserViewProps> = ({ user }) => {
  const getImageURL = (path: string) => {
    if (path.startsWith("./public")) {
      return `http://localhost:3000${path.replace("./public", "/public")}`;
    } else {
      return path;
    }
  };

  return (
    <li key={user.id} className="py-4 flex">
      <img
        className="h-12 w-12 rounded-full"
        src={getImageURL(user.photo)}
        alt={user.name}
      />
      <div className="ml-5">
        <p className="text-lg text-white">{user.name}</p>
        <p className="text-md text-gray-400">{user.email}</p>
      </div>
    </li>
  );
};

export default UserView;
