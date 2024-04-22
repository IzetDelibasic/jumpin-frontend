// - React -
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// - Pages -
import { Home, Landing } from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
