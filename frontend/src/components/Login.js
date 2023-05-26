import { useState } from 'react'
import { Link } from 'react-router-dom'
import loginService from '../services/login'
import Notification from './Notification'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    // console.log(username)
    // console.log(password)
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  return (
    <main>
      <h2>Sign in to Laughing Stock!</h2>
       
      {/* <form onSubmit={handleLogin}>
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
      </form> */}

      
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" onChange={handleUsername} placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={handlePassword} placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login!
        </Button>
      </Form>
      <Notification message={errorMessage} />

      <h2>Don't have an account? Sign up for one here!</h2>
      <Link to="/signup">Signup!</Link>
    </main>
  )
}

export default Login