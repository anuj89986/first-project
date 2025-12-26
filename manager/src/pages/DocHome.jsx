import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocContext } from '../context/DocContext';
import { useState,useEffect } from 'react';
import API from '../../config/API';

const DocHome = () => {
  const {docPanel} = useContext(DocContext)
  const navigate = useNavigate()

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

  const myApp = allAppointments.filter((item) => item.doctor?._id === docPanel?._id);
  console.log(myApp)
  const todayApp = myApp.filter((item) => {
    const appointmentDate = new Date(item.date).toDateString();
    const today = new Date().toDateString();
    return appointmentDate === today;
  });
  const completedApp = myApp.filter(item=>item.status===true)
  const pendingApp = myApp.filter(item=>item.status===false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Good Morning,Dr. {docPanel.name}
          </h1>
          <p className="mt-2 text-gray-500">
            Here's what's happening with your patients today
          </p>
        </div>

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
            <p className="mt-2 text-3xl font-bold text-teal-600">{todayApp.length}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="mt-2 text-3xl font-bold text-green-600">{completedApp.length}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="mt-2 text-3xl font-bold text-orange-600">{pendingApp.length}</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">Quick Access</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <button
              onClick={() => navigate('/appointments')}
              className="rounded-xl bg-green-500 p-8 text-left hover:bg-teal-600 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-white">Appointments</h3>
              <p className="mt-2 text-sm text-teal-50">View and manage your schedule</p>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="rounded-xl bg-purple-500 p-8 text-left  hover:bg-purple-600 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-white">Profile</h3>
              <p className="mt-2 text-sm text-purple-50">Update your details</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocHome;