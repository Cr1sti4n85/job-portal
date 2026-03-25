"use client";
import { getUser, RegisterUser } from "@/actions/user";
import FormInput from "@/components/FormInput";
import SelectForm from "@/components/SelectForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import uploadFile from "@/lib/uploadFile";
import { Profile } from "@/types/profile";
import { Resume } from "@/types/resume";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile>({
    profileBio: "",
    profilePhoto: "",
  });

  const [resume, setResume] = useState<Resume>({
    profileResume: "",
    profileResumeOriginalName: "",
  });

  const handleSubmit = async (formData: FormData) => {
    const res = await RegisterUser(formData, profile, resume);
    if (res?.error) {
      toast.error(res.error);
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      const validUser = await getUser();
      if (validUser) {
        if (validUser?.role === "recruiter") {
          router.push("/dashboard/companies");
        } else if (validUser?.role === "applicant") {
          router.push("/");
        }
      }
    };
    verifyUser();
  }, [router]);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const file = e.target.files?.[0];
    const name = file?.name?.split(".")?.[0];

    if (!file) {
      return;
    }
    const uploadedFile = await uploadFile(file);

    if (!name || !uploadedFile) {
      toast.error("Error al subir el archivo");
      return;
    }

    if (type === "profile") {
      setProfile({ profileBio: name, profilePhoto: uploadedFile });
      toast.success("Archivo subido con éxito");
    } else {
      setResume({
        profileResume: uploadedFile,
        profileResumeOriginalName: name,
      });
      toast.success("Archivo subido con éxito");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        action={handleSubmit}
        className="
    w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6"
      >
        <h1 className="fonr-bold text-2xl mb-4 text-yellow-400 text-center">
          Registro
        </h1>
        <FormInput
          label="Nombre completo"
          type="text"
          name="fullName"
          placeholder="Ingresa tu nombre"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
        />
        <FormInput
          label="Teléfono"
          type="text"
          name="phoneNumber"
          placeholder="Ingresa tu número de teléfono"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
        />
        {profile?.profilePhoto ? (
          <>
            <Label>Foto de perfil</Label>
            <div className="h-20 w-20 relative mt-1">
              <Avatar className="w-full h-full">
                <AvatarImage src={profile?.profilePhoto} alt="profile image" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <X
                className="absolute -top-1 -right-1 z-10 cursor-pointer size-4"
                onClick={() => setProfile({ profileBio: "", profilePhoto: "" })}
              />
            </div>
          </>
        ) : (
          <FormInput
            label="Subir foto"
            type="file"
            name="picture"
            placeholder="Sube una imagen"
            onChange={(e) => handleUpload(e, "profile")}
          />
        )}

        <FormInput
          label="Competencias"
          type="text"
          name="profileSkills"
          placeholder="Ingresa tus compentecias separadas por comas"
        />
        {resume?.profileResume ? (
          <>
            <Label>CV</Label>
            <div className="h-20 relative mt-1">
              <object
                width="50%"
                height="50%"
                data={resume?.profileResume}
                type="application/pdf"
              >
                <p>
                  Texto alternativo - incluye un link{" "}
                  <a href={resume?.profileResume}>al PDF</a>{" "}
                </p>
              </object>
              <X
                className="absolute -top-1 -right-1 z-10 cursor-pointer"
                onClick={() =>
                  setResume({
                    profileResume: "",
                    profileResumeOriginalName: "",
                  })
                }
              />
            </div>
          </>
        ) : (
          <FormInput
            label="Subir CV"
            type="file"
            name="picture"
            onChange={(e) => handleUpload(e, "resume")}
          />
        )}
        <SelectForm
          name="role"
          placeholder="Selecciona el rol"
          list={["postulante", "reclutador"]}
        />
        <Button
          type="submit"
          className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/95"
        >
          Registrarse
        </Button>
        <span>
          ¿Ya tienes cuenta? <Link href={"/login"}>Inicia sesión</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
