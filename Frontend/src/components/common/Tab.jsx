import React from "react";

export const Tab = ({ tabData, field, setField }) => {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        backgroundColor: "#1f2937", // Tailwind gray-800
      }}
      className="flex p-1 gap-x-1 my-6 rounded-full max-w-max"
    >
      {tabData.map((tab) => {
        const isActive = field === tab.type;

        return (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            style={{
              backgroundColor: isActive ? "#111827" : "transparent", // gray-900 if active
              color: isActive ? "#ffffff" : "oklch(87% 0.065 274.039)", // white if active, oklch pastel if inactive
            }}
            className="py-2 px-5 rounded-full transition-all duration-200"
          >
            {tab?.tabName}
          </button>
        );
      })}
    </div>
  );
};
