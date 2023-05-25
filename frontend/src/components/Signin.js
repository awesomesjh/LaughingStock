import { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    console.log("submitting")
    event.preventDefault() // prevent page refresh

    // get username and password
    console.log(username)
    console.log(password)

    // clear all inputs on the form
    setUsername('')
    setPassword('')

  }

  return (
    <main>
      <h2>Sign in to Laughing Stock!</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsername}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
        <button type="submit">Login</button>
      </form>
      <h2>Don't have an account? Sign up for one here!</h2>
      <b></b>
      <Link to="/signup">Signup!</Link>
    </main>
  )
}

export default Navbar