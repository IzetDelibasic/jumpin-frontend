// -React-
import React, { useState, useEffect } from "react";
// -ReactIcons-
import { FaUserCircle } from "react-icons/fa";
// -Axios-
import axios from "axios";
// -Components-
import { Navbar } from "../../components";

const Profile = () => {
  const storedUserData = localStorage.getItem("loggedInUserData");
  const { firstName, lastName, email, phoneNumber, userToken } = storedUserData
    ? JSON.parse(storedUserData)
    : {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        userToken: "",
      };

  const [userRoutes, setUserRoutes] = useState([]);
  const [numberOfRoutes, setNumberOfRoutes] = useState(0);

  useEffect(() => {
    const getUserRoutes = async () => {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        "https://jumpinappapi.azurewebsites.net/api/User/GetUserRoutes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRoutes(response.data);
      setNumberOfRoutes(response.data.length);
    };

    getUserRoutes();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="my-4 bg-white w-[90%] md:w-[60%] text-black text-center border-[1px] border-gray-300 mx-auto font-montserrat p-4 rounded-md shadow-2xl flex flex-col">
        <div className="flex items-center justify-center bg-blueColor mb-2 text-white">
          <div className="font-medium mr-1">{firstName}</div>
          <div className="font-medium mr-1">{lastName}</div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex flex-col mx-auto">
            <div className="text-blueColor flex items-center justify-center">
              <FaUserCircle size={100} />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mx-auto">
            <div>Number of routes: {numberOfRoutes}</div>
            <div className="font-medium mr-1">{email}</div>
            <div className="font-medium mr-1"> {phoneNumber}</div>
          </div>
        </div>
      </div>

      <div className="my-4 p-2 font-cabin">
        <h2 className="text-xl font-semibold mt-8 mb-4 text-center">
          User Routes
        </h2>
        <div className="grid sm:grid-cols-1 grid-cols-1">
          {userRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 mb-4 lg:mr-4 text-center lg:w-[95%] w-[90%] mx-auto border-[1px] border-opacity-25 border-black hover:border-blueColor ease-in-out duration-300"
            >
              <div className="font-medium text-[18px] mb-2">
                Route {index + 1}
              </div>
              <h3 className="text-lg font-medium mb-2 md:text-[2.5rem] text-[1.8rem]">
                {route.name}
              </h3>
              <div className="flex sm:flex-row justify-between items-center mb-2">
                <div className="flex flex-col">
                  <div className="flex">
                    <p className="font-semibold mr-1">Seats:</p>
                    <p className="text-greenColor">{route.seatsNumber}</p>
                  </div>
                  <p className="sm:text-[2rem] text-greenColor">
                    {route.price}$
                  </p>
                </div>
                <div className="flex flex-col text-greenColor sm:text-[1.5rem]">
                  <p>
                    {new Date(route.dateAndTime).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <p>
                    {new Date(route.dateAndTime).toLocaleTimeString("en-GB", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="sm:text-[1.2rem]">{route.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
