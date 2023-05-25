import {useState} from 'react'

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
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  )
}

export default Navbar