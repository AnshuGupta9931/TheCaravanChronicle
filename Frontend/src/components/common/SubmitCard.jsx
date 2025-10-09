import React from "react";
import { useNavigate } from "react-router-dom";

const SubmitCard = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center">
      {/* Background Image/Graphic Area */}
      <div className="h-40 bg-gray-100 rounded-lg overflow-hidden relative mb-6">
        <img
          src="https://images.unsplash.com/photo-1529625052082-2d0d3ce5f6f9?auto=format&fit=crop&w=1600&q=80"
          alt="Submit a Complaint"
          className="w-full h-full object-cover"
        />

        {/* Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <button
            onClick={() => navigate("/dashboard/create-complaint")}
            className="px-8 py-3 bg-circus-red text-white font-bold text-lg rounded-full shadow-xl 
                       hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            Submit a New Complaint
          </button>
        </div>
      </div>

      {/* Text Callout */}
      <h2 className="text-xl font-bold text-circus-dark font-display tracking-wide mb-2">
        See something, say something!
      </h2>
      <p className="text-gray-600 text-sm">
        Help keep Circus City the most wonderful place on earth. Report municipal issues quickly and track their resolution here.
      </p>
    </div>
  );
};

export default SubmitCard;
