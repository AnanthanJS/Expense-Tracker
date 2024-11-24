import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Parse the JSON response
      const data = await response.json();
      console.log(data); // Log the response for debugging

      // Check if the response is OK (status code 200 or 201)
      if (response.ok) {
        // Store the token and username in localStorage
        localStorage.setItem('token', data.token); 
        localStorage.setItem('username', username);

        // Redirect to the home page after login
        navigate('/');
      } else {
        // Show the error message returned from the backend
        setErrorMessage(data.error || 'Invalid Username/Password. Please try again.');
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      setErrorMessage('An error occurred. Please try again.');
      console.error('Login error:', error); // Log the error for debugging
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
