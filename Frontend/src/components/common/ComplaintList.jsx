import React from 'react';
import ComplaintCard from './ComplaintCard.jsx';

const ComplaintList = ({ complaints }) => {
  return (
    <div className="mt-4">
      <h2 className="list-heading text-2xl font-semibold text-circus-dark font-display mb-4 tracking-wide">
        My Recent Complaints
      </h2>
      
      {/* List of ComplaintCard components */}
      <div className="space-y-4">
        {complaints.length > 0 ? (
          complaints.map(complaint => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-xl shadow-inner text-gray-500">
            You haven't submitted any complaints yet. Time to report a wonder!
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintList;