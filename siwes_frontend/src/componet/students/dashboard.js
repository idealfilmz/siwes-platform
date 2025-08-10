import React, { useEffect, useState } from "react";
import { FaBookOpen, FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const StudentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const FetchDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/fetchdetails?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return;
      }
      setData(data);
    } catch (e) {
      console.error("Login failed:", e);
      return;
    } finally {
      setLoading(false);
      return;
    }
  };

  useEffect(() => {
    FetchDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/"); // 👈 Redirect to landing page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-950 shadow-lg">
        Student Dashboard{" "}
      </h1>

      {/* Welcome and Matric + Logout */}
      <div className="flex flex-row justify-between">
        <div>
          <h2>
            Welcome, <b>{data?.data?.fullname?.split(" ")[0].toUpperCase()}</b>
          </h2>
        </div>
        <div className="text-right">
          <h3 className="font-semibold">{data?.data?.matric_number}</h3>
          <button
            onClick={handleLogout}
            className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Supervisor Info */}
      <div className="absolute left-0 bottom-8 p-1">
        <h3 className="font-semibold">
          Supervisor:{" "}
          {data?.data?.supervisors?.[0]?.supervisor?.fullname || "Not assigned"}
        </h3>
        <h5 className="font-semibold">
          Phone:{" "}
          {data?.data?.supervisors?.[0]?.supervisor?.phone_number ||
            "Not assigned"}
        </h5>
        <h5 className="font-semibold">
          Email:{" "}
          {data?.data?.supervisors?.[0]?.supervisor?.email || "Not assigned"}
        </h5>
      </div>

      {/* Dashboard Actions */}
      <div className="flex flex-row justify-around w-full items-center mt-44">
        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center">
          <button
            onClick={() => navigate("wekk")}
            className="text-blue-950 text-center text-4xl"
          >
            <FaBookOpen />
          </button>
          <h4
            style={{ color: "#111", fontWeight: "bold", textAlign: "center" }}
          >
            WEEKLY PROGRESS
          </h4>
        </div>

        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center">
          <button
            onClick={() =>
              navigate("upload", {
                state: { id: data?.data?.logbooks?.[0]?.id },
              })
            }
            className="text-blue-950 text-center text-4xl"
          >
            <FaFileAlt />
          </button>
          <h4
            style={{ color: "#111", fontWeight: "bold", textAlign: "center" }}
          >
            Upload
          </h4>
        </div>

        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center">
          <button
            onClick={() => navigate("test")}
            className="text-blue-950 text-center text-4xl"
          >
            <FaCheckCircle />
          </button>
          <h4
            style={{ color: "#111", fontWeight: "bold", textAlign: "center" }}
          >
            ASSESSMENT
          </h4>
        </div>
      </div>
    </div>
  );
};
