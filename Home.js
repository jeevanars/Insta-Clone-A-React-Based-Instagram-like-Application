// Home.js
import React from 'react';
import './Home.css';


function Home() {
  return (
    <div className="App">
      <h1>Welcome to My Website</h1>
      <p>This is the home page of my website.</p>
      <div>
        {/* Navigation links to RegistrationPage and LoginPage */}
        <a href="/register">Register</a>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}

export default Home;
