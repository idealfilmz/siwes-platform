import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export const WeekLyName = () => {
  const date = new Date();

  const id = localStorage.getItem("id");

  const weekly = date.getDay();
  const [progress, setProgress] = useState("");
  const [newId, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  async function fetchLogbook() {
    try {
      const response = await fetch(
        `http://localhost:3000/logbook-fetch?student_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setId(data.data[0].id);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLogbook();
  }, [id]);

  const WeeklyPost = async () => {
    try {
      const response = await fetch(`http://localhost:3000/weekly-post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          info: progress,
          logbook_id: newId,
          weekly: weekly,
        }),
      });
      const data = await response.json();
      alert(data?.message);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <div>
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-4">
            <marquee className="text-center text-blue-600 text-lg font-semibold">
              Welcome to weekly Progress Input, please input this week's
              progress bellow:
            </marquee>
          </div>
          <textarea
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            placeholder="Enter week's progress..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="20" // Adjust the number of rows as needed
          />
          <button
            onClick={() => {
              if (progress === "") {
                return alert("fill up the blank space");
              }
              WeeklyPost();
            }}
            className="p-2 m-1 bg-blue-700 text-white rounded-lg shadow-md"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};
