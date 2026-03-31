import { redirect } from "next/navigation";
import { getUser } from "@/actions/user";

export const requireUser = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
};
