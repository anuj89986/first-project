import React, { useState } from 'react'
import axios from 'axios'

const Contact = () => {
  return (
   <div className="w-full bg-white text-gray-800 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-20">
      {/* CONTACT SECTION */}
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold mb-8 sm:mb-10 md:mb-12 tracking-wide">
        CONTACT <span className="text-blue-600">US</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/doctorPic/contact.jpg"
            alt="Contact Doctor"
            className="rounded-2xl shadow-lg w-full sm:w-[90%] md:w-[80%] object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-6 sm:space-y-7 md:space-y-8">
          <div>
            <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 sm:mb-3">OUR OFFICE</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Uttam Nagar <br />
              New Delhi - 110078 , INDIA
            </p>
            <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base">
              Tel: +91-9811476640 <br />
              Email: careplus@getintouch.com
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 sm:mb-3">
              CAREERS AT CARE+ HOSPITAL
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4 sm:mb-5 text-sm sm:text-base">
              Learn more about our teams and job openings.
            </p>
            <button className="border border-gray-800 px-4 sm:px-5 md:px-6 py-2 rounded-md hover:bg-gray-800 hover:text-white transition-all duration-200 text-sm sm:text-base">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact