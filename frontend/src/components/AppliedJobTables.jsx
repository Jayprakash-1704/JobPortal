// import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function AppliedJobTables() {


//   return (
//     <div className="max-w-5xl mx-auto px-4 py-2">
//       <h2 className="text-2xl font-semibold mb-6">My Applied Jobs</h2>

//       <div className="overflow-x-auto rounded-lg shadow">
//         <table className="w-full border-collapse bg-white text-left text-sm">
//           <thead className="bg-indigo-100 text-gray-700 text-base">
//             <tr>
//               <th className="px-6 py-3">#</th>
//               <th className="px-6 py-3">Job Title</th>
//               <th className="px-6 py-3">Company</th>
//               <th className="px-6 py-3">Status</th>
//               <th className="px-6 py-3">Applied On</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {appliedJobs.map((job, index) => (
//               <tr key={job.id} className="hover:bg-gray-200">
//                 <td className="px-6 py-4">{index + 1}</td>
//                 <td className="px-6 py-4 font-medium">{job.title}</td>
//                 <td className="px-6 py-4">{job.company}</td>
//                 <td
//                   className={`px-6 py-4 font-medium ${
//                     job.status === "Rejected"
//                       ? "text-red-600"
//                       : job.status === "Interview Scheduled"
//                       ? "text-green-600"
//                       : "text-yellow-600"
//                   }`}
//                 >
//                   {job.status}
//                 </td>
//                 <td className="px-6 py-4">{job.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AppliedJobTables;




import React from "react";
import useAppliedJobs from "@/hooks/getAppliedJobs";
import { useSelector } from "react-redux";

function AppliedJobTables() {
  useAppliedJobs(); 
  const { appliedJobs = [] ,loading} = useSelector(store => store.job)
  console.log(appliedJobs)

  if (loading) return <div className="text-center py-10">Loading applied jobs...</div>;
  
  if (appliedJobs.length === 0) return <div className="text-center py-10">You have not applied to any jobs yet.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-2">
      <h2 className="text-2xl font-semibold mb-6">My Applied Jobs</h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white text-left text-sm">
          <thead className="bg-indigo-100 text-gray-700 text-base">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Job Title</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Applied On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appliedJobs.map((job, index) => (
              <tr key={job.id} className="hover:bg-gray-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{job.title}</td>
                <td className="px-6 py-4">{job.company}</td>
                <td
                  className={`px-6 py-4 font-medium ${
                    job.status === "rejected"
                      ? "text-red-600"
                      : job.status === "accepted"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {job.status}
                </td>
                <td className="px-6 py-4">{job.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppliedJobTables;
