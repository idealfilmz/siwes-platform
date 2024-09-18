import React, { useState } from "react";

const sampleData = [
  {
    studentId: "19/24pj047",

    scores: {
      week1: 85,
      week2: 90,
      week3: 78,
      week4: 92,
    },
  },
];

export const LecturerOverview = () => {
  const [selectedWeek, setSelectedWeek] = useState("week1");

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">John Paul's Weekly Scores</h1>
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
      <table className=" w-1/2 bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 border-b">Matric No.</th>
            <th className="p-3 border-b">Score</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((student) => (
            <tr key={student.studentId}>
              <td className="p-3 text-center border-b text-gray-800">{student.studentId}</td>
              <td className="p-3 border-b text-center text-gray-800">
                {student.scores[selectedWeek] !== undefined
                  ? student.scores[selectedWeek]
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <center>
      <div className="flex flex-col bg-gray-50 mt-10 items-center w-fit self-center p-5 justify-around">
        <h3 className="p-2 m-2 font-bold">
          <button className="text-blue-500">FINAL SCORE</button>: 0</h3>
       
      </div>
      </center>
    </div>
  );
};
