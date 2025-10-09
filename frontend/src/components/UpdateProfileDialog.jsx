// import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_ENDPOINT } from '@/utils/constants'
// import { setUser, setLoading } from '@/redux/authslice'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'sonner'
// import { Loader } from 'lucide-react'




// function UpdateProfileDialog({ open, setOpen }) {
//   // const [loading, setLoading] = useState(false)
//   const { user } = useSelector((store) => store.auth)
//   const { loading } = useSelector(store => store.auth)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()



//   const [input, setInput] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber || "",
//     bio: user?.profile?.bio || "",
//     skills: user?.profile?.skills?.join(", ") || "",
//     profilePhoto: null, // new
//     resume: null,       // new

//   })


//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value })
//   }

//   const handleProfilePhotoChange = (e) => {
//     setInput({ ...input, profilePhoto: e.target.files[0] });
//   };

//   const handleResumeChange = (e) => {
//     setInput({ ...input, resume: e.target.files[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault()
//     console.log("submitted")

//     const formdata = new FormData()

//     formdata.append("fullName", input.fullName)
//     formdata.append("email", input.email)
//     formdata.append("bio", input.bio)
//     formdata.append("phoneNumber", input.phoneNumber)
//     formdata.append("skills", input.skills)

//     // if (input.file) {
//     //   formdata.append("file", input.file)

//     // }

//     if (input.profilePhoto) {
//       formdata.append("profilePhoto", input.profilePhoto); // match backend
//     }
//     if (input.resume) {
//       formdata.append("resume", input.resume); // match backend
//     }


//     try {
//       dispatch(setLoading(true))
//       const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, formdata, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         withCredentials: true
//       })
//       if (res.data.success) {
//         dispatch(setUser(res.data.user))
//         navigate("/")
//         toast.success(res.data.message)
//       }

//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message || "Data not Updated")
//       } else {
//         toast.error("Something went wrong. Please try again.")
//       }
//     }
//     finally {
//       dispatch(setLoading(false))
//       console.log("nohjvjvfs")
//     }

//   }



//   // const fileChangeHandler = (e) => {
//   //   setInput({
//   //     ...input,
//   //     file: e.target.files[0], // store the actual File object
//   //   });
//   // };

//   return (
//     <div>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
//           <form onSubmit={submitHandler}>
//             <DialogHeader>
//               <DialogTitle>Edit profile</DialogTitle>
//               <DialogDescription>
//                 Make changes to your profile here. Click save when you&apos;re done.
//               </DialogDescription>
//             </DialogHeader>

//             <div className="grid gap-4 py-4">
//               <div className="grid gap-3">
//                 <Label htmlFor="fullName">FullName</Label>
//                 <Input id="fullName"
//                   name="fullName"
//                   type="text"
//                   value={input.fullName}

//                   onChange={changeEventHandler} />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email"
//                   name="email"
//                   type="email"
//                   value={input.email}

//                   onChange={changeEventHandler} />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="bio">Bio</Label>
//                 <Input id="bio"
//                   type="text"
//                   value={input.bio}
//                   name="bio"
//                   onChange={changeEventHandler} />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="skills">Skills</Label>
//                 <Input id="skills"
//                   name="skills"
//                   value={input.skills}

//                   onChange={changeEventHandler} />
//               </div>
//               <div className="grid gap-3">
//                 <Label htmlFor="phonenumber">PhoneNumber</Label>
//                 <Input id="phonenumber"
//                   name="phoneNumber"
//                   value={input.phoneNumber}
//                   onChange={changeEventHandler} />
//               </div>

//               <div className="grid gap-3">
//                 <Label htmlFor="profilePhoto">Profile Photo</Label>
//                 <Input
//                   id="profilePhoto"
//                   name="profilePhoto"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleProfilePhotoChange}
//                   className="file:mr-4 file:px-4 file:py-1 file:border file:border-gray-300 file:rounded-md file:bg-gray-100 file:text-gray-700"
//                 />
//               </div>

//               <div className="grid gap-3">
//                 <Label htmlFor="resume">Resume</Label>
//                 <Input
//                   id="resume"
//                   name="resume"
//                   type="file"
//                   accept="application/pdf"
//                   onChange={handleResumeChange}
//                   className="file:mr-4 file:px-4 file:py-1 file:border file:border-gray-300 file:rounded-md file:bg-gray-100 file:text-gray-700"
//                 />
//               </div>


//             </div>

//             <DialogFooter>
//               <DialogClose asChild>
//                 <Button variant="outline">Cancel</Button>
//               </DialogClose>
//               {
//                 loading ? <Button className="w-40">
//                   <span>Please wait...</span><Loader className="mr-2 h-4 w-4 animate-spin" />
//                 </Button> : <Button type="submit">
//                   Save Changes
//                 </Button>
//               }
//             </DialogFooter>
//           </form>
//         </DialogContent>

//       </Dialog>
//     </div>
//   )
// }

// export default UpdateProfileDialog






























import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constants'
import { setUser, setLoading } from '@/redux/authslice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

function UpdateProfileDialog({ open, setOpen }) {
  const { user, loading } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    profilePhoto: null,
    resume: null,
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleProfilePhotoChange = (e) => {
    setInput({ ...input, profilePhoto: e.target.files[0] })
  }

  const handleResumeChange = (e) => {
    setInput({ ...input, resume: e.target.files[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append("fullName", input.fullName)
    formdata.append("email", input.email)
    formdata.append("phoneNumber", input.phoneNumber)

    // Only add candidate fields if the user is a candidate
    if (user?.role === "student") {
      formdata.append("bio", input.bio)
      formdata.append("skills", input.skills)
      if (input.resume) {
        formdata.append("resume", input.resume)
      }
    }

    if (input.profilePhoto) {
      formdata.append("profilePhoto", input.profilePhoto)
    }

    try {
      dispatch(setLoading(true))
      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, formdata, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Data not Updated")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
        <form onSubmit={submitHandler}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Common fields for both recruiter & candidate */}
            <div className="grid gap-3">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={input.fullName}
                onChange={changeEventHandler}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phonenumber">Phone Number</Label>
              <Input
                id="phonenumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
              />
            </div>

            {/* Candidate-only fields */}
            {user?.role === "student" && (
              <>
                <div className="grid gap-3">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    type="text"
                    value={input.bio}
                    name="bio"
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="resume">Resume</Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept="application/pdf"
                    onChange={handleResumeChange}
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {loading ? (
              <Button className="w-40" disabled>
                <span>Please wait...</span>
                <Loader className="ml-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit">Save Changes</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog
