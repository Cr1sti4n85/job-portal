"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LoginUser } from "@/actions/user";
import { toast } from "sonner";
import FormInput from "../FormInput";
import Link from "next/link";

const LoginForm = () => {
  const handleSubmit = async (formData: FormData) => {
    const data = await LoginUser(formData);
    if (data?.error) {
      toast.error(data.error);
    }
  };
  return (
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

      <div className="my-3">
        <Select name={"role"}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Selecciona el rol</SelectLabel>
              {["postulante", "reclutador"].map((item, idx) => (
                <SelectItem key={idx} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
  );
};

export default LoginForm;
