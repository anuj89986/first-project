import React, { useEffect, useState } from "react";
import API from "../../config/API";
import { useParams } from "react-router-dom";

const Report = () => {
  const [appointment, setAllAppointments] = useState([]);
  const { appointmentId } = useParams();

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

  const reqApp = appointment.filter((item) => item._id === appointmentId);
//   console.log(reqApp);
  //   const iApp = reqApp[0]
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="border-b-2 border-blue-500 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Patient Report</h1>
            <p className="text-gray-600 text-sm mt-1">
              View patient examination details
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 bg-blue-50 px-4 py-2 rounded">
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Name:</span>
                <p className="text-gray-900 mt-1">
                  {reqApp[0]?.user?.username}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Phone:
                </span>
                <p className="text-gray-900 mt-1">{reqApp[0]?.user?.phone}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Gender:
                </span>
                <p className="text-gray-900 mt-1 capitalize">
                  {reqApp[0]?.user?.gender}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Address:
                </span>
                <p className="text-gray-900 mt-1">{reqApp[0]?.user?.address}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 bg-blue-50 px-4 py-2 rounded">
              Vital Signs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Temperature (°F):
                </span>
                <p className="text-gray-900 mt-1">{reqApp[0]?.temperature}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">
                  Weight (kg):
                </span>
                <p className="text-gray-900 mt-1">{reqApp[0]?.weight}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 bg-blue-50 px-4 py-2 rounded">
              Doctor's Remarks
            </h2>
            <div className="px-4">
              <p className="text-gray-900 leading-relaxed">
                {reqApp[0]?.remark}
              </p>
            </div>
          </div>

          {reqApp[0]?.medicine.map((item, index) => (
            <div key={index}>
              <div className="mb-6">
                <div className="mb-3 bg-blue-50 px-4 py-2 rounded">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Prescription
                  </h2>
                </div>

                <div className="space-y-3 px-4">
                  <div className="border border-gray-300 p-4 rounded bg-gray-50">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-700">
                        Medicine {index + 1}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Medicine Name:
                        </span>
                        <p className="text-gray-900 mt-1">{item.name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">
                          Dosage:
                        </span>
                        <p className="text-gray-900 mt-1">{item.dose}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;