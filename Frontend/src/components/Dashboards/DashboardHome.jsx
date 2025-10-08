// Frontend/src/components/Dashboards/DashboardHome.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    // Access user data
    const { user } = useSelector((state) => state.profile || {}); 
    
    // Safely get accountType
    const accountType = user?.accountType || 'User';

    const isCitizen = accountType === 'Citizen';
    const isAdminOrStaff = accountType === 'Admin' || accountType === 'Staff';

    return (
        <div className="p-8 bg-white rounded-xl shadow-xl border-t-4 border-blue-600">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome to the {accountType} Dashboard! 👋
            </h2>
            <p className="text-xl text-blue-600 mb-6 font-medium">
                Your role is currently set as: {accountType}.
            </p>
            
            {/* Call to Action for CITIZENS: Submit Complaint */}
            {isCitizen && (
                <div className="mb-8 p-4 bg-green-50 border border-green-300 rounded-lg flex justify-between items-center shadow-sm">
                    <p className="font-semibold text-green-800">Ready to report an issue?</p>
                    <Link to="/dashboard/create-complaint">
                        <button
                            className="py-2 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-200 shadow-md"
                        >
                            + Submit New Complaint
                        </button>
                    </Link>
                </div>
            )}
            
            {/* Call to Action for STAFF/ADMIN: View All Complaints */}
            {isAdminOrStaff && (
                <div className="mb-8 p-4 bg-indigo-50 border border-indigo-300 rounded-lg flex justify-between items-center shadow-sm">
                    <p className="font-semibold text-indigo-800">Review and manage system-wide complaints.</p>
                    <Link to="/dashboard/all-complaints">
                        <button
                            className="py-2 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
                        >
                            👁️ View All Complaints
                        </button>
                    </Link>
                </div>
            )}


            <div className="text-gray-600 space-y-4">
                <p>
                    Please use the **sidebar on the left** to navigate to your role-specific tools and reports.
                </p>
                
                {/* Specific Messages (Optional, can be removed if buttons are clear enough) */}
                {isCitizen && (
                    <p className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        As a **Citizen**, track your submissions via the 'My Complaints' link.
                    </p>
                )}
                {(accountType === 'Staff' || accountType === 'Admin') && (
                    <p className="p-3 bg-gray-100 border border-gray-300 rounded-lg">
                        As **Staff/Admin**, all operational data is accessible via 'All Complaints'.
                    </p>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;