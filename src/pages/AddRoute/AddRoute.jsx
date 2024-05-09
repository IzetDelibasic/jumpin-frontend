import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";
import { FormRow } from "../../components";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDashboardContext } from "../Dashboard/Dashboard";
import { backgroundImage } from "../../constants/ImageConstant";

const AddRoute = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();
  const [routeName, setRouteName] = useState("");
  const [seatsNumber, setSeatsNumber] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      console.log(token);
      const response = await axios.post(
        "https://localhost:7065/api/Route/AddRoute",
        {
          user: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
          },
          route: {
            name: routeName,
            seatsNumber: parseInt(seatsNumber),
            dateAndTime: dateAndTime.toISOString(),
            price: parseFloat(price),
            description: description,
          },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);
      toast.success("Route added successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("An error with adding route occurred");
      return error;
    }
  };

  return (
    <div>
      <h1 className="lg:text-[1.5rem] p-2 font-medium text-center text-white mt-4 font-montserrat bg-blueColor w-[70%] lg:w-[40%] mx-auto rounded-xl rounded-br-none shadow-xl">
        Are you going somewhere? Add a route!
      </h1>
      <Form
        method="post"
        className="flex flex-col items-center bg-white w-[70%] mx-auto mt-10 font-montserrat px-4 py-10 rounded-md shadow-2xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start mx-auto">
          <label
            htmlFor="dateAndTime"
            className="text-sm font-medium text-gray-700 mx-auto"
          >
            Date and Time
          </label>
          <DatePicker
            id="dateAndTime"
            selected={dateAndTime}
            onChange={(date) => setDateAndTime(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="d MMMM, yyyy h:mm aa"
            className="text-center"
          />
        </div>
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
          className="relative bg-blue-500 text-white font-medium py-[0.5rem] px-[1.5rem] md:px-[3rem] lg:px-[4rem] mr-0 mb-[20px] md:mb-0 rounded-[3rem] group overflow-hidden z-[1] text-nowrap"
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
