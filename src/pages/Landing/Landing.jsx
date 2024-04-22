// -React-
import React from "react";
// -Constants-
import { logoImage, landingImage } from "../../constants/ImageConstant";

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center md:justify-start md:pl-10 pt-10 cursor-default mx-auto">
        <img src={logoImage} alt="Logo" className="w-[48px] h-[48px]" />
        <div className="text-3xl font-montserrat pl-[0.5rem] text-blue-500">
          Jumpin
        </div>
      </div>
      <div className="flex items-center justify-center pt-[5rem] font-montserrat">
        <div className="max-w-screen-lg flex lg:flex-row lg:justify-between flex-col-reverse justify-center mx-auto px-6 py-12 items-center text-center w-[80%]">
          <div className="flex flex-col items-center lg:w-[50%] lg:mr-20">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to <span className="text-blue-500">Jumpin</span>
            </h1>
            <p className="text-gray-600 font-montserrat mb-4">
              In a world full of opportunities, Jumpin is your reliable partner
              in the quest for the perfect ride. Our innovative platform allows
              users to easily offer rides, find transportation, or send
              packages, all with the ability to negotiate the price. We pave the
              way to success for everyone!
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={landingImage}
              alt="LandingImage"
              className="w-full md:w-[70%] lg:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
