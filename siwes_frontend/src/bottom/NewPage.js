import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Import CSS for styling

import Background from "../../src/chool.jpg"


const NewPage = () => {
  return (
    <div className='relative flex self-center h-screen items-center justify-center'>
    {/* Background Image */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.9, // Adjust this value for opacity
      }}
    />
    <center>
        <nav className="relative z-10"> {/* Added relative positioning */}
          <ul className='flex flex-row'>
            <li className='text-gray-50 m-4 font-bold p-4 rounded-full bg-blue-950'>
            <Link to="/register">SignUp as student</Link>
            </li>
            <li className='text-gray-50 m-4 font-bold p-4 rounded-full bg-blue-400'>
            <Link to="/SignUp">SignUp as supervisor</Link>
            </li>
          </ul>
        </nav>
      </center>
    
    </div>
  );
}

export default NewPage;
