import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Navbar/Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate(); // Hook for navigation
  const username = localStorage.getItem('username'); // Retrieve username from local storage

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    localStorage.removeItem('username'); // Remove username from local storage
    navigate('/login'); // Redirect to login page
    window.location.reload(); // Reload the page to update the navbar
  };

  return (
    <nav>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {username ? ( // Conditional rendering based on whether the user is logged in
          <>
            <li>Hello, {username}!</li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
