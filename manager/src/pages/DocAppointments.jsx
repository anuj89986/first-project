import React, { useContext, useEffect, useState } from "react";
import API from "../../config/API";
import { DocContext } from "../context/DocContext";
import { useNavigate } from "react-router-dom";

const DocAppointments = () => {
  const [app, setApp] = useState([]);
  const [activeTab, setActiveTab] = useState("today");
  const { docPanel } = useContext(DocContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllApp = async () => {
      try {
        const res = await API.get("/appointment/all-appointments");
        setApp(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllApp();
  }, []);

  const toChangeStatus = async (appointmentId) => {
    try {
      await API.post(`/appointment/changeStatus/${appointmentId}`);

      setApp((prev) =>
        prev.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status: !appointment.status }
            : appointment
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const myApp = app.filter((item) => item.doctor?._id === docPanel?._id && item.bookingStatus);

  const todayAppointments = myApp.filter((item) => {
    const appointmentDate = new Date(item.date).toDateString();
    const today = new Date().toDateString();
    return appointmentDate === today;
  });

  const futureAppointments = myApp.filter((item) => {
    const appointmentDate = new Date(item.date);
    const today = new Date();
    appointmentDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return appointmentDate > today;
  });

  const pastAppointments = myApp.filter((item) => {
    const appointmentDate = new Date(item.date);
    const today = new Date();
    appointmentDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return appointmentDate < today;
  });

  const displayAppointments =
    activeTab === "today"
      ? todayAppointments
      : activeTab === "future"
      ? futureAppointments
      : pastAppointments;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            My Appointments
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your scheduled appointments
          </p>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("today")}
              className={`pb-4 px-1 relative ${
                activeTab === "today"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Today's
              {activeTab === "today" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
              )}
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-600">
                {todayAppointments.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("future")}
              className={`pb-4 px-1 relative ${
                activeTab === "future"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Future
              {activeTab === "future" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
              )}
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600">
                {futureAppointments.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`pb-4 px-1 relative ${
                activeTab === "past"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Past
              {activeTab === "past" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></span>
              )}
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                {pastAppointments.length}
              </span>
            </button>
          </div>
        </div>

        {displayAppointments.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <p className="text-gray-500">
              No{" "}
              {activeTab === "today"
                ? "today's"
                : activeTab === "future"
                ? "future"
                : "past"}{" "}
              appointments found
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex justify-center">
                  <img
                    src="./public/profile.png"
                    alt="Patient"
                    className="h-20 w-20 rounded-full object-cover ring-2 ring-gray-100"
                  />
                </div>

                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {appointment.user.username}
                    </h3>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {appointment.time}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">DOB:</span>
                      <span className="font-medium text-gray-700">
                        {new Date(appointment.user.dob).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Gender:</span>
                      <span className="font-medium text-gray-700">
                        {appointment.user.gender}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium text-gray-700">
                        {appointment.user.phone}
                      </span>
                    </div>

                    <div className="text-sm">
                      <span className="text-gray-500">Address:</span>
                      <p className="mt-1 font-medium text-gray-700">
                        {appointment.user.address}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm pt-2 border-t">
                      <span className="text-gray-500">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          appointment.status
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appointment.status ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => toChangeStatus(appointment._id)}
                      className={`w-full rounded-lg py-2.5 text-sm font-medium ${
                        appointment.status
                          ? "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
                          : "text-green-600 bg-green-50 hover:bg-green-100"
                      } transition-colors`}
                    >
                      {appointment.status
                        ? "Mark as Pending"
                        : "Mark as Completed"}
                    </button>
                  </div>
                  {appointment.status===true ? <button
                    className=" w-full rounded-lg py-2.5 text-sm font-medium text-black bg-purple-50 hover:cursor-pointer"
                    onClick={() => navigate(`/appointments/${appointment._id}/report`)}
                  >
                    Open Report
                  </button>:<button
                    className="w-full rounded-lg py-2.5 text-sm font-medium text-black bg-purple-50 hover:bg-purple-100"
                    onClick={() => navigate(`/appointments/${appointment._id}`)}
                  >
                    Open Appointment
                  </button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocAppointments;
