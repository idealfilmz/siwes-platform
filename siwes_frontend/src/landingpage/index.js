import React from "react";
import { FaOptinMonster, FaSignInAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Background from "../../src/chool.jpg";
import './style.css'; // Ensure you import your CSS

export const LandingPage = () => {
   const navigate = useNavigate();

   return (
      <div className="relative h-screen flex flex-col">
         {/* Background Image */}
         <div
            className="absolute inset-0"
            style={{
               backgroundImage: `url(${Background})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               opacity: 0.7, // Adjust this value for opacity
            }}
         />
         {/* Overlay for content */}
         <div className="relative z-10 flex flex-col h-full animate-fade-in"> {/* Apply animation class here */}
            <div className="shadow-lg bg-white p-5 fixed left-0 right-0 top-0">
               <ul className="flex flex-row items-center justify-around">
                  <li className="flex flex-row items-center m-2 p-2 hover:underline">
                     <FaUser className="text-blue-500" />
                     <button>Contact us</button>
                  </li>
                  <li className="flex flex-row items-center m-2 p-2 hover:underline">
                     <FaOptinMonster className="text-blue-500" /> A PLATFORM TO ENHANCE SIWESS ASSESSMENT
                  </li>
                  <li className="flex flex-row items-center m-2 p-2 hover:underline">
                     <FaSignInAlt className="text-blue-500" />
                     <button onClick={() => navigate("/login")}>Login/Register</button>
                  </li>
               </ul>
            </div>
            <center>
               <div className="mt-32">
                  <h3 style={{ fontWeight: "500" }} className="text-blue-500 text-4xl font-extralight m-1 p-1">
                     Welcome to SIWES Assessment platform
                  </h3>
                  <p style={{ wordSpacing: 2 }} className="text-white font-semibold">Improving Assessment Quality</p>
                  <div></div>

                  <button onClick={() => navigate("/NewPage")} className="shadow-lg p-2 pr-7 pl-7 rounded-xl text-gray-100 bg-green-600 m-3">
                     Signup
                  </button>
                  <button onClick={() => navigate("/nav")} className="shadow-lg p-2 pr-7 pl-7 bg-blue-500 rounded-xl text-gray-100 m-3">
                     Login
                  </button>
               </div>
            </center>

            <div className="flex flex-row justify-between p-3 m-4">
               {Array(3).fill().map((_, index) => (
                  <main key={index} className="bg-white p-4 shadow-lg m-4 rounded-lg">
                     <h2 className="font-serif text-center p-2 text-gray-500 text-2xl">About Siwess platform</h2>
                     <p className="text-justify text-sm ">By bringing your company’s communication with your leads and customers in one place, Gist lets your entire team rally around a single app for day to day work. One tool to learn. One place to check for notifications. No more constant switching between email marketing, social and other chat apps. This allows for a smoother handoff between Marketing, Sales & Services, and a more delightful experience for your customers.</p>
                  </main>
               ))}
            </div>
         </div>
      </div>
   );
}
