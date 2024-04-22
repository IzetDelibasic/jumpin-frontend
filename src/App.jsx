// - React -
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// - Pages -
import { Home } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
