import React, { useState } from "react";

const sampleData = [
  {
    studentId: "S1",
    name: "John Doe",
    scores: {
      week1: 85,
      week2: 90,
      week3: 78,
      week4: 92,
    },
  },
  {
    studentId: "S2",
    name: "Jane Smith",
    scores: {
      week1: 88,
      week2: 94,
      week3: 82,
      week4: 89,
    },
  },
  // Add more student data here
];

export const LecturerOverview = () => {
  const [selectedWeek, setSelectedWeek] = useState("week1");

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Student Weekly Scores</h1>
      <div className="mb-4">
        <label htmlFor="weekSelect" className="block text-gray-700 mb-2">Select Week:</label>
        <select
          id="weekSelect"
          value={selectedWeek}
          onChange={handleWeekChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="week1">Week 1</option>
          <option value="week2">Week 2</option>
          <option value="week3">Week 3</option>
          <option value="week4">Week 4</option>
        </select>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 border-b">Student ID</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Score</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((student) => (
            <tr key={student.studentId}>
              <td className="p-3 border-b text-gray-800">{student.studentId}</td>
              <td className="p-3 border-b text-gray-800">{student.name}</td>
              <td className="p-3 border-b text-gray-800">
                {student.scores[selectedWeek] !== undefined
                  ? student.scores[selectedWeek]
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
