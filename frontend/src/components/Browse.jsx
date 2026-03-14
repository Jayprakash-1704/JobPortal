
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import JobLists from './JobLists';
import usegetAllJobs from '@/hooks/getAllJobs';

export default function Browse() {
  usegetAllJobs();

  const { alljobs = [], loading } = useSelector(store => store.job);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 2;

  // Total pages
  const totalPages = Math.ceil(alljobs.length / jobsPerPage);

  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = alljobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div >
      <div className="mx-20 ">
        <h1 className="flex justify-end mt-3 text-2xl font-bold">
           Result ({alljobs.length})
        </h1>

        
        <JobLists jobs={currentJobs} loading={loading} />

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
