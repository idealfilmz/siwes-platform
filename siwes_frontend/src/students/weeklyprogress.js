import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Logbookpop } from "./popguys/logpop";
import { useNavigate } from "react-router-dom";

export const WeekLyName = () => {
  const [logbook, setLogbook] = useState(null);
  const [progress, setProgress] = useState("");
  const [loading, setLoading] = useState(true);
  const [showLogbookPopup, setShowLogbookPopup] = useState(false);
  const navigation = useNavigate();

  const id = localStorage.getItem("id");

  // Fetch logbook data
  const fetchLogbook = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/get-logbook?std_id=${id}`
      );
      const data = await response.json();
      if (response.status === 200 && data?.data?.id) {
        setLogbook(data.data);
      } else {
        navigation("/side/pop");
      }
    } catch {
      setLogbook(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogbook();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!showLogbookPopup) {
      fetchLogbook();
    }
    // eslint-disable-next-line
  }, [showLogbookPopup]);

  const handleSubmit = async () => {
    if (!progress) return alert("Fill up the blank space");
    if (!logbook?.id)
      return alert("Logbook not found. Please create your logbook first.");
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/weekly-base", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress, logbook_id: logbook.id }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Weekly progress uploaded!");
        setProgress("");
        fetchLogbook();
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  // UI
  if (loading && !logbook) {
    return (
      <div>
        <h5>Checking... & creating... logbook</h5>
        <p>Please wait...</p>
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
        <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-4">
          <marquee className="text-center text-blue-600 text-lg font-semibold">
            Welcome to weekly Progress Input, please input this week's progress
            below:
          </marquee>
        </div>
        <textarea
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          placeholder="Enter week's progress..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="10"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          className="p-2 m-1 bg-blue-700 text-white rounded-lg shadow-md"
          disabled={loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Submit"}
        </button>
      </div>
    </div>
  );
};
