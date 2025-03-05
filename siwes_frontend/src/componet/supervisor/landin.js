import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LecturerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const FetchDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/lecturer-details?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Add content type header
          },
        }
      );

      const data = await response.json(); // Await the response JSON

      if (!response.ok) {
        // If the response is not OK, show the message

        return;
      }
      setData(data);
    } catch (e) {
      console.error("Login failed:", e); // Log the error for debugging
      return;
    } finally {
      setLoading(false);
      return;
    }
  };
  useEffect(() => {
    FetchDetails();
  }, [id]);

  const navigate = useNavigate();

  const FetchDetails2 = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/lecturer-std?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Add content type header
          },
        }
      );

      const data = await response.json(); // Await the response JSON

      if (!response.ok) {
        // If the response is not OK, show the message

        return;
      }
      setData2(data);
    } catch (e) {
      console.error("Login failed:", e); // Log the error for debugging
      return;
    } finally {
      setLoading(false);
      return;
    }
  };
  useEffect(() => {
    FetchDetails2();
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-sm font-bold mb-6 text-right">
        {data?.fullname?.toUpperCase()}
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
          {data2?.map((srudents) => (
            <tr key={srudents.id} className="bg-gray-100 text-gray-700">
              <td className="p-3 border-b">{srudents.id}</td>
              <td className="p-3 border-b">{srudents.fullname}</td>
              <td className="p-3 border-b">{srudents.email}</td>
              <td className="p-3 border-b">{srudents.course}</td>
              <td className="p-3 border-b">{srudents.department}</td>
              <td className="p-3 border-b">{srudents.establishment}</td>
              <td className="p-3 border-b">
                <button
                  onClick={() => navigate("view")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
