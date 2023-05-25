import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Signup from './components/Signup'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
