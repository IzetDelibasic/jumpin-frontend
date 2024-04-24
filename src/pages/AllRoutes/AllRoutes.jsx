import React from "react";
import { useDashboardContext } from "../Dashboard/Dashboard";

const AllRoutes = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();

  return (
    <div>
      <div className="container mx-auto p-4">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div className="bg-white rounded-lg shadow-md p-6 mb-4" key={index}>
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
                <p>Date & Time: {item.route.dateAndTime}</p>
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
