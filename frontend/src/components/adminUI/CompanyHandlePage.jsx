import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { CircleChevronLeft, FilePenLineIcon, Loader } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companyslice.js'
import usegetCompanybyId from '@/hooks/usegetCompanybyId.jsx'

function CompanyHandlePage() {
    const params = useParams()
    usegetCompanybyId(params.id)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { singleCompany } = useSelector((store) => store.company)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        name: "",
        email: "",
        description: "",
        website: "",
        location: "",
        logo: null
    })


    

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handlefileChange = (e) => {
        const file = e.target.files[0]
        setInput({ ...input, logo: file });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(input)
        const formData = new FormData()
        formData.append("name", input.name);
        formData.append("email", input.email);
        formData.append("website", input.website);
        formData.append("description", input.description);
        formData.append("location", input.location);
        if (input.logo) formData.append("logo", input.logo);
        try {
            setLoading(true)
            const res = await axios.put(`${COMPANY_API_ENDPOINT}/updateCompany/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setSingleCompany(res.data.company))
                navigate("/admin/companies")
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.message)
        }




    }
    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                email: singleCompany.email || "",
                website: singleCompany.website || "",
                description: singleCompany.description || "",
                location: singleCompany.location || "",
                logo: singleCompany.logo || null
            })
        }


    }, [singleCompany])
    return (
        <>
            <div className="flex items-center gap-2 mt-3 mx-4">
                <Button type="button" onClick={() => navigate(-1)} className="flex items-center gap-2">
                    <CircleChevronLeft />
                    Go Back
                </Button>

            </div>
            <div className='max-w-2xl mx-auto my-3'>
                
                <h1 className="text-2xl p-5 font-bold text-center flex-1">
                    Update Company View
                </h1>
                <div className="w-24"></div>
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label className="block mb-1 text-sm font-medium">
                            Company Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                            placeholder="Enter company name"
                            className=" border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Company Email */}
                    <div>
                        <Label className="block mb-1 text-sm font-medium">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            placeholder="Enter company email"
                            className=" border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    {/* Company Website */}
                    <div>
                        <Label className="block mb-1 text-sm font-medium">
                            Website
                        </Label>
                        <Input
                            type="url"
                            name="website"
                            value={input.website}
                            onChange={handleChange}
                            placeholder="Enter company website"
                            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label className="block mb-1 text-sm font-medium">
                            Description
                        </Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={handleChange}
                            placeholder="Enter company website"
                            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label className="block mb-1 text-sm font-medium">
                            Logo
                        </Label>
                        <Input
                            type="file"
                            name="logo"
                            accept="image/*"

                            onChange={handlefileChange}
                            placeholder="Enter company website"
                            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <Label className="block mb-1 text-sm font-medium">
                            Location
                        </Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={handleChange}
                            placeholder="Enter company website"
                            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-end">


                        {loading ? (
                            <Button className="w-40" disabled>
                                <span>Please wait...</span>
                                <Loader className="ml-2 h-4 w-4 animate-spin" />
                            </Button>
                        ) : (
                            <Button type="submit">Update <FilePenLineIcon /></Button>
                        )}

                    </div>
                </form>


            </div>
        </>

    )
}

export default CompanyHandlePage


