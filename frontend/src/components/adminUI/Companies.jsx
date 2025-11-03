import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import CompanyTable from './CompanyTable.jsx'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companyslice'
function Companies() {
  useGetAllCompanies()

  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header / Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        {/* Filter input */}
        <div className="flex-1">
          {/* <Input
          onChange={(e)=>setInput(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-8 focus:outline-none focus:ring-2 text-2xl focus:ring-blue-500"
            placeholder="Filter by company name"
          /> */}
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-80 border border-gray-300 rounded-lg px-4 py-6 focus:outline-none focus:ring-2 focus:var[(--color-yellow)] [&>input]:text-4xl [&>input::placeholder]:text-4xl"
            placeholder="Filter by company name"
          />



        </div>

        {/* New Company button */}
        <Button className="bg-[var(--color-red)] text-white px-6 py-6 rounded-lg hover:bg-blue-700 shadow-md" onClick={() => navigate("/admin/companies/create")}>
          New Company
        </Button>
      </div>

      {/* Company Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <CompanyTable />
      </div>
    </div>

  )
}

export default Companies
