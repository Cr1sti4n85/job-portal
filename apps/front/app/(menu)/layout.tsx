import { getUser } from "@/actions/user";
import Navbar from "@/components/Navbar";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="px-4 py-2">
        <Navbar user={user} />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
