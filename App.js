// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Registration from './Registration';
import Login from './Login'; 
import Insta from './insta';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          {/* Add more routes as needed */}
          <Route path='/insta' element={<Insta />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
