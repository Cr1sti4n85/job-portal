import CompaniesTable from "@/components/companies/CompaniesTable";
import { requireUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const CompanyPage = async () => {
  const user = await requireUser();
  if (user.role !== "recruiter") {
    redirect("/");
  }
  return (
    <div className="max-w-6xl mx-auto my-10">
      <CompaniesTable />
    </div>
  );
};

export default CompanyPage;
