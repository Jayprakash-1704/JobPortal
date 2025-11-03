// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { setStatus, setLoading } from "@/redux/applicationslice";
// import { APPLICATION_API_ENDPOINT } from "@/utils/constants";




// export default function useGetApplicationStatus(applicationId) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!applicationId) return;

//     const fetchApplicationStatus = async () => {
//       try {
        
//         const res = await axios.put(
//           `${APPLICATION_API_ENDPOINT}/${applicationId}/status`,
//           { withCredentials: true }
//         );

//         if (res.data.success && res.data.application) {
//           dispatch(setStatus(res.data.application.status));
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch application status:", error);
//       } 
//     };

//     fetchApplicationStatus();
//   }, [applicationId, dispatch]);
// }
