"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import CreateUpdateCompany from "./CreateUpdateCompany";
import { findCompanies } from "@/actions/companies";
import { toast } from "sonner";
import { Company } from "@/types/company";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import DeleteCompany from "./DeleteCompany";
import { Edit2, X } from "lucide-react";

const CompaniesTable = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const getCompanies = async () => {
      const result = await findCompanies();
      if (result.success) {
        setCompanies(result.companies);
      } else {
        toast.error(result.error);
      }
    };

    getCompanies();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <Input className="w-fit bg-white" placeholder="Filtrar por nombre" />
        <CreateUpdateCompany setCompanies={setCompanies} companies={companies}>
          <Button variant="outline" className="bg-yellow-500 text-white">
            Crear compañía
          </Button>
        </CreateUpdateCompany>
      </div>
      <Table className="bg-white">
        <TableCaption>Lista de tus compañías</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Logo</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length
            ? companies?.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={company.logo} />
                      <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>
                    {company.createdAt.toString().split("T")[0]}
                  </TableCell>
                  <TableCell className="float-right cursor-pointer flex items-center gap-2">
                    <CreateUpdateCompany
                      setCompanies={setCompanies}
                      companies={companies}
                      company={company}
                    >
                      <Edit2 className="bg-yellow-500 text-white p-1 rounded-md h-7 w-7" />
                    </CreateUpdateCompany>
                    <DeleteCompany
                      company={company}
                      setCompanies={setCompanies}
                      companies={companies}
                    >
                      <X className="bg-red-700 text-white p-1 rounded-md h-7 w-7" />
                    </DeleteCompany>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </>
  );
};

export default CompaniesTable;
