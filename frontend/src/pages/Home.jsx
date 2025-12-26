import React, { useRef } from 'react'
import Banner from '../components/Banner'
import FindBanner from '../components/FindBanner'
import Speciality from '../components/Speciality'
import RelatedDoctor from '../components/RelatedDoctor'
import AnotherBanner from '../components/AnotherBanner'

const Home = () => {
  const scrollToSection = useRef(null)

  const scrollFunction = () => {
    scrollToSection.current?.scrollIntoView({ behavior: 'smooth',block:'center' })
  }

  return (
    <div className='w-full'>
      <Banner toScroll={scrollFunction} />
      <FindBanner />
      <Speciality useSection={scrollToSection} />
      <AnotherBanner toScroll={scrollFunction} />
    </div>
  )
}

export default Home