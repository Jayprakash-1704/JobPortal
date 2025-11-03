import { setAllAdminJobs, setLoading } from '@/redux/jobslice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const usegetAdminJobs = () => {

     const { user } = useSelector((store) => store.auth);

    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                dispatch(setLoading(true)) // start loader
                const res = await axios.get(`${JOB_API_ENDPOINT}/getJobsAdmin/${user._id}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs))

                }
            } catch (error) {
                console.log(error);
            }
            finally {
                dispatch(setLoading(false));
            }
        }
        fetchAllAdminJobs()
    },

        [dispatch])

}


export default usegetAdminJobs
