"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import CreateUpdateCompany from "./CreateUpdateCompany";
import { findCompanies } from "@/actions/companies";
import { toast } from "sonner";
import { Company } from "@/types/company";
import { getUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CompaniesTable = () => {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const verifyRoleAndGetCompanies = async () => {
      const validUser = await getUser();
      if (validUser?.role !== "recruiter") {
        router.push("/");
      } else {
        const result = await findCompanies();
        if (result.success) {
          setCompanies(result.companies);
        } else {
          toast.error(result.error);
        }
      }
    };

    verifyRoleAndGetCompanies();
  }, [router]);

  return (
    <>
      <div className="flex items-center justify-between my-5">
        <Input className="w-fit bg-white" placeholder="Filtrar por nombre" />
        <CreateUpdateCompany setCompanies={setCompanies} companies={companies}>
          <Button variant="outline">Crear compañía</Button>
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
                  <TableCell className="float-right cursor-pointer">
                    <CreateUpdateCompany
                      setCompanies={setCompanies}
                      companies={companies}
                      company={company}
                    >
                      <Button variant="outline">Editar</Button>
                    </CreateUpdateCompany>
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
