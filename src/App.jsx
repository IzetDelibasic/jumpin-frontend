// - React -
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// - Pages -
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
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <AllRoutes />,
          },
          {
            path: "add-route",
            element: <AddRoute />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "requests",
            element: <Requests />,
          },
          {
            path: "car-rent",
            element: <CarRent />,
          },
          {
            path: "flat-rent",
            element: <FlatRent />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
