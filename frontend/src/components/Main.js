import { Link } from 'react-router-dom';

export default function Navbar () {

  return (
    <main>
      <h2>Welcome to Laughing Stock!</h2>
      <div><Link to="/signup">Signup!</Link></div>
      <div><Link to="/login">Login</Link></div>
      <div><Link to="/user">Test only</Link></div>
    </main>
  )
}