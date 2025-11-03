
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
    experience:user?.profile?.experience || "",
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
      formdata.append("experience",input.experience)
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
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
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={input.experience}
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
