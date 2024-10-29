import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';  // Ensure AuthContext is set up correctly

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();  // Assuming `login` updates authentication state
  const navigate = useNavigate();  // Use navigate for routing

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/api/login', { username, password })
      .then(response => {
        if (response.status === 200) {
          console.log('Login successful:', response.data);
          login();  // Update auth state
          navigate('/dashboard');  // Redirect after successful login
        } else {
          console.log('Login failed:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
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
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;

