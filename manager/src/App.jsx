import { useState } from "react";
import { Router } from "react-router-dom";
import { Routes, Route,Navigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar.jsx";
import AdminHome from "./pages/AdminHome.jsx";
import AddDoctor from "./pages/AddDoctor.jsx";
import Appointments from "./pages/Appointments.jsx";
import Doctors from "./pages/Doctors.jsx";
import axios from "axios";
import { useEffect } from "react";
import API from "../config/API.js";
import AdminLogin from "./pages/AdminLogin.jsx";
import { AdminContext } from "./context/AdminContext.jsx";
import { DocContext } from "./context/DocContext.jsx";
import DocNavbar from "./components/DocNavbar.jsx";
import DocHome from "./pages/DocHome.jsx";
import DocLogin from "./pages/DocLogin.jsx";
import DocAppointments from "./pages/DocAppointments.jsx";
import AppE from "./pages/AppE.jsx";
import Report from "./pages/Report.jsx";
import DocProfile from "./pages/DocProfile.jsx";

function App() {
  const [admin, setAdmin] = useState(null);
  const [docPanel, setDocPanel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [adminLogin, setAdminLogin] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const doc = await API.get("/doctor/check-auth");
        setDocPanel(doc.data.data);
      } catch (error) {
        console.log(error);
      } 
      try {
        const res = await API.get("/admin/check-auth");
        setAdmin(res.data.data);
        const allDoc = await API.get("/doctor/all-doctors");
        setDoctors(allDoc.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-slate-600">Checking session…</div>
      </div>
    );
  }
  if (admin) {
    return (
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <DocContext.Provider value={{ doctors, setDoctors }}>
          <div className="flex">
            <AdminSidebar />
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/addDoctor" element={<AddDoctor />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </DocContext.Provider>
      </AdminContext.Provider>
    );
  }

  if (docPanel) {
    return (
      <DocContext.Provider value={{ docPanel, setDocPanel }}>
        <DocNavbar />
        <Routes>
          <Route path="/" element={<DocHome />} />
          <Route path="/appointments" element={<DocAppointments />} />
          <Route path="/appointments/:appointmentId" element={<AppE />} />
          <Route
            path="/appointments/:appointmentId/report"
            element={<Report />}
          />
          <Route path="/profile" element={<DocProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </DocContext.Provider>
    );
  }

  return (
    <AdminContext.Provider
      value={{ admin, setAdmin, adminLogin, setAdminLogin }}
    >
      <DocContext.Provider
        value={{ docPanel, setDocPanel, doctors, setDoctors }}
      >
        {adminLogin ? <AdminLogin /> : <DocLogin />}
      </DocContext.Provider>
    </AdminContext.Provider>
  );
}

export default App;
