import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LecturerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null); // Lecturer info
  const [data2, setData2] = useState([]); // Supervised students
  const [loading, setLoading] = useState(false);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const FetchDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/fetch-lecture?id=${1}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.error("Failed to fetch lecturer details.");
        return;
      }

      // Set lecturer data
      setData(responseData);

      // Filter students who have this lecturer as a supervisor
      const supervisedStudents = responseData.filter((student) =>
        student.supervisors?.some(
          (sup) => sup.supervisor?.PK?.toString() === id
        )
      );

      setData2(supervisedStudents);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchDetails();
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = data2?.filter((student) =>
    student.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
<h1 className="text-sm font-bold mb-6 text-right">
  {data?.[0]?.supervisors?.[0]?.supervisor?.fullname?.toUpperCase()}
</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-3 border-b">Student ID</th>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Course</th>
            <th className="p-3 border-b">Department</th>
            <th className="p-3 border-b">Establishment</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents?.map((student) => (
            <tr key={student.id} className="bg-gray-100 text-gray-700">
              <td className="p-3 border-b">{student.matric_number}</td>
              <td className="p-3 border-b">{student.fullname}</td>
              <td className="p-3 border-b">{student.email}</td>
              <td className="p-3 border-b">{student.course}</td>
              <td className="p-3 border-b">{student.department}</td>
              <td className="p-3 border-b">{student.establishment}</td>
              <td className="p-3 border-b">
                <button
                  onClick={() => navigate("view",{state:student.id})}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
          {filteredStudents.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
