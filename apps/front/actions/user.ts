"use server";
import { Profile } from "@/types/profile";
import { Resume } from "@/types/resume";

export const RegisterUser = async (
  data: FormData,
  profile: Profile,
  resume: Resume,
) => {
  const fullName = data.get("fullName");
  const email = data.get("email");
  const password = data.get("password");
  const phoneNumber = data.get("phoneNumber");
  const profileBio = profile?.profileBio;
  const profilePhoto = profile?.profilePhoto;
  const profileSkills = data.get("profileSkills")?.toString().split(",");
  const profileResume = resume?.profileResume;
  const profileResumeOriginalName = resume?.profileResumeOriginalName;
  const role = data.get("role");

  if (
    !fullName ||
    !email ||
    !password ||
    !phoneNumber ||
    !profileBio ||
    !profilePhoto ||
    !profileSkills ||
    !profileResume ||
    !profileResumeOriginalName ||
    !role
  ) {
    return { error: "Todos los campos son obligatorios" };
  }

  try {
    const res = await fetch(`${process?.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        phoneNumber,
        profileBio,
        profilePhoto,
        profileSkills,
        profileResume,
        profileResumeOriginalName,
        role,
      }),
      cache: "no-cache",
    });

    const user = await res.json();
    return user;
  } catch {
    return { error: "Error al intentar registrar usuario" };
  }
};
