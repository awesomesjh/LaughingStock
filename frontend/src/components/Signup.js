import { useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import Notification from './Notification'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
			console.log(username)
			console.log(password)
      await userService.create({
        username, password
      })
      setUsername('')
      setPassword('')
			setMessage('Account successfully created')
			setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Username has been taken')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

	}

	return (
		<main>
			<h2>Sign up for Laughing Stock here!</h2>

			{/* <form onSubmit={handleSignup}>
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
				<button type="submit">Create Account</button>
			</form> */}

			<Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={handleUsernameChange} placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter Password" />
          <Form.Text className="text-muted">
            Don't forget your password
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up!
        </Button>
      </Form>

			<Notification message={message} />
			<h2>Try logging in now!</h2>
			<Link to="/login">Login Page</Link>
		</main>
	)
}

export default Signup