"use server";
import API from "@/config/http";
import { Job } from "@/types/jobs";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createJob = async (jobData: Partial<Job>) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experienceLevel,
    companyId,
    position,
  } = jobData;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.post(
      `${process.env.NEXT_PUBLIC_API_URL}/job`,
      {
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        experienceLevel,
        companyId,
        position,
      },
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
          "Content-Type": "application/json",
        },
      },
    );

    revalidatePath("/dashboard/jobs");
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "Error al crear nuevo empleo" };
    }
  }
};

export const updateJob = async (jobData: Partial<Job>, jobId: string) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experienceLevel,
    companyId,
    position,
  } = jobData;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/job/${jobId}`,
      {
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        experienceLevel,
        companyId,
        position,
      },
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
          "Content-Type": "application/json",
        },
      },
    );
    revalidatePath("/dashboard/jobs");
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "Error al intentar actualizar" };
    }
  }
};

export const deleteJob = async (jobId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/jobs/${jobId}`,
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
        },
      },
    );
    revalidatePath("/dashboard/jobs");
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "No se pudo borrar el registro" };
    }
  }
};

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

type UserFavoritesResponse = {
  success: boolean;
  message: string;
  error?: string;
  jobs: Job[];
};
export const getUserFavorites = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.get(
      `${process.env.NEXT_PUBLIC_API_URL}/job/favorites/all`,
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
        },
      },
    );
    const data: UserFavoritesResponse = res.data;
    return data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      if (e.response?.status === 401) {
        redirect("/login");
      } else {
        return {
          error: e?.response?.data?.message || e.message,
        } as UserFavoritesResponse;
      }
    } else {
      return { error: "Error al obtener empleos" } as UserFavoritesResponse;
    }
  }
};
