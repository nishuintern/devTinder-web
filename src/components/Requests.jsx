import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="text-center mt-10 text-3xl">No requests Found</h1>;
  return (
    <>
      <div className="mt-5">
        <h1 className="font-bold text-2xl text-center">requests</h1>
      </div>
      <div className="flex flex-col items-center px-2">
        {requests?.map((request) => {
          const { _id, photoUrl, firstName, lastName, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-base-300 card card-side shadow-sm flex flex-col sm:flex-row"
            >
              <figure className="flex justify-center items-center m-4 flex-shrink-0">
                <img src={photoUrl} alt={firstName} className="w-20 h-20 rounded-full object-cover" />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title font-bold text-lg sm:text-xl md:text-2xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p className="text-sm sm:text-base">{age + " , " + gender}</p>}
                <p className="text-xs sm:text-sm md:text-base">{about}</p>
                <div className="card-actions flex flex-col sm:flex-row gap-2 justify-center mt-2">
                  <button
                    className="btn btn-primary w-full sm:w-auto"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accepted
                  </button>
                  <button
                    className="btn btn-secondary w-full sm:w-auto"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Rejected
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Requests;
