// -React-
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// -Context-
import { useDashboardContext } from "../Dashboard/Dashboard";
// -Axios-
import axios from "axios";

const Requests = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();
  const [userRequests, setUserRequests] = useState([]);
  const [userRecievedRequests, setUserRecievedRequests] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [userInfoBox, setUserInfoBox] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

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
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    getUserSentRequests();
    getRecievedRequests();

    const handleClickOutside = (event) => {
      if (userInfoBox.visible && !event.target.closest(".user-info-box")) {
        setUserInfoBox({ visible: false, x: 0, y: 0 });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userInfoBox]);

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
      const updatedRequests = [...userRecievedRequests];
      updatedRequests.splice(index, 1);
      setUserRecievedRequests(updatedRequests);
      toast.dismiss("Request declined.");
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  const fetchUserData = async (email, event) => {
    const token = localStorage.getItem("jwtToken");
    try {
      const emailPayload = JSON.stringify(email);
      const response = await axios.post(
        `https://localhost:7065/api/User/GetUserByEmail`,
        emailPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedUserData(response.data);
      setUserInfoBox({
        visible: true,
        x: event.clientX - 150,
        y: event.clientY - 30,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="bg-gray-100 relative">
      <div className="w-[90%] mx-auto p-8 my-4 rounded-md flex flex-col justify-between font-cabin">
        <div className="text-center">
          <h2 className="text-xl font-semibold mt-8 mb-4">Received Requests</h2>
          {userRecievedRequests.map((request, index) => (
            <div key={index}>
              <div className="py-2">Route number: {index + 1}</div>
              <div className="rounded-lg flex flex-col sm:p-6 p-2 mb-4 bg-gray-100 shadow-2xl border-[1px] border-opacity-25 border-black hover:border-blueColor duration-300 ease-in-out">
                <p>{request.userRoute.route.type}</p>
                <div className="font-medium md:text-[2rem] border-b-[1px] border-blueColor md:w-[40%] mx-auto">
                  {request.userRoute.route.name}
                </div>
                <div>
                  Passenger:{" "}
                  <span
                    className="text-greenColor underline cursor-pointer"
                    onClick={(e) => fetchUserData(request.passengerEmail, e)}
                  >
                    {request.passengerEmail}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                  <div className="flex flex-col">
                    <div className="flex">
                      <p className="font-semibold mr-1">Seats:</p>
                      <p className="text-greenColor">
                        {request.userRoute.route.seatsNumber}
                      </p>
                    </div>
                    <p className="sm:text-[2rem] text-greenColor">
                      {request.userRoute.route.price}$
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col text-greenColor sm:text-[1.5rem]">
                    <p className="mr-2 sm:mr-0">
                      {new Date(
                        request.userRoute.route.dateAndTime
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p>
                      {new Date(
                        request.userRoute.route.dateAndTime
                      ).toLocaleTimeString("en-GB", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="font-normal">Note: {request.description}</div>
                <div className="mt-4 flex flex-col sm:flex-row justify-center items-center">
                  <button
                    onClick={() => acceptRequest(index)}
                    className="bg-gray-900 hover:bg-green-600 duration-300 w-[60%] sm:w-[15%] ease-in-out text-white font-medium py-2 px-4 sm:mr-2 mb-2 sm:mb-0 rounded-xl focus:outline-none focus:shadow-outline"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => declineRequest(index)}
                    className="bg-gray-900 hover:bg-red-600 duration-300 w-[60%] sm:w-[15%] ease-in-out text-white font-medium py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                  >
                    Decline
                  </button>
                </div>
              </div>
              {userInfoBox.visible && selectedUserData && (
                <div
                  className="user-info-box mt-0 p-4 sm:p-10 bg-white border-[1px] border-black border-opacity-20 shadow-lg rounded-lg rounded-bl-none absolute"
                  style={{ top: userInfoBox.y, left: userInfoBox.x }}
                >
                  <h3 className="font-semibold md:text-[1.2rem]">
                    User Information
                  </h3>
                  <div className="flex flex-col sm:flex-row items-center justify-center">
                    <p className="font-medium md:mr-1">Name:</p>
                    <p className="text-greenColor">
                      {selectedUserData.firstName} {selectedUserData.lastName}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center">
                    <p className="font-medium md:mr-1">Email:</p>
                    <p className="text-greenColor"> {selectedUserData.email}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center">
                    <p className="font-medium md:mr-1">Phone:</p>
                    <p className="text-greenColor">
                      {selectedUserData.phoneNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-[90%] mx-auto p-8 my-4 rounded-md flex flex-col justify-between font-cabin">
        <div className="text-center ">
          <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
            User Requests
          </h2>
          {userRequests.map((request, index) => (
            <div key={index}>
              <div>Route {index + 1}</div>
              <div className="rounded-lg flex flex-col sm:p-6 p-2 mb-4 bg-gray-100 shadow-2xl border-[1px] border-opacity-25 border-black hover:border-blueColor duration-300 ease-in-out">
                <p>{request.userRoute.route.type}</p>
                <div className="font-medium md:text-[2rem] border-b-[1px] border-blueColor md:w-[40%] mx-auto">
                  {request.userRoute.route.name}
                </div>
                <div>
                  Driver: {request.userRoute.user.firstName}{" "}
                  {request.userRoute.user.lastName}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                  <div className="flex flex-col">
                    <div className="flex">
                      <p className="font-semibold mr-1">Seats:</p>
                      <p className="text-greenColor">
                        {request.userRoute.route.seatsNumber}
                      </p>
                    </div>
                    <p className="sm:text-[2rem] text-greenColor">
                      {request.userRoute.route.price}$
                    </p>
                  </div>
                  <div className="flex flex-row sm:flex-col text-greenColor sm:text-[1.5rem]">
                    <p className="mr-2 sm:mr-0">
                      {new Date(
                        request.userRoute.route.dateAndTime
                      ).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p>
                      {new Date(
                        request.userRoute.route.dateAndTime
                      ).toLocaleTimeString("en-GB", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="font-normal">Note: {request.description}</div>
                <div
                  className={`font-normal text-[1.2rem] ${
                    request.status === "Accepted"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {request.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Requests;
