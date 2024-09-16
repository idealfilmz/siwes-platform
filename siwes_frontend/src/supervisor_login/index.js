
import React, { useState } from "react";

export const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const handleUsernameChange = (event) => {
      setUsername(event.target.value);
   };

   const handlePasswordChange = (event) => {
      setPassword(event.target.value);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      // Handle login logic here
      console.log("Username:", username);
      console.log("Password:", password);
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
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
               <button
                  type="submit"
                  className="w-full py-2 bg-gray-900 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Login
               </button>
            </form>
         </div>
      </div>
   );
};
