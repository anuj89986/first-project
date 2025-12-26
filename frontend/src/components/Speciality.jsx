import React, { useRef } from 'react'
import specialities from '../assets/SpecDetalis/specialities.js'
import { Link } from 'react-router-dom'

const Speciality = ({useSection}) => {
  return (
    <>
    <div ref={useSection} className='flex justify-center px-4 md:px-6 lg:px-8'>
        <div className='flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 w-full max-w-6xl'>
          {specialities.map((items,index)=>(
              <Link onClick={() => window.scrollTo({ top: 0, left: 0})} to={`/doctor/${items.special}`} key={index}>
                  <div className='flex flex-col items-center'>
                    <img 
                      src={items.img} 
                      className='h-24 sm:h-28 md:h-30 lg:h-32 w-24 sm:w-28 md:w-30 lg:w-32 bg-[#cee8ed] p-3 md:p-5 rounded-full hover:scale-125 transition-all duration-800 cursor-pointer' 
                    />
                    <div className='text-xs sm:text-sm md:text-base font-semibold mt-2 md:mt-3 text-center px-2'>{items.special}</div>
                  </div>
              </Link>
          ))}
        </div>
    </div>
    </>
  )
}

export default Speciality