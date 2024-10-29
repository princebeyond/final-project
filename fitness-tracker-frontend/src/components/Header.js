import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <h1>Fitness Tracker</h1>
      <nav>
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

