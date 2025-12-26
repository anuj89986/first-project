import React from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const RelatedDoctor = ({ speciality, id }) => {
  const { Doctors } = useContext(AppContext);

  const relDoc = Doctors.filter(
    (item) => item.speciality === speciality && item._id !== id
  );

  const navigate = useNavigate();

  return (
    <>
      <div className="my-12 md:my-20 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center font-extrabold text-2xl sm:text-3xl md:text-4xl my-4 md:my-6 text-center">
          RELATED DOCTORS
        </div>
        <div className="flex justify-center text-gray-500 font-semibold text-sm md:text-base px-4 text-center mb-8">
          Simply browse through our extensive list of trusted doctors
        </div>
        <div className="flex justify-center gap-8 flex-wrap">
          {relDoc.map((doctor, idx) => (
            <div
              className="bg-white border border-gray-200 rounded-lg overflow-hidden w-72 hover:shadow-lg transition-shadow duration-300"
              key={idx}
            >
              <div className="bg-gray-100 p-6 flex items-center justify-center h-80">
                <img
                  className="w-full h-full object-contain"
                  src={doctor.image}
                  alt={doctor.name}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {doctor.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {doctor.speciality}
                </p>
                <button
                  onClick={() => {navigate(`/appointment/${doctor._id}`),scrollTo(0,0,0)}}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded transition-colors hover:cursor-pointer duration-300"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedDoctor;