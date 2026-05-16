import { getUserFavorites } from "@/actions/jobs";
import LatestJobsCard from "@/components/jobs/LatestJobsCard";
import Link from "next/link";

const FavoritesPage = async () => {
  const data = await getUserFavorites();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-20">
      <h1 className="text-xl font-bold p-5">Favoritos</h1>
      <div className="grid grid-cols-3 gap-4 p-3">
        {data?.jobs?.length > 0 ? (
          data.jobs.map((job) => (
            <Link href={`/job/${job.id}`} key={job.id} className="col-span-1">
              <LatestJobsCard job={job} />
            </Link>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No has agregado ningún empleo a tus favoritos.
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
