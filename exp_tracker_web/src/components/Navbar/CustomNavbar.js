import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const CustomNavbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

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
    <nav className="vertical-navbar text-text dark:text-text-dark p-4">
      <ul className="space-y-12">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar-link text-lg px-4 py-2 rounded transition ${
                isActive
                  ? 'bg-background-primary dark:bg-background-tertiary'
                  : 'hover:bg-background-secondary dark:hover:bg-background-tertiary'
              }`
            }
          >
            <HomeIcon className="inline-block mr-2" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `navbar-link text-lg px-4 py-2 rounded transition ${
                isActive
                  ? 'bg-background-primary dark:bg-background-tertiary'
                  : 'hover:bg-background-secondary dark:hover:bg-background-tertiary'
              }`
            }
          >
            <AccountBalanceWalletIcon className="inline-block mr-2" /> Expenses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `navbar-link text-lg px-4 py-2 rounded transition ${
                isActive
                  ? 'bg-background-primary dark:bg-background-tertiary'
                  : 'hover:bg-background-secondary dark:hover:bg-background-tertiary'
              }`
            }
          >
            <AccountCircleIcon className="inline-block mr-2" /> Profile
          </NavLink>
        </li>
        {username ? (
          <li>
            <button
              onClick={handleLogout}
              className="navbar-link text-lg px-4 py-2 rounded transition hover:bg-background-tertiary dark:hover:bg-background-tertiary"
            >
              <ExitToAppIcon className="inline-block mr-2" /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `navbar-link text-lg px-4 py-2 rounded transition ${
                    isActive
                      ? 'bg-background-primary dark:bg-background-tertiary'
                      : 'hover:bg-background-secondary dark:hover:bg-background-tertiary'
                  }`
                }
              >
                <LoginIcon className="inline-block mr-2" /> Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `navbar-link text-lg px-4 py-2 rounded transition ${
                    isActive
                      ? 'bg-background-primary dark:bg-background-tertiary'
                      : 'hover:bg-background-secondary dark:hover:bg-background-tertiary'
                  }`
                }
              >
                <PersonAddIcon className="inline-block mr-2" /> Register
              </NavLink>
            </li>
          </>
        )}
        <li>
          <button
            onClick={toggleDarkMode}
            className="navbar-link text-lg px-4 py-2 rounded transition hover:bg-background-tertiary dark:hover:bg-background-tertiary"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </li>
      </ul>
    </nav>
  );
};
