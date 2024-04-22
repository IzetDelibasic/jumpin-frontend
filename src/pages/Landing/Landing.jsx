// -React-
import React from "react";
// -Constants-
import {
  logoImage,
  landingImage,
  backgroundImage,
} from "../../constants/ImageConstant";
import { LandingAction } from "../../components";

const Landing = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center md:justify-start md:pl-10 pt-10 mb-10 cursor-default mx-auto">
        <img src={logoImage} alt="Logo" className="w-[48px] h-[48px]" />
        <div className="text-3xl font-montserrat pl-[0.5rem] text-blue-500">
          Jumpin
        </div>
      </div>
      <div className="flex items-center justify-center lg:mt-10 mt-2 lg:pt-[2rem] font-montserrat bg-white bg-opacity-75 xl:w-[70%] md:w-[70%] w-[95%] mx-auto rounded-xl">
        <div className="max-w-screen-lg flex lg:flex-row lg:justify-between flex-col-reverse sm:flex-col justify-center mx-auto px-6 lg:py-12 py-6 items-center text-center">
          <div className="flex flex-col items-center lg:w-[60%] w-[90%] sm:mb-10 lg:mb-0">
            <h1 className="md:text-3xl text-xl font-bold mb-4">
              Welcome to <span className="text-blue-500">Jumpin</span>
            </h1>
            <p className="text-black font-montserrat mb-4">
              In a world full of opportunities, Jumpin is your reliable partner
              in the quest for the perfect ride. Our innovative platform allows
              users to easily offer rides, find transportation, or send
              packages, all with the ability to negotiate the price. We pave the
              way to success for everyone!
            </p>
            <LandingAction />
          </div>
          <div className="flex lg:justify-end justify-center mb-4">
            <img
              src={landingImage}
              alt="LandingImage"
              className="w-[80%] md:w-[80%] lg:w-[85%] rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
