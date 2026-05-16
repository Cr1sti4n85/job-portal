import { getUser } from "@/actions/user";
import AuthNavbar from "@/components/auth/AuthNavbar";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="px-4 py-2">
        <AuthNavbar user={user} />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
