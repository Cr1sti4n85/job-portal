"use client";
import { logoutRequest } from "@/lib/apiRequests";
import { LoggedUser } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type NavbarProps = {
  user: LoggedUser | null;
};

const Navbar = ({ user }: NavbarProps) => {
  const router = useRouter();
  const logOut = async () => {
    const data = await logoutRequest();
    if (data.success) {
      toast(data.message);
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="text-white ">
      <div className="flex items-center justify-between px-5 mx-auto max-w-7xl h-16">
        <div className="">
          <Link href="/">
            <h1 className="text-2xl font-bold">
              Busca <span className="text-yellow-400">Pega</span>
            </h1>
          </Link>
        </div>
        <div>
          <ul className="flex font-medium items-center gap-5">
            <li className="hover:text-yellow-400 duration-300 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            {user ? (
              <>
                {user.role === "recruiter" ? (
                  <>
                    <li className="hover:text-yellow-400 duration-300 cursor-pointer">
                      <Link href="dashboard/companies">Compañías</Link>
                    </li>
                    <li className="hover:text-yellow-400 duration-300 cursor-pointer">
                      <Link href="dashboard/empleos">Empleos</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="hover:text-yellow-400 duration-300 cursor-pointer">
                      <Link href="/find-jobs">Encontrar empleos</Link>
                    </li>
                    <li className="hover:text-yellow-400 duration-300 cursor-pointer">
                      <Link href="dashboard/favorites">Favoritos</Link>
                    </li>
                  </>
                )}
                <li className="hover:text-yellow-400 duration-300 cursor-pointer">
                  <Link href="/profile">Perfil</Link>
                </li>
                <li
                  className="hover:text-yellow-400 duration-300 cursor-pointer"
                  onClick={logOut}
                >
                  Log out
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-yellow-400 duration-300 cursor-pointer">
                  <Link href="/login">Login</Link>
                </li>
                <li className="hover:text-yellow-400 duration-300 cursor-pointer">
                  <Link href="/register">Registro</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
