import React, { useState } from "react";

export const Upload = () => {
  const [file, setFiles] = useState();
  const uploadfile = () => {
    console.log(uploadfile);
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
          <p>Inlude the file for this week progress</p>
          <input type="file" className="bg-blue-950 rounded-lg text-white" />
          <button
            onClick={uploadfile()}
            className="bg-blue-950  rounded-lg text-white w-fit p-1 pl-2 pr-2 m-4"
          >
            Submit file
          </button>
        </div>
      </center>
    </div>
  );
};
