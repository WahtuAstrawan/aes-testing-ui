import React from "react";

interface ButtonProps {
  hint: string;
  onClick: () => Promise<void>;
}

const Button: React.FC<ButtonProps> = ({ hint, onClick }) => {
  return (
    <button className="btn btn-primary w-full max-w-xs" onClick={onClick}>
      {hint}
    </button>
  );
};

export default Button;
