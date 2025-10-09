import React from 'react';

const StatusPill = ({ status }) => {
  let colorClasses = '';
  let text = status?.toUpperCase() || 'ACTIVE';

  switch (text) {
    case 'IN PROGRESS':
      colorClasses = 'bg-blue-200 text-blue-800 border border-blue-300';
      break;
    case 'RESOLVED':
      colorClasses = 'bg-green-200 text-green-800 border border-green-300';
      break;
    case 'OPEN':
    default:
      colorClasses = 'bg-yellow-200 text-yellow-800 border border-yellow-300';
      text = 'ACTIVE';
      break;
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-bold rounded-full tracking-wider shadow-sm ${colorClasses}`}
    >
      {text}
    </span>
  );
};

export default StatusPill;
