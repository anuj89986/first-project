import React, { useEffect } from "react";
import { useState } from "react";
import API from "../../config/API";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const DocProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  const [docData, setDocData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    speciality: "",
    qualification: "",
    experience: "",
    about: "",
    fees: "",
    image: ""
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await API.get("/doctor/doc-info");
        const data = res.data.data;
        setDocData(data);
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("phone", data.phone);
        setValue("address", data.address);
        setValue("qualification", data.qualification);
        setValue("experience", data.experience);
        setValue("about", data.about);
        setValue("fees", data.fees);
      } catch (error) {
        console.log(error);
      }
    };
    getInfo();
  }, [setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("qualification", data.qualification);
      formData.append("about", data.about);
      formData.append("fees", data.fees);
      formData.append("email", data.email);
      formData.append("experience", data.experience);
      
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await API.post("/doctor/update-doc", formData);
      toast.success("saved successfully");
      setIsEdit(false);
      
      const res = await API.get("/doctor/doc-info");
      setDocData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("not saved");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-blue-400 px-8 py-12">
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden relative">
                    {isEdit ? (
                      <>
                        <input 
                          type="file" 
                          className="hidden" 
                          id="imageUpload"
                          {...register("image")}
                          accept="image/*"
                        />
                        <label 
                          htmlFor="imageUpload" 
                          className="cursor-pointer flex flex-col items-center justify-center w-full h-full hover:bg-gray-100 transition-colors"
                        >
                          <svg 
                            className="w-8 h-8 text-blue-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                            />
                          </svg>
                          <span className="text-xs text-gray-600 mt-1">Upload</span>
                        </label>
                      </>
                    ) : (
                      <img src={docData.image} alt="Doctor" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    {isEdit ? (
                      <input
                        className="text-3xl font-bold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-white/50 focus:outline-none focus:border-white"
                        type="text"
                        {...register("name")}
                        placeholder="Doctor Name"
                      />
                    ) : (
                      <h2 className="text-3xl font-bold text-white mb-1">
                        {docData.name}
                      </h2>
                    )}
                    <p className="text-blue-100">Doctor Profile</p>
                  </div>
                </div>
              </div>

              <div className="px-8 py-8">
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Contact Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Email Address
                      </p>
                      <p className="text-gray-800 font-medium">{docData.email}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Phone Number
                      </p>
                      {isEdit ? (
                        <input
                          type="text"
                          {...register("phone")}
                          placeholder="1234567890"
                          className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">
                          {docData.phone}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow md:col-span-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Address
                      </p>
                      {isEdit ? (
                        <input
                          type="text"
                          {...register("address")}
                          placeholder="Enter address"
                          className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">
                          {docData.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Professional Information
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Speciality
                      </p>
                      <p className="text-gray-800 font-medium">
                        {docData.speciality}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Degree
                      </p>
                      {isEdit ? (
                        <input
                          type="text"
                          {...register("qualification")}
                          placeholder="Degree"
                          className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">
                          {docData.qualification}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Experience
                      </p>
                      {isEdit ? (
                        <input
                          type="text"
                          {...register("experience")}
                          placeholder="5 Years"
                          className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">
                          {docData.experience}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Consultation Fees
                      </p>
                      {isEdit ? (
                        <input
                          type="text"
                          {...register("fees")}
                          placeholder="$50"
                          className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">
                          {docData.fees}
                        </p>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow md:col-span-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        About
                      </p>
                      {isEdit ? (
                        <textarea
                          {...register("about")}
                          placeholder="About the doctor"
                          rows="3"
                          className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                        />
                      ) : (
                        <p className="text-gray-800 font-medium">
                          {docData.about}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="flex-1 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Profile
                  </button>
                  {loading ? (
                    <button
                      type="button"
                      disabled
                      className="flex-1 px-6 py-3 bg-gray-400 text-white font-semibold rounded-xl cursor-not-allowed"
                    >
                      Saving...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      onClick={() => setIsEdit(false)}
                      className="flex-1 px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DocProfile;
