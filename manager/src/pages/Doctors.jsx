import React from 'react'
import { useContext } from 'react'
import { DocContext } from '../context/DocContext'
import API from '../../config/API'
import { toast } from 'react-toastify';

const Doctors = () => {
  const {doctors,setDoctors} = useContext(DocContext)
  

  const handleDelete = async(docId)=>{
    try {
      await API.patch(`/admin/remove-doc/${docId}`)
      toast.success('doctor removed Successfully')
      setDoctors((prev)=>prev.filter(item=>item._id!==docId))
    } catch (error) {
      console.log(error)
      toast.error('error in removing doctor')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-600 mt-1">Manage all registered doctors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">{doctor.name}</h2>
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded mt-1">
                    {doctor.speciality}
                  </span>
                </div>
                
                <button
                onClick={()=>handleDelete(doctor._id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="mb-3">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {doctor.about}
                </p>
              </div>
            </div>
          ))}
        </div>

        {doctors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No doctors found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Doctors