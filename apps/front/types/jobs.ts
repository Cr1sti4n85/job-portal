import { Application } from "./application";
import { Company } from "./company";

export type Job = {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  location: string;
  jobType: string;
  experienceLevel: string;
  position: number;
  companyId: string;
  company: Company;
  createdBy: string;
  applications: Application[];
  createdAt: Date;
  updatedAt: Date;
};

export type FindJobsPageProps = {
  searchParams: Promise<{
    keyword?: string;
    location?: string;
    jobType?: string;
    salary?: string;
  }>;
};
