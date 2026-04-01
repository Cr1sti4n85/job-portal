import LoginForm from "@/components/auth/LoginForm";
import { requireUserAndRole } from "@/lib/auth";

const Login = async () => {
  await requireUserAndRole();
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] max-w-7xl mx-auto mb-12">
      <LoginForm />
    </div>
  );
};

export default Login;
