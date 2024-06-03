// -React-
import React, { useState } from "react";
import { Link } from "react-router-dom";
// -Icons-
import { FaLocationArrow } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
// -Constants-
import { Links } from "../../constants/LinksConstant";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-blueColor border-b-2 border-black border-opacity-20 font-montserrat">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <FaLocationArrow className="text-white cursor-pointer" />
          <div className="self-center text-2xl font-medium font-montserrat whitespace-nowrap text-white">
            Jumpin
          </div>
        </Link>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <FaTimes className="" /> : <FiMenu className="" />}
          </button>
        </div>
        <div
          className={`w-full md:w-auto md:flex ${isOpen ? "block" : "hidden"}`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {Links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 ease-in-out duration-300 hover:text-gray-400 md:hover:bg-transparent md:border-0 md:hover:text-bluePurple md:p-0"
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <button
              onClick={() => {
                localStorage.removeItem("jwtToken");
                window.location.href = "/";
              }}
            >
              <MdLogout className="text-white mt-6 md:mt-0 mx-auto" />
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
