import { Company } from "@/types/company";
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

//addCompany
export const createCompanyRequest = async (companyData: Partial<Company>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(companyData),
  });

  return res.json();
};
