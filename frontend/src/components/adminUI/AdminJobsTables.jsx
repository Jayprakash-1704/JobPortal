import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Ellipsis, Eye, Loader, MoreVertical, MoveRight, Stamp, View } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTables() {
  const navigate=useNavigate()

  const { allAdminJobs, loading, searchJobByText } = useSelector((store) => store.job);
  
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)


  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs?.filter((job) => {
      if (!searchJobByText) {
        return true;
      };

      return job?.title?.toLowerCase().includes(searchJobByText?.toLowerCase())|| job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    }
    );

    setFilterJobs(filteredJobs);
  }, [searchJobByText, allAdminJobs])



  if (loading) {
    return (
      <div className="flex flex-col items-center py-10 text-center  text-gray-600 text-lg font-medium">
          <Loader className="w-15 h-15 text-blue-500 animate-spin"/>
        Loading jobs...
      </div>
    );
  }

    if (!filterJobs?.length) {
      return (
        <div className="text-center  py-10 text-gray-600 text-lg">
          <img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1762250877/49342676_9214814-removebg-preview_ciyx1k.png" alt="" className="h-40 mx-auto object-contain"  />
          <p>No Jobs Found</p>
        </div>
      );
    }

  return (
<div className="p-6 backdrop-brightness-95">
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-base text-left">
        <thead className="bg-blue-950  text-white">
          <tr>
            <th className="px-6 py-3 font-semibold">#</th>
            <th className="px-6 py-3 font-semibold">Title</th>
            <th className="px-6 py-3 font-semibold">Company</th>
            <th className="px-6 py-3 font-semibold">Location</th>
            <th className="px-6 py-3 font-semibold">Type</th>
            <th className="px-6 py-3 font-semibold">Posted On</th>
            <th className="px-6 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y-4 divide-gray-100">
          {filterJobs?.map((job, index) => (

            <tr
              key={job._id}
              className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-blue-50"
                }`}
            >
              <td className="px-6 py-3">{index + 1}</td>
              <td className="px-6 py-3 font-medium text-gray-800">{job.title}</td>
              <td className="px-6 py-3 text-gray-700">{job?.company.name}</td>
              <td className="px-6 py-3 text-gray-700">{job?.location}</td>
              <td className="px-6 py-3 text-gray-700">{job?.jobType}</td>
              <td className="px-6 py-3 text-gray-600">
                {new Date(job.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-3 text-gray-600">
                <Popover>
                  <PopoverTrigger>
                    <Ellipsis className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-2 bg-white ring-1 ring-gray-200 shadow-md border-none rounded-lg">
                    <div className="flex- flex-col">
                    <div onClick={() => navigate((`/admin/jobs/${job._id}/view-applications`))} className="flex gap-2 items-center px-2 py-2 cursor-pointer">
                      <Eye className="w-4 h-3 text-gray-700" />
                      <span className="text-sm text-gray-700">View Applications</span>
                      </div>
                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/edit-job`)} className="flex gap-2 items-center px-2 py-1 cursor-pointer">
                      <Stamp className="w-4 h-3 text-gray-700" />
                      <span className="text-sm text-gray-700">Edit</span>
                      </div>
                    
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default AdminJobsTables;
