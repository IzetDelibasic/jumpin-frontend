import React, { useEffect, useState } from "react";
import { useDashboardContext } from "../Dashboard/Dashboard";
import axios from "axios";

const Requests = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();
  const [userRequests, setUserRequests] = useState([]);
  useEffect(() => {
    const getSentRequests = async () => {
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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getSentRequests();
  }, []);
  return <div>Requests</div>;
};

export default Requests;
