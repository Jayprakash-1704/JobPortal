import { setAllApplicants, setLoading } from '@/redux/applicationslice'
import { APPLICATION_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetApplicants = (jobId) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchApplicants = async () => {
            try {

                dispatch(setLoading(true))
                const res = await axios.get(
                    `${APPLICATION_API_ENDPOINT}/${jobId}/applicants`,
                    { withCredentials: true }
                )


                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job.applications || [])) 
                    
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchApplicants()
    }, [jobId, dispatch])
}

export default useGetApplicants