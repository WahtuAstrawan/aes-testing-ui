import React from "react";

interface HiddenTextfieldProps {
  hint: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HiddenTextfield: React.FC<HiddenTextfieldProps> = ({
  hint,
  value,
  onChange,
}) => {
  return (
    <input
      type="password"
      placeholder={hint}
      className="input input-bordered w-full max-w-xs"
      value={value}
      onChange={onChange}
    />
  );
};

export default HiddenTextfield;
