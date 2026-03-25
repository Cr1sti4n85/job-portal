"use client";
import { PropsWithChildren, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import FormInput from "../FormInput";
import { Company } from "@/types/company";
import SelectForm from "../SelectForm";
import { locations } from "@/lib/filterJobData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import uploadFile from "@/lib/uploadFile";
import { toast } from "sonner";
import { createCompanyRequest, updateCompanyRequest } from "@/lib/apiRequests";

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
  const [open, setOpen] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<{
    name: string;
    description?: string;
    website?: string;
    location?: string;
    logo?: string;
  }>(company ? { ...company } : { name: "", description: "", website: "" });

  const companyHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = company?.id
        ? await updateCompanyRequest(companyData, company.id)
        : await createCompanyRequest(companyData);
      if (data.success) {
        toast.success(data.message);
        if (company?.id) {
          setCompanies(
            companies?.map((c) => (c.id == data.company.id ? data.company : c)),
          );
        } else {
          setCompanies([...companies, data.company]);
        }

        setOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Ocurrió un error");
    } finally {
      setCompanyData({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: "",
      });
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = file?.name?.split(".")?.[0];
    if (!file || !name) {
      return;
    }
    const uploadedFile = await uploadFile(file);
    if (!uploadedFile) {
      toast.error("Error al subir el archivo");
      return;
    }
    setCompanyData({ ...companyData, logo: uploadedFile });
    toast.success("Archivo subido con éxito");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Crear/Modificar</DialogTitle>
          <DialogDescription className="my-10 text-center font-bold text-yellow-400 text-2xl">
            Nombre de la compañía
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={companyHandler}>
          <FormInput
            label="Nombre compañía"
            type="text"
            name="name"
            placeholder="Ingresa nombre"
            defaultValue={company?.name}
            onChange={(e) =>
              setCompanyData({ ...companyData, name: e.target.value })
            }
          />
          <FormInput
            label="Descripción"
            type="text"
            name="description"
            placeholder="Ingresa una descripción"
            defaultValue={company?.description}
            onChange={(e) =>
              setCompanyData({ ...companyData, description: e.target.value })
            }
          />
          <FormInput
            label="Sitio web"
            type="text"
            name="website"
            placeholder="Ingresa la url del sitio web"
            defaultValue={company?.website}
            onChange={(e) =>
              setCompanyData({ ...companyData, website: e.target.value })
            }
          />
          <SelectForm
            name="location"
            placeholder="Ingresa ubicación"
            list={locations}
            data={company}
            setData={setCompanyData}
          />
          {company?.logo && (
            <Avatar className="w-20 h-20">
              <AvatarImage src={company?.logo} />
              <AvatarFallback>{company?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          <div className="">
            <Label htmlFor="logo">Subir logo</Label>
            <Input id="logo" type="file" onChange={handleUpload} />
          </div>
          <div className="flex justify-end mt-2">
            <Button type="submit" className="p-2">
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateCompany;
