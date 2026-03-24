"use client";
import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import { Company } from "@/types/company";

type Props = PropsWithChildren<{
  setCompanies: (companies: Company[]) => void;
  companies: Company[];
  company?: Company;
}>;

const CreateUpdateCompany = ({
  children,
  setCompanies,
  companies,
  company,
}: Props) => {
  const createNewCompany = async (formData: FormData) => {};
  return (
    <Dialog>
      <form>
        <DialogTrigger className="bg-yellow-400 p-2 rounded text-white">
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{children}</DialogTitle>
            <DialogDescription className="my-10 text-center font-bold text-yellow-400 text-2xl">
              Nombre de la compañía
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
        <FormInput
          label="Nombre compañía"
          type="text"
          name="name"
          placeholder="Ingresa nombre"
        />
        <FormInput
          label="Nombre completo"
          type="text"
          name="fullName"
          placeholder="Ingresa tu nombre"
        />
      </form>
    </Dialog>
  );
};

export default CreateUpdateCompany;
