
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Loader, Loader2 } from "lucide-react";


export default function JobLists({jobs=[], loading = false}) {
  if (loading) {
    return (
      <main className="md:col-span-3 space-y-4 flex flex-col items-center justify-center py-10">
        <Loader  className="animate-spin w-16 h-25 text-blue-500 mb-4" />
        <p className="text-blue-500 font-semibold">Loading jobs...</p>
      </main>
    );
  }
  return (
    <main className="md:col-span-3 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Available Jobs</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job._id}
            // job={job}
            className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl flex justify-between items-center gap-6"
          >
            {/* Company Logo */}
           
              <img
                src={job.logo }
                alt={`${job.company.name} logo`}
                className="w-16 h-16 object-contain rounded-md bg-white p-2 shadow-sm"
              />
            

            {/* Job Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company.name}</p>
              <p className="text-sm text-gray-500">
                {job.location} • {job.jobType}
              </p>
              <div className="flex gap-3 mt-3">
                <Badge className="bg-blue-200 text-blue-600 font-semibold px-2 rounded-full">
                  Positions
                </Badge>
                <Badge className="bg-green-200 text-green-600 font-semibold px-2 rounded-full">
                  40 LPA
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col items-end gap-2">
              <Link to={`/jobs/description/${job._id}`} className="underline text-red-500">
                View Details
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-500 text-white"
              >
                Apply
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No jobs found with selected filters.</p>
      )}
    </main>
  );
}
