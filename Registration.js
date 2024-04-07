import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';


function Registration() {
  const [formData, setFormData] = useState({ name: '', email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation checks
    if (formData.name === '' || formData.email === '' || formData.username === '' || formData.password === '') {
      setError('All fields are required.');
      return;
    }
    if (formData.password.length < 8 || !/(?=.*[A-Z])/.test(formData.password) || !/\d/.test(formData.password)) {
      setError('Password must be at least 8 characters long, contain at least one capital letter, and contain at least one number.');
      return;
    }
    // Check if email is already registered
    if (localStorage.getItem(formData.email)) {
      setError('Email is already registered.');
      return;
    }

    if (localStorage.getItem(formData.username)) {
      setError('Username is already registered.');
      return;
    }
  
    // Store data in local storage
    localStorage.setItem(formData.username, JSON.stringify(formData));
  
    navigate('/login');
  };

  return (
    <div className='Registration'>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
