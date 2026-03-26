export type SelectFormProps<T> = {
  name: keyof T;
  placeholder: string;
  list: string[];
  label?: string;
  data?: T;
  setData?: React.Dispatch<React.SetStateAction<T>>;
};
