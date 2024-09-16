
import React from "react";
import { FaBookOpen, FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const studentData = [
  {
    studentId: "S1",
    name: "John Doe",
    weekly_progress: "5",
    scores: {
      week1: 85,
      week2: 90,
      // week3 and week4 are missing
    },
  },
  // Add more student data here
];
export const StudentDashboard = () => {
  const navigate =useNavigate()
  const getWeeksWithScores = (scores) => {
    return Object.keys(scores).length; // Counts the number of weeks with scores
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-950 shadow-lg">Student Dashboard </h1>
      <div className="flex flex-row justify-between">
        <h2>
          Welcome, <b>Sulyman</b>
        </h2>
        <h3>16/25pl062</h3>
      </div>

      <div className="absolute left-0  bottom-8 p-1">
        <h3>
            Supervisor: DR.Oloshola M.a
        </h3>
        <h5>
         Phone: 08130423221
        </h5>
      </div>

      <div className="flex flex-row justify-around w-full  items-center  mt-44">
        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center ">
          <button
          onClick={()=>navigate("wekk")}
          className="text-blue-950 text-center text-4xl ">
            <FaBookOpen />
          </button>
          <h4 style={{
            color: "#111",
            fontWeight: "bold",
            textAlign: "center"
          }}> WEEKLY PROGRESS</h4>

        </div>
        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center ">
          <button className="text-blue-950 text-center text-4xl ">
            <FaFileAlt />
          </button>
          <h4 style={{
            color: "#111",
            fontWeight: "bold",
            textAlign: "center"
          }}>Upload</h4>
        </div>

        <div className="shadow-lg bg-white p-10 rounded-lg items-center text-center ">

          <button className="text-blue-950 text-center text-4xl ">
            <FaCheckCircle />
          </button>
          <h4 style={{
            color: "#111",
            fontWeight: "bold",
            textAlign: "center"
          }}>ASSESSMMENT</h4>

        </div>
      </div>

    </div>
  );
};
