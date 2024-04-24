import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
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
    <div>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <h2>
              {item.user.firstName} {item.user.lastName}
            </h2>
            <p>{item.user.email}</p>
            <p>{item.user.phoneNumber}</p>
            <h3>{item.route.name}</h3>
            <p>{item.route.seatsNumber}</p>
            <p>{item.route.dateAndTime}</p>
            <p>{item.route.price}</p>
            <p>{item.route.description}</p>
          </div>
        ))
      ) : (
        <p>Empty array.</p>
      )}
    </div>
  );
};

export default Dashboard;
