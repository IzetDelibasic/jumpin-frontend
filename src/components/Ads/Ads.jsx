// -React-
import React, { useState, useEffect } from "react";
// -Constants-
import {
  testLogoOne,
  testLogoTwo,
  testLogoThree,
} from "../../constants/ImageConstant";

const Ads = () => {
  const [ads, setAds] = useState([
    {
      text: "Vaše nezaboravno putovanje počinje ovdje - Centrotours, centar svjetskih avantura.",
      image: testLogoOne,
    },
    {
      text: "Putujte širom Europe uz Flixbus - povoljan, udoban i ekološki prihvatljiv način putovanja.",
      image: testLogoTwo,
    },
    {
      text: "Svaka staza vodi ka nezaboravnim uspomenama - Let's Go",
      image: testLogoThree,
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === ads.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [ads]);

  return (
    <div className="relative overflow-hidden bg-gray-200 border-b-[1px] border-black bg-opacity-50 p-10">
      <div
        className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {ads.map((ad, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center mx-auto w-full text-center"
          >
            <img
              src={ad.image}
              alt={`Reklama ${index + 1}`}
              className="w-14 h-10 mr-2 ml-2"
            />
            <h3 className="lg:text-lg text-[0.8rem] font-montserrat">
              {ad.text}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ads;
