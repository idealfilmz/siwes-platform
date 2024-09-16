import React, { useState } from "react";

const studentsData = [
  {
    studentId: "S1",
    name: "John Doe",
    email: "john.doe@example.com",
    course: "Computer Science",
    department: "Engineering",
    establishment:"port harcourt"
  },
  {
    studentId: "S2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    course: "Mathematics",
    department: "Science",
    establishment:"port harcourt"
  },
  {
    studentId: "S2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    course: "Mathematics",
    department: "Science",
    establishment:"port harcourt"
  },
];

export const LecturerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Lecturer Dashboard</h1>
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
            <th className="p-3 border-b">Dstablishment</th>

            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.studentId}>
                <td className="p-3 border-b text-gray-800">{student.studentId}</td>
                <td className="p-3 border-b text-gray-800">{student.name}</td>
                <td className="p-3 border-b text-gray-800">{student.email}</td>
                <td className="p-3 border-b text-gray-800">{student.course}</td>
                <td className="p-3 border-b text-gray-800">{student.department}</td>
                <td className="p-3 border-b text-gray-800">{student.establishment}</td>
                <td className="p-3 border-b text-gray-800">
                  <button className="text-blue-500 hover:underline">View Details</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-3 text-center text-gray-500">No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
