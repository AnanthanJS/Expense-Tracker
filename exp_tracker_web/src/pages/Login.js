import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      localStorage.setItem('token', data.token); // Store token for authentication
      localStorage.setItem('username', username); // Store username
      navigate('/'); // Redirect to home page
    } else {
      setErrorMessage(data.error || 'Invalid Username/Password. Please try again.'); // Show error message
    }
  };

  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
          <h2 className='text-center'>Login to your Account</h2>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="btn btn-primary" type="submit">Login</button>
                {errorMessage && <p className="error" style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
