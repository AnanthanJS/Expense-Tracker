import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
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

  return {
    username,
    setUsername,
    password,
    setPassword,
    errorMessage,
    handleSubmit,
  };
};

export default useLogin;
