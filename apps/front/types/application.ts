import { Job } from "./jobs";
import { LoggedUser } from "./user";

export type Application = {
  id: string;
  applicantId: string;
  applicant: LoggedUser;
  jobId: string;
  job: Job;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
