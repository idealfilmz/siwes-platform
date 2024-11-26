import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export const Register = () => {
const [fullname, setFullname] = useState("")

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [matric_number, setMatric] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [course, setCource] = useState("")
const [phone_number, setPhone] = useState("")


  const register = async () => {
    setLoading(true); 
    try {
      const response = await fetch("http://127.0.0.1:3000/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add content type header
        },
        body: JSON.stringify({
         "fullname":fullname,
         "password":password,
         "matric_number":matric_number,
         "email":email,
         "department":department,
         "course":course,
         "phone_number":phone_number,
        }),
      });

      console.log(department, email)

      const data = await response.json(); // Await the response JSON

      if (!response.ok) {
        // If the response is not OK, show the message
        setMessage(data.message || "Something went wrong, please try again!");
        return;
      }
    } catch (e) {
      console.error("Login failed:", e); // Log the error for debugging
      setMessage("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
          <div className="mb-4">
            <label htmlFor="matricNumber" className="block text-gray-700 mb-2">
              Matric Number
            </label>
            <input
              id="matricNumber"
              name="matricNumber"
              type="text"
              placeholder="Enter matric number"
              value={matric_number}
              onChange={(e)=>setMatric(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="Enter phone number"
              
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter full name"
                        onChange={(e)=>setFullname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
                        onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="course" className="block text-gray-700 mb-2">
              Course
            </label>
            <input
              id="course"
              name="course"
              type="text"
              placeholder="Enter course"
                   onChange={(e)=>setCource(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-gray-700 mb-2">
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              placeholder="Enter department"
                            onChange={(e)=>setDepartment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
               onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <button
            onClick={register}
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          )}
        
<p>
{message}
</p>
      
      </div>
    </div>
  );
};
