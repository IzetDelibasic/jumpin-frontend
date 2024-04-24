import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const storedUserData = localStorage.getItem("loggedInUserData");
  const { firstName, lastName, email, phoneNumber } = storedUserData
    ? JSON.parse(storedUserData)
    : { firstName: "", lastName: "", email: "", phoneNumber: "" };
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7065/api/User/GetRoutes")
        .then((response) => {
          setData(response.data);
        });
    } catch (error) {
      console.error(`There was an error retrieving the data: ${error}`);
    }
  }, []);

  return (
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
  );
};

export default Dashboard;
