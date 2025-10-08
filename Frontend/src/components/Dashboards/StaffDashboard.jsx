// Frontend/src/components/Dashboards/StaffDashboard.jsx

import React from 'react';
import ComplaintTable from '../common/ComplaintTable'; // Table component
import { useSelector } from 'react-redux';

const StaffDashboard = () => {
    // ⚠️ In a real app, you'd fetch data using the getAllComplaints API endpoint here
    const { accountType } = useSelector((state) => state.profile.user); 
    
    // MOCK DATA for Staff View (more detailed than citizen view)
    const MOCK_ALL_COMPLAINTS = [
        { _id: 1, type: 'Road Damage', status: 'IN PROGRESS', description: 'Pothole on Main Street.', citizen: 'Jane Doe', location: 'X Street, Y City', createdAt: '2025-01-10' },
        { _id: 2, type: 'Water Leak', status: 'RESOLVED', description: 'Broken pipe near school.', citizen: 'John Smith', location: 'Z Ave, Y City', createdAt: '2025-01-05' },
        { _id: 3, type: 'Garbage', status: 'OPEN', description: 'Overflowing bin.', citizen: 'Alice B.', location: 'Park Lane', createdAt: '2025-01-12' },
    ];
    
    const [allComplaints, setAllComplaints] = React.useState(MOCK_ALL_COMPLAINTS);

    const handleStatusUpdate = (complaintId, newStatus) => {
        // ⚠️ Call your updateComplaintStatus API endpoint here
        console.log(`Updating ${complaintId} to ${newStatus}`);
        setAllComplaints(prev => prev.map(c => 
            c._id === complaintId ? { ...c, status: newStatus } : c
        ));
    };

    return (
        <div>
            <h2 className="text-2xl font-medium text-gray-700 mb-6">
                All System Complaints ({accountType})
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
                <ComplaintTable 
                    complaints={allComplaints} 
                    onStatusUpdate={handleStatusUpdate} 
                />
            </div>
            {/* Admin specific features (e.g., User management panel) would go here */}
            {accountType === 'Admin' && (
                <div className="mt-8 p-6 bg-yellow-100 border border-yellow-400 rounded-xl">
                    <h3 className="text-xl font-semibold text-yellow-800">Admin Controls</h3>
                    <p className="text-sm mt-2">Access to user creation, role management, and system logs.</p>
                </div>
            )}
        </div>
    );
};

export default StaffDashboard;