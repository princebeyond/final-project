import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // for navigation

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Call your Flask API to register the user
    axios.post('http://127.0.0.1:5000/api/register', { username, password, email })
      .then(response => {
        // Handle successful registration
        console.log('Registration successful:', response.data);
        setSuccessMessage('You have successfully registered! Redirecting to login...');
        
        // Wait 3 seconds, then navigate to login page
        setTimeout(() => {
          navigate('/'); // Redirect to login page
        }, 3000); // 3 seconds delay
      })
      .catch(error => {
        console.error('There was an error registering!', error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Show success message */}
      
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

