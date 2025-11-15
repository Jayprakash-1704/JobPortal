import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Companies from "./Companies";
import { Edit2, Ellipsis, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";


function CompanyTable() {
  const navigate = useNavigate()
  // const { companies } = useSelector(store => store.company);
  // const { companies } = useSelector((store) => store.company);
  const companies = useSelector((store) => store.company?.companies || []);
  const loading=useSelector((store)=>store.companies?.loading)
  const searchCompanyByText = useSelector((store) => store.company?.searchCompanyByText)
  const [filterCompany, setFilterCompany] = useState(companies)

  useEffect(() => {
    const filteredCompanies = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompanies);
  }, [searchCompanyByText, companies])


  if (loading) {
    return (
      <div className="flex flex-col items-center py-10 text-center  text-gray-600 text-lg font-medium">
          <Loader className="w-15 h-15 text-blue-500 animate-spin"/>
        Loading Companies...
      </div>
    );
  }

    if (!filterCompany?.length) {
      return (
        <div className="text-center py-10 text-gray-500 text-lg">
          <img src="https://res.cloudinary.com/dhaztslbj/image/upload/v1762250877/49342676_9214814-removebg-preview_ciyx1k.png" alt="no data "  className="h-40 object-contain mx-auto opacity-50"/>
          <p>No Company Found</p>
        </div>
      );
    }

  const handleStatusChange = (id, newStatus) => {
    console.log(`Status changed for company ${id} → ${newStatus}`);
  };

  return (
    
    <div className="p-6 backdrop-brightness-95">
      <div className="overflow-x-auto bg-white  shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <caption className="p-4 text-gray-500">
            A list of registered companies.
          </caption>

          <thead className="bg-[var(--color-yellow)] text-white text-base ">
            <tr>
              <th className="px-6 py-4">No.</th>
              <th className="px-6 py-4">Company Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Location</th>
              {/* <th className="px-6 py-4">Status</th> */}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y-4 divide-gray-100">
            {filterCompany.map((company, index) => (
              <tr key={company.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {company.name}
                </td>
                <td className="px-6 py-4 text-gray-600">{company.email}</td>
                <td className="px-6 py-4 text-gray-600">{company.location}</td>





                <td className="text-center">
                 
                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-28 p-2 bg-white ring-1 ring-gray-200 shadow-md border-none rounded-lg">
                      <div onClick={() => navigate((`/admin/companies/${company._id}`))} className="flex gap-2 items-center cursor-pointer  px-2 py-1">
                        <Edit2 className="w-4 h-4 text-gray-700 " />
                        <span className="text-sm text-gray-700">Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>     


                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompanyTable;
