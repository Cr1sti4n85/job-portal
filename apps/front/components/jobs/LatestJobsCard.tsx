import { Job } from "@/types/jobs";
import Image from "next/image";
import { Badge } from "../ui/badge";

const LatestJobsCard = ({ job }: { job: Job }) => {
  return (
    <div className="p-4 rounded-ee-2xl rounded-ss-2xl text-yellow-400 shadow-xl flex flex-col gap-4 bg-black/40 hover:outline hover:outline-gray-400/80 cursor-pointer">
      <div className="flex justify-between gap-3 items-center">
        <div>
          <h2 className="text-lg font-medium whitespace-wrap">
            {job.company.name}
          </h2>
          <Image src={"/developer.png"} alt="" width={50} height={50} />
        </div>
        <div>
          <h2 className="font-bold text-2xl">{job.title}</h2>
          <p className="text-sm text-white">{job.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Badge className="bg-gray-200 font-bold" variant={"secondary"}>
          {job.position} vacantes
        </Badge>
        <Badge className="bg-gray-200 font-bold" variant={"secondary"}>
          {job.jobType}
        </Badge>
        <Badge className="bg-gray-200 font-bold" variant={"secondary"}>
          ${job.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCard;
