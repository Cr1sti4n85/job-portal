import { getUser } from "@/actions/user";
import AppliedJobs from "@/components/user/AppliedJobs";
import UserDetails from "@/components/user/UserDetails";

const ProfilePage = async () => {
  const user = await getUser();
  return (
    <div>
      <UserDetails user={user} />
      <AppliedJobs user={user} />
    </div>
  );
};

export default ProfilePage;
