import { setSingleCompany } from '@/redux/companyslice';
import { COMPANY_API_ENDPOINT } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

function usegetCompanybyId(companyId) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/Company/${companyId}`, {
          withCredentials: true,
        })
        // console.log("API response:", res.data); 
        if (res.data.success) {
          
          // console.log(res.data.data.company.name)
          // toast.success(res.data.message)
          dispatch(setSingleCompany(res.data.company))
        }

      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    fetchSingleCompany()
  }, [companyId, dispatch])

}

export default usegetCompanybyId
