// can be used.. not needed now

import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full w-full min-h-[300px]">
            {/* Simple Tailwind/CSS Spinner */}
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <p className="ml-4 text-xl text-gray-600 font-medium">Loading...</p>
        </div>
    );
};

export default Loading;