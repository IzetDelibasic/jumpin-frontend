import React, { useState, useEffect } from "react";
import { useDashboardContext } from "../Dashboard/Dashboard";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { data, firstName, lastName, email, phoneNumber, userToken } =
    useDashboardContext();
  const [userRoutes, setUserRoutes] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const [userRecievedRequests, setUserRecievedRequests] = useState([]);

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

    const getUserSentRequests = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const response = await axios.get(
          "https://localhost:7065/api/User/GetSentRequests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserRequests(response.data);
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };

    const getRecievedRequests = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const response = await axios.get(
          "https://localhost:7065/api/User/GetRecievedRequests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserRecievedRequests(response.data);
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    getUserRoutes();
    getUserSentRequests();
    getRecievedRequests();
  }, []);

  return (
    <div className="flex md:flex-row flex-col">
      <div className="my-4 bg-white w-[85%] h-[18rem] md:w-[40%] lg:w-[30%] text-center mx-auto font-montserrat p-4 rounded-md shadow-2xl">
        <h2 className="text-xl font-semibold mb-4">User Profile</h2>
        <div className="text-black flex items-center justify-center">
          <FaUserCircle size={100} />
        </div>
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

      <div className="bg-white md:w-[50%] lg:w-[60%] w-[90%] mx-auto my-4 font-montserrat p-2 rounded-md">
        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
          User Routes
        </h2>
        {userRoutes.map((route, index) => (
          <div key={index}>
            <div>Route number: {index + 1}</div>
            <div className="border rounded-lg flex flex-col p-4 mb-4">
              <div className="font-medium">{route.name}</div>
              <div className="font-normal">
                Seats Number: {route.seatsNumber}
              </div>
              <div className="font-normal">
                Date and Time:{" "}
                {new Date(route.dateAndTime).toLocaleDateString("en-GB") +
                  " " +
                  new Date(route.dateAndTime).toLocaleTimeString()}
              </div>
              <div className="font-normal">Price: {route.price}</div>
              <div className="font-normal">
                Description: {route.description}
              </div>
            </div>
          </div>
        ))}
        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
          User Requests
        </h2>
        {userRequests.map((route, index) => (
          <div key={index}>
            <div>Route number: {index + 1}</div>
            <div className="border rounded-lg flex flex-col p-4 mb-4">
              <div className="font-medium">{route.name}</div>
              <div className="font-normal">
                Seats Number: {route.seatsNumber}
              </div>
              <div className="font-normal">
                Date and Time:{" "}
                {new Date(route.dateAndTime).toLocaleDateString("en-GB") +
                  " " +
                  new Date(route.dateAndTime).toLocaleTimeString()}
              </div>
              <div className="font-normal">Price: {route.price}</div>
              <div className="font-normal">
                Description: {route.description}
              </div>
            </div>
          </div>
        ))}
        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
          Recieved Requests
        </h2>
        {userRecievedRequests.map((route, index) => (
          <div key={index}>
            <div>Route number: {index + 1}</div>
            <div className="border rounded-lg flex flex-col p-4 mb-4">
              <div className="font-medium">{route.name}</div>
              <div className="font-normal">
                Seats Number: {route.seatsNumber}
              </div>
              <div className="font-normal">
                Date and Time:{" "}
                {new Date(route.dateAndTime).toLocaleDateString("en-GB") +
                  " " +
                  new Date(route.dateAndTime).toLocaleTimeString()}
              </div>
              <div className="font-normal">Price: {route.price}</div>
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
