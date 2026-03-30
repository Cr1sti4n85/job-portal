import { getUser } from "@/actions/user";
import UserDetails from "@/components/user/UserDetails";

const ProfilePage = async () => {
  const user = await getUser();
  return (
    <div>
      <UserDetails user={user} />
    </div>
  );
};

export default ProfilePage;
