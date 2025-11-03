import React from "react";

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="flex items-center gap-3 text-gray-700">
      {icon}
      <div className="min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="font-medium truncate">{value || "N/A"}</p>
      </div>
    </div>
  );
};

export default InfoItem;
