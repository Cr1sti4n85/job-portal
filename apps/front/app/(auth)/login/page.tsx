"use client";

import { LoginUser } from "@/actions/user";
import FormInput from "@/components/FormInput";
import SelectForm from "@/components/SelectForm";
import { Button } from "@/components/ui/button";
import { LoggedUser } from "@/types/user";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useLocalStorage({
    key: "userData",
    defaultValue: {} as LoggedUser,
  });

  useEffect(() => {
    if (user?.role === "recruiter") {
      router.push("/admin/companies");
    } else if (user?.role === "student") {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (formData: FormData) => {
    const res = await LoginUser(formData);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Inicio de sesión exitoso");
      setUser(res.user);
      router.push("/");
    }
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] max-w-7xl mx-auto mb-12">
      <form
        action={handleSubmit}
        className="
    w-1/2 border border-gray-200 rounded p-4 bg-gray-100 my-6"
      >
        <h1 className="fonr-bold text-2xl mb-4 text-yellow-400 text-center">
          Inicia sesión
        </h1>

        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="Ingresa tu correo electrónico"
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
        />

        <SelectForm
          name="role"
          placeholder="Selecciona el rol"
          list={["student", "recruiter"]}
        />
        <Button
          type="submit"
          className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/95"
        >
          Iniciar sesión
        </Button>
        <span>
          ¿No tienes una cuenta? <Link href={"/register"}>Registrate</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
