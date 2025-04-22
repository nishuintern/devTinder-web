import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
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
    // <div className="text-center my-10">
    //   <h1 className="text-bold  text-2xl">Connections</h1>

    //   {connections.map((connection) => {
    //     const {_id, firstName, lastName, photoUrl, age, gender, about } =
    //       connection;

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
        <h1 className="text-bold text-2xl text-center">Connections</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        {connections?.map((connection) => {
          const { _id, photoUrl, firstName, lastName, age, gender, about } =
            connection;
          return (
            <div
              key={_id}
              className="mt-10 w-1/2 bg-base-300 card card-side shadow-sm"
            >
              <figure className="m-4">
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-bold text-2xl">
                  {firstName + " " + lastName}
                </h2>

                {age && gender && <p>{age + " , " + gender}</p>}

                <p className="">{about}</p>
                <div className="card-actions justify-end">
                  <Link to={"/chat/" + _id}>
                    <button className="btn btn-primary">Chat</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
