import React, { useState } from "react";
import { useSelector } from "react-redux";

const PremiumCard = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="flex justify-center my-10">
      <div className="card w-96 bg-base-300 shadow-sm">
        <div className="card-body">
          <span className="badge badge-xs badge-warning">
            {user.membershipType}
          </span>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">
              {user.firstName + " " + user.lastName}
            </h2>
            {/* <span className="text-xl">$29/mo</span> */}
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
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
              className="btn btn-primary btn-block"
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
