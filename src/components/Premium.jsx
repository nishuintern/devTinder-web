import axios from "axios";
import React, { useEffect,useState } from "react";
import { BASE_URL } from "../utils/constants";
import PremiumCard from "./PremiumCard";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] =useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );
    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return isUserPremium ? (
    <PremiumCard />
  ) : (
    <div className="m-4 sm:m-10">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-4">
          <h1 className="font-bold text-2xl sm:text-3xl text-center">Silver Membership</h1>
          <ul className="text-sm sm:text-base mb-2">
            <li>- Chat with other people</li>
            <li>- 100 Connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary w-full sm:w-auto"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider lg:divider-horizontal my-4 lg:my-0">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-4">
          <h1 className="font-bold text-2xl sm:text-3xl text-center">Gold Membership</h1>
          <ul className="text-sm sm:text-base mb-2">
            <li>- Chat with other people</li>
            <li>- Infinity Connection Requests per day</li>
            <li>- Blue Tick</li>
            <li>- 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary w-full sm:w-auto"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
