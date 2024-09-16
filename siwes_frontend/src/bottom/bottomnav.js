import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Import CSS for styling

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default BottomNav;
