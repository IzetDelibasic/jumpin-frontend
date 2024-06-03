// - React -
import { Link } from "react-router-dom";
// - Components -
import { CustomButton } from "..";
// - Icons -
import { IoArrowForwardSharp } from "react-icons/io5";

const LandingAction = () => {
  return (
    <div className="flex flex-col items-center justify-center sm:flex-row md:justify-center md:w-[30rem] lg:w-full w-[90%] mx-auto md:mx-0">
      <Link to="/register">
        <CustomButton
          className="relative bg-blue-500 text-white font-medium py-[1rem] lg:px-[2.5rem] px-[2.5rem] md:px-[1.5rem] mr-0 mb-[20px] sm:mb-0 rounded-[3rem] group overflow-hidden z-[1] text-nowrap"
          iconClassName="group-hover:text-white ml-[10px]"
          title="Start Journey"
          titleClassName="group-hover:text-white font-subtitle"
          Icon={IoArrowForwardSharp}
        >
          <div className="absolute inset-0 bg-black w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
        </CustomButton>
      </Link>
      <Link to="/login">
        <CustomButton
          className="relative bg-blue-500 text-white font-medium py-[1rem] lg:px-[2.5rem] px-[2.5rem] md:px-[1.5rem] rounded-[3rem] group overflow-hidden z-[1] sm:ml-[20px] hover:border-opacity-0 hover:border-transparent text-nowrap"
          iconClassName=""
          title="Search Your Way"
          titleClassName="group-hover:text-white font-subtitle"
        >
          <div className="absolute inset-0 bg-black w-full transform origin-right transition-transform duration-300 group-hover:scale-x-0 z-[-1]"></div>
        </CustomButton>
      </Link>
    </div>
  );
};

export default LandingAction;
