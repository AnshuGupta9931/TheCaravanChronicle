// Frontend/src/components/Dashboards/AllComplaintsView.jsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { getAllComplaints, updateComplaintStatus } from '../../services/operations/complaintAPI'; // ⚠️ You need to create these API calls
import Loading from '../common/Loading';
import ComplaintTable from '../common/ComplaintTable';
import toast from 'react-hot-toast';

const MOCK_ALL_COMPLAINTS = [
    { _id: 'C1001', type: 'Road Damage', status: 'IN PROGRESS', description: 'Pothole on Main Street.', citizen: 'Jane Doe', location: 'X Street', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: 'C1002', type: 'Water Leak', status: 'RESOLVED', description: 'Broken pipe near school.', citizen: 'John Smith', location: 'Z Ave', createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
    { _id: 'C1003', type: 'Garbage', status: 'OPEN', description: 'Overflowing bin.', citizen: 'Alice B.', location: 'Park Lane', createdAt: new Date(Date.now() - 12 * 86400000).toISOString() },
];

const AllComplaintsView = () => {
    const { user } = useSelector((state) => state.profile);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial Data Fetch
    useEffect(() => {
        const fetchAllComplaints = async () => {
            // ⚠️ Replace MOCK_ALL_COMPLAINTS with actual API call
            // try {
            //     const response = await getAllComplaints();
            //     setComplaints(response.data);
            // } catch (error) {
            //     console.error("Failed to fetch all complaints:", error);
            //     toast.error("Could not load all complaints.");
            // }
            
            // Mock data implementation
            setTimeout(() => {
                setComplaints(MOCK_ALL_COMPLAINTS);
                setLoading(false);
            }, 500);
        };

        fetchAllComplaints();
    }, []);

    // Handle status change triggered by the table component
    const handleStatusUpdate = async (complaintId, newStatus) => {
        // ⚠️ Call the PATCH /:id/status API endpoint here
        // try {
        //     const response = await updateComplaintStatus(complaintId, newStatus);
        //     toast.success("Status updated!");
            
            // Update local state with the new status
            setComplaints(prev => prev.map(c => 
                c._id === complaintId ? { ...c, status: newStatus } : c
            ));
        // } catch (error) {
        //     console.error("Error updating status:", error);
        //     toast.error("Failed to update status.");
        // }

        // Mock implementation for state update
        setComplaints(prev => prev.map(c => 
            c._id === complaintId ? { ...c, status: newStatus } : c
        ));
        toast.success(`Mock Update: Status of ${complaintId} set to ${newStatus}`);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                All System Complaints ({user?.accountType})
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
                <ComplaintTable 
                    complaints={complaints} 
                    onStatusUpdate={handleStatusUpdate} 
                />
            </div>

            {user?.accountType === 'Admin' && (
                <div className="p-4 bg-red-50 border border-red-300 rounded-lg text-sm text-red-800">
                    Admin access grants you full control, including user management (if implemented).
                </div>
            )}
        </div>
    );
};

export default AllComplaintsView;