import React from 'react';
import { CustomNavbar } from '../Navbar/CustomNavbar';
import useLogin from '../hooks/useLogin';
import InputField from '../common/InputField/InputField';
import Button from '../common/Button/Button';

const Login = () => {
  const { username, setUsername, password, setPassword, errorMessage, handleSubmit } = useLogin();

  return (
    <>
      <CustomNavbar />
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <h2 className='text-center'>Login to your Account</h2>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit">Login</Button>
                {errorMessage && <p className="error" style={{ color: 'red' }}>{errorMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
