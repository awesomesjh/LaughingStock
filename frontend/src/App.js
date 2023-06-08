import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Main from './components/Main'
import Signup from './components/Signup'
import Login from './components/Login'
import loginService from './services/login'
import stockService from './services/stocks'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import TestAnalysis from './components/TestAnalysis'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedLaughingStockUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      stockService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      stockService.setToken(user.token)
      window.localStorage.setItem(
        'loggedLaughingStockUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')

    } catch (exception) {
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    stockService.clearToken()
    window.localStorage.removeItem('loggedLaughingStockUser')
    setUser(null)
  }

  const handleTimeout = () => {
    handleLogout()
    navigate('/login')
    setErrorMessage('Session timed out. Please log in again.')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Main user={user} handleLogout={handleLogout} handleTimeout={handleTimeout} />} />
        <Route
          path="/login"
          element={!user
            ? <Login
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
              errorMessage={errorMessage}
            />
            : <Navigate replace to="/" />
          }
        />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate replace to="/" />} />
        <Route
          path="/TestAnalysis"
          element={!user
            ? <Login
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleLogin={handleLogin}
              errorMessage={errorMessage}
            />
            : <TestAnalysis 
              handleLogout={handleLogout}
            />
          }
        />
      </Routes>
    </Container>
  )
}

export default App