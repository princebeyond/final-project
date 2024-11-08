import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import './Auth.css';  // Shared CSS for Login and Register

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    axios.post('http://127.0.0.1:5000/api/login', { username, password })
      .then(response => {
        if (response.status === 200) {
          login();
          navigate('/dashboard');
        }
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
        <h1>Login</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;

