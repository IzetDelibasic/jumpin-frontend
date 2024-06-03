// -React-
import React, { createContext, useEffect, useState, useContext } from "react";
// -Axios-
import axios from "axios";
// -Components-
import { Navbar } from "../../components";
import AllRoutes from "../AllRoutes/AllRoutes";

export const DashboardContext = createContext();

const Dashboard = () => {
  const storedUserData = localStorage.getItem("loggedInUserData");
  const { firstName, lastName, email, phoneNumber, userToken } = storedUserData
    ? JSON.parse(storedUserData)
    : { firstName: "", lastName: "", email: "", phoneNumber: "" };
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!userToken) {
      window.location.href = "/login";
      return;
    }

    try {
      axios
        .get("https://jumpinappapi.azurewebsites.net/api/Route/GetRoutes", {
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
  }, [userToken]);

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
        <AllRoutes />
      </div>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;
