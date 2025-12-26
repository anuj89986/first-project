import React from "react";
import { useForm } from "react-hook-form";
import API from "../../config/API.js";
import { useState } from "react";
import { toast } from 'react-toastify';


const AddDoctor = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit,reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", data.DoctorName);
      formData.append("email", data.Email);
      formData.append("image", data.ProfilePic[0]);
      formData.append("password", data.password);
      formData.append("gender", data.Gender);
      formData.append("speciality", data.Specialization);
      formData.append("about",data.About);
      const res = await API.post("/admin/register-doctor", formData);
      toast.success("Doctor added successfully");
      reset()
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Add New Doctor
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to add a new doctor
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">
                  Doctor Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("DoctorName", { required: true })}
                  placeholder="Enter doctor's name"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("Email", { required: true })}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">
                  Specialization
                </label>
                <select
                  {...register("Specialization")}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm text-gray-700 bg-white cursor-pointer"
                >
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">
                  Gender
                </label>
                <select
                  {...register("Gender")}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm text-gray-700 bg-white cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">
                  Qualification
                </label>
                <input
                  {...register("Qualification")}
                  placeholder="Enter qualification"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-1.5">
                  About
                </label>
                <textarea
                  {...register("About")}
                  placeholder="Brief description about the doctor"
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm text-gray-700 placeholder-gray-400 resize-none"
                />
              </div>
              <div className="flex flex-col sm:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-1.5">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("ProfilePic")}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-md focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none text-sm text-gray-700 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-teal-50 file:text-teal-700"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              {loading ? (
                <button
                  className="bg-teal-400 text-white font-medium py-2.5 px-8 rounded-md text-sm hover:cursor-not-allowed "
                  disabled={true}
                >
                  Adding Doctor...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-teal-600 text-white font-medium py-2.5 px-8 rounded-md hover:bg-teal-700 transition-colors duration-150 text-sm"
                >
                  Add Doctor
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
