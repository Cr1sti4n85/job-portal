"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import { deleteCompanyRequest } from "@/lib/apiRequests";
import { Company } from "@/types/company";
import { toast } from "sonner";

type Props = PropsWithChildren<{
  company?: Company;
  setCompanies: (companies: Company[]) => void;
  companies: Company[];
}>;

const DeleteCompany = ({
  children,
  company,
  setCompanies,
  companies,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const deleteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!company?.id) {
      return;
    }
    try {
      const data = await deleteCompanyRequest(company?.id);
      if (data?.success) {
        toast.success(data.message);
        setCompanies(companies?.filter((c) => c.id !== company?.id));
        setOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Ocurrió un error");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Eliminar</DialogTitle>
          <DialogDescription className="my-10 text-center font-bold text-yellow-400 text-xl">
            ¿Desea eliminar esta compañía?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={deleteHandler}>
          <div className="flex justify-end mt-2">
            <Button type="submit" className="p-2 bg-red-700">
              Eliminar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCompany;
