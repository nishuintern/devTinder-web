import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.users));
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getFeed();
  },
   []);
  if(!feed) return;
  if(feed.length<=0) return <h1 className="flex justify-center my-10 text-xl sm:text-2xl">No More New User founds!</h1>
  return (
    feed && (
      <div className="flex justify-center my-4 px-2">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;
