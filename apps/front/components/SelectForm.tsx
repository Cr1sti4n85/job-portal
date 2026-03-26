"use client";
import { Label } from "./ui/label";
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

const SelectForm = <T,>({
  name,
  placeholder,
  list,
  data,
  setData,
  label,
}: SelectFormProps<T>) => {
  return (
    <div className="my-3">
      <Label htmlFor={String(name)} className="mb-2">
        {label}
      </Label>
      <Select
        name={String(name)}
        value={data && (data[name] as string)}
        // defaultValue={data && (data[name] as string)}
        onValueChange={(value) =>
          setData &&
          setData((prev) => ({
            ...prev,
            [name]: value,
          }))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Selecciona el rol</SelectLabel>
            {list.map((item, idx) => (
              <SelectItem key={idx} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectForm;
