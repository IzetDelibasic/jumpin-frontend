import React from "react";

import { rentMock } from "../../constants/RentMock";

const CarRent = () => {
  return (
    <div>
      <h1>Car Rentals</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 text-center font-cabin">
        {rentMock.map((car, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl p-4 border-black border-[1px] border-opacity-50 w-[80%] mb-4 mx-auto"
          >
            <img src={car.carImage} alt={`${car.carMark} ${car.carModel}`} />
            <h2>
              {car.carMark} {car.carModel}
            </h2>
            <p>Year: {car.carYear}</p>
            <p>Rent Price: ${car.rentPrice}</p>
            <p>Rent House: {car.rentHouse}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarRent;
