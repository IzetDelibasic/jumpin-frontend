import React, { useEffect, useState } from "react";
import { useDashboardContext } from "../Dashboard/Dashboard";
import axios from "axios";

const Requests = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();
  const [userRequests, setUserRequests] = useState([]);
  const [userRecievedRequests, setUserRecievedRequests] = useState([]);
  useEffect(() => {
    const getUserSentRequests = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const response = await axios.get(
          "https://localhost:7065/api/Request/GetSentRequests",
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
          "https://localhost:7065/api/Request/GetRecivedRequests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserRecievedRequests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    getUserSentRequests();
    getRecievedRequests();
  }, []);
  return (
    <div className="bg-white md:w-[50%] lg:w-[60%] w-[90%] mx-auto my-4 font-montserrat p-2 rounded-md">
      <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
        User Requests
      </h2>
      {userRequests.map((request, index) => (
        <div key={index}>
          <div>Route number: {index + 1}</div>
          <div className="border rounded-lg flex flex-col p-4 mb-4 bg-white">
            <div className="font-medium">{request.userRoute.route.name}</div>
            <div>
              Driver: {request.userRoute.user.firstName}{" "}
              {request.userRoute.user.lastName}
            </div>
            <div className="font-normal">
              Seats Number: {request.userRoute.route.seatsNumber}
            </div>
            <div className="font-normal">
              Date and Time:{" "}
              {new Date(request.userRoute.route.dateAndTime).toLocaleDateString(
                "en-GB"
              ) +
                " " +
                new Date(
                  request.userRoute.route.dateAndTime
                ).toLocaleTimeString()}
            </div>
            <div className="font-normal">
              Price: {request.userRoute.route.price}
            </div>
            <div className="font-normal">
              Description: {request.description}
            </div>
          </div>
        </div>
      ))}
      <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
        Recieved Requests
      </h2>
      {userRecievedRequests.map((request, index) => (
        <div key={index}>
          <div>Route number: {index + 1}</div>
          <div className="border rounded-lg flex flex-col p-4 mb-4">
            <div className="font-medium">{request.name}</div>
            <div className="font-normal">
              Seats Number: {request.userRoute.route.seatsNumber}
            </div>
            <div className="font-normal">
              Date and Time:{" "}
              {new Date(request.userRoute.route.dateAndTime).toLocaleDateString(
                "en-GB"
              ) +
                " " +
                new Date(
                  request.userRoute.route.dateAndTime
                ).toLocaleTimeString()}
            </div>
            <div className="font-normal">
              Price: {request.userRoute.route.price}
            </div>
            <div className="font-normal">
              Description: {request.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
