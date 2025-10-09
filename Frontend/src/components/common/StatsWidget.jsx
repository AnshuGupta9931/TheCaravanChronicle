import React from 'react';

const StatsWidget = ({ active, resolved, total }) => {
  const resolvedRatio = total > 0 ? Math.round((resolved / total) * 100) : 0;
  
  return (
    <div className="h-full bg-white rounded-xl shadow-lg p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-circus-dark mb-4">
        Your Complaint Statistics
      </h3>

      {/* Radial Progress Display (Styled placeholder) */}
      <div className="flex justify-center items-center my-4">
        <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center relative"
             style={{ 
               // Tailwind cannot directly interpret dynamic conic-gradients, so inline style is used here
               backgroundImage: `conic-gradient(#17a2b8 ${resolvedRatio}%, #e2e8f0 ${resolvedRatio}%)`
             }}>
            <div className="absolute w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-3xl font-bold text-circus-dark">{total}</span>
              <span className="text-xs text-gray-500 uppercase">Total</span>
            </div>
        </div>
      </div>

      {/* Detailed Counts */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-circus-red">{active}</span>
          <span className="text-sm text-gray-500">Active</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-status-resolved">{resolved}</span>
          <span className="text-sm text-gray-500">Resolved</span>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;