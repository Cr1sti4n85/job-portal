"use server";
import { Profile } from "@/types/profile";
import { Resume } from "@/types/resume";
import { LoggedUser } from "@/types/user";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const RegisterUser = async (
  formData: FormData,
  profile: Profile,
  resume: Resume,
) => {
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const password = formData.get("password");
  const phoneNumber = formData.get("phoneNumber");
  const profileBio = profile?.profileBio;
  const profilePhoto = profile?.profilePhoto;
  const profileSkills = formData.get("profileSkills")?.toString().split(",");
  const profileResume = resume?.profileResume;
  const profileResumeOriginalName = resume?.profileResumeOriginalName;
  let role = formData.get("role");

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

  role = role === "postulante" ? "applicant" : "recruiter";

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

  const data = await res.json();
  if (data?.error) return data;

  redirect("/login");
};

export const LoginUser = async (formdData: FormData) => {
  const email = formdData.get("email");
  const password = formdData.get("password");
  let role = formdData.get("role");

  if (!email || !password || !role) {
    return { error: "Todos los campos son obligatorios" };
  }

  role = role === "postulante" ? "applicant" : "recruiter";

  const res = await fetch(`${process?.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      role,
    }),
  });

  const data = await res.json();
  if (data?.error) return data;

  const setCookieHeader = res.headers.get("set-cookie");

  if (setCookieHeader) {
    const cookieStore = await cookies();

    const [nameValue, ...attributes] = setCookieHeader
      .split(";")
      .map((s) => s.trim());
    const [cookieName, cookieValue] = nameValue.split("=");

    const maxAge = attributes
      .find((a) => a.toLowerCase().startsWith("max-age"))
      ?.split("=")[1];
    const path = attributes
      .find((a) => a.toLowerCase().startsWith("path"))
      ?.split("=")[1];
    const httpOnly = attributes.some((a) => a.toLowerCase() === "httponly");
    const secure = attributes.some((a) => a.toLowerCase() === "secure");
    const sameSite = attributes
      .find((a) => a.toLowerCase().startsWith("samesite"))
      ?.split("=")[1] as "strict" | "lax" | "none" | undefined;

    cookieStore.set(cookieName, cookieValue, {
      httpOnly,
      secure,
      sameSite,
      path: path ?? "/",
      ...(maxAge && { maxAge: parseInt(maxAge) }),
    });
  }

  if (role === "recruiter") {
    redirect("/dashboard/companies");
  } else {
    redirect("/");
  }
};

export const getUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");

    const res = await fetch(`${process?.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: {
        Cookie: `access_token=${token?.value}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const data: LoggedUser = await res.json();

    return data;
  } catch {
    return null;
  }
};

// update user profile
export const updateUserProfile = async (
  data: FormData,
  profilePhoto: string,
  profileResume: string,
) => {
  const fullName = data.get("fullName");
  const phoneNumber = data.get("phoneNumber");
  const email = data.get("email");
  const profileSkills = data.get("profileSkills")?.toString().split(",");

  if (!fullName || !phoneNumber || !email) {
    return {
      error: "El nombre, el email y el contacto telefónico son obligatorios",
    };
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token");
    const res = await fetch(`${process?.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token?.value}`,
      },
      method: "PUT",
      body: JSON.stringify({
        fullName,
        phoneNumber,
        email,
        profilePhoto,
        profileSkills: profileSkills || undefined,
        profileResume,
      }),
      cache: "no-store",
    });
    const data = await res.json();
    revalidatePath("/profile");
    return data;
  } catch (error) {
    return null;
  }
};
