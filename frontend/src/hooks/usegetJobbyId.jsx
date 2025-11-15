import { setSingleJob } from '@/redux/jobslice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'



function usegetJobbyId(jobId) {
    const dispatch=useDispatch()
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get-job/${jobId}`, {
          withCredentials: true,
        })
       
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
        }

      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch])
}

export default usegetJobbyId
