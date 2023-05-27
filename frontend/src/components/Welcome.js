import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <main>
      <h2>Welcome to Laughing Stock!</h2>
      <div><Link to="/signup">Signup!</Link></div>
      <div><Link to="/login">Login</Link></div>
    </main>
  )
}

export default Welcome