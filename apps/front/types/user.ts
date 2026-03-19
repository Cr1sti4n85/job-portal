import { Application } from "./application";

export interface LoggedUser {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileBio?: string;
  profileSkills?: string[];
  profileResume?: string;
  profileResumeOriginalName?: string;
  profileCompanyId?: string;
  profilePhoto?: string;
  role: string;
  applications?: Application[];
  createdAt: Date;
  updatedAt: Date;
}
