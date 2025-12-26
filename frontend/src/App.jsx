import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route,Navigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctor from "./pages/Doctor.jsx";
import Appointment from "./pages/Appointment.jsx";
import MyAppointment from "./pages/MyAppointment.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer.jsx";
import { AppContext } from "./context/AppContext.js";
import SignUp from "./pages/SignUp.jsx";
import { AuthContext } from "./context/AuthContext.js";
import API from "../config/API.js";
import Report from "./pages/Report.jsx";
import Payment from "./pages/Payment.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true)
  const[Doctors,setDoctors] = useState([])

  useEffect(()=>{
    const checkLogin = async()=>{
      try {
        const docRes = await API.get('/doctor/all-doctors')
        setDoctors(docRes.data.data)
        const res = await API.get('/check-auth');
        setUser(res.data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    checkLogin();
  },[]);

  if(loading){
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }



  return (
    <>
      <AppContext.Provider value={{ Doctors }}>
        <AuthContext.Provider value={ {user, setUser} }>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/payment" element={<Payment/>} />
            <Route path="/appointment/:docId" element={<Appointment />} />
            <Route path="/my-appointments" element={<MyAppointment />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/doctor/:specialist" element={<Doctor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/report/:appointmentId" element={<Report />} />
            <Route
                path="*"
                element={
                  user ? <Navigate to="/" /> : <Navigate to="/login" />
                }
              />

          </Routes>
        </AuthContext.Provider>
      </AppContext.Provider>
      <Footer />
    </>
  );
}

export default App;