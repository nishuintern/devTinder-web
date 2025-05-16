import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="navbar bg-base-300 px-2 sm:px-4 sticky top-0 z-50 mb-6 sm:mb-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-lg sm:text-xl px-2">
          devTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 items-center">
          <div className="form-control flex items-center gap-1 text-sm sm:text-base">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end mx-2 sm:mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative"
            >
              {user.isPremium && (
                <span
                  className="absolute top-5 right-0 translate-x-1/4 -translate-y-1/4 text-base sm:text-lg md:text-xl"
                  title="Verified User"
                  style={{
                    height: "20px",
                    width: "20px",
                  }}
                >
                  ✅
                </span>
              )}
              <div className="w-10 h-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.photoUrl ||
                    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-2 w-40 sm:w-52 p-2 shadow fixed"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li>
                <Link to={"/premium"}>Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
