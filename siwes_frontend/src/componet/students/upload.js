import React, { useState } from "react";
import { useLocation } from 'react-router-dom';


export const Upload = () => {
  const [file, setFile] = useState(null);


  const location = useLocation();
  const id = location.state?.id;

  console.log(id)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("weeklyId", id);

    try{
    const response = await fetch("http://127.0.0.1:5000/upload-image-data", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message || "File uploaded successfully!");
    } else {
      alert(data.message || "Upload failed.");
    }
  } catch (e) {
    alert("An error occurred during upload.");
  }
};



return (
  <div className="flex-1 justify-center items-center content-center h-screen">
    <center>
      <div
        style={{
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: "white",
          alignSelf: "center",
          justifyContent: "center",
        }}
        className="shadow-lg w-fit p-2"
      >
        <p>Include the file for this week's progress</p>
        <input
          type="file"
          className="bg-blue-950 rounded-lg text-white"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          className="bg-blue-950 rounded-lg text-white w-fit p-1 pl-2 pr-2 m-4"
        >
          Submit file
        </button>
      </div>
    </center>
  </div>
);
};