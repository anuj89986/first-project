import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = ({ toScroll }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-blue-100">
        <div className="min-h-40 flex justify-center items-center gap-2 px-4 md:px-6 lg:px-8">
          <div className="text-black font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight">
            YOUR HEALTH,
          </div>
          <div className="text-blue-500 font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center leading-tight">
            OUR PRIORITY
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pb-8 md:pb-10 text-center px-4 sm:px-8 md:px-12 lg:px-40 gap-4 md:gap-5 text-gray-700">
          <p className="text-base sm:text-lg text-black py-0.5">
            Trusted care from our board-certified specialists.
          </p>
          <p className="py-0.5 text-black text-base sm:text-lg">
            We combine advanced technology with a compassionate approach to
            ensure the best outcomes for you and your family.
          </p>
          <p className="font-bold text-xl sm:text-2xl my-4 md:my-5">
            Schedule an appointment today.
          </p>
        </div>
        <div className="flex justify-center py-8 md:py-10 px-4">
          <button
            onClick={toScroll}
            className="bg-blue-500 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-3xl md:rounded-4xl hover:bg-blue-700 cursor-pointer text-lg md:text-2xl hover:scale-105 transition-all duration-700"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;