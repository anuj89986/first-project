import React from 'react'

const About = () => {
  return (
    <div className="w-full bg-white text-gray-800 py-16 px-5 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/doctorPic/doctorspic.jpg" 
            alt="Doctors Team"
            className="rounded-2xl shadow-lg w-[90%] md:w-[80%] object-cover"
          />
        </div>

        <div className="md:w-1/2 space-y-4">
          <h2 className="text-center md:text-left text-2xl md:text-3xl font-bold tracking-wide text-gray-900">
            ABOUT <span className="text-blue-600">US</span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Welcome to Care+ Hospital, your trusted partner in managing your healthcare needs conveniently
            and efficiently. At Care+, we understand the challenges individuals face when it comes
            to scheduling doctor appointments and managing their health records.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Care+ Hospital is committed to excellence in healthcare technology. We continuously strive to
            enhance our platform, integrating the latest advancements to improve user experience and
            deliver superior service. Whether you’re booking your first appointment or managing ongoing
            care, Care+ Hospital is here to support you every step of the way.
          </p>

          <h3 className="font-bold text-lg mt-6 text-gray-900">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            Our vision at Care+ Hospital is to create a seamless healthcare experience for every user. We aim
            to bridge the gap between patients and healthcare providers, making it easier for you to
            access the care you need, when you need it.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-10 text-center md:text-left">
          WHY <span className="text-blue-600">CHOOSE US</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 border border-gray-300 rounded-lg overflow-hidden">
          {/* Efficiency */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-gray-300">
            <h3 className="font-bold text-gray-900 mb-3">EFFICIENCY:</h3>
            <p className="text-gray-600">
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          {/* Convenience */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-gray-300">
            <h3 className="font-bold text-gray-900 mb-3">CONVENIENCE:</h3>
            <p className="text-gray-600">
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          <div className="p-8">
            <h3 className="font-bold text-gray-900 mb-3">PERSONALIZATION:</h3>
            <p className="text-gray-600">
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About