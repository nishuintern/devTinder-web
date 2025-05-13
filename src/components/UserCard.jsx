import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user);
  const handleSendReq = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };
  return (
    <div className="card bg-base-300 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-sm mx-auto">
      <figure>
        <img
          src={
            photoUrl ||
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
          }
          alt="photo"
          className="object-cover w-full h-48 sm:h-56 md:h-64 rounded-t"
          style={{ height: "auto" }}
        />
      </figure>
      <div className="card-body p-4 sm:p-6">
        <h2 className="card-title text-lg sm:text-xl md:text-2xl">
          {firstName + " " + lastName}
        </h2>
        {age && gender && <p className="text-sm sm:text-base">{age + ", " + gender}</p>}
        <p className="text-xs sm:text-sm md:text-base">{about}</p>
        <div className="card-actions flex flex-col sm:flex-row gap-2 justify-center my-4">
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={() => handleSendReq("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary w-full sm:w-auto"
            onClick={() => handleSendReq("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
// UserCard.propTypes = {
//   user: PropTypes.shape({
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     photoUrl: PropTypes.string,
//     age: PropTypes.number,
//     gender: PropTypes.string,
//     about: PropTypes.string,
//   }).isRequired,
// };

export default UserCard;
