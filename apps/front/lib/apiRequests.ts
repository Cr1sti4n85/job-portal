import { Company } from "@/types/company";

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
