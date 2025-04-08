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
    // <div className="text-center my-10">
    //   <h1 className="text-bold  text-2xl">requests</h1>

    //   {requests.map((request) => {
    //     const {_id, firstName, lastName, photoUrl, age, gender, about } =
    //       request;

    //     return (
    //       <div
    //         key={_id}
    //         className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
    //       >
    //         <div>
    //           <img
    //             alt="photo"
    //             className="w-20 h-20 rounded-full object-cover"
    //             src={photoUrl}
    //           />
    //         </div>
    //         <div className="text-left mx-4 ">
    //           <h2 className="font-bold text-xl">
    //             {firstName + " " + lastName}
    //           </h2>
    //           {age && gender && <p>{age + ", " + gender}</p>}
    //           <p>{about}</p>
    //         </div>
    //         {/* <Link to={"/chat/" + _id}>
    //         <button className="btn btn-primary">Chat</button>
    //       </Link> */}
    //       </div>
    //     );
    //   })}
    // </div>
    <>
      <div className="mt-5">
        <h1 className="text-bold text-2xl text-center">requests</h1>
      </div>
      <div className="flex justify-center">
        {requests?.map((request) => {
          const { _id, photoUrl, firstName, lastName, age, gender, about } =
            request.fromUserId;
          return (
            <div
              key={_id}
              className="mt-10 w-1/2 bg-base-300 card card-side shadow-sm"
            >
              <figure className="w-20 h-auto object-cover">
                <img src={photoUrl} alt={firstName}/>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-bold text-2xl">
                  {firstName + " " + lastName}
                </h2>

                {age && gender && <p>{age + " , " + gender}</p>}

                <p>{about}</p>
                <div className="card-actions flex justify-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accepted
                  </button>
                  <button
                    className="btn btn-secondary"
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
