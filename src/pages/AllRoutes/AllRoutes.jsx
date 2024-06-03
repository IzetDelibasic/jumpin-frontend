import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Ads, CustomPrompt } from "../../components";

const AllRoutes = () => {
  const [data, setData] = useState([]);
  const [isPromptOpen, setPromptOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [currentRouteOwner, setCurrentRouteOwner] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("loggedInUserData");
    const { userToken } = storedUserData
      ? JSON.parse(storedUserData)
      : { userToken: "" };

    axios
      .get("https://jumpinappapi.azurewebsites.net/api/Route/GetRoutes", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(`There was an error retrieving the data: ${error}`);
      });
  }, []);

  const handleButtonClick = (route, routeOwner) => {
    const user = JSON.parse(localStorage.getItem("loggedInUserData"));
    const currentUserEmail = user ? user.email : null;

    if (routeOwner.email === currentUserEmail) {
      toast.error("You can't send a request for your own route!");
      return;
    }

    const sentRequests = JSON.parse(localStorage.getItem("sentRequests")) || [];
    if (sentRequests.includes(route.id)) {
      toast.error("You already sent request for this route!");
      return;
    }

    setCurrentRoute(route);
    setCurrentRouteOwner(routeOwner);
    setPromptOpen(true);
  };

  const handlePromptConfirm = async (description) => {
    if (description) {
      const userRoute = {
        userRoute: {
          user: {
            firstName: currentRouteOwner.firstName,
            lastName: currentRouteOwner.lastName,
            email: currentRouteOwner.email,
            phoneNumber: currentRouteOwner.phoneNumber,
          },
          route: {
            name: currentRoute.name,
            seatsNumber: currentRoute.seatsNumber,
            dateAndTime: currentRoute.dateAndTime,
            price: currentRoute.price,
            description: currentRoute.description,
            type: currentRoute.type,
          },
        },
        description,
        status: "Pending",
      };
      const token = localStorage.getItem("jwtToken");

      try {
        const response = await axios.post(
          "https://jumpinappapi.azurewebsites.net/api/Request/SendRequest",
          userRoute,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);

        const sentRequests =
          JSON.parse(localStorage.getItem("sentRequests")) || [];
        sentRequests.push(currentRoute.id);
        localStorage.setItem("sentRequests", JSON.stringify(sentRequests));

        toast.success("Request sent successfully!");
      } catch (error) {
        console.error(error);
        toast.error("You already sent request for this route!");
      }
    } else {
      toast.error("Description is required!");
    }
  };

  return (
    <div>
      <Ads />
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-blueColor">
          Jumpin Routes
        </span>
      </h1>
      <div className="grid grid-cols-1 font-cabin mx-auto p-4">
        {data.length > 0 ? (
          data.map(
            (item, index) =>
              item.route.seatsNumber !== 0 && (
                <div
                  className="bg-white rounded-lg shadow-md p-6 mb-4 lg:mr-4 text-center lg:w-[95%] w-[90%] mx-auto border-[1px] border-opacity-25 border-black hover:border-blueColor ease-in-out duration-300"
                  key={index}
                >
                  <div className="mb-4">
                    <div className="flex sm:flex-row flex-col justify-between border-b-2">
                      <h2 className="text-xl font-bold">
                        {item.user.firstName} {item.user.lastName} -{" "}
                        {item.route.type}
                      </h2>
                      <p className="text-gray-600">
                        Kontakt: {item.user.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="border-b-2">
                    <h3 className="text-lg font-medium mb-2 md:text-[2.5rem] text-[1.8rem]">
                      {item.route.name}
                    </h3>
                    <div className="flex sm:flex-row justify-between items-center mb-2">
                      <div className="flex flex-col">
                        {item.route.type === "Package" ? (
                          <div className="flex">
                            <p className="font-semibold mr-1">Packages:</p>
                            <p className="text-greenColor">
                              {item.route.seatsNumber}
                            </p>
                          </div>
                        ) : (
                          <div className="flex">
                            <p className="font-semibold mr-1">Seats:</p>
                            <p className="text-greenColor">
                              {item.route.seatsNumber}
                            </p>
                          </div>
                        )}
                        <p className="sm:text-[2rem] text-greenColor">
                          {item.route.price}€
                        </p>
                      </div>
                      <div className="flex flex-col text-greenColor sm:text-[1.5rem]">
                        <p>
                          {new Date(item.route.dateAndTime).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "long",
                            }
                          )}
                        </p>
                        <p>
                          {new Date(item.route.dateAndTime).toLocaleTimeString(
                            "en-GB",
                            {
                              hour: "numeric",
                              minute: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <p className="sm:text-[1.2rem]">{item.route.description}</p>
                  </div>
                  <button
                    onClick={() => handleButtonClick(item.route, item.user)}
                    className="bg-blueColor text-white font-medium py-2 px-10 mt-4 rounded-lg hover:bg-lightBlue transition duration-300 ease-in-out"
                  >
                    Send Request
                  </button>
                </div>
              )
          )
        ) : (
          <p className="text-center">Empty array.</p>
        )}
      </div>
      <CustomPrompt
        isOpen={isPromptOpen}
        onClose={() => setPromptOpen(false)}
        onConfirm={handlePromptConfirm}
      />
    </div>
  );
};

export default AllRoutes;
