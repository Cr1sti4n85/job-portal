"use server";
import API from "@/config/http";
import { Company } from "@/types/company";
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

export const updateCompany = async (
  formData: FormData,
  logo: string,
  id: string,
) => {
  const name = formData.get("name");
  const description = formData.get("description");
  const website = formData.get("website");
  const location = formData.get("location");

  if (!name) {
    return { error: "El nombre es obligatorio" };
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/${id}`,
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
        },
        name,
        description,
        logo,
        website,
        location,
      },
    );
    revalidatePath("/dashboard/companies");
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "No se pudo crear el registro" };
    }
  }
};
