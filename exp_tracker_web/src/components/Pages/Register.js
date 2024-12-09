import React from 'react';
import { CustomNavbar } from '../Navbar/CustomNavbar';
import useRegister from '../hooks/useRegister';
import InputField from '../common/InputField/InputField';
import Button from '../common/Button/Button';

const Register = () => {
  const { username, setUsername, email, setEmail, password, setPassword, errorMessage, successMessage, handleSubmit } = useRegister();

  return (
    <>
      <CustomNavbar />
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <h2 className='text-center'>Register your Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex flex-column gap-3 mt-4">
                <InputField
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <InputField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <InputField 
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit">Register</Button>
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
