import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Import CSS for styling

const BottomNav = () => {
  return (
    <div className='flex self-center h-screen items-center justify-center'>
    <center>
    <nav className="">
      <ul className='flex flex-row '>
        <li className='text-gray-50 m-4 font-bold p-4 rounded-full bg-blue-950 '  ><Link to="/login">Login as student</Link></li>
        <li  className='text-gray-50 m-4 font-bold p-4 rounded-full bg-blue-400'><Link to="/supervisor-login">Login as supervisor</Link></li>
      </ul>
    </nav>
    </center>
    </div>
  );
}

export default BottomNav;
