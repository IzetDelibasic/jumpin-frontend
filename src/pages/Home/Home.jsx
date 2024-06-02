// -React-
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <p>Home</p>
      <Outlet />
    </div>
  );
};

export default Home;
