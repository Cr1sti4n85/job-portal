import { redirect } from "next/navigation";
import { getUser } from "@/actions/user";

export const requireUser = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
};

//for login page
export const requireUserAndRole = async () => {
  const user = await getUser();
  if (user) {
    if (user?.role === "recruiter") {
      redirect("/dashboard/companies");
    } else if (user?.role === "applicant") {
      redirect("/");
    }
  }
};
