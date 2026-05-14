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

export const createCompany = async (companyData: Partial<Company>) => {
  const { name, description, logo, website, location } = companyData;
  if (!name) {
    return { error: "El nombre es obligatorio" };
  }
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  try {
    const res = await API.post(
      `${process.env.NEXT_PUBLIC_API_URL}/company`,
      { name, description, logo, website, location },
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
          "Content-Type": "application/json",
        },
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

export const updateCompany = async (
  companyData: Partial<Company>,
  id: string,
) => {
  const { name, description, logo, website, location } = companyData;
  if (!name) {
    return { error: "El nombre es obligatorio" };
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/${id}`,
      { name, description, logo, website, location },
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
          "Content-Type": "application/json",
        },
      },
    );
    revalidatePath("/dashboard/companies");
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "No se pudo actualizar el registro" };
    }
  }
};

export const deleteCompany = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await API.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/company/${id}`,
      {
        headers: {
          Cookie: `access_token=${token?.value}`,
        },
      },
    );
    revalidatePath("/dashboard/companies");
    return res.data;
  } catch (e: AxiosError | unknown) {
    if (e instanceof AxiosError) {
      return { error: e?.response?.data?.message || e.message };
    } else {
      return { error: "No se pudo actualizar el registro" };
    }
  }
};
