import MainSection from "@/components/home/MainSection";
import ShowCategories from "../../components/home/ShowCategories";
import LatestJobs from "@/components/home/LatestJobs";
import { getJobs } from "@/actions/jobs";

export default async function Home() {
  const jobs = await getJobs();
  return (
    <div>
      <MainSection />
      <ShowCategories />
      <LatestJobs jobs={jobs} />
    </div>
  );
}
