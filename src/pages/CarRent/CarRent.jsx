// -React-
import React from "react";
// -MockData-
import { rentMock } from "../../constants/RentMock";
// -Components-
import { Navbar } from "../../components";

const CarRent = () => {
  return (
    <div>
      <Navbar />
      <h1 class="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-blueColor">
          Jumpin Car Rent
        </span>{" "}
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 pt-4 w-[90%] mx-auto">
          You find yourself in an unfamiliar city and need a car? Search for
          available cars in that city and continue your adventure.
        </p>
      </h1>

      <div className="grid md:grid-cols-2 grid-cols-1 text-center font-cabin">
        {rentMock.map((car, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl border-[1px] border-black border-opacity-20 p-6 w-[95%] md:w-[80%] mb-6 mx-auto"
          >
            <div className="w-full sm:h-72 bg-cover mx-auto">
              <img
                src={car.carImage}
                alt={`${car.carMark} ${car.carModel}`}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-[1.5rem]">
              {car.carMark} {car.carModel} - {car.carYear}
            </h2>
            <p>{car.contact}</p>
            <div className="flex flex-col sm:flex-row justify-between items-center mx-8">
              <p className="text-greenColor text-[1.5rem]">€{car.rentPrice}</p>
              <div className="flex flex-col justify-between mx-4">
                <p>{car.rentHouse},</p>
                <p>{car.rentCity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarRent;
