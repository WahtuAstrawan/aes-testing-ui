import React from "react";

interface TextfieldProps {
  hint: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textfield: React.FC<TextfieldProps> = ({ hint, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={hint}
      value={value}
      className="input input-bordered w-full max-w-xs"
      onChange={onChange}
    />
  );
};

export default Textfield;
