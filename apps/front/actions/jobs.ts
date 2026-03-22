"use server";
import API from "@/config/http";
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
    console.log({ error: e });
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
