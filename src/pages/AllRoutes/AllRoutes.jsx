import React from "react";
import { useDashboardContext } from "../Dashboard/Dashboard";

const AllRoutes = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();

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
