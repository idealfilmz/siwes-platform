import React from "react";
import { FaOptinMonster, FaSign, FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";



export const LandingPage =()=>{
const navigate  = useNavigate()

   return(
      <div className="bg-gray-300 h-screen flex flex-col">
         <div className=" shadow-lg gap-1 p-3 m-2 bg-white w-full ">
            <ul className="flex flex-row items-center justify-around">
               <li className="flex flex-row items-center m-2 p-2 hover:underline">
               <FaUser className="text-blue-500" /><button>Contact us</button> 
               </li>
               <li className="flex flex-row items-center m-2 p-2 hover:underline">
             <FaOptinMonster className="text-blue-500"/> A PLATFORM TO ENHANCE SIWESS ASSESMENT
             </li>
               <li className="flex flex-row items-center m-2 p-2 hover:underline">
               <FaSignInAlt className="text-blue-500"/> <button onClick={()=>navigate("/login")}>Login/Register</button> 
               </li>
                     
            </ul>
         </div>
         <center>
         <div>
         <h3 style={{
            fontWeight:"450"
         }} className="text-white text-4xl font-extralight m-1 p-1">Welcome to SIWES Acessment platform</h3>
         <p style={{
            wordSpacing:2
         }} className="text-white">Improving Accesment Quality</p>
         <div>
            </div>

<button onClick={()=>navigate("/NewPage")} className="shadow-lg p-2 pr-7 pl-7  rounded-xl text-gray-100 bg-green-600 m-3">Signup</button>
<button onClick={()=>navigate("/nav")} className="shadow-lg p-2 pr-7 pl-7 bg-blue-500 rounded-xl text-gray-100 m-3">Login</button>
         </div>
      </center>
<div>
   <h1></h1>
</div>



      </div>
   )
}


