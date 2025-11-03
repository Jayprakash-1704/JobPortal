// // hooks/useAppliedJobs.js
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
// import { setAppliedJobs, setLoading } from "@/redux/jobslice";
// import { useDispatch } from "react-redux";

// export default function useAppliedJobs() {
 
//     const dispatch=useDispatch()
//     useEffect(() => {
//         const fetchAppliedJobs = async () => {
//             try {
//                 dispatch(setLoading(true));
//                 const res = await axios.get(`${APPLICATION_API_ENDPOINT}/applied-Job`, { withCredentials: true })
//                 if (res.data.success && res.data.appliedJobs) {
//                     const jobs = res.data.appliedJobs.map((app) => ({
//                         id: app._id,
//                         title: app.title,
//                         company: app.company?.name || "N/A",
//                         status: app.applications.status,
//                         date: new Date(app.createdAt).toLocaleDateString("en-US"),
//                     }));
//                     dispatch(setAppliedJobs(jobs));
//                 }
//             } catch (err) {
//                 console.error("Failed to fetch applied jobs:", err);
//                 // setError(err);
//             } finally {
//                 dispatch(setLoading(false));
//             }
//         };

//         fetchAppliedJobs();
//     }, []);

   
// }





import { useEffect } from "react";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constants";
import { setAppliedJobs, setLoading } from "@/redux/jobslice";
import { useDispatch } from "react-redux";

export default function useAppliedJobs() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        dispatch(setLoading(true));

        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/applied-Job`, {
          withCredentials: true,
        });

        if (res.data.success && Array.isArray(res.data.appliedJobs)) {
          const jobs = res.data.appliedJobs.map((app) => ({
            id: app._id,
            title: app.job?.title || "N/A",
            company: app.job?.company?.name || "N/A",
            status: app.status || "Pending", // status comes from application
            date: new Date(app.createdAt).toLocaleDateString("en-US"),
          }));

          dispatch(setAppliedJobs(jobs));
        }
      } catch (err) {
        console.error("Failed to fetch applied jobs:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);
}
