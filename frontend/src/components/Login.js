import { Link } from 'react-router-dom'
import Notification from './Notification'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Login = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  errorMessage
}) => {
  return (
    <main>
      <h2>Sign in to Laughing Stock!</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={handleUsernameChange} placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" />
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