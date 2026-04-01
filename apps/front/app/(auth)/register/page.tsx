import RegisterForm from "@/components/user/RegisterForm";
import { requireUserAndRole } from "@/lib/auth";

const Register = async () => {
  await requireUserAndRole();
  return (
    <div className="flex items-center justify-center">
      <RegisterForm />
    </div>
  );
};

export default Register;
