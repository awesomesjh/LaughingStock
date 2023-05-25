import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Signin from './components/Signin'
import User from './components/User'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="user" element={<User />} />
      </Routes>
    </div>
  );
}
