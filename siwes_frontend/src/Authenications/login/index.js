import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false)
   const [message, setMessage] = useState("")
   const navigate  = useNavigate()

   const handleUsernameChange = (event) => {
      setUsername(event.target.value);
   };

   const handlePasswordChange = (event) => {
      setPassword(event.target.value);
   };


const Login = async () =>{

setLoading(true)
const response = await fetch("localhost:3000/login-students",{
   method:"POST",
   headers:{"content-type":"application/json"},
   body:JSON.stringify({
      "matric_no":username,
      "password":"samuel"})
})

const data = response.json()
if(!response.ok){
   setMessage(data.message)
   return 

}

}


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
                  <label htmlFor="username" className="block text-gray-700 mb-2">Staff ID</label>
                  <input
                     id="username"
                     type="text"
                     placeholder="Enter staff id"
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
               onClick={()=>navigate('/supervisor')}
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Login
               </button>

            </form>
            {message}
         </div>
      </div>
   );
};
