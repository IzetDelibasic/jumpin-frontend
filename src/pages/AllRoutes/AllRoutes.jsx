import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDashboardContext } from "../Dashboard/Dashboard";
import { Ads } from "../../components";

const AllRoutes = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();

  const handleButtonClick = async (route, routeOwner) => {
    const user = JSON.parse(localStorage.getItem("loggedInUserData"));
    const currentUserEmail = user ? user.email : null;

    if (routeOwner.email === currentUserEmail) {
      toast.error("You can't send a request for your own route!");
      return;
    }

    const description = window.prompt("Enter description:");

    if (description) {
      const userRoute = {
        userRoute: {
          user: {
            firstName: routeOwner.firstName,
            lastName: routeOwner.lastName,
            email: routeOwner.email,
            phoneNumber: routeOwner.phoneNumber,
          },
          route: {
            name: route.name,
            seatsNumber: route.seatsNumber,
            dateAndTime: route.dateAndTime,
            price: route.price,
            description: route.description,
          },
        },
        description,
        status: "Pending",
      };
      const token = localStorage.getItem("jwtToken");

      try {
        const response = await axios.post(
          "https://localhost:7065/api/Request/SendRequest",
          userRoute,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Description is required!");
    }
  };

  return (
    <div>
      <Ads />
      <h1 className="lg:text-[1.5rem] p-2 font-medium text-center text-white mt-4 font-montserrat bg-blueColor w-[70%] lg:w-[40%] mx-auto rounded-xl rounded-br-none shadow-xl">
        Find Your Destination - Jumpin Routes
      </h1>
      <div className="grid grid-cols-1 font-cabin mx-auto p-4">
        {data.length > 0 ? (
          data.map((item, index) => {
            return (
              item.route.seatsNumber !== 0 && (
                <div
                  className="bg-white rounded-lg shadow-md p-6 mb-4 lg:mr-4 text-center lg:w-[95%] w-[90%] mx-auto border-[1px] border-opacity-25 border-black hover:border-blueColor ease-in-out duration-300"
                  key={index}
                >
                  <div className="mb-4">
                    <div className="flex sm:flex-row flex-col justify-between border-b-2">
                      <h2 className="text-xl font-bold">
                        {item.user.firstName} {item.user.lastName}
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
                        <div className="flex">
                          <p className="font-semibold mr-1">Seats:</p>
                          <p className="text-greenColor">
                            {item.route.seatsNumber}
                          </p>
                        </div>
                        <p className="sm:text-[2rem] text-greenColor">
                          {item.route.price}$
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
            );
          })
        ) : (
          <p className="text-center">Empty array.</p>
        )}
      </div>
    </div>
  );
};

export default AllRoutes;
