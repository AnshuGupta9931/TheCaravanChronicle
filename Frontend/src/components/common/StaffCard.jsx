import React from "react";

const StaffCard = ({ staff }) => {
  // ✅ Fields are directly in staff object
  const imageUrl = staff?.image || "https://via.placeholder.com/100";
  const name = `${staff?.firstName || ""} ${staff?.lastName || ""}`;
  const category = staff?.staffProfile?.staffCategory || "Staff Member";

  return (
    <div className="flex items-center bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      
      {/* Staff Image */}
      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border-2 border-green-400">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Staff Info */}
      <div className="flex-grow">
        <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{staff?.email}</p>
        <p className="text-sm text-gray-600 mt-1">{category}</p>
      </div>

      {/* Optional Action */}
      <button className="ml-auto px-3 py-1 text-sm bg-circus-red text-white rounded-lg hover:bg-circus-gold transition">
        View Profile
      </button>
    </div>
  );
};

export default StaffCard;
