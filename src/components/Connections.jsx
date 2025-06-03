import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="text-center mt-10 text-3xl">No Connections Found</h1>;
  return (
    <div className="mb-[10%] sm:mb-[12%] lg:mb-[20%]">
      <div className="mt-5">
        <h1 className="font-bold text-2xl text-center">Connections</h1>
      </div>
      <div className="flex flex-col items-center justify-center px-2">
        {connections?.map((connection) => {
          const { _id, photoUrl, firstName, lastName, age, gender, about, isPremium } =
            connection;
          return (
            <div
              key={_id}
              className="mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-base-300 card card-side shadow-sm flex flex-col sm:flex-row"
            >
              <figure className="m-4 flex-shrink-0 flex justify-center">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title font-bold text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                  {firstName + " " + lastName}
                  {isPremium && (
                    <span
                      title="Verified User"
                      className="inline-block"
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    >
                      ✅
                    </span>
                  )}
                </h2>
                {age && gender && <p className="text-sm sm:text-base">{age + " , " + gender}</p>}
                <p className="text-xs sm:text-sm md:text-base">{about}</p>
                <div className="card-actions justify-end mt-2">
                  <Link to={"/chat/" + _id}>
                    <button className="btn btn-primary w-full sm:w-auto">Chat</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
