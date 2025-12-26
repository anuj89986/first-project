import React from "react";
// import { useContext } from "react";
import API from "../../config/API";
import { useState } from "react";
import { useEffect } from "react";
import { all } from "axios";

const Appointments = () => {
  const [allAppointments, setAllAppointments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const app = await API.get("/appointment/all-appointments");
        setAllAppointments(app.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const onCancel = async (id) => {
    try {
      await API.patch(`admin/cancel-appointment/${id}`);
      setAllAppointments(allAppointments.filter((app)=> app._id !== id))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-4">Appointments Page</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 mb-4">
                <img
                  src={appointment.doctor.image}
                  alt="doctor image"
                  className="w-20 h-20 rounded-full bg-gray-200 object-cover mx-auto sm:mx-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-semibold mb-1">
                    {appointment.doctor.name}
                  </h2>
                  <p className="text-gray-600">
                    specialization: {appointment.doctor.speciality}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-700">
                  <span className="font-medium">date:</span>
                  <span className="sm:ml-2">{appointment.date}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-700">
                  <span className="font-medium">time:</span>
                  <span className="sm:ml-2">{appointment.time}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-700">
                  <span className="font-medium">patient name:</span>
                  <span className="sm:ml-2">{appointment.user.username}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-700">
                  <span className="font-medium">contact:</span>
                  <span className="sm:ml-2">{appointment.user.phone}</span>
                </div>
              </div>

              {appointment.status ? <button
                onClick={() => onCancel(appointment._id)}
                className="w-full bg-gray-200 hover:bg-gray-100 text-red-600 px-4 py-2 rounded-md transition-colors"
              >
                Remove Appointment
              </button>:<button
                onClick={() => onCancel(appointment._id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Cancel Appointment
              </button>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Appointments;
