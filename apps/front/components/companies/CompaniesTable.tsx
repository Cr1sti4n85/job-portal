"use client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import CreateUpdateCompany from "./CreateUpdateCompany";
import { findCompanies } from "@/actions/companies";
import { toast } from "sonner";
import { Company } from "@/types/company";

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
          Crear compañía
        </CreateUpdateCompany>
      </div>
    </>
  );
};

export default CompaniesTable;
