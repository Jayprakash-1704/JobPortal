import React, { useState } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { ATS_API_ENDPOINT } from "@/utils/constants";

function AIResume() {
  const [file, setFile] = useState(null);
  const [jd, setjd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!file || !jd) {
      alert("Please upload resume and job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jd);

    try {
      setLoading(true);

      const res = await axios.post(
        `${ATS_API_ENDPOINT}/check`,
        formData,
        { withCredentials: true }
      );

      setResult(res.data);

    } catch (error) {
      console.error(error);
      alert("ATS analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-10">

      <h2 className="text-3xl text-red-500 font-bold">ATS Resume Checker</h2>

      <Input
        className="max-w-xl"
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <textarea
        className="border p-3 w-[500px] h-[150px]"
        placeholder="Paste Job Description"
        onChange={(e) => setjd(e.target.value)}
      />

      <button
        className="bg-blue-500 rounded-4xl text-white px-6 py-2 "
        onClick={submitHandler}
      >
        {loading ? "Analyzing..." : "Check ATS"}
      </button>

      {result && (
        <div className="mt-10 max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 border">

          {/* Score */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">ATS Analysis</h2>

            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                {result.atsScore/10}/10
              </div>
              <p className="text-sm text-gray-500">ATS Score</p>
            </div>
          </div>

          {/* Matched Skills */}
          <div className="mb-4">
            <h3 className="font-semibold text-green-700 mb-2">Matched Skills</h3>
            <div className="flex flex-wrap gap-2">
              {result.matchedSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="mb-4">
            <h3 className="font-semibold text-red-600 mb-2">Missing Skills</h3>
            <div className="flex flex-wrap gap-2">
              {result.unmatchedSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="mb-4">
            <h3 className="font-semibold text-blue-600 mb-2">Strengths</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {result.strengths?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="mb-4">
            <h3 className="font-semibold text-yellow-600 mb-2">Weaknesses</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {result.weaknesses?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}

export default AIResume;