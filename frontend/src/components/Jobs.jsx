import React, { useState, useMemo } from "react";
import Filters from "./Filters";
import JobLists from "./JobLists";
import { useSelector } from "react-redux";
import usegetAllJobs from "@/hooks/getAllJobs";



export default function Jobs() {
  usegetAllJobs();
const { alljobs,loading } = useSelector(store => store.job)

  const [filter, setFilter] = useState({
    type: "All",
    location: "All",
    category: "All",
  });

  // Memoize filtered jobs for performance
  
 const filteredJobs = useMemo(() => {
    return alljobs.filter((job) => {
      const typeMatch = filter.type === "All" || job.jobType === filter.type;
      const locationMatch =
        filter.location === "All" || job.location.includes(filter.location);
        const categoryMatch =
        filter.category === "All" || job.category === filter.category;
      return typeMatch && locationMatch && categoryMatch;
    });
  }, [filter,alljobs]);

  return (
    <div className="max-w-7xl bg-gray-100 mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
      <Filters filter={filter} setFilter={setFilter} />
      <JobLists jobs={filteredJobs} loading={loading} />
    </div>
  );
}
