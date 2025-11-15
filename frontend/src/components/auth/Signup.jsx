import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { USER_API_ENDPOINT } from "@/utils/constants"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/authslice"
import { Loader } from "lucide-react"

export default function Signup() {
  const [input, setinput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role:"student"
  })

   const navigate = useNavigate();
   const dispatch = useDispatch()
   const { loading } = useSelector(store => store.auth)



  
  

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

      const formdata=new FormData()

  formdata.append("fullName",input.fullName)
  formdata.append("email",input.email)
  formdata.append("password",input.password)
  formdata.append("phoneNumber",input.phoneNumber)
  formdata.append("role",input.role)


   try {
        dispatch(setLoading(true))
       const res= await axios.post(`${USER_API_ENDPOINT}/register`,formdata,{
        headers: {
             "Content-Type": "application/json",
           },
            withCredentials: true,
       })
            console.log("Response:", res.data); 

       if (res.data.success) {
        navigate("/login")
       toast.success(res.data.message)
       } else {
        toast.error(res.data.message)
       }
    } catch (error) {
     console.log("Error:", error);


  // If backend sent an error response
  if (error.response && error.response.data?.message) {
    toast.error(error.response.data.message);
  } 
  // If request failed (network error, etc.)
  else if (error.message) {
    toast.error(error.message);
  } 
  else {
    toast.error("Something went wrong!");
  }

      
    }
    finally{
      dispatch(setLoading(false))
    }

  }

  return (
    <div className="relative flex items-center justify-center h-screen bg-[var(--color-yellow)] px-2">
      

      <Card className="w-full max-w-xs sm:max-w-sm h-[95%] flex flex-col shadow-xl rounded-xl relative z-10 scale-95">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl font-bold text-gray-800">
            Create an Account
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between text-sm">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-2">
            <div className="space-y-2 flex-1">
              <div>
                <Label className="text-xs mb-1" htmlFor="name">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" placeholder="John Doe"
                  className="h-8 text-sm" value={input.fullName} onChange={handleChange} required />
              </div>
              <div>
                <Label className="text-xs mb-1" htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com"
                  className="h-8 text-sm" value={input.email} onChange={handleChange} required />
              </div>
              <div>
                <Label className="text-xs mb-1" htmlFor="phonenumber">Phone No.</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" placeholder="+91**********"
                  className="h-8 text-sm" value={input.phoneNumber} onChange={handleChange} required />
              </div>
              <div>
                <Label className="text-xs mb-1" htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="********"
                  className="h-8 text-sm" value={input.password} onChange={handleChange} required />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-xs font-medium">Register as</Label>



                <RadioGroup name="role"  defaultValue="student" value={input.role}
                  onValueChange={(value) => setinput({...input, role: value })}
                  className="flex gap-4 text-xs">

                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="student" id="student" className="h-3 w-3" />
                    <Label className="cursor-pointer"  htmlFor="student">Student</Label>
                  </div>

                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="recruiter" id="recruiter" className="h-3 w-3" />
                    <Label className="cursor-pointer" htmlFor="recruiter">Recruiter</Label>
                  </div>

                </RadioGroup>
              </div>
            </div>

            <div className="mt-2">
              {
              loading ? <Button className="w-full">
                <span>Please wait...</span><Loader className="mr-2 h-4 w-4 animate-spin" />
              </Button> : <Button type="submit" className="w-full">
                Register
              </Button>
            }
              <p className="text-center text-xs text-gray-600 mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>

  );
}
