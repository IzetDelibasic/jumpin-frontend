// -React-
import React, { createContext, useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";
// -Axios-
import axios from "axios";
// -Components-
import { Navbar } from "../../components";

export const DashboardContext = createContext();

const Dashboard = () => {
  const storedUserData = localStorage.getItem("loggedInUserData");
  const { firstName, lastName, email, phoneNumber, userToken } = storedUserData
    ? JSON.parse(storedUserData)
    : { firstName: "", lastName: "", email: "", phoneNumber: "" };
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7065/api/Route/GetRoutes", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          setData(response.data);
        });
    } catch (error) {
      console.error(`There was an error retrieving the data: ${error}`);
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        data,
        firstName,
        lastName,
        email,
        phoneNumber,
      }}
    >
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <Outlet
          context={{ firstName, lastName, email, phoneNumber, userToken }}
        />
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;
