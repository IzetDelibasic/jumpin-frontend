import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";
import { FormRow } from "../../components";
import { useDashboardContext } from "../Dashboard/Dashboard";

const AddRoute = () => {
  const { firstName, lastName, email, phoneNumber } = useDashboardContext();
  const [routeName, setRouteName] = useState("");
  const [seatsNumber, setSeatsNumber] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "https://localhost:7065/api/User/AddRoute",
      {
        user: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
        route: {
          name: routeName,
          seatsNumber: seatsNumber,
          dateAndTime: new Date().toISOString(),
          price: price,
          description: description,
        },
      }
    );

    console.log(response.data);
  };

  return (
    <div>
      <Form
        method="post"
        className="flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <FormRow
          type="text"
          name="routeName"
          labelText="Route"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
        <FormRow
          type="text"
          name="seatsNumber"
          labelText="Seats number"
          value={seatsNumber}
          onChange={(e) => setSeatsNumber(e.target.value)}
        />
        <FormRow
          type="text"
          name="price"
          labelText="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <FormRow
          type="text"
          name="description"
          labelText="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="relative bg-blue-500 text-white font-medium py-[1rem] px-[3.5rem] md:px-[4rem] lg:px-[5rem] mr-0 mb-[20px] md:mb-0 rounded-[3rem] group overflow-hidden z-[1]"
          type="submit"
        >
          <div className="">Submit Route</div>
          <div className="absolute inset-0 bg-black w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
        </button>
      </Form>
    </div>
  );
};

export default AddRoute;
