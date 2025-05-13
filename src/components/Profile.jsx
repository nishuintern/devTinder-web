import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="flex justify-center my-6 px-2">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <EditProfile user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
