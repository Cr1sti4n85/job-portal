import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

type FormInputProps = {
  label: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  defaultValue?: string;
};

const FormInput = ({
  label,
  type,
  value,
  onChange,
  name,
  placeholder,
  defaultValue,
}: FormInputProps) => {
  return (
    <div className="my-1">
      <Label htmlFor={name} className="mb-2">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default FormInput;
