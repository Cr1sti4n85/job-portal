import { getAppliedJobs } from "@/actions/applications";
import { LoggedUser } from "@/types/user";
import Link from "next/link";
import LatestJobsCard from "../jobs/LatestJobsCard";

type Props = {
  user: LoggedUser | null;
};

const AppliedJobs = async ({ user }: Props) => {
  const res = await getAppliedJobs();
  return user?.role === "applicant" ? (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-20">
      <h1 className="text-xl font-bold p-5">Postulaciones realizadas</h1>
      <div className="grid grid-cols-3 gap-4 p-3">
        {res?.applications.length &&
          res.applications.map((app) => (
            <Link key={app.id} href={`/job/${app.jobId}`}>
              <LatestJobsCard job={app.job} />
            </Link>
          ))}
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-20">
      <h1 className="text-xl font-bold p-5">Postulaciones realizadas</h1>
      <p className="p-2">No tienes postulaciones</p>
    </div>
  );
};

export default AppliedJobs;
