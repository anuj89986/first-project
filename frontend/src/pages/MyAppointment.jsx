import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import API from "../../config/API";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const [allAppointments, setAllAppointments] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);


  useEffect(() => {
    if(!user) return;
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

  const myAppointments = allAppointments.filter(
    (item) => item.user._id === user._id
  );

  const cancelSubmit = async (id) => {
    try {
      await API.patch(`/appointment/${id}`);
      setAllAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = (appointmentId,fees)=>{
    navigate(`/payment?appointmentId=${appointmentId}&fees=${fees}`)
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-150">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          My Appointments
        </h2>

        {myAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src="https://res.cloudinary.com/drnege4qt/image/upload/v1762255417/82bb8d2a-7db2-4991-aa7c-b5f9eb1854e0.png"
              alt="No appointments"
              className="w-24 h-24 mb-4 opacity-50"
            />
            <p className="text-xl text-gray-500 font-medium">
              You don't have any appointments
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Book an appointment with a doctor to get started
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {myAppointments.map((item, index) => (
              <li
                key={index}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
                  <div className="bg-blue-500 pt-4 rounded-2xl">
                    <img
                      src={item.doctor.image}
                      alt={`${item.doctor.name}`}
                      className="w-28 h-28 object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.doctor.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.doctor.speciality}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div>
                        <p className="font-semibold text-gray-900">Address:</p>
                        <p className="text-gray-600">{item.doctor.address}</p>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900">
                          Date &amp; Time:
                        </p>
                        <div className="flex gap-3">
                          <p className="text-gray-600">
                            {new Date(item.date).toLocaleDateString("en-US")}
                          </p>
                          <p className="text-gray-600">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!item.bookingStatus && <div className="sm:self-center sm:ml-auto"><button
                        onClick={()=>handleSubmit(item._id,item.doctor.fees)}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-green hover:bg-gray-100 transition bg-white"
                      >
                        Click To Pay
                      </button></div>}
                  <div className="sm:self-center sm:ml-auto">
                    {item.status ? (
                      <button
                        onClick={()=>navigate(`/report/${item._id}`)}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition bg-green-600"
                      >
                        Open Report
                      </button>
                      
                    ): item.bookingStatus? (<button
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-green-600  bg-white"
                      >
                        Payment Successfull
                      </button>): (
                      <button
                        onClick={() => cancelSubmit(item._id)}
                        className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition bg-red-600"
                      >
                        Cancel appointment
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MyAppointment;