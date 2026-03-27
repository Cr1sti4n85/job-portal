import { Company } from "@/types/company";
import { Job } from "@/types/jobs";
import { LoggedUser } from "@/types/user";

//Login
export const loginRequest = async (userData: Partial<LoggedUser>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
    credentials: "include",
  });

  return res.json();
};

export const logoutRequest = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    cache: "no-cache",
    credentials: "include",
  });
  return res.json();
};

type CompanyResponse = {
  company: Company;
  message: string;
  success: boolean;
};

//Company
export const createCompanyRequest = async (companyData: Partial<Company>) => {
  const { name, description, logo, website, location } = companyData;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      description: description || undefined,
      logo: logo || undefined,
      website: website || undefined,
      location: location || undefined,
    }),
  });

  const data: CompanyResponse = await res.json();

  return data;
};

export const updateCompanyRequest = async (
  companyData: Partial<Company>,
  companyId: string,
) => {
  const { name, description, logo, website, location } = companyData;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        description: description || undefined,
        logo: logo || undefined,
        website: website || undefined,
        location: location || undefined,
      }),
    },
  );
  const data: CompanyResponse = await res.json();

  return data;
};

export const deleteCompanyRequest = async (companyId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const data: CompanyResponse = await res.json();

  return data;
};

//Jobs

type JobResponse = {
  job: Job;
  message: string;
  success: boolean;
};
export const createJobRequest = async (jobData: Partial<Job>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(jobData),
  });

  const data: JobResponse = await res.json();

  return data;
};

export const updateJobRequest = async (
  jobData: Partial<Job>,
  jobId: string,
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${jobId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(jobData),
  });
  const data: JobResponse = await res.json();

  return data;
};

export const deleteJobRequest = async (jobId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/jobs/${jobId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const data: JobResponse = await res.json();

  return data;
};
