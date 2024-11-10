import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import useRegister from '../hooks/useRegister';

const Register = () => {
  const { username, setUsername, email, setEmail, password, setPassword, errorMessage, successMessage, handleSubmit } = useRegister();

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
