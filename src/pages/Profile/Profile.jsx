import React, { useState, useEffect } from "react";
import { useDashboardContext } from "../Dashboard/Dashboard";
import axios from "axios";

const Profile = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();
  const [userRoutes, setUserRoutes] = useState([]);

  useEffect(() => {
    const getUserRoutes = async () => {
      const response = await axios.post(
        "https://localhost:7065/api/User/GetUserRoutes",
        email,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserRoutes(response.data);
    };

    getUserRoutes();
  }, [email]);

  return (
    <div>
      <div className="my-4 bg-white w-[60%] text-center mx-auto">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
        <div>
          <div className="font-semibold">First Name:</div> {firstName}
        </div>
        <div>
          <div className="font-semibold">Last Name:</div> {lastName}
        </div>
        <div>
          <div className="font-semibold">Email:</div> {email}
        </div>
        <div>
          <div className="font-semibold">Phone Number:</div> {phoneNumber}
        </div>
      </div>

      <div className="bg-white w-[80%] mx-auto">
        <h2 className="text-xl font-semibold mt-8 mb-4">User Routes</h2>
        {userRoutes.map((route, index) => (
          <div>
            <div>Route number: {index + 1}</div>
            <div
              key={index}
              className="border rounded-lg flex flex-col   p-4 mb-4 font-montserrat"
            >
              <div className="font-medium">{route.name}</div>
              <div className="font-normal">
                Seats Number: {route.seatsNumber}
              </div>
              <div className="font-normal">
                Date and Time: {route.dateAndTime}
              </div>
              <div className="font-normal">Price: {route.price}</div>{" "}
              <div className="font-normal">
                Description: {route.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
