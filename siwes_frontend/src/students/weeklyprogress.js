import React from "react";

export const WeekLyName = () => {
  return (
    <div className="p-4">
      <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-4">
        <marquee className="text-center text-blue-600 text-lg font-semibold">
          You are in week 8, please input the week's progress via the following:
        </marquee>
      </div>
      <textarea
        placeholder="Enter week's progress..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="20"  // Adjust the number of rows as needed
      />
    </div>
  );
};
