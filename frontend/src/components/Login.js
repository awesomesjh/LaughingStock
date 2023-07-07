import { Link } from 'react-router-dom'
import Notification from './Notification'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from './LoginSignup.module.css'

const Login = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  message
}) => {
  return (
    <main className={`${styles.container} background`}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Login to Laughing Stock</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className='mb-3' controlId='formUsername'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' value={username} onChange={handleUsernameChange} placeholder='Enter Username' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' value={password} onChange={handlePasswordChange} placeholder='Enter Password' />
          </Form.Group>
          <div className={styles.buttonContainer}>
            <Button type='submit'>
              Login
            </Button>
          </div>
        </Form>
        <Notification message={message} />
      </div>
      <div className={styles.prompt}>
        <h2 className={styles.promptText}>Don't have an account?</h2>
        <Link to='/signup'>
          <Button variant='success'>Sign Up</Button>
        </Link>
      </div>
    </main>
  )
}

export default Login