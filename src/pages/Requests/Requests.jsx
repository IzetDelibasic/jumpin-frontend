import React, { useEffect, useState } from "react";
import { useDashboardContext } from "../Dashboard/Dashboard";
import axios from "axios";
import { toast } from "react-toastify";

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

  const acceptRequest = async (index) => {
    const token = localStorage.getItem("jwtToken");
    const requestData = {
      userRoute: userRecievedRequests[index].userRoute,
      passengerEmail: userRecievedRequests[index].passengerEmail,
      description: userRecievedRequests[index].description,
      status: userRecievedRequests[index].status,
    };
    try {
      const url = "https://localhost:7065/api/Request/AcceptOrDeclineRequest/1";
      await axios.post(url, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedRequests = [...userRecievedRequests];
      updatedRequests.splice(index, 1);
      setUserRecievedRequests(updatedRequests);
      toast.done("Request accepted.");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const declineRequest = async (index) => {
    const token = localStorage.getItem("jwtToken");
    const requestData = {
      userRoute: userRecievedRequests[index].userRoute,
      passengerEmail: userRecievedRequests[index].passengerEmail,
      description: userRecievedRequests[index].description,
      status: userRecievedRequests[index].status,
    };
    try {
      const url = "https://localhost:7065/api/Request/AcceptOrDeclineRequest/0";
      await axios.post(url, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // If request processed successfully, update the state
      const updatedRequests = [...userRecievedRequests];
      updatedRequests.splice(index, 1);
      setUserRecievedRequests(updatedRequests);
      toast.dismiss("Request declined.");
      console.log(userRecievedRequests);
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  return (
    <div className="bg-blue-400 w-[90%] mx-auto p-8 my-4 font-montserrat rounded-md flex flex-col md:flex-row justify-between">
      <div className="text-center w-[45%]">
        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
          User Requests
        </h2>
        {userRequests.map((request, index) => (
          <div key={index}>
            <div>Route {index + 1}</div>
            <div className="border rounded-lg flex flex-col p-4 mb-4 bg-backgroundColor">
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
                {new Date(
                  request.userRoute.route.dateAndTime
                ).toLocaleDateString("en-GB") +
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
      <div className="text-center w-[45%]">
        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
          Recieved Requests
        </h2>
        {userRecievedRequests.map((request, index) => (
          <div key={index}>
            <div>Route number: {index + 1}</div>
            <div className="border rounded-lg flex flex-col p-4 mb-4 bg-backgroundColor">
              <div className="font-medium">{request.name}</div>
              <div className="font-normal">
                Seats Number: {request.userRoute.route.seatsNumber}
              </div>
              <div className="font-normal">
                Date and Time:{" "}
                {new Date(
                  request.userRoute.route.dateAndTime
                ).toLocaleDateString("en-GB") +
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
              <div className="mt-4 flex justify-between w-[30%] mx-auto">
                <button
                  onClick={() => acceptRequest(index)}
                  className="bg-gray-900 hover:bg-green-600 duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                >
                  Accept
                </button>
                <button
                  onClick={() => declineRequest(index)}
                  className="bg-gray-900 hover:bg-red-600 duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
