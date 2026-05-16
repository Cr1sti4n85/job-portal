import AppliedJobs from "@/components/user/AppliedJobs";
import UserDetails from "@/components/user/UserDetails";
import { requireUser } from "@/lib/auth";

const ProfilePage = async () => {
  const user = await requireUser();
  return (
    <div>
      <UserDetails user={user} />
      <AppliedJobs user={user} />
    </div>
  );
};

export default ProfilePage;
