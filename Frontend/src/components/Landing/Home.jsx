import React from "react";

export const Home = () => {
return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 p-6"> <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl text-gray-800">

```
    {/* Welcome Header */}
    <div className="text-green-600 font-bold text-sm mb-1">WELCOME TO</div>
    <div className="text-4xl font-bold text-gray-900 mb-6">City Waste Management System</div>

    {/* Project Overview */}
    <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
      <div className="text-xl font-semibold mb-2 text-gray-900">About the Project</div>
      <p className="text-gray-700 leading-relaxed">
        The <strong>Waste Management System</strong> is designed to make city waste collection,
        disposal, and recycling more efficient and transparent. This platform helps citizens,
        municipal staff, and administrators work together towards a cleaner, greener city.
      </p>
      <p className="text-gray-700 leading-relaxed mt-3">
        Features include scheduling waste collection, tracking recycling initiatives, 
        reporting uncollected waste, and providing insights into the city’s waste management
        performance. Our goal is to promote sustainability and improve urban living conditions.
      </p>
    </div>

  </div>
</div>

);
};
