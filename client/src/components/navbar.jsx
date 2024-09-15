import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import {useAuth} from "../context/AuthContext" // Import the auth context
import '../styles/navbar.css';

const Navbar = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { logout } = useAuth(); // Get logout function from auth context
  const navigate = useNavigate(); // Get navigate function from react-router-dom

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Call logout function to update auth state
    navigate('/'); // Navigate to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1 className="navbar-title">Fruit.AI</h1>
        <div className="navbar-links">
          <Link to="/home" className="nav-item">Home</Link>
          <div className="nav-item dropdown" onClick={toggleDropdown}>
            {username}
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <span className="dropdown-item">{username}</span>
              <span className="dropdown-item" onClick={handleLogout}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
