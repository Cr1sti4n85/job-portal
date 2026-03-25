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
    </>
  );
};

export default CompaniesTable;
