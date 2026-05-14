import { Company } from "@/types/company";
import { Job } from "@/types/jobs";

export const logoutRequest = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    cache: "no-cache",
    credentials: "include",
  });
  return res.json();
};

//Company
type CompaniesResponse = {
  companies: Company[];
  success: boolean;
  error?: string;
};
export const findCompaniesRequest = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Error de red: ${res.status}`);
    }
    const data = await res.json();
    return data as CompaniesResponse;
  } catch (e: unknown) {
    return { error: "Error al obtener compañías" } as CompaniesResponse;
  }
};

//Jobs
type JobsResponse = {
  jobs: Job[];
  success: boolean;
  error?: string;
};
export const getJobsRequest = async (): Promise<Job[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Error de red: ${res.status}`);
    }

    const data: JobsResponse = await res.json();
    console.log({ data });
    return data.jobs ?? [];
  } catch (error) {
    console.error("getJobs error:", error);

    return [];
  }
};

type GetJobProps = {
  keyword?: string;
  location?: string;
  jobType?: string;
  salary?: string;
};

export const getJobBySearchRequest = async ({
  keyword,
  location,
  jobType,
  salary,
}: GetJobProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/job?keyword=${keyword || ""}&location=${location || ""}&jobType=${jobType || ""}&salary=${salary || ""}`,
      {
        cache: "no-cache",
      },
    );
    if (!res.ok) {
      throw new Error(`Error de red: ${res.status}`);
    }
    const data: JobsResponse = await res.json();

    return data;
  } catch {
    return { error: "Hubo un problema al hacer la búsqueda" } as JobsResponse;
  }
};

export const getJobsByUserIdRequest = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/jobs`, {
      credentials: "include",
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Error de red: ${res.status}`);
    }
    const data: JobsResponse = await res.json();

    return data;
  } catch {
    return { error: "Hubo un problema al obtener el listado" } as JobsResponse;
  }
};
//Applications
