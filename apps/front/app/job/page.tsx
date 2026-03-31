import { getJobBySearch } from "@/actions/jobs";
import FilterJobs from "@/components/jobs/FilterJobs";
import JobSearch from "@/components/jobs/JobSearch";
import { FindJobsPageProps, Job } from "@/types/jobs";
import Image from "next/image";

const FindJobsPage = async ({ searchParams }: FindJobsPageProps) => {
  const { keyword, location, jobType, salary } = await searchParams;
  const jobs: Job[] = await getJobBySearch({
    keyword,
    location,
    jobType,
    salary,
  });

  return (
    <div className="p-5 mx-auto">
      <div className="flex gap-5">
        <div className="text-white w-1/5">
          <FilterJobs keyword={keyword} />
        </div>
        {!jobs?.length ? (
          <div className="flex flex-col items-center w-full">
            <Image
              src={"/zero-results.webp"}
              alt="Zero Results"
              width={300}
              height={300}
              loading="eager"
            />
            <p className="text-white">No se encontraron resultados</p>
          </div>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5">
            <div className="grid grid-cols-3 gap-4">
              {jobs?.map((job, idx) => (
                <JobSearch key={idx} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobsPage;
