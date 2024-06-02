// -React-
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  console.log("Home page");
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Home;
