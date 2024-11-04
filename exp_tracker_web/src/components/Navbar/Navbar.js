import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Navbar/Navbar.css';

export const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    // Clear token and username on window exit
    const clearTokenOnExit = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    };

    window.addEventListener('beforeunload', clearTokenOnExit);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', clearTokenOnExit);
    };
  }, []);

  return (
    <nav>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {username ? (
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
