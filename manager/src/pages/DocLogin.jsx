import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { DocContext } from "../context/DocContext";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import API from "../../config/API";

const DocLogin = () => {
  const { docPanel, setDocPanel } = useContext(DocContext);
  const { setAdminLogin } = useContext(AdminContext);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data.email, data.password);
      const res = await API.post("/doctor/login", {
        email: data.email,
        password: data.password,
      });
      alert("login Successfull");
      setDocPanel(res.data.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-white to-slate-200 py-12 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-slate-900">Doctor Login</h2>
          <p className="text-sm text-slate-500 mt-2">
            Sign in with your credentials to access the dashboard.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Login"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition cursor-pointer"
            />
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setAdminLogin(true)}
            className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocLogin;
