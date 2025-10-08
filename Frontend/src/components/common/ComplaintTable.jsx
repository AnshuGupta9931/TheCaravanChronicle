// Frontend/src/components/common/ComplaintTable.jsx

import React from 'react';

const StatusBadge = ({ status }) => {
    let color = 'bg-gray-200 text-gray-800';
    if (status === 'RESOLVED') color = 'bg-green-100 text-green-800';
    else if (status === 'IN PROGRESS') color = 'bg-yellow-100 text-yellow-800';
    else if (status === 'OPEN') color = 'bg-red-100 text-red-800';

    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${color}`}>
            {status}
        </span>
    );
};

const ComplaintTable = ({ complaints, onStatusUpdate }) => {
    const statuses = ["OPEN", "IN PROGRESS", "RESOLVED"];

    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen / Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {complaints.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold">{c.type}</div>
                            <div className="text-xs text-gray-500 truncate w-48">{c.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{c.citizen}</div>
                            <div className="text-xs text-gray-500">{c.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={c.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <select
                                value={c.status}
                                onChange={(e) => onStatusUpdate(c._id, e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                {statuses.map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ComplaintTable;