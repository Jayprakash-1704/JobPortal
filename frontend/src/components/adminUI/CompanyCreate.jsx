import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_ENDPOINT } from "@/utils/constants";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companyslice";
import { useDispatch } from "react-redux";
import axios from "axios";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [companyData, setCompanyData] = useState({
        name: "",
        email: "",
        website: "",
       
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyData({ ...companyData, [name]: value });
    };

    const createCompanyHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${COMPANY_API_ENDPOINT}/register-Company`,
                companyData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto my-4 p-4 bg-white shadow rounded-md">
            <h2 className="text-2xl text-blue-400 text-center font-bold mb-4">
                List Your Company Here !
            </h2>
            <form className="space-y-3" onSubmit={createCompanyHandler}>
                {/* Company Name */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                    <Label className="block mb-1 text-sm font-medium">
                        Company Name
                    </Label>
                    <Input
                        type="text"
                        name="name"
                        value={companyData.name}
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
                            value={companyData.email}
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
                        value={companyData.website}
                        onChange={handleChange}
                        placeholder="Enter company website"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                    <Button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-3 py-1.5 rounded border border-gray-300 text-sm hover:bg-gray-600"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CompanyCreate;
