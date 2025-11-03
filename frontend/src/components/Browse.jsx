// import React from 'react'
// import JobLists from './JobLists';
// // import { jobsData } from "./Jobs"; 

// export default function Browse() {


//   return (
//     <div className="mx-20">
//       <h1 className="text-2xl font-bold">
//         Search Result ({alljobs.length})
//       </h1>
//       <JobLists jobs={jobs} />
//     </div>
//   );
// }

// // // export default Browse
// // export default Browse({ jobs = [] }) {
// //   const random = [2, 98, 1, 79];

// //   // Filter jobs whose id is in the random array
// //   const filteredJobs = jobs.filter(job => random.includes(job.id));

// //   return (
// //     <div>
// //       <h1>Search Result {filteredJobs.length}</h1>
// //       <JobLists jobs={filteredJobs} />
// //     </div>
// //   );
// // }



import React from 'react';
import { useSelector } from 'react-redux';
import JobLists from './JobLists';
import usegetAllJobs from '@/hooks/getAllJobs';

export default function Browse() {
  usegetAllJobs();
  const { alljobs, loading } = useSelector(store => store.job);

  return (
    <div className=''>


      <div className="mx-20 ">
        <h1 className="text-2xl font-bold">
          Search Result ({alljobs.length})
        </h1>
        <JobLists jobs={alljobs} loading={loading} /> {/* pass the jobs from Redux */}
      </div>
    </div>
  );
}
