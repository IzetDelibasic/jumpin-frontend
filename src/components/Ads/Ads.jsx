import React, { useState, useEffect } from "react";
import {
  testLogoOne,
  testLogoTwo,
  testLogoThree,
} from "../../constants/ImageConstant";

const Ads = () => {
  const [ads, setAds] = useState([
    { text: "Huawei", image: testLogoOne },
    { text: "Toblerone", image: testLogoTwo },
    { text: "McDonald's", image: testLogoThree },
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
    <div className="relative overflow-hidden bg-white border-b-2 border-black bg-opacity-50 p-10">
      <div
        className="absolute top-0 left-0 w-full h-full flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {ads.map((ad, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex items-center justify-center w-full"
          >
            <img
              src={ad.image}
              alt={`Reklama ${index + 1}`}
              className="w-14 h-12 mr-2"
            />
            <h3 className="text-lg">{ad.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ads;
