// Frontend/src/components/Dashboards/CitizenDashboard.jsx

import React from 'react';
import ComplaintCard from '../common/ComplaintCard'; // Utility component
import ComplaintForm from './ComplaintForm'; // Assume this component handles form submission

const MOCK_COMPLAINTS = [
    { _id: 1, type: 'Road Damage', status: 'IN PROGRESS', description: 'Pothole on Main Street.', createdAt: '2025-01-10' },
    { _id: 2, type: 'Water Leak', status: 'RESOLVED', description: 'Broken pipe near school.', createdAt: '2025-01-05' },
];

const CitizenDashboard = () => {
    // ⚠️ In a real app, you'd fetch data using the getMyComplaints API endpoint here
    const [complaints, setComplaints] = React.useState(MOCK_COMPLAINTS);
    const [showForm, setShowForm] = React.useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium text-gray-700">Your Submitted Complaints</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition shadow-md"
                >
                    {showForm ? 'Hide Form' : 'Submit New Complaint'}
                </button>
            </div>
            
            {showForm && (
                <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
                    <ComplaintForm onSuccess={() => setShowForm(false)} />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complaints.length > 0 ? (
                    complaints.map(complaint => (
                        <ComplaintCard key={complaint._id} complaint={complaint} isStaff={false} />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-2 p-4 border rounded-lg bg-white">No complaints submitted yet.</p>
                )}
            </div>
        </div>
    );
};

export default CitizenDashboard;