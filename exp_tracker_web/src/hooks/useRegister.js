import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage('Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else {
      setErrorMessage(data.detail || 'Registration failed. Please try again.');
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    successMessage,
    handleSubmit,
  };
};

export default useRegister;
