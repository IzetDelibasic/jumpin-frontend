// -React-
import React, { useState } from "react";
import { useNavigate, Link, Form } from "react-router-dom";
import { toast } from "react-toastify";
// -Constants-
import { logoImage, backgroundImage } from "../../constants/ImageConstant";
//- Axios -
import axios from "axios";
// -Components-
import { FormRow } from "../../components";
// -Cookies-
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    setFormValid(email.trim() !== "" && password.trim() !== "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    if (!formValid) return;
    try {
      const response = await axios.post(
        "https://localhost:7065/api/User/UserLogin",
        userData
      );
      const { firstName, lastName, email, phoneNumber, userToken } =
        response.data;
      const loggedInUserData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        userToken,
      };
      localStorage.clear();
      localStorage.setItem(
        "loggedInUserData",
        JSON.stringify(loggedInUserData)
      );
      localStorage.setItem("jwtToken", userToken);
      toast.success("Login successful!");
      console.log(response);

      navigate("/dashboard");
    } catch (err) {
      toast.error("An error occurred");
      return err;
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center md:justify-start cursor-default mx-auto pb-4 pt-0">
        <img src={logoImage} alt="Logo" className="w-[48px] h-[48px]" />
        <div className="text-3xl font-montserrat pl-[0.5rem] text-blue-500">
          Jumpin
        </div>
      </div>
      <div className="bg-white bg-opacity-80 xl:w-[25%] w-[97%] sm:w-[50%] md:w-[40%] p-8 rounded-[10px] rounded-bl-none flex flex-col items-center">
        <h1 className="text-2xl font-bold text-bluePurple uppercase mb-4 text-center">
          Login
        </h1>
        <Form
          className="flex flex-col items-center"
          method="post"
          onSubmit={handleSubmit}
        >
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            onChange={handleInputChange}
          />
          <FormRow
            type="password"
            name="password"
            labelText="Password"
            onChange={handleInputChange}
          />
          <button
            className={`relative bg-blue-500 text-white font-medium py-[1rem] px-[3.5rem] md:px-[4rem] lg:px-[5rem] mr-0 mb-[20px] md:mb-0 rounded-[3rem] group overflow-hidden z-[1] ${
              !formValid && "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!formValid}
          >
            <div className="">Login</div>
            <div className="absolute inset-0 bg-black w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
          </button>
        </Form>
        <div className="pt-2 font-montserrat">
          Not a member yet?
          <Link to="/register" className="ml-1 font-medium text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
