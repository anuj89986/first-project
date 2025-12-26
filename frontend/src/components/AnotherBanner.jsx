import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import SignUp from '../pages/signUp'
import { AuthContext } from '../context/AuthContext'

const AnotherBanner = ({toScroll}) => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <>
      <div className='bg-blue-600 w-full mx-auto my-10 md:my-20 rounded-2xl md:rounded-4xl p-6 md:p-10 flex flex-col justify-center items-center'>
        <div className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-white text-center p-4 md:p-10 leading-tight'>
          BOOK APPOINTMENTS WITH 100+ TRUSTED DOCTOR WITH YOUR RIGHT CHOICE
        </div>
        <div>
          { !user ? 
            <button
              className="bg-white text-blue-600 font-bold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-4xl cursor-pointer text-lg md:text-2xl hover:scale-105 transition-all duration-700"
              onClick={()=>navigate("/sign-up")}
            >
              Create Account
            </button>:
            <button
              onClick={toScroll}
              className="bg-white text-blue-500 font-bold py-3 md:py-4 px-4 md:px-6 rounded-2xl md:rounded-4xl hover:bg-white hover:text-blue-700 cursor-pointer text-lg md:text-2xl hover:scale-105 transition-all duration-700"
            >
              Book Appointment
            </button>
          }
        </div>
      </div>
    </>
  )
}

export default AnotherBanner