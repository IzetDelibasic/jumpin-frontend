import React from "react";
import axios from "axios";
import { useDashboardContext } from "../Dashboard/Dashboard";

const AllRoutes = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();

  const handleButtonClick = async (route, routeOwnerEmail) => {
    if (routeOwnerEmail === email) {
      alert("You can't send a request for your own route!");
      return;
    }

    const description = window.prompt("Enter description:");

    if (description) {
      const userRoute = {
        userRoute: {
          user: {
            firstName,
            lastName,
            email,
            phoneNumber,
          },
          route: {
            name: route.name,
            seatsNumber: route.seatsNumber,
            dateAndTime: route.dateAndTime,
            price: route.price,
            description: route.description,
          },
        },
        description,
        status: "Pending",
      };

      const token = localStorage.getItem("jwtToken");

      try {
        const response = await axios.post(
          "https://localhost:7065/api/Request/SendRequest",
          userRoute,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Description is required!");
    }
  };

  return (
    <div>
      <h1 className="lg:text-[1.5rem] p-2 font-medium text-center text-white mt-4 font-montserrat bg-blue-500 w-[70%] lg:w-[40%] mx-auto rounded-xl rounded-br-none shadow-xl">
        Find Your Destination - Jumpin Routes
      </h1>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 font-montserrat mx-auto p-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              className="bg-white rounded-lg shadow-md p-6 mb-4 lg:mr-4 text-center lg:w-[95%] w-[90%] mx-auto"
              key={index}
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold">
                  {item.user.firstName} {item.user.lastName}
                </h2>
                <p className="text-gray-600">{item.user.email}</p>
                <p className="text-gray-600">{item.user.phoneNumber}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">{item.route.name}</h3>
                <p>Seats: {item.route.seatsNumber}</p>
                <p>
                  Date & Time:{" "}
                  {new Date(item.route.dateAndTime).toLocaleDateString(
                    "en-GB"
                  ) +
                    " " +
                    new Date(item.route.dateAndTime).toLocaleTimeString()}
                </p>
                <p>Price: {item.route.price}</p>
                <p>Description: {item.route.description}</p>
                <button
                  onClick={() => handleButtonClick(item.route, item.user.email)}
                >
                  Send Request
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Empty array.</p>
        )}
      </div>
    </div>
  );
};

export default AllRoutes;
