import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "./ui/button";
import useGetAllJobs from "@/hooks/getAllJobs";
import { useSelector } from "react-redux";
import { Loader } from "lucide-react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { toast } from "sonner";

export default function JobDescription() {
  useGetAllJobs();

  const formatJD = (text) => {
    return text.split(".").map(
      (line, index) =>
        line.trim() && <li key={index}> {line.trim()}.</li>
    );
  };

  const { alljobs, loading } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const { id } = useParams();
  const job = alljobs.find((job) => job._id.toString() === id);

  const [applied, setApplied] = useState(false);
  const [applicantsCount, setApplicantsCount] = useState(0); // 🟢 CHANGED — track count locally

  useEffect(() => {
    if (job && user) {
      const userHasApplied = job.applications?.some(
        (app) => app.applicant?._id === user._id
      );
      setApplied(userHasApplied || false);
      setApplicantsCount(job.applications?.length || 0); // 🟢 CHANGED
    }
  }, [job, user]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply-job/${id}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setApplied(true); // 🟢 CHANGED — update instantly
        setApplicantsCount((prev) => prev + 1); 
      }
    } catch (error) {
      toast.warning(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <Loader className="animate-spin w-16 h-16 text-blue-500" />
        <h2 className="text-black font-semibold mt-4">Loading Job...</h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Job not found</h2>
        <Link to="/jobs" className="text-blue-500 underline">
          Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Job Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
        <img
          className="w-24 h-24 rounded-full object-cover shadow-md"
          src={job.company.logo}
          alt={job.title}
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
          <p className="text-gray-600 mt-1">
            {job.company.name} • {job.location}
          </p>
          <p className="text-gray-500 mt-1">{job.jobType}</p>
        </div>
      </div>

      {/* Job Stats */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="bg-blue-50 text-blue-700 border-blue-200 border-2 px-4 py-2 rounded-md font-semibold">
          Posted:{" "}
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="bg-green-50 text-green-700 border-green-200 border-2 px-4 py-2 rounded-md font-semibold">
          Applicants: {applicantsCount} {/* 🟢 CHANGED — use live state */}
        </div>
        <div className="bg-yellow-50 text-yellow-700 border-yellow-200 border-2 px-4 py-2 rounded-md font-semibold">
          Salary: {job.salary}
        </div>
      </div>

      {/* Job Description */}
      <section className="text-gray-700 mb-6 leading-relaxed">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p>{formatJD(job.description)}</p>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={!applied ? applyJobHandler : undefined}
          disabled={applied}
          className={`w-full sm:w-auto text-white ${
            applied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {applied ? "Already Applied" : "Apply Now"} {/* 🟢 CHANGED */}
        </Button>

        <Link
          to="/jobs"
          className="text-blue-500 underline flex items-center justify-center w-full sm:w-auto"
        >
          Back to Jobs
        </Link>
      </div>
    </main>
  );
}
