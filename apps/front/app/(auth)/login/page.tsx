"use client";
import { getUser } from "@/actions/user";
import FormInput from "@/components/FormInput";
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

import { LoggedUser } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [user, setUser] = useState<LoggedUser | null>(null);
  const router = useRouter();
  const [userData, setUserData] = useState<{
    email: string;
    password: string;
    role: string;
  }>({
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const verifyUser = async () => {
      const validUser = await getUser();
      if (validUser) {
        setUser(validUser);
        if (user?.role === "recruiter") {
          router.push("/admin/companies");
        } else if (user?.role === "student") {
          router.push("/");
        }
      }
    };
    verifyUser();
  }, [router, user?.role]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast(data.message);
        setUser(data.user);
      }
    } catch {
      toast.error("Error al iniciar sesión");
    }
  };
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] max-w-7xl mx-auto mb-12">
      <form
        onSubmit={handleSubmit}
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
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="Ingresa tu contraseña"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />

        <div className="my-3">
          <Select
            name={"role"}
            value={userData.role}
            onValueChange={(value) => setUserData({ ...userData, role: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Selecciona el rol</SelectLabel>
                {["employee", "recruiter"].map((item, idx) => (
                  <SelectItem key={idx} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full my-4 bg-yellow-400/90 hover:bg-yellow-400/95">
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
