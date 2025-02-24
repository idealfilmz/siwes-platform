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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-950 shadow-lg">
        Student Dashboard{" "}
      </h1>
      <div className="flex flex-row justify-between">
        <h2>
          Welcome, <b>{data?.data?.fullname?.split(" ")[0].toUpperCase()}</b>
        </h2>
        <h3>{data?.data?.matric_number}</h3>
      </div>

      <div className="absolute left-0  bottom-8 p-1">
        {/* supervisor to each student details here */}
        <h3>Supervisor:{"coming soon.."}</h3>
        <h5>Phone: {"coming soon.."}</h5>
      </div>

      <div className="flex flex-row justify-around w-full  items-center  mt-44">
        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center ">
          <button
            onClick={() => navigate("wekk")}
            className="text-blue-950 text-center text-4xl "
          >
            <FaBookOpen />
          </button>
          <h4
            style={{
              color: "#111",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {" "}
            WEEKLY PROGRESS
          </h4>
        </div>
        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center ">
          <button
            onClick={() => navigate("upload")}
            className="text-blue-950 text-center text-4xl "
          >
            <FaFileAlt />
          </button>
          <h4
            style={{
              color: "#111",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Upload
          </h4>
        </div>

        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center ">
          <button className="text-blue-950 text-center text-4xl ">
            <FaCheckCircle />
          </button>
          <h4
            style={{
              color: "#111",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            ASSESSMMENT
          </h4>
        </div>
      </div>
    </div>
  );
};
