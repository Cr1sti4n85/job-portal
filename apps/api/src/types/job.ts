export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  location: string;
  jobType: string;
  position: number;
  experienceLevel: string;
  companyId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
