import { Job } from "@/types/jobs";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  job?: Job;
  setJobs: (jobs: Job[]) => void;
  jobs: Job[];
}>;

const DeleteJob = () => {
  return <div>DeleteJob</div>;
};

export default DeleteJob;
