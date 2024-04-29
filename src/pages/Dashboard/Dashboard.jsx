import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { Navbar } from "../../components";
import { Outlet } from "react-router-dom";

export const DashboardContext = createContext();

const Dashboard = () => {
  const storedUserData = localStorage.getItem("loggedInUserData");
  const { firstName, lastName, email, phoneNumber } = storedUserData
    ? JSON.parse(storedUserData)
    : { firstName: "", lastName: "", email: "", phoneNumber: "" };
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("https://localhost:7065/api/Route/GetRoutes")
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
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <Navbar />
        <div className="">
          <Outlet context={{ firstName, lastName, email, phoneNumber }} />
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;
