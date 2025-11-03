import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/constants';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function PostJobs() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    experience: '',
    category: '',
    company: '',
    jobType: '',
    position: '',
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get(`${COMPANY_API_ENDPOINT}/Company`, { withCredentials: true })
      .then(res => setCompanies(res.data.companies))
      .catch(err => console.log(err));
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${JOB_API_ENDPOINT}/post-job`, formData,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      )
      if (res.data.success) {
        console.log(res.data);
        navigate("/admin/jobs")

        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }


  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white shadow rounded-lg w-full max-w-3xl p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Title */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid  gap-1">
              <label className="text-sm font-medium text-gray-700">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-400"
              />
            </div>
            {/* Position */}
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Openings</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>

            {/* Description & Requirements */}

            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm h-20 focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm h-20 focus:ring focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Salary & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
          </div>

          {/* Experience & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
          </div>

          {/* Company & Job Type */}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <select
                name="company"
                placeholder="Select Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="" disabled >Select Company</option>
                {companies.map((comp) => (
                  <option key={comp._id} value={comp._id}>{comp.name}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
              >
                <option value="" disabled>Select JobType</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </div>
          </div>



          {/* Submit Button */}
          <div className='justify-end flex'>
          <button
            type="submit"
            className="w-40 text-left p-3 bg-black text-white text-sm font-medium py-2 rounded-md hover:bg-gray-700"
          >
            Post Job
          </button>
          </div>
        </form>
      </div>
    </div>


  );
}

export default PostJobs;
