import { User } from 'src/user/entities/user.entity';

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

export interface FavoriteJob {
  id: string;
  jobId: string;
  job: Job;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
