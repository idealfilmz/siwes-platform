import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const LecturerOverview = () => {
  const [student, setStudent] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1); 
  const location = useLocation();

  const _id = location.state

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/get-student?id=${_id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error(err));
  }, []);

  // Helper: get all weeks available
  const weeks =
    student?.logbooks?.[0]?.weekly?.map((w) => w.weekly_tract) || [];

  // Helper: get score for selected week
  const selectedWeekly =
    student?.logbooks?.[0]?.weekly?.find(
      (w) => w.weekly_tract === selectedWeek
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        {student?.fullname || "Student"}'s Weekly Scores
      </h1>
      <div className="mb-4">
        <label htmlFor="weekSelect" className="block text-gray-700 mb-2">
          Select Week:
        </label>
        <select
          id="weekSelect"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md"
        >
          {weeks.length > 0 ? (
            weeks.map((w) => (
              <option key={w} value={w}>
                Week {w}
              </option>
            ))
          ) : (
            <option>No weeks</option>
          )}
        </select>
      </div>
      <table className="w-1/2 bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 border-b">Matric No.</th>
            <th className="p-3 border-b">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 text-center border-b text-gray-800">
              {student?.matric_number}
            </td>
            <td className="p-3 border-b text-center text-gray-800">
              {selectedWeekly?.scores ?? "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
      <center>
        <div className="flex flex-col bg-gray-50 mt-10 items-center w-fit self-center p-5 justify-around">
          <h3 className="p-2 m-2 font-bold">
            <button className="text-blue-500">FINAL SCORE</button>:{" "}
            {student?.logbooks?.[0]?.weekly?.reduce(
              (acc, w) => acc + (w.scores || 0),
              0
            ) ?? 0}
          </h3>
        </div>
      </center>
    </div>
  );
};