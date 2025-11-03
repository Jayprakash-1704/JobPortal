import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import AdminJobsTables from "./AdminJobsTables";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import usegetAdminJobs from "@/hooks/usegetAdminJobs";
import { setSearchJobByText } from "@/redux/jobslice";


function AdminJobsPage() {
  
  usegetAdminJobs()

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="max-w-7xl  mx-auto my-10 px-4">
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        
        <div className="flex-1">
          <Input
            onChange={(e) => setInput(e.target.value)}
            className="w-80 border border-gray-300 rounded-lg px-4 py-6 focus:outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="Filter by job role or title"
          />
        </div>

        {/* New Job button */}
        <Button
          className="bg-[var(--color-red)] text-white px-6 py-6 rounded-lg hover:bg-blue-950 shadow-md"
          onClick={() => navigate("/admin/jobs/create")}
        >
          New Job
        </Button>
      </div>

      {/* Job Table */}
      <div className=" shadow-md rounded-lg overflow-hidden">
        <AdminJobsTables />
      </div>
    </div>
  );
}

export default AdminJobsPage;
