import React from "react";

interface ImageInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hint: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ onChange, hint }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xs">
        <label className="block text-md font-medium text-gray-400 my-2">
          {hint}
        </label>
        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ImageInput;
