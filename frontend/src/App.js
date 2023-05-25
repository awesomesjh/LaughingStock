import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  )
}
