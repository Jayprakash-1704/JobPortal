import usegetJobbyId from '@/hooks/usegetJobbyId'
// import { setLoading } from '@/redux/applicationslice'
import { setLoading, setSingleJob } from '@/redux/jobslice'
import { JOB_API_ENDPOINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

function EditJobsDetails() {

    const params = useParams()
    usegetJobbyId(params.id)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { singleJob } = useSelector((store) => store.job);
    const { companies } = useSelector((store) => store.company);
    
    const [input, setInput] = useState({
        title: "",
        position: "",
        description: "",
        requirements: "",
        location: "",
        salary:"",
        category:"",
        company:"",
        jobType:"",
        experience:"",


    })




    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(input)
        const formData = new FormData()
        formData.append("title", input.title);
        formData.append("position", input.position);
        formData.append("requirements", input.requirements);
        formData.append("description", input.description);
        formData.append("location", input.location);
        formData.append("category", input.category);
        formData.append("company", input.company);
        formData.append("salary", input.salary);
        formData.append("experience", input.experience);
        formData.append("jobType", input.jobType);
        
        try {
            setLoading(true)
            const res = await axios.put(`${JOB_API_ENDPOINT}/edit-job/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setSingleJob(res.data.job))
                navigate("/admin/jobs")
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.message)
        }




    }
    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                position: singleJob.position || "",
                requirements: singleJob.requirements || "",
                description: singleJob.description || "",
                location: singleJob.location || "",
                salary: singleJob.salary ||"",
                category: singleJob.category ||"",
                jobType: singleJob.jobType||"",
                company: singleJob.company||""  ,
                experience: singleJob.experience||""  
            })
        }


    }, [singleJob])
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
                                value={input.title}
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
                                value={input.position}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                            />
                        </div>

                        {/* Description & Requirements */}

                        <div className="grid gap-1">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm h-20 focus:ring focus:ring-blue-400"
                            />
                        </div>
                        <div className="grid gap-1">
                            <label className="text-sm font-medium text-gray-700">Requirements</label>
                            <textarea
                                name="requirements"
                                value={input.requirements}
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
                                value={input.salary}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                            />
                        </div>
                        <div className="grid gap-1">
                            <label className="text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={input.location}
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
                                value={input.experience}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                            />
                        </div>
                        <div className="grid gap-1">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={input.category}
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
                                value={input.company}
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
                                value={input.jobType}
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
                            Update Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditJobsDetails
