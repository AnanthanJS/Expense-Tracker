import React, { useState } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message
    setSuccessMessage(''); // Reset success message

    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // If registration is successful
      setSuccessMessage('Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after a few seconds
      }, 3000);
    } else {
      // If registration fails
      setErrorMessage(data.detail || 'Registration failed. Please try again.'); // Display error message
    }
  };

  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <h2 className='text-center'>Register your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex flex-column gap-3 mt-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className='btn btn-primary' type="submit">Register</button>
              </div>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
