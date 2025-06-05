import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Logbookpop } from "./popguys/logpop";

export const WeekLyName = () => {
  const date = new Date();

  const id = localStorage.getItem("id");

  const weekly = date.getDay();
  const [progress, setProgress] = useState("");
  const [newId, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openpop, seClosePop] = useState(false)



  async function fetchLogbook() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get-logbook?std_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setId(data);
      if (response.status === 300) {
        setLoading(false)
        seClosePop(!openpop);
        return;
      }
    } catch (e) {
      setLoading(false)

    } finally {
      setLoading(false)
      return
        ;
    }
  }
  useEffect(() => {
    fetchLogbook();
  }, []);

  if (loading) {
    return (
      <div>
        <h5>Checking....&& creating.... logbook  </h5>
        <p>Please wait....</p>
        <FaSpinner className='animate-spin' />
      </div>
    )
  }

  async function CreateLogbokk() {
    if (progress === "") {
      return alert("Fill up the blank space");
    }
    if (!newId?.data?.id) {
      return alert("Logbook not found. Please create your logbook first.");
    }
    try {
      const response = await fetch("http://127.0.0.1:5000/weekly-base", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          progress,
          logbook_id: newId.data.id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Weekly progress uploaded!");
        setProgress(""); // Clear textarea
        fetchLogbook();  // Optionally refresh logbook info
      } else {
        alert(data.message || "Upload failed.");
      }
    } catch (e) {
      alert("An error occurred. Please try again.");
    }
  }




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
            onClick={CreateLogbokk}
            className="p-2 m-1 bg-blue-700 text-white rounded-lg shadow-md"
          >
            Submit
          </button>
        </div>
      )}
      <Logbookpop is_close={seClosePop} is_active={openpop} />
    </div>
  );
};
