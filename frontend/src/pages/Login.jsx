import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import API from "../../config/API";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/login", {
        email: data.email,
        password: data.password,
      });
      alert("Login Successful");
      setUser(res.data.data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6"
    >
      <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 w-full max-w-md border border-gray-200">
        <div className="mb-6 text-center">
          <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Login
          </div>
          <div className="text-gray-500 text-sm sm:text-base">
            Please login to book appointment
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Email</div>
            <input
              {...register("email", { required: true })}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base bg-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700 mb-1">Password</div>
            <input
              {...register("password", { required: true })}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm sm:text-base bg-white"
              placeholder="••••••••"
            />
          </div>
        </div>

        <input
          type="submit"
          value="Login"
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg cursor-pointer transition duration-200 text-sm sm:text-base"
        />

        <div className="text-sm sm:text-base font-medium text-gray-700 mt-5 text-center">
          Don’t have an account?
          <Link
            to="/sign-up"
            className="font-semibold text-blue-700 ml-2 hover:text-blue-800"
          >
            Sign Up Here
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;