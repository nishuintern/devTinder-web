import axios from "axios";
import { useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const saveProfile=async ()=>{
    setError("")
    try {
        const res=await axios.patch(`${BASE_URL}/profile/edit`,{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about
        },{
            withCredentials:true
        })
        dispatch(addUser(res?.data?.data))
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
        setError(error?.response?.data);
    }
  }
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 my-6 px-2">
        <div className="card bg-base-300 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-xl mx-auto">
          <div className="card-body">
            <h2 className="card-title justify-center text-lg sm:text-xl md:text-2xl">Edit Profile</h2>
            <div className="my-2">
              <label className="form-control w-full my-2">
                <div className="label my-1.5">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label my-1.5">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label my-1.5">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label my-1.5">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label my-1.5">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full my-2">
                <div className="label my-1.5">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <p className="text-red-600 text-sm">{error}</p>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary w-full sm:w-auto" onClick={saveProfile}>Save Profile</button>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
          <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};
// EditProfile.propTypes = {
//   user: PropTypes.shape({
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     photoUrl: PropTypes.string,
//     age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     gender: PropTypes.string,
//     about: PropTypes.string,
//   }).isRequired,
// };

export default EditProfile;
