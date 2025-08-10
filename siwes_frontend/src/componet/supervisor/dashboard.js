import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const LecturerOverview = () => {
  const [student, setStudent] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const location = useLocation();
  const [enlargeImg, setEnlargeImg] = useState(null);

  const _id = location.state;

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/get-student?id=${_id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error(err));
  }, []);

  const weeks =
    student?.logbooks?.[0]?.weekly?.map((w) => w.weekly_tract) || [];

  const selectedWeekly = student?.logbooks?.[0]?.weekly?.find(
    (w) => w.weekly_tract === selectedWeek
  );

  const finalScore =
    student?.logbooks?.[0]?.weekly?.reduce(
      (acc, w) => acc + (w.scores || 0),
      0
    ) ?? 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {student?.fullname || "Student"}'s Logbook Overview
      </h1>

      {/* Student Info */}
      <div className="bg-white rounded shadow p-6 space-y-2">
        <h2 className="text-xl font-semibold">Student Details</h2>
        <p>
          <strong>Matric Number:</strong> {student?.matric_number}
        </p>
        <p>
          <strong>Full Name:</strong> {student?.fullname}
        </p>
        <p>
          <strong>Phone Number:</strong> {student?.phone_number}
        </p>
        <p>
          <strong>Email:</strong> {student?.email}
        </p>
        <p>
          <strong>Course:</strong> {student?.course}
        </p>
        <p>
          <strong>Department:</strong> {student?.department}
        </p>
      </div>

      {/* Logbook Info */}
      {student?.logbooks?.map((logbook, index) => (
        <div key={logbook.id} className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Logbook #{index + 1}</h2>
          <p>
            <strong>Institution:</strong> {logbook.institution}
          </p>
          <p>
            <strong>Establishment:</strong> {logbook.establishment}
          </p>
          <p>
            <strong>Address:</strong> {logbook.address}
          </p>

          {/* Week Selector */}
          <div className="my-4">
            <label htmlFor="weekSelect" className="block mb-2">
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

          {/* Weekly Entry */}
          {selectedWeekly ? (
            <div className="mt-4 bg-gray-50 p-4 rounded border">
              <h3 className="text-lg font-medium mb-2">
                Week {selectedWeekly.weekly_tract} Entry
              </h3>
              <p>
                <strong>Progress:</strong> {selectedWeekly.progress}
              </p>
              <p>
                <strong>Score:</strong> {selectedWeekly.scores}
              </p>
              {selectedWeekly.progress_file && (
                <div className="mt-3">
                  <strong>File:</strong>
                  <br />
                  <img
                    src={`http://127.0.0.1:5000/uploads/${selectedWeekly.progress_file}`}
                    alt="Progress File"
                    className="mt-2 w-64 h-auto border rounded cursor-pointer"
                    onClick={() =>
                      setEnlargeImg(
                        `http://127.0.0.1:5000/uploads/${selectedWeekly.progress_file}`
                      )
                    }
                  />
                </div>
              )}
            </div>
          ) : (
            <p>No entry for selected week.</p>
          )}
          {enlargeImg && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setEnlargeImg(null)}
            >
              <img
                src={enlargeImg}
                alt="Enlarged Progress File"
                className="max-w-full max-h-full rounded shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Final Score */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold text-blue-600">
              This Week Score: {finalScore} out of 10
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};
