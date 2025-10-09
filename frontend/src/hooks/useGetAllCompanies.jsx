import { setCompanies } from '@/redux/companyslice';
import { COMPANY_API_ENDPOINT } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

axios.defaults.withCredentials = true;

function useGetAllCompanies() {
  const dispatch = useDispatch();
  useEffect(()=>{
const fetchAllCompany = async() => {
    try {
      const res = await axios.get(`${COMPANY_API_ENDPOINT}/Company`, {
        withCredentials: true,
      })
      if (res.data.success) {
        // toast.success("Companies fetched successfully")
        dispatch(setCompanies(res.data.companies))
      }
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message ||"Failed to fetch companies")
    }
  }
  fetchAllCompany()
  },[])
  
}


export default useGetAllCompanies
