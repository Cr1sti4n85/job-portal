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
  createdAt: Date;
  updatedAt: Date;
};
