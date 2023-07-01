import { Link } from 'react-router-dom'
import Notification from './Notification'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from './signupLogin.module.css'

const Login = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  message
}) => {
  return (
    <main className={styles.background}>
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.header}>Log in to Laughing Stock!</h2>
        </div>
        <div>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label className={styles.formLabel}>Username</Form.Label>
              <Form.Control type="text" value={username} onChange={handleUsernameChange} placeholder="Enter Username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className={styles.formLabel}>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login!
            </Button>
          </Form>
          <Notification message={message} />
        </div>
        <div className={styles.prompt}>
          <h2 className={styles.promptText}>Don't have an account? Sign up for one here!</h2>
          <Link to="/signup" className={styles.promptButton}>Signup!</Link>
        </div>
      </div>
    </main>
  )
}

export default Login