import React, { useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.js";
import Specialities from "../assets/SpecDetalis/specialities.js";
import { useNavigate } from "react-router-dom";

const Doctor = () => {
  const { specialist } = useParams();
  const { Doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const doctorToShow = specialist
    ? Doctors.filter((doctor) => doctor.speciality === specialist)
    : Doctors;

  return (
    <>
      <div className="flex min-h-screen bg-white">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-24 left-4 z-50 bg-gray-800 text-white p-2 rounded-md shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <div
          className={`
            fixed lg:sticky top-0 lg:top-20 left-0 h-full lg:h-auto
            w-64 lg:w-1/4 xl:w-1/5
            py-7 border-r border-gray-200 bg-white
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            z-40 lg:z-0
            overflow-y-auto
          `}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mt-8 lg:mt-0">
            {Specialities.map((spec, index) => (
              <div className="px-4 sm:px-6 py-2 sm:py-3" key={index}>
                <NavLink
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "block border-l-4 border-gray-800 text-gray-800 pl-3 sm:pl-4 pr-4 sm:pr-6 py-2 sm:py-3 font-semibold text-sm sm:text-base"
                      : "block border-l-4 border-transparent text-gray-600 pl-3 sm:pl-4 pr-4 sm:pr-6 py-2 sm:py-3 font-medium hover:text-gray-800 text-sm sm:text-base"
                  }
                  to={`/doctor/${spec.special}`}
                >
                  {spec.special}
                </NavLink>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 w-full lg:w-auto">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 ml-12 lg:ml-0">
            {specialist ? `${specialist} Specialists` : "All Doctors"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {doctorToShow.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-gray-100 p-4 sm:p-6 md:p-8 flex items-center justify-center h-64 sm:h-72 md:h-80">
                  <img
                    className="w-full h-full object-contain"
                    src={doctor.image}
                    alt={doctor.name}
                  />
                </div>
                <div className="p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
                    {doctor.speciality}
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {doctor.about}
                  </p>
                  <div className="flex gap-2 md:gap-3">
                    <button
                      onClick={() => navigate(`/appointment/${doctor._id}`)}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 md:py-3 px-2 sm:px-3 md:px-4 rounded transition-colors duration-300 text-xs sm:text-sm md:text-base hover:cursor-pointer"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;