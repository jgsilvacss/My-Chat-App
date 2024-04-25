import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<p>Hello</p>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
};

export default Routing;