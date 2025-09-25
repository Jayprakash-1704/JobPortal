import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import axios from "axios"
import { USER_API_ENDPOINT } from "@/utils/constants"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, setUser } from "@/redux/authslice"
import { Loader, Loader2 } from "lucide-react"

export default function Login() {
  const [input, setinput] = useState({
    email: "",
    password: "",
    role: "student"
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector(store => store.auth)

        

  const handleChange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()


    try {
      dispatch(setLoading(true))
               
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      console.log("Response:", res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
      console.error(error)

    }
    finally {
      dispatch(setLoading(false))

    }

  }

  return (
    <div className=" relative flex items-center justify-center min-h-screen bg-white px-2">
      <h1 className="absolute  text-[10rem] font-extrabold text-sky-400 opacity-60 select-none">
        JobMire
      </h1>
      <Card className="w-full max-w-xs shadow-2xl rounded-2xl relative z-10">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold text-gray-800">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <Label className="mb-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="h-8 text-sm"
                value={input.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label className="mb-1" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="h-8 text-sm"
                value={input.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-xs font-medium">Login as</Label>



              <RadioGroup name="role" defaultValue="student" value={input.role}
                onValueChange={(value) => setinput({ ...input, role: value })}
                className="flex gap-4 text-xs">

                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="student" id="student" className="h-3 w-3" />
                  <Label className="cursor-pointer" htmlFor="student">Student</Label>
                </div>

                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="recruiter" id="recruiter" className="h-3 w-3" />
                  <Label className="cursor-pointer" htmlFor="recruiter">Recruiter</Label>
                </div>

              </RadioGroup>
            </div>
            {
              loading ? <Button className="w-full">
                <span>Please wait...</span><Loader className="mr-2 h-4 w-4 animate-spin" />
              </Button> : <Button type="submit" className="w-full">
                Login
              </Button>
            }



          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Doesn't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
