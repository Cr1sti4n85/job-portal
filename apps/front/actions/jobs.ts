"use server";
import API from "@/config/http";
import { Job } from "@/types/jobs";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const applyToJob = async (jobId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.post(
      `/application/${jobId}`,
      {},
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
        },
      },
    );

    revalidatePath(`/job/${jobId}`);
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "Error al intentar postular" };
    }
  }
};

//Add to favorites
export const addToFavorites = async (jobId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.post(
      `/job/favorites/${jobId}`,
      {},
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
        },
      },
    );

    revalidatePath(`/job/${jobId}`);
    return res.data;
  } catch (e: AxiosError | unknown) {
    console.log({ error: e });
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "Error al añadir a favoritos" };
    }
  }
};

export const getJobs = async (): Promise<Job[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Error de red: ${res.status}`);
    }

    const data = await res.json();
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

export const getJobBySearch = async ({
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
    const data = await res.json();
    if (data.error) {
      return { error: data.error };
    }
    return data.jobs;
  } catch (error: any) {
    console.log("getJobByKeyword error", error);
    return { error: error.message };
  }
};

export const getJobsByUserId = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/jobs`, {
      headers: {
        Cookie: `access_token=${token?.value}`,
      },
    });
    revalidatePath("/dashboard/jobs");
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "Error al obtener empleos" };
    }
  }
};
