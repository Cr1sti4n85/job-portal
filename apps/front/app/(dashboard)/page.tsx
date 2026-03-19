import MainSection from "@/components/home/MainSection";
import ShowCategories from "../../components/home/ShowCategories";
import LatestJobs from "@/components/home/LatestJobs";

export default async function Home() {
  const jobs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job`, {
    cache: "no-cache",
  });
  const data = await jobs.json();
  return (
    <div>
      <MainSection />
      <ShowCategories />
      <LatestJobs jobs={data.jobs} />
    </div>
  );
}
