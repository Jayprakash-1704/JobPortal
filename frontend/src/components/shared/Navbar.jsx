import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import React, { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Link, useNavigate } from "react-router-dom";

import { UserCheck2Icon, KeyRound, UserPen, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/redux/store';
import UpdateProfileDialog from '../UpdateProfileDialog';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constants';
import { setUser } from '@/redux/authslice';

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth)

  const [open, setOpen] = useState(false)

  const logOutHandler = async () => {

    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };



  return (
    <div className="bg-white sticky top-0 z-50 shadow ">
      <div className="flex   items-center justify-between mx-auto max-w-7xl h-19 px-10">
        {/* Left - Logo */}
        <div className="flex-shrink-0">
          <span className="text-2xl text-red-500  font-bold">Job</span>
          <span className="text-2xl text-blue-500 font-bold">Mire</span>
        </div>

        {/* Middle - Nav Links */}
        <div className="flex-1 flex justify-center">
          <ul className="flex font-medium gap-8 items-center">
            {user && user.role === "recruiter" ? (
              <> <li>
                <Link
                  className="relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[4px] after:bg-blue-500 after:transition-all after:duration-500 hover:after:w-full "
                  to={"/admin/jobs"}
                >
                  Jobs
                </Link>
              </li>
                <li>
                  <Link
                    className="relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[4px] after:bg-blue-500 after:transition-all after:duration-500 hover:after:w-full"
                    to={"/admin/companies"}
                  >
                    Companies
                  </Link>
                </li>
              </>
              ) : (
              <>
                <li>
                  <Link
                    className="relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[4px] after:bg-blue-500 after:transition-all after:duration-500 hover:after:w-full "
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[4px] after:bg-blue-500 after:transition-all after:duration-500 hover:after:w-full"
                    to={"/jobs"}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    className="relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[4px] after:bg-blue-500 after:transition-all after:duration-500 hover:after:w-full"
                    to={"/explore"}
                  >
                    Explore
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>

        {/* Right - Profile / Buttons */}
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to={"/login"}>
                {" "}
                <Button
                  variant={"ghost"}
                  className="rounded-xl text-white bg-red-500 hover:bg-red-600  hover:text-white"
                >
                  Log In
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-[#008000] rounded-xl">Sign Up</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                {/* <div className='flex items-center h-full'> */}
                <Avatar className="cursor-pointer w-9 h-9 rounded-full">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || ""}
                    alt={user?.fullName || "User"}
                    className="rounded-full w-9 h-9 object-contain"
                  />
                  <AvatarFallback className="bg-gray-300 rounded-full text-gray-700 flex items-center justify-center w-9 h-9 text-sm">
                    {user?.fullName
                      ? user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                {/* </div> */}
              </PopoverTrigger>
              <PopoverContent className="w-65 px-5 py-5 z-50 items-center bg-white  ring-2 ring-white rounded-xl">
                <div className="flex flex-col gap-3">
                  <div className="flex  items-center gap-2">
                    <Avatar className="cursor-pointer w-12 h-12 rounded-full">
                      <AvatarImage
                        src={user.profile.profilePhoto}
                        alt="@shadcn"
                        width={55}
                        className="rounded-full w-9 h-9 object-contain "
                      />
                    </Avatar>
                    <div>
                      <h1>{user.fullName}</h1>
                      <span className="text-xs text-gray-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <UserCheck2Icon />
                    </span>
                    <Link to={"/view-profile"}>View Profile</Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <KeyRound />
                    </span>
                    <Link to={"/change-password"}>Change Password</Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <UserPen />
                    </span>
                    <Link
                      to="/profile/update"
                      onClick={(e) => {
                        e.preventDefault()
                        setOpen(true)
                      }}
                    >
                      Update Profile
                    </Link>
                    <UpdateProfileDialog open={open} setOpen={setOpen} />
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <LogOut />
                    </span>
                    <Link onClick={logOutHandler} to="/logout" >Logout</Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

    </div>
  );
}

export default Navbar;
