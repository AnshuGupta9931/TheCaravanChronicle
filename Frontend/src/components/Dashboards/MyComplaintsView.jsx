// Frontend/src/components/Dashboards/MyComplaintsView.jsx

import React, { useState, useEffect } from 'react';
// import { getMyComplaints } from '../../services/operations/complaintAPI'; // ⚠️ You need to create this API call
import Loading from '../common/Loading';
import ComplaintCard from '../common/ComplaintCard';
import toast from 'react-hot-toast';

const MOCK_COMPLAINTS = [
    { _id: 'C1001', type: 'Road Damage', status: 'IN PROGRESS', description: 'Pothole on Main Street near the park entrance.', createdAt: new Date(Date.now() - 86400000).toISOString() },
    { _id: 'C1002', type: 'Water Leak', status: 'RESOLVED', description: 'Small leak reported near the community center fountain.', createdAt: new Date(Date.now() - 4 * 86400000).toISOString() },
];

const MyComplaintsView = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch data from the backend
        const fetchComplaints = async () => {
            // ⚠️ Replace MOCK_COMPLAINTS with actual API call
            // try {
            //     const response = await getMyComplaints();
            //     setComplaints(response.data);
            // } catch (error) {
            //     console.error("Failed to fetch user complaints:", error);
            //     toast.error("Could not load your complaints.");
            // }
            
            // Mock data implementation
            setTimeout(() => {
                setComplaints(MOCK_COMPLAINTS);
                setLoading(false);
            }, 500);
        };

        fetchComplaints();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">My Submitted Complaints</h2>
            
            {complaints.length === 0 ? (
                <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow">
                    <p className="text-lg">You haven't submitted any complaints yet.</p>
                    <p className="mt-2">Use the "Submit New Complaint" option to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {complaints.map(complaint => (
                        <ComplaintCard key={complaint._id} complaint={complaint} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyComplaintsView;