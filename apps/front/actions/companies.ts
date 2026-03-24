"use server";
import API from "@/config/http";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const findCompanies = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.get(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
      headers: {
        Cookie: `access_token=${token?.value}`,
      },
    });
    revalidatePath("/dashboard/companies");
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "Error al obtener compañías" };
    }
  }
};
