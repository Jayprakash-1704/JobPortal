// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";

// const ChangePassword = () => {

//     const { user } = useSelector((store) => store.auth)

//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");



//     const [showCurrent, setShowCurrent] = useState(false);
//     const [showNew, setShowNew] = useState(false);
//     const [showConfirm, setShowConfirm] = useState(false);

//     const handleSubmit = async(e) => {
//         e.preventDefault();

//         if (!currentPassword || !newPassword || !confirmPassword) {
//             toast.error("All fields are required.");
//             return;
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if(!isPasswordValid){
//             toast.error("Incorrect Current Password")
//         }

//         if (newPassword !== confirmPassword) {
//             toast.error("New password and confirm password do not match.");
//             return;
//         }

//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//     };

//     const renderEye = (visible, toggle) => (
//         <span
//             onClick={toggle}
//             className="absolute right-3 top-2.5 text-xl text-gray-600 cursor-pointer"
//         >
//             {visible ? <EyeOff /> : <Eye />}
//         </span>
//     );

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <div className="bg-white px-6 py-5 rounded-lg shadow-md w-full max-w-sm">
//                 <h2 className="text-xl font-semibold text-center mb-4">Change Password</h2>

//                 <form onSubmit={handleSubmit} className="space-y-3">
//                     {/* Current Password */}
//                     <div className="relative">
//                         <label className="block text-gray-700 font-medium mb-1">Current Password</label>
//                         <input
//                             type={showCurrent ? "text" : "password"}
//                             value={currentPassword}
//                             onChange={(e) => setCurrentPassword(e.target.value)}
//                             className="w-full px-6 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter current password"
//                         />
//                         {renderEye(showCurrent, () => setShowCurrent(!showCurrent))}
//                     </div>

//                     {/* New Password */}
//                     <div className="relative">
//                         <label className="block text-gray-700 font-medium mb-2">New Password</label>
//                         <input
//                             type={showNew ? "text" : "password"}
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                             className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Enter new password"
//                         />
//                         {renderEye(showNew, () => setShowNew(!showNew))}
//                     </div>

//                     {/* Confirm Password */}
//                     <div className="relative">
//                         <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
//                         <input
//                             type={showConfirm ? "text" : "password"}
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder="Confirm new password"
//                         />
//                         {renderEye(showConfirm, () => setShowConfirm(!showConfirm))}
//                     </div>






//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//                     >
//                         Update Password
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ChangePassword;






import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";

const ChangePassword = () => {
    const { user } = useSelector((store) => store.auth);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await axios.put(
                `${USER_API_ENDPOINT}/change-password/${user._id}`,
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                toast.success("Password updated successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(response.data.message || "Failed to update password.");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong. Try again."
            );
        }
    };

    const renderEye = (visible, toggle) => (
        <button
            type="button"
            onClick={toggle}
            className="absolute right-3 top-2.5 text-xl text-gray-600 cursor-pointer"
        >
            {visible ? <EyeOff className="text-blue-500" /> : <Eye />}
        </button>
    );

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white px-6 py-5 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Change Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Current Password */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-1">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                type={showCurrent ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter current password"

                            />

                            {renderEye(showCurrent, () => setShowCurrent(!showCurrent))}
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new password"
                            />
                            {renderEye(showNew, () => setShowNew(!showNew))}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Confirm new password"
                            />
                            {renderEye(showConfirm, () => setShowConfirm(!showConfirm))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
