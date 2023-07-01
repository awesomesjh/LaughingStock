import { useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import Notification from './Notification'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from './signupLogin.module.css'

const Signup = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSignup = async (event) => {
    event.preventDefault()

    try {
      if (username === '' || password === '') {
        throw new Error('empty field')
      }
      await userService.create({
        username, password
      })
      setUsername('')
      setPassword('')
      setMessage('Account successfully created')
    } catch (error) {
      if (error.message === 'empty field') {
        setMessage('Username and password cannot be empty')
      } else {
        setMessage('Username has been taken')
      }
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <main className={styles.background}>
      <div className={styles.wrapper}>
        <h2 className={styles.header}>Sign up for Laughing Stock here!</h2>

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label className={styles.formLabel}>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={handleUsernameChange} placeholder="Enter Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" />
            <Form.Text className={styles.reminder}>
              Don't forget your password
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up!
          </Button>
        </Form>
        <Notification message={message} />
        <div className={styles.prompt}>
          <h2 className={styles.promptText}>Try logging in now!</h2>
          <Link to="/login" className={styles.promptButton}>Login Page</Link>
        </div>
      </div>
    </main>
  )
}

export default Signup