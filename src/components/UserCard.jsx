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
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={
            photoUrl ||
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
          }
          alt="photo"
          style={{ height: "auto", width: "100%" }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName + " " + lastName}
          {users.isPremium && (
            <span
              title="Verified User"
              style={{
                height: "20px",
                width: "20px",
              }}
            >
              ✅
            </span>
          )}
        </h2>
        {age && gender && <p>{age + "," + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendReq("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
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
