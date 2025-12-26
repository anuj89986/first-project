import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RelatedDoctor from "../components/RelatedDoctor";
import API from "../../config/API";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { Doctors } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState([]);
  const [slot, setSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTimeIndex, setslotTimeIndex] = useState(0);
  const navigate = useNavigate();
  const [allAppointments, setAllAppointments] = useState([]);

  const nextDates = () => {
    setDate([]);
    const today = new Date();
    const dateArray = [];
    const dayArray = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dateArray.push(date);
      dayArray.push(date.toLocaleString("en-US", { weekday: "short" }));
    }
    setDate(dateArray);

    const currentDate = dateArray[slotIndex];
    const startingTime = new Date();
    startingTime.setHours(9, 0, 0, 0);
    const endingTime = new Date();
    endingTime.setHours(19, 0, 0, 0);

    if (currentDate.getDate() === today.getDate()) {
      const currentHour = new Date(today);
      const selectedSlot = new Date(startingTime);

      if (currentHour.getHours() > 9 && currentHour.getHours() !== 23) {
        selectedSlot.setHours(currentHour.getHours() + 1);
      }
      const slotArray = [];
      while (
        selectedSlot.getHours() < endingTime.getHours() &&
        currentHour.getHours() !== 23
      ) {
        slotArray.push(
          selectedSlot.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        selectedSlot.setHours(selectedSlot.getHours() + 1);
      }
      setSlot(slotArray);
    } else {
      const selectedSlot = new Date(startingTime);
      const slotArray = [];
      while (selectedSlot.getHours() < endingTime.getHours()) {
        slotArray.push(
          selectedSlot.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        selectedSlot.setHours(selectedSlot.getHours() + 1);
      }
      setSlot(slotArray);
    }
  };

  useEffect(() => {
    nextDates();
  }, [slotIndex, allAppointments]);

  const findDoc = () => {
    const docInfo = Doctors.find((item) => item._id == docId);
    setDoctor(docInfo);
  };

  useEffect(() => {
    findDoc();
  }, [Doctors, docId]);

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const res = await API.get("/appointment/all-appointments");
        setAllAppointments(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAppointment();
  }, []);

  const onSubmit = async () => {
    if (!user) {
      navigate("/login");
    }
    try {
      await API.post(`/appointment/${docId}`, {
        time: availableSlots[slotTimeIndex],
        date: new Date(date[slotIndex]).toLocaleDateString("en-US"),
      });
      window.scrollTo(0, 0);
      navigate("/my-appointments");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to book appointment");
    }
  };

  const onDateChange = (e) => {
    setSlotIndex(e);
  };

  const onTimeChange = (e) => {
    setslotTimeIndex(e);
  };

  const isSlotBooked = (slotTime) => {
    const selectedDate = new Date(date[slotIndex]).toLocaleDateString("en-US");
    return allAppointments.some(
      (appointment) =>
        appointment.doctor._id === docId &&
        appointment.date === selectedDate &&
        appointment.time === slotTime
    );
  };

  const availableSlots = slot.filter((slotTime) => !isSlotBooked(slotTime));

  return (
    doctor && (
      <>
        <div className="flex flex-col md:flex-row my-8 md:my-20 mx-4 sm:mx-8 md:mx-20 lg:mx-40 gap-4 md:gap-8 lg:gap-10">
          
          <div className="h-48 w-48 sm:h-56 sm:w-56 md:h-60 md:w-60 border-2 border-gray-300 pt-4 sm:pt-5 md:pt-7 pl-4 sm:pl-5 md:pl-7 rounded-2xl md:rounded-3xl bg-blue-500 flex mx-auto md:mx-0">
            <img src={doctor.image} className="w-full h-full object-contain" />
          </div>

          
          <div className="border-2 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col rounded-2xl md:rounded-3xl border-gray-300 w-full md:w-3/5">
            <div className="font-extrabold text-2xl sm:text-3xl md:text-4xl font-serif flex gap-2 md:gap-3 items-center">
              {doctor.name}
              <img
                className="w-7 sm:w-8 md:w-9"
                src="/icons/verify.png"
                alt="verified"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-5 my-2 md:my-3 text-gray-600 font-medium text-sm md:text-base">
              <div>{doctor.qualification}</div>
              <div className="hidden sm:block">-</div>
              <div>{doctor.speciality}</div>
              <div className="border-gray-400 border-2 py-0.5 px-2 rounded-full whitespace-nowrap">
                {doctor.experience} years
              </div>
            </div>

            <div className="mt-3 md:mt-4">
              <div className="flex gap-2 text-black font-bold py-2 md:py-3 items-center">
                About
                <img
                  src="/icons/info.png"
                  className="w-5 md:w-6"
                  alt="info"
                />
              </div>
              <div className="font-semibold text-gray-500 text-sm md:text-base leading-relaxed">
                {doctor.about}
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 my-6 md:my-10 py-4 md:py-5 border-gray-400 rounded-2xl md:rounded-4xl bg-[#ededf5] hover:bg-[#e4e4f9] mx-4 sm:mx-8 md:mx-20 lg:mx-40">

          <div className="flex justify-center font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-400 px-4">
            BOOKING SLOTS
          </div>

          <div className="flex gap-2 md:gap-5 justify-center overflow-x-auto pb-4 md:pb-0 px-4 md:px-0">
            {date.map((item, index) => (
              <button
                onClick={() => onDateChange(index)}
                className={`px-3 sm:px-4 md:px-5 py-2 md:py-3 my-4 md:my-5 rounded-full cursor-pointer transition-all duration-200 hover:scale-105 font-bold whitespace-nowrap flex text-sm md:text-base ${
                  index === slotIndex
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                }`}
                key={index}
              >
                <div className="flex flex-col items-center justify-center leading-tight text-center">
                  <span className="text-xs sm:text-sm md:text-base">
                    {item.toLocaleString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-sm sm:text-base md:text-lg font-semibold">
                    {item.getDate().toLocaleString()}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="px-4 md:px-0">
            <div className="flex gap-2 md:gap-5 justify-center flex-wrap mb-6 md:mb-10">
              {availableSlots.length > 0 ? (
                availableSlots.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => onTimeChange(index)}
                    className={`px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded-full cursor-pointer font-bold hover:scale-105 transition-all duration-200 text-sm md:text-base ${
                      slotTimeIndex === index
                        ? "bg-green-500 text-white"
                        : "bg-white text-green-500"
                    }`}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <div className="text-red-500 font-bold text-lg md:text-xl">
                  No slots available
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center px-4 md:px-0">
            {slot.length > 0 && (
              <button
                onClick={onSubmit}
                className="bg-blue-400 px-4 sm:px-5 md:px-6 py-2 md:py-3 my-3 md:my-5 rounded-full cursor-pointer transition-all duration-200 hover:bg-blue-500 hover:scale-105 text-white font-bold text-sm md:text-base"
              >
                BOOK AN APPOINTMENT
              </button>
            )}
          </div>
        </div>

        <div className="px-4 md:px-0">
          <RelatedDoctor
            speciality={doctor.speciality}
            id={doctor._id}
            slotindex={setSlotIndex}
            slotTimeIndex={setslotTimeIndex}
          />
        </div>
      </>
    )
  );
};

export default Appointment;