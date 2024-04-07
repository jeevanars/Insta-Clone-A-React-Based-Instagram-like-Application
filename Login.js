import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if username exists in local storage
    const storedUserData = JSON.parse(localStorage.getItem(loginData.username));
    if (!storedUserData) {
        setError('User not found.');
        return;
    }

  // Check if password matches
    if (storedUserData.password !== loginData.password) {
        setError('Incorrect password.');
        return;
    }

  // Reset error
    setError('');

    // Store logged-in user in sessionStorage
    sessionStorage.setItem('user', JSON.stringify(storedUserData));

    // Redirect to ecommerce page
    navigate('/insta');
    };

    return (
        <div className='Login'>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={loginData.username} onChange={handleInputChange} />
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={loginData.password} onChange={handleInputChange} />
            </div>
            <button type="submit">Login</button>
        </form>
        </div>
    );
}

export default Login;
