import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user profile data from your Flask API
    axios.get('http://127.0.0.1:5000/api/profile')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Display fitness data or any other info */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;

