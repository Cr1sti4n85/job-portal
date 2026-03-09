"use client";
import FormInput from "@/components/FormInput";
import SelectForm from "@/components/SelectForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [profile, setProfile] = useState({
    profileBio: "",
    profilePhoto: "",
  });

  const [resume, setResume] = useState({
    profileResume: "",
    profileOriginalResume: "",
  });
  return (
    <div className="flex items-center justify-center">
      <form
        className="
    w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6"
      >
        <h1 className="fonr-bold text-2xl mb-4 text-yellow-400 text-center">
          Registro
        </h1>
        <FormInput
          label="Nombre completo"
          type="text"
          name="fullname"
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
            <div>
              <Avatar>
                <AvatarImage />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <X
                className="absolute -top-1 -right-1 z-10 cursor-pointer"
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
          />
        )}

        <FormInput
          label="Compentencias"
          type="text"
          name="profileSkills"
          placeholder="Ingresa tus compentecias separadas por comas"
        />
        {resume?.profileResume ? (
          <>
            <Label>CV</Label>
            <div>
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
                  setResume({ profileResume: "", profileOriginalResume: "" })
                }
              />
            </div>
          </>
        ) : (
          <FormInput label="Subir CV" type="file" name="picture" />
        )}
        <SelectForm
          name="role"
          placeholder="Selecciona el rol"
          list={["student", "recruiter"]}
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
