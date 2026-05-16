import MainSection from "@/components/home/MainSection";
import ShowCategories from "@/components/home/ShowCategories";
import LatestJobs from "@/components/home/LatestJobs";
import { getJobsRequest } from "@/lib/apiRequests";

export default async function Home() {
  const jobs = await getJobsRequest();
  return (
    <div>
      <MainSection />
      <ShowCategories />
      <LatestJobs jobs={jobs} />
    </div>
  );
}
