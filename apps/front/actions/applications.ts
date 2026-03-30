"use server";
import API from "@/config/http";
import { Application } from "@/types/application";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export const getApplicants = async (jobId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.get(`/application/${jobId}`, {
      headers: {
        Cookie: `access_token=${token?.value}`,
      },
    });

    return res.data;
  } catch (e: AxiosError | unknown) {
    console.log({ error: e });
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "Error al obtener postulaciones" };
    }
  }
};

//get user applied jobs
type AppliedJobsResponse = {
  applications: Application[];
  success: boolean;
  message: string;
  error?: string;
};
export const getAppliedJobs = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.get("/application", {
      headers: {
        Cookie: `access_token=${token?.value}`,
      },
    });
    const data: AppliedJobsResponse = res.data;
    return data;
  } catch (e: AxiosError | unknown) {
    console.log({ error: e });
    if (e instanceof AxiosError) {
      return {
        error: e?.response?.data?.message || e.message,
      } as AppliedJobsResponse;
    } else {
      return {
        error: "No se pudo obtener tus postulaciones",
      } as AppliedJobsResponse;
    }
  }
};
