import { setAllJobs, setLoading } from '@/redux/jobslice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const usegetAllJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                dispatch(setLoading(true)) // start loader
                const res = await axios.get(`${JOB_API_ENDPOINT}/getall-jobs`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.alljobs))

                }
            } catch (error) {
                console.log(error);
            }
            finally {
                dispatch(setLoading(false));
            }
        }
        fetchAllJobs()
    },

        [])

}


export default usegetAllJobs
