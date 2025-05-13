import React, { useState } from "react";
import { useSelector } from "react-redux";

const PremiumCard = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="flex justify-center my-6 px-2">
      <div className="card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-base-300 shadow-sm">
        <div className="card-body">
          <span className="badge badge-xs badge-warning mb-2">
            {user.membershipType}
          </span>
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {user.firstName + " " + user.lastName}
            </h2>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs sm:text-sm md:text-base">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Chat with other people</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>100 Connection Requests per day</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Blue Tick</span>
            </li>
          </ul>
          <div className="mt-6">
            {/* <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={() => setIsPremium(false)}
            >
              Unsubscribe
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCard;
