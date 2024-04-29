import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../components/Signup';
import Login from '../components/Login';
import Lobbies from '../components/Lobbies';
import PrivateRoutes from './PrivateRoute';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>
        <Route element={<Lobbies/>} path='/lobbies' />
        </Route>
        <Route element={<Signup/>} path='/signup' />
        <Route element={<Login/>} path='/login' />
        
      </Routes>
    </Router>
  );
};

export default Routing;