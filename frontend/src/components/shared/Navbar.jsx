import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import React, { useState } from 'react'
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from '@radix-ui/react-popover';
import { Link, NavLink, useNavigate } from "react-router-dom";

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
  const [updateOpen, setupdateOpen] = useState(false)

  const handleLinkClick = () => {
    setOpen(false);
  };


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
    <div className="bg-[var(--color-yellow)] top-0 z-50 shadow ">
      <div className="flex   items-center justify-between mx-auto max-w-7xl h-20 px-10">
        {/* Left - Logo */}
        <div className="flex-shrink-0">
          <img
            src="https://res.cloudinary.com/dhaztslbj/image/upload/v1762201840/hire-linker-high-resolution-logo_dwjrcz.png"
            alt=" logo"
            className="h-14 w-auto object-contain"
          />
        </div>


        {/* Middle - Nav Links */}
        <div className="flex-1 flex justify-center">
          <ul className="flex font-medium gap-8 items-center">
            {user && user.role === "recruiter" ? (
              <> <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-[var(--color-red)] border-2 px-2 py-1 border-[var(--color-red)] rounded-4xl " :
                      "relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0  text-[var(--color-white)] after:w-0 after:h-[4px] after:bg-[var(--color-red)] after:transition-all after:duration-500 hover:after:w-full "}
                  to={"/admin/jobs"}
                >
                  Jobs
                </NavLink>
              </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-[var(--color-red)] border-2 px-2 py-1 border-[var(--color-red)] rounded-4xl " :
                        "relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0  text-[var(--color-white)] after:w-0 after:h-[4px] after:bg-[var(--color-red)] after:transition-all after:duration-500 hover:after:w-full"}
                    to={"/admin/companies"}
                  >
                    Companies
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-[var(--color-red)] border-2 px-2 py-1 border-[var(--color-red)] rounded-4xl " :
                        "relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0  text-[var(--color-white)] after:w-0 after:h-[4px] after:bg-[var(--color-red)] after:transition-all after:duration-500 hover:after:w-full"}
                    to={"/"}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-[var(--color-red)] border-2 px-2 py-1 border-[var(--color-red)] rounded-4xl " :
                        "relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0  text-[var(--color-white)] after:w-0 after:h-[4px] after:bg-[var(--color-red)] after:transition-all after:duration-500 hover:after:w-full "}
                    to={"/jobs"}
                  >
                    Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-[var(--color-red)] border-2 px-2 py-1 border-[var(--color-red)] rounded-4xl " :
                        "relative pb-7 after:content-[''] after:absolute after:left-0 after:bottom-0  text-[var(--color-white)] after:w-0 after:h-[4px] after:bg-[var(--color-red)] after:transition-all after:duration-500 hover:after:w-full "}
                    to={"/explore"}
                  >
                    Explore
                  </NavLink>
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
            <Popover open={open} onOpenChange={setOpen}>
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
              <PopoverContent className="w-65 px-5 py-5 z-50 items-center  bg-neutral-100  ring-2 ring-white rounded-xl">
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
                    <Link to={"/view-profile"} onClick={handleLinkClick}>View Profile</Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <KeyRound />
                    </span>
                    <Link to={`${user._id}/change-password`} onClick={handleLinkClick}>Change Password</Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <UserPen />
                    </span>
                    <Link
                      to="/profile/update"
                      onClick={(e) => {
                        e.preventDefault()
                        setupdateOpen(true);
                        // setOpen(false)
                      }}
                    >
                      Update Profile
                    </Link>

                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      <LogOut />
                    </span>
                    {/* <PopoverClose asChild> */}
                    <Link to="/logout" onClick={logOutHandler}>Logout</Link>
                    {/* </PopoverClose> */}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

          )}
          <UpdateProfileDialog open={updateOpen} setOpen={setupdateOpen} />
        </div>
      </div>

    </div>
  );
}

export default Navbar;
