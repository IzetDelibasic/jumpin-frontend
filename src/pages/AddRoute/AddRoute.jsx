// -React-
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// -Axios-
import axios from "axios";
// -Components-
import { FormRow } from "../../components";
// -Context-
import { useDashboardContext } from "../Dashboard/Dashboard";

const AddRoute = () => {
  const { data, firstName, lastName, email, phoneNumber } =
    useDashboardContext();
  const [routeName, setRouteName] = useState("");
  const [seatsNumber, setSeatsNumber] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [type, setType] = useState("Passenger");
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "Package") {
      setSeatsNumber("1");
    }
  }, [type]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (seatsNumber >= 1 && seatsNumber <= 10) {
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
              type: type,
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data);
        toast.success("Route added successfully!");
        navigate("/dashboard");
      } else {
        toast.error("Seats number must be between 1 and 10.");
      }
    } catch (error) {
      toast.error("An error with adding route occurred");
      return error;
    }
  };

  return (
    <div>
      <h1 className="my-6 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-blueColor">
          Add Your Route
        </span>
      </h1>
      <Form
        method="post"
        className="flex flex-col items-center bg-white lg:w-[50%] sm:w-[70%] w-[85%] mx-auto mt-10 font-montserrat px-4 py-10 rounded-[3rem] shadow-2xl"
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
            dateFormat="d MMMM, h:mm aa"
            className="text-center"
          />
        </div>
        <div className="flex items-center my-4 font-montserrat">
          <label htmlFor="type" className="mr-2">
            Type:
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-md p-2 bg-blueColor text-white"
          >
            <option value="Passenger">Passenger</option>
            <option value="Package">Package</option>
          </select>
        </div>
        <FormRow
          type="text"
          name="routeName"
          labelText="Route"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
        />
        {type === "Package" ? (
          <FormRow
            type="text"
            name="seatsNumber"
            labelText="Number of packages"
            value={seatsNumber}
            onChange={(e) => setSeatsNumber(e.target.value)}
          />
        ) : (
          <FormRow
            type="text"
            name="seatsNumber"
            labelText="Seats number"
            value={seatsNumber}
            onChange={(e) => setSeatsNumber(e.target.value)}
          />
        )}
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
          <div className="">Submit</div>
          <div className="absolute inset-0 bg-black w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
        </button>
      </Form>
    </div>
  );
};

export default AddRoute;
