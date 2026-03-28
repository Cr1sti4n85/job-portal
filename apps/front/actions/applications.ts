"use server";
import API from "@/config/http";
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
