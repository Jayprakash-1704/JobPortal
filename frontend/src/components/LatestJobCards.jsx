import React from "react";
import { Badge } from "./ui/badge.jsx";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function LatestJobCards({ job }) {
  const salaryLPA = ((job.salary * 12) / 100000).toFixed(2);


  return (
    <div className="bg-[var(--color-white)] shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border border-gray-200 p-6 mt-10 cursor-pointer hover:-translate-y-1">
  {/* Company Info */}
  <div className="flex items-center justify-between flex-wrap gap-3">
    <div className="flex items-center gap-3">
      {/* Company Logo */}
      <img
        src={job.company?.logo || '/default-logo.png'}
        alt={job.company?.name || 'Company Logo'}
        className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
      />

      <div>
        <h1 className="text-xl font-semibold text-gray-800">{job.company?.name}</h1>
        <p className="text-sm text-gray-500 flex items-center">
          <span className="text-blue-900 mr-1">
            <MapPin />
          </span>
          {job.location}
        </p>
      </div>
    </div>

    <span className="bg-red-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
      Hiring Now
    </span>
  </div>

  {/* Job Title */}
  <div className="mt-5">
    <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
    {/* <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-4 overflow-hidden">
      {job.description}
    </p> */}
  </div>

  {/* Badges */}
  <div className="flex flex-wrap items-center gap-2 mt-5">
    <span className="bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
      {job.position}
    </span>
    <span className="bg-red-50 text-red-500 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
      {job.jobType}
    </span>
    <span className="bg-emerald-50 text-emerald-600 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
      {salaryLPA} LPA
    </span>
  </div>

  {/* View Details Button */}
  <div className="mt-6">
    <Link
      to={`/job/${job._id}`}
      className="w-full inline-block text-center bg-[var(--color-yellow)] hover:bg-blue-950 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all"
    >
      View Details
    </Link>
  </div>
</div>



  );
}

export default LatestJobCards;
