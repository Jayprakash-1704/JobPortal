import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Download } from "lucide-react";
import AppliedJobTables from "./AppliedJobTables";
import { useSelector } from "react-redux";

export default function ViewProfile() {
  const { user } = useSelector((store) => store.auth)

  if (user?.role === "recruiter") {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6 shadow-2xl bg-white">
        {/* Company Cover Image */}
        <div className="w-full h-48 rounded-2xl overflow-hidden">
          <img
            src={user?.company?.coverImage}
            alt="company cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Recruiter + Company Header */}
        <Card className="grid grid-cols-2 gap-6 p-6 -mt-15 relative z-10">
          <img
            src={user?.company?.logo}
            alt="company logo"
            className="w-28 h-28 rounded-full object-contain border-4 border-white shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">{user?.company?.name}</h2>
            <p className="text-gray-600">{user?.fullName} (Recruiter)</p>

            <div className="flex gap-4 mt-2 text-sm text-gray-700">
              <span className="flex items-center gap-1">
                <Mail size={20} className="text-blue-500" /> {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={20} /> {user?.phoneNumber}
              </span>
            </div>
          </div>
        </Card>

        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle>About Company</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user?.company?.description || "No company info available"}</p>
          </CardContent>
        </Card>

        {/* Posted Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Job Listings</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Replace with your recruiter job table */}
            {/* <RecruiterJobTable jobs={user?.company?.jobs || []} /> */}
          </CardContent>
        </Card>
      </div>
    );
  }



  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 shadow-2xl bg-white ">
      {/* Cover Photo */}
      <div className="w-full h-48 rounded-2xl overflow-hidden">
        <img
          src={user?.profile?.coverImage}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Header */}

      <Card
        className="grid grid-cols-2 
       gap-6 p-6 -mt-15 relative z-10 "
      >
        <img
          src={user?.profile?.profilePhoto}
          alt="profile"
          className="w-28 h-28 rounded-full object-contain border-4 border-white shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold">{user?.fullName}</h2>
          <div className="flex gap-4 mt-2 text-sm text-gray-700">
            <span className="flex items-center gap-1">
              <Mail size={30} className="text-blue-500" /> {user?.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone size={30} /> {user?.phoneNumber}
            </span>
          </div>

          {user?.profile?.resume && (
            <Button variant="outline" className="bg-blue-500 text-white mt-3">
              <a href={user.profile.resume} download={user.profile.resumeoriginalname} target="_blank" className="flex items-center gap-2">
                <Download size={16} /> Download Resume
              </a>
            </Button>
          )}

        </div>
      </Card>

      {/* Summary */}
      <Card className="gap-2">
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{user?.profile?.bio}</p>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="gap-2 ">
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {user?.profile?.skills ? (
            user.profile.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-[var(--color-red)] text-white px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <span>No skills</span>
          )}
        </CardContent>
      </Card>
      <div>
        <AppliedJobTables />
      </div>
    </div>
  );
}
