import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}