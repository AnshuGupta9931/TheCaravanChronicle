import React, { useEffect, useState } from 'react';
import ComplaintCard from '../common/ComplaintCard.jsx';
import { getMyComplaints } from '../../services/operations/compAPI.jsx';

const MyComplaintsView = () => {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getMyComplaints();
        console.log("📦 API response received:", response);

        const complaintData =
          response?.data?.complaints || response?.complaints || [];

        if (Array.isArray(complaintData)) {
          setComplaints(complaintData);
        } else {
          console.error('❌ Invalid complaints data format');
          setComplaints([]);
        }
      } catch (err) {
        console.error('⚠️ Error fetching complaints:', err);
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filteredComplaints = (complaints || []).filter(
    (c) =>
      filterStatus === 'All' ||
      c.status?.toUpperCase() === filterStatus.toUpperCase()
  );

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading complaints...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 mt-8">
      <h1 className="text-3xl font-display text-circus-dark mb-6 border-b pb-2">
        My Reported Issues ({complaints.length})
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 bg-white p-4 rounded-xl shadow-md">
        {[
          { label: 'All', value: 'All', activeColor: 'bg-blue-600' },
          { label: 'Active', value: 'OPEN', activeColor: 'bg-blue-600' },
          { label: 'Resolved', value: 'RESOLVED', activeColor: 'bg-blue-600' },
        ].map((btn) => {
          const isActive = filterStatus === btn.value;
          const activeClasses = `${btn.activeColor} text-white border-transparent`;
          const inactiveClasses =
            'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:text-gray-900';

          return (
            <button
              key={btn.value}
              onClick={() => setFilterStatus(btn.value)}
              className={`px-4 py-2 rounded-full font-semibold border transition focus:outline-none
                ${isActive ? activeClasses : inactiveClasses}
                focus:${btn.activeColor} focus:text-white active:${btn.activeColor} active:text-white`}
            >
              {btn.label} (
              {btn.value === 'All'
                ? complaints.length
                : complaints.filter(
                    (c) => c.status?.toUpperCase() === btn.value
                  ).length}
              )
            </button>
          );
        })}
      </div>

      {/* Complaint List */}
      <div className="space-y-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-inner text-gray-500">
            No issues found matching the filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaintsView;
