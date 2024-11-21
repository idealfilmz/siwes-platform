
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const SupLogin = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage]= useState("")
   const [loading, setLoading]=  useState(false)
   const navigate  = useNavigate()

   const handleUsernameChange = (event) => {
      setUsername(event.target.value);
   };


   const Login = async () => {
      setLoading(true);  // Set loading state to true
  
      try {
          const response = await fetch("http://127.0.0.1:3000/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",  // Add content type header
              },
              body: JSON.stringify({
                  matric_number: username,  // Ensure correct field names match your backend
                  password: password,
              }),
          });
  
          const data = await response.json();  // Await the response JSON
  
          if (!response.ok) {
              // If the response is not OK, show the message
              setMessage(data.message || "Something went wrong, please try again!");
              return;
          }

          localStorage.setItem("id",data.user.id);
          localStorage.setItem("token",data.token)
          navigate("/side");
  
      } catch (e) {
          console.error("Login failed:", e);  // Log the error for debugging
          setMessage("An error occurred during login. Please try again.");
      } finally {
          setLoading(false); 
      }
  };
  


   const handlePasswordChange = (event) => {
      setPassword(event.target.value);
   };


   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
            <form>
               <div className="mb-4">
                  <label htmlFor="username" className="block text-gray-700 mb-2">Matric number</label>
                  <input
                     id="username"
                     type="text"
                     placeholder="Matric number"
                     value={username}
                     onChange={handleUsernameChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>
               <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                  <input
                     id="password"
                     type="password"
                     placeholder="Enter password"
                     value={password}
                     onChange={handlePasswordChange}
                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
               </div>

               {loading?<FaSpinner className="animate-spin" />:
               <button
               onClick={Login}
                  type="submit"
                  className="w-full py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Login
               </button>

            
}
            </form>
            {message}
         </div>
      </div>
   );
};
