import React, { useState, useMemo, useEffect } from "react";
import Filters from "./Filters";
import JobLists from "./JobLists";
import { useSelector } from "react-redux";
import usegetAllJobs from "@/hooks/getAllJobs";


import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"








export default function Jobs() {
  usegetAllJobs();

const [currentPage, setCurrentPage] = useState(1);
const jobsPerPage = 2; 
const { alljobs,loading } = useSelector(store => store.job)

const totalPages = Math.ceil(alljobs.length / jobsPerPage);

const [filter, setFilter] = useState({
  type: "All",
  location: "All",
  category: "All",
});
useEffect(() => {
  setCurrentPage(1);
}, [filter]);
  



 const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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


const paginatedJobs = useMemo(() => {
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  return filteredJobs.slice(startIndex, endIndex);
}, [filteredJobs, currentPage]);



  return (
    <div className="max-w-7xl  mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
      <Filters filter={filter} setFilter={setFilter} />
      <JobLists jobs={paginatedJobs} loading={loading} />
      <div className="col-span-1 md:col-span-4 flex justify-center">
        {totalPages > 1 && (
           
          <Pagination className="my-3">
            <PaginationContent>

              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => goToPage(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page }
                      onClick={() => goToPage(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              
              <PaginationItem>
                <PaginationNext
                  onClick={() => goToPage(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
