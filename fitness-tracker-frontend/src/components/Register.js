import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Use the shared CSS for Login and Register

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    axios.post('http://127.0.0.1:5000/api/register', { username, email, password })
      .then(response => {
        setSuccessMessage('You have successfully registered! Redirecting to login...');
        setTimeout(() => {
          navigate('/'); // Redirect to login page after 3 seconds
        }, 3000);
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        {/* Image section */}
        <img src="https://raw.githubusercontent.com/princebeyond/final-project/refs/heads/master/fitness-tracker-frontend/src/workout.webp" alt="Workout" />
      </div>
      <div className="auth-form">
        <h1>Register</h1>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        
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
        <p>Already have an account? <a href="/">Login here</a></p>
      </div>
    </div>
  );
}

export default Register;

