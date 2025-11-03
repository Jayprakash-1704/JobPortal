import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import usegetAllJobs from '@/hooks/getAllJobs';


function LatestJobs() {
    usegetAllJobs();
    const { alljobs } = useSelector(store => store.job)
    return (
        <div className="max-w-7xl bg-[var(--color-blue)] mx-auto py-10  px-4 sm:px-6 lg:px-8 backdrop-brightness-90">
            <h1 className='text-3xl font-extrabold'>Latest Jobs And Opening </h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    alljobs.length <= 0 ? <span>No jobs found</span> : alljobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
                }
            </div>
        </div>
    );
}

export default LatestJobs
