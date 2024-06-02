// - React -
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  Landing,
  Register,
  Login,
  Dashboard,
  AllRoutes,
  AddRoute,
  Profile,
  Requests,
  CarRent,
  FlatRent,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/add-route",
    element: <AddRoute />,
  },
  {
    path: "/dashboard/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard/requests",
    element: <Requests />,
  },
  {
    path: "/dashboard/car-rent",
    element: <CarRent />,
  },
  {
    path: "/dashboard/flat-rent",
    element: <FlatRent />,
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
