import React, { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

/**
 * An enhanced input field with a label on the top left.
 * @param label
 */
const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  return (
    <label className={"form-control w-full max-w-md "}>
      <div className="label">
        <span className="label-text text-md">{label}</span>
      </div>
      <input
        className="input input-bordered border-gray-300 w-full max-w-md"
        {...props}
      />
    </label>
  );
};

export default TextField;
