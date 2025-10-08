// Frontend/src/components/common/ComplaintCard.jsx

import React from 'react';

// Utility component to render status badge with colors
const StatusBadge = ({ status }) => {
    let colorClasses = 'bg-gray-100 text-gray-800'; // Default
    if (status === 'RESOLVED') colorClasses = 'bg-green-100 text-green-700';
    else if (status === 'IN PROGRESS') colorClasses = 'bg-yellow-100 text-yellow-700';
    else if (status === 'OPEN') colorClasses = 'bg-red-100 text-red-700';

    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>
            {status}
        </span>
    );
};

const ComplaintCard = ({ complaint }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 capitalize">
                    {complaint.type || "General Issue"}
                </h3>
                <StatusBadge status={complaint.status} />
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
                {complaint.description || "No description provided."}
            </p>

            <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
                <div>
                    <span className="font-medium">Complaint ID:</span> 
                    <span className="ml-1">{complaint._id}</span>
                </div>
                <div>
                    <span className="font-medium">Date:</span> 
                    <span className="ml-1">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
            
            {/* Optional: Add a button to view details if needed */}
            {/* <div className="mt-4">
                <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">View Details →</button>
            </div> */}
        </div>
    );
};

export default ComplaintCard;