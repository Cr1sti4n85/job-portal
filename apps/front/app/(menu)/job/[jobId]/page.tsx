import JobDetails from "@/components/jobs/JobDetails";

type JobPageProps = {
  params: Promise<{ jobId: string }>;
};

const JobPage = async ({ params }: JobPageProps) => {
  const { jobId } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${jobId}`, {
    cache: "no-cache",
  });
  const { job } = await res.json();

  return (
    <div className="px-[10%] mx-auto my-10">
      <JobDetails job={job} jobId={job.id} />
    </div>
  );
};

export default JobPage;
