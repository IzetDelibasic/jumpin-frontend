import React, { useState, useEffect } from "react";
import { useDashboardContext } from "../Dashboard/Dashboard";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { data, firstName, lastName, email, phoneNumber, userToken } =
    useDashboardContext();
  const [userRoutes, setUserRoutes] = useState([]);

  useEffect(() => {
    const getUserRoutes = async () => {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        "https://localhost:7065/api/User/GetUserRoutes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRoutes(response.data);
    };

    getUserRoutes();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="my-4 bg-white w-[85%] text-black text-center mx-auto font-montserrat p-4 rounded-md shadow-2xl flex flex-col sm:flex-row">
        <div className="flex flex-col mx-auto">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <div className="text-blueColor flex items-center justify-center">
            <FaUserCircle size={100} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mx-auto">
          <div className="flex items-center justify-center">
            <div className="font-medium mr-1">First Name:</div> {firstName}
          </div>
          <div className="flex items-center justify-center">
            <div className="font-medium mr-1">Last Name:</div> {lastName}
          </div>
          <div className="flex items-center justify-center">
            <div className="font-medium mr-1">Email:</div> {email}
          </div>
          <div className="flex sm:flex-row flex-col items-center justify-center">
            <div className="font-medium mr-1">Phone Number:</div> {phoneNumber}
          </div>
        </div>
      </div>

      <div className=" bg-opacity-85 w-[85%] mx-auto my-4 font-montserrat p-2 rounded-md">
        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
          User Routes
        </h2>
        <div className="grid sm:grid-cols-2 grid-cols-1">
          {userRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-2x text-center sm:w-[95%] mb-4 sm:mb-0 mx-auto"
            >
              <div className="font-medium text-[18px]">Route {index + 1}</div>
              <div className="border border-black rounded-lg flex flex-col p-4 mb-4">
                <div className="font-medium text-[18px]">{route.name}</div>
                <div className="font-normal">Price: {route.price}</div>
                <div className="font-normal">
                  Seats Number: {route.seatsNumber}
                </div>
                <div className="font-normal">
                  Date and Time:{" "}
                  {new Date(route.dateAndTime).toLocaleDateString("en-GB") +
                    " " +
                    new Date(route.dateAndTime).toLocaleTimeString()}
                </div>
                <div className="font-normal">
                  Description: {route.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
