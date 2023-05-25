import { useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import Notification from './Notification'

const Signup = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)

	const handleUsername = (event) => {
		setUsername(event.target.value)
	}

	const handlePassword = (event) => {
		setPassword(event.target.value)
	}

	const handleSignup = async (event) => {
		event.preventDefault()

		try {
      const user = await userService.create({
        username, password
      })
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Username has been taken')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

	}

	return (
		<main>
			<form onSubmit={handleSignup}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={handleUsername}
				/>
				<input
					type="text"
					placeholder="Password"
					value={password}
					onChange={handlePassword}
				/>
				<button type="submit">Create Account</button>
			</form>
			<Notification message={errorMessage} />
			<h2>Try logging in now!</h2>
			<b></b>
			<Link to="/">Login Page</Link>
		</main>
	)
}

export default Signup