
import useGetApplicants from "@/hooks/useGetApplicants";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Phone,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Briefcase,
  Loader,
} from "lucide-react";
import InfoItem from "./InfoItems";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { setAllApplicants, setStatus } from "@/redux/applicationslice";

function ViewApplications() {
  const { allApplicants, loading } = useSelector((store) => store.applications);
  const { alljobs } = useSelector((store) => store.job);

  const params = useParams();

  const job = alljobs.find((j) => j._id === params.id);

  const dispatch = useDispatch()

  // const [status , setStatus]=useState("pending")
  useGetApplicants(params.id);
  // useGetApplicationStatus(params.id);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-24 h-24 text-blue-500   animate-spin" />
          <p className="text-gray-600 font-medium">Loading applications...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${applicationId}/updateStatus`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (res.data.success) {

        const updatedApplicants = allApplicants.map((a) =>
          a._id === applicationId ? { ...a, status: newStatus } : a
        );
        dispatch(setAllApplicants(updatedApplicants));
      }

    } catch (err) {
      console.error(err);
    }
  };


  // const applicants = Array.isArray(allApplicants) ? allApplicants : [];

  return (
    <div className="min-h-screen backdrop-brightness-95  py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Applications for:{" "}
            <span className="text-[var(--color-red)]">
              {job ? job.title : "Loading..."} {/* 🟢 Job title here */}
            </span>
          </h1>
          <p className="text-gray-600">
            Review and manage applicants for <strong>{job?.company?.name || "this job"}</strong>.
          </p>

        </div>

        {allApplicants.length === 0 ? (
          <div className="bg-white rounded-xl shadow border border-gray-200 p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-800 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-500">There are no applications for this job posting.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <p className="text-sm text-gray-700">
                Total Applications:{" "}
                <span className="text-blue-600 font-semibold">{allApplicants.length}</span>
              </p>
            </div>

            {allApplicants.map((applicant) => (
              <div
                key={applicant._id}
                className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  {/* Left Section - Profile + Info */}
                  <div className="flex items-center gap-3">
                    {applicant.applicant?.profile?.profilePhoto ? (
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={applicant.applicant.profile.profilePhoto}
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-400" />
                      </div>
                    )}

                    <div className="flex flex-col">
                      {/* Name + Inline Info */}
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-gray-900">
                          {applicant.applicant?.fullName || "N/A"}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4 text-blue-600" />
                            {applicant.applicant?.email || "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4 text-green-600" />
                            {applicant.applicant?.phoneNumber || "N/A"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4 text-purple-600" />
                            {applicant.applicant?.profile?.experience || "Not specified"}
                          </span>
                        </div>
                      </div>

                      {/* Applied Date */}
                      <p className="text-xs text-gray-500 mt-1">
                        Applied on{" "}
                        {applicant.createdAt
                          ? new Date(applicant.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                      applicant.status
                    )}`}
                  >
                    {getStatusIcon(applicant.status)}
                    <span className="capitalize">{applicant.status || "Pending"}</span>
                  </div>
                </div>

                {/* Buttons Row */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 mt-2">
                  {applicant.applicant?.profile?.resume ? (
                    <a
                      href={applicant.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-xs font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      View Resume
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed text-xs font-medium"
                    >
                      <FileText className="w-4 h-4" />
                      No Resume
                    </button>
                  )}

                  {/* Accept / Reject Buttons */}
                  {applicant.status?.toLowerCase() === "accepted" ? (
                    <button
                      disabled
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-600 border border-green-300 rounded-md cursor-default text-xs font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accepted
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusUpdate(applicant._id, "accepted")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </button>
                  )}

                  {applicant.status?.toLowerCase() === "rejected" ? (
                    <button
                      disabled
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-600 border border-red-300 rounded-md cursor-default text-xs font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusUpdate(applicant._id, "rejected")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs font-medium"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>

  );
}

export default ViewApplications;
