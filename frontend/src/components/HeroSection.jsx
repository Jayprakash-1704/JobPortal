import React from 'react'
import job from "../assets/job.jpeg";
import CountUp from 'react-countup';
function HeroSection() {
  return (
    <div>
      <section className="relative bg-gradient-to-r from-blue-400 to-indigo-300 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-5xl font-extrabold leading-tight">
              Find Your <span className="text-yellow-400">Dream Job</span> Today
            </h1>
            <p className="text-lg md:text-xl ">
              Discover thousands of opportunities from top companies.
              Apply now and start building your career journey.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-2 flex items-center gap-3 shadow-lg">
              <input
                type="text"
                placeholder="Search job title or keyword..."
                className="flex-1 px-4 py-2 rounded-xl text-gray-700 outline-none"
              />
              <button className="px-6 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition">
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-6">
              <div>
                <h3 className="text-3xl font-bold">
                 <CountUp end={50} suffix="k" />
                  </h3>
                <p className="text-gray-50">Jobs Posted</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold"> <CountUp end={3} suffix="k" /></h3>
                <p className="text-gray-50">Companies</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold"> <CountUp end={500}  duration={1.75} suffix="k" /></h3>
                <p className="text-gray-50">Candidates</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={job}
              alt="Job Search Illustration"
              className="w-full max-w-md rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
