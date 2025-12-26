import React from 'react'
import { useContext } from 'react'
import { DocContext } from '../context/DocContext'
import { useState } from 'react'
import { useEffect } from 'react'
import API from '../../config/API'

const AdminHome = () => {

  const [doctors,setDoctors] = useState([])
  const [appointments,setAppointments] = useState([])
  const [users,setUsers] = useState([])

  useEffect(()=>{
    const getData = async()=>{
      const allDoc = await API.get('/doctor/all-doctors')
        setDoctors(allDoc.data.data)
        const allApp = await API.get('/appointment/all-appointments')
        setAppointments(allApp.data.data)
        const allUsers = await API.get('/all-users')
        setUsers(allUsers.data.data)
    }
    getData()
  },[])



  return (
    <div className='flex-1 p-8 bg-gray-50 min-h-screen overflow-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Dashboard</h1>
        <p className='text-gray-600'>Welcome to Admin Panel</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium mb-1'>Total Doctors</p>
              <h3 className='text-3xl font-bold text-gray-800'>{doctors.length}</h3>
            </div>
            <div className='bg-blue-100 p-4 rounded-full'>
              <span className='text-4xl'>👨‍⚕️</span>
            </div>
          </div>
        </div>
        
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium mb-1'>Total Appointments</p>
              <h3 className='text-3xl font-bold text-gray-800'>{appointments.length}</h3>
            </div>
            <div className='bg-green-100 p-4 rounded-full'>
              <span className='text-4xl'>📅</span>
            </div>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm font-medium mb-1'>Total Patients</p>
              <h3 className='text-3xl font-bold text-gray-800'>{users.length}</h3>
            </div>
            <div className='bg-purple-100 p-4 rounded-full'>
              <span className='text-4xl'>👥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome