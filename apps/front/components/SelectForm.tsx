import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectFormProps } from "@/types/selectForm";

const SelectForm = ({ name, placeholder, list }: SelectFormProps) => {
  return (
    <div className="my-3">
      <Select name={name}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Selecciona el rol</SelectLabel>
            {list.map((item, idx) => (
              <SelectItem key={idx} value={name === "role" ? item : ""}>
                {name === "role" && item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectForm;
