"use client";
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
}: SelectFormProps<T>) => {
  return (
    <div className="my-3">
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
