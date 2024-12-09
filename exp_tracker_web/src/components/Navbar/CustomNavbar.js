import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Navbar.css'

export const CustomNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize state based on localStorage
    return localStorage.getItem('darkMode') === 'true';
  });


  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode); // Persist to localStorage
      return newMode;
    });
  };

  // Ensure correct class is applied on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="pill-navbar">
      <ul className="flex gap-4 items-center list-none">
        <li>
          <Link
            to="/"
            className="navbar-link"
          >
            Home
          </Link>
        </li>
        {username ? (
          <>
            <li className="navbar-link">
              Hello, {username}!
            </li>
            <li>
              <Link
                to="/profile"
                className="navbar-link"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="navbar-link"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="navbar-link"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="navbar-link"
              >
                Register
              </Link>
            </li>
          </>
        )}

        {/* Dark Mode Toggle */}
        <li>
          <button
            onClick={toggleDarkMode}
            className="navbar-link"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </li>
      </ul>
    </nav>
  );
};
