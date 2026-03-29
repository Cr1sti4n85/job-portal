import { Job } from "@/types/jobs";
import Link from "next/link";
import LatestJobsCard from "../jobs/LatestJobsCard";

const LatestJobs = ({ jobs }: { jobs: Job[] }) => {
  return (
    <div className="my-20 max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-white">
        Últimas <span className="text-yellow-400">vacantes</span> de{" "}
        <span className="text-yellow-400">empleos</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {jobs?.length ? (
          jobs.slice(0, 6).map((job) => (
            <Link href={`/job/${job.id}`} key={job.id}>
              <LatestJobsCard job={job} />
            </Link>
          ))
        ) : (
          <p>No hay vacantes</p>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
