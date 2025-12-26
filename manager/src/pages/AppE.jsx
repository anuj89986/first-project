import React from 'react'
import { useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import API from '../../config/API';
import { toast } from 'react-toastify';

const AppE = () => {
    const [allAppointments, setAllAppointments] = useState([]);
    const [medicines, setMedicines] = useState([{ id: 1 }]);
    const {appointmentId} = useParams()

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

  const requiredApp = allAppointments.filter((app)=>app._id===appointmentId)

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async(data) => {
    try {
      await API.post(`/appointment/save-report/${appointmentId}`,{
        weight : data.weight,
        temperature : data.temperature,
        remark : data.remark,
        medicine : data.medicine
      }
    )
    toast.success("submitted Succesfully")
    } catch (error) {
      console.log(error)
      toast.error("submittion failed")
    }
  }

  const addMedicine = () => {
    setMedicines([...medicines, { id: medicines.length + 1 }]);
  };

  const removeMedicine = (id) => {
    setMedicines(medicines.filter(med => med.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="border-b-2 border-blue-500 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Doctor Report Form</h1>
            <p className="text-gray-600 text-sm mt-1">Fill in patient examination details</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 bg-blue-50 px-4 py-2 rounded">
                Patient Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Name:</span>
                  <p className="text-gray-900 mt-1">{requiredApp[0]?.user?.username}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Phone:</span>
                  <p className="text-gray-900 mt-1">{requiredApp[0]?.user?.phone}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Gender:</span>
                  <p className="text-gray-900 mt-1 capitalize">{requiredApp[0]?.user?.gender}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Address:</span>
                  <p className="text-gray-900 mt-1">{requiredApp[0]?.user?.address}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 bg-blue-50 px-4 py-2 rounded">
                Vital Signs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperature (°F)
                  </label>
                  <input 
                    {...register("temperature")} 
                    type="text"
                    placeholder="97"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input 
                    {...register("weight")} 
                    type="text"
                    placeholder="70"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 bg-blue-50 px-4 py-2 rounded">
                Doctor's Remarks
              </h2>
              <div className="px-4">
                <textarea 
                  {...register("remark")} 
                  rows="4"
                  placeholder="Enter your observations and recommendations..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 bg-blue-50 px-4 py-2 rounded">
                <h2 className="text-lg font-semibold text-gray-800">
                  Prescription
                </h2>
                <button
                  type="button"
                  onClick={addMedicine}
                  className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                >
                  + Add Medicine
                </button>
              </div>

              <div className="space-y-3 px-4">
                {medicines.map((med, index) => (
                  <div key={med.id} className="border border-gray-300 p-4 rounded bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-700">Medicine {index + 1}</span>
                      {medicines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMedicine(med.id)}
                          className="text-red-500 text-sm hover:text-red-700 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Medicine Name
                        </label>
                        <input 
                          {...register(`medicine.${index}.name`)} 
                          type="text"
                          placeholder="Enter medicine name"
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dosage
                        </label>
                        <select 
                          {...register(`medicine.${index }.dose`)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
                        >
                          <option value="1/Day">1 time / Day</option>
                          <option value="2/Day">2 times / Day</option>
                          <option value="3/Day">3 times / Day</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-300">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppE