"use client";
import { PropsWithChildren, useState } from "react";
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
import SelectForm from "../SelectForm";
import { locations } from "@/lib/filterJobData";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import uploadFile from "@/lib/uploadFile";
import { toast } from "sonner";

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
  const [logo, setLogo] = useState<string>(company?.logo || "");
  const createNewCompany = async (formData: FormData) => {};

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

    setLogo(uploadedFile);
    toast.success("Archivo subido con éxito");
  };

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
            <FormInput
              label="Nombre compañía"
              type="text"
              name="name"
              placeholder="Ingresa nombre"
              defaultValue={company?.name}
            />
            <FormInput
              label="Descripción"
              type="text"
              name="description"
              placeholder="Ingresa una descripción"
              defaultValue={company?.description}
            />
            <FormInput
              label="Sitio web"
              type="text"
              name="website"
              placeholder="Ingresa la url del sitio web"
              defaultValue={company?.website}
            />
            <SelectForm
              name="location"
              placeholder="Ingresa ubicación"
              list={locations}
            />
            {logo && (
              <Avatar className="w-20 h-20">
                <AvatarImage src={logo} />
                <AvatarFallback>{company?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <Label htmlFor="logo">Upload logo</Label>
              <Input id="logo" type="file" onChange={handleUpload}></Input>
            </div>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateUpdateCompany;
