import React from "react";
import { Badge } from "./ui/badge.jsx";
import { MapPin } from "lucide-react";

function LatestJobCards({job}) {
 const salaryLPA = ((job.salary *12) / 100000).toFixed(2);


  return (
   <div className="bg-gradient-to-br from-white via-blue-100 to-blue-100 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border border-gray-200 p-6 mt-10 cursor-pointer hover:-translate-y-1">
  {/* Company Info */}
  <div className="flex items-center justify-between flex-wrap gap-3">
    <div>
      <h1 className="text-xl font-semibold text-gray-800">{job.company?.name}</h1>
      <p className="text-sm text-gray-500 flex items-center"> <span className="text-blue-900"><MapPin/></span>{job.location}</p>
    </div>
    <span className="bg-blue-500/90 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
      Hiring Now
    </span>
  </div>

  {/* Job Title */}
  <div className="mt-5">
    <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
      {job.description}
    </p>
  </div>

  {/* Badges */}
  <div className="flex flex-wrap items-center gap-2 mt-5">
    <span className="bg-blue-50 border border-blue-400 text-blue-600 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
      {job.position}
    </span>
    <span className="bg-red-50 border border-red-400 text-red-500 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
      {job.jobType}
    </span>
    <span className="bg-emerald-50 border border-emerald-400 text-emerald-600 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
      {salaryLPA} LPA
    </span>
  </div>
</div>

  );
}

export default LatestJobCards;
