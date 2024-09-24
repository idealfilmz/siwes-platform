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
   {[
      {
         title: "Objectives of SIWES",
         content: "The objectives of SIWES are to provide students in higher institutions with opportunities to acquire industrial skills and experience relevant to their courses of study, preparing them for the industrial work environment they will encounter post-graduation. It aims to expose students to work methods and techniques for handling equipment and machinery not available in their institutions, thereby easing the transition from school to the workplace and enhancing their job placement prospects."

      },
      {
          title: "SIWES Overview",
         content: "The Student Industrial Work Experience Scheme (SIWES) is an important part and a crucial component of the Nigerian educational curriculum, it is designed to bridge the gap between theoretical knowledge gained by the students in the classroom and the needed practical experience for the real-life work that students will be engaging with after leaving the school."
         
      },
      {
         title: "Scope of SIWES",
         content: "The aim of the programme is to solve the problem of inadequate practical skills required for employment in industries. The Student Industrial Work Experience Scheme is a government approved and mandatory phase of education scheme that is open to undergraduate students in the following fields: Agricultural Science, English, Technology, Environmental Science, Education, Medical Science, Pure and Applied Sciences."
      }
   ].map((item, index) => (
      <main key={index} className="bg-white p-4 shadow-lg m-4 rounded-lg w-1/3">
         <h2 className="font-serif text-center p-2 text-gray-500 text-2xl">{item.title}</h2>
         <p className="text-justify text-sm">{item.content}</p>
      </main>
   ))}
</div>








         </div>
      </div>
   );
}
