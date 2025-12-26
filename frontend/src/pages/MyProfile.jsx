import React, { useContext, useEffect, useState } from "react";
import API from "../../config/API";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const [userData, setUserData] = useState({
    name: user?.username ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    address: user?.address ?? "",
    gender: user?.gender ?? "",
    birthday: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const onHandleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    setIsEdit(false);
    try {
      const res = await API.post("/my-profile", {
        phone: userData.phone,
        address: userData.address,
        gender: userData.gender,
        dob: userData.birthday,
      });
      setUser({ ...user, ...userData });
      console.log(res.data)
    } catch (error) {
      alert(error)
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-400 px-8 py-12">
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl font-bold text-blue-600">
                    {userData.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  {isEdit ? (
                    <input
                      className="text-3xl font-bold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-white/50 focus:outline-none focus:border-white"
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={onHandleChange}
                    />
                  ) : (
                    <h2 className="text-3xl font-bold text-white mb-1">
                      {userData.name}
                    </h2>
                  )}
                  <p className="text-blue-100">Patient Profile</p>
                </div>
              </div>
            </div>

            <div className="px-8 py-8">
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-blue-600 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Contact Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Email Address</p>
                    {isEdit ? (
                      <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={onHandleChange}
                        className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{userData.email}</p>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Phone Number</p>
                    {isEdit ? (
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={onHandleChange}
                        className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{userData.phone}</p>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow md:col-span-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Address</p>
                    {isEdit ? (
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={onHandleChange}
                        className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{userData.address}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-6 bg-purple-600 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Basic Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Gender</p>
                    {isEdit ? (
                      <input
                        type="text"
                        name="gender"
                        value={userData.gender}
                        onChange={onHandleChange}
                        className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{userData.gender}</p>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Date of Birth</p>
                    {isEdit ? (
                      <input
                        type="date"
                        name="birthday"
                        value={userData.birthday}
                        onChange={onHandleChange}
                        className="w-full text-gray-800 font-medium bg-white px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <p className="text-gray-800 font-medium">{userData.birthday}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  className="flex-1 px-6 py-3 bg-white border-2 border-blue-500 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all hover:cursor-pointer duration-200 shadow-sm hover:shadow-md"
                  onClick={() => setIsEdit(true)}
                >
                   Edit Profile
                </button>
                <button
                  className="flex-1 px-6 py-3 bg-purple-500 hover:bg-purple-600 hover:cursor-pointer text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  onClick={onSubmit}
                >
                   Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;