import JobsTable from "@/components/jobs/JobsTable";
import { requireUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Jobs = async () => {
  const user = await requireUser();
  if (user.role !== "recruiter") {
    redirect("/");
  }
  return (
    <div className="max-w-6xl mx-auto my-10">
      <JobsTable />
    </div>
  );
};

export default Jobs;
