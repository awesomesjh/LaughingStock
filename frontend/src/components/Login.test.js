import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import LocationDisplay from './LocationDisplay'
import Login from './Login'

const handleUsernameChange = jest.fn()
const handlePasswordChange = jest.fn()

test('renders the header correctly', () => {
  render(<Login />, { wrapper: BrowserRouter })

  const header = screen.getByText('Login to Laughing Stock')
  expect(header).toBeInTheDocument()
})

test('renders the form inputs correctly', () => {
  render(<Login />, { wrapper: BrowserRouter })

  const usernameInput = screen.getByPlaceholderText('Enter Username')
  const passwordInput = screen.getByPlaceholderText('Enter Password')

  expect(usernameInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
})

test('calls handleUsernameChange when the username input changes', async () => {
  render(<Login handleUsernameChange={handleUsernameChange} />, { wrapper: BrowserRouter })

  const usernameInput = screen.getByPlaceholderText('Enter Username')
  await userEvent.type(usernameInput, 'testuser')

  expect(handleUsernameChange).toHaveBeenCalledTimes(8)
  expect(handleUsernameChange).toHaveBeenCalledWith(expect.any(Object))
})

test('calls handlePasswordChange when the password input changes', async () => {
  render(<Login handlePasswordChange={handlePasswordChange} />, { wrapper: BrowserRouter })

  const passwordInput = screen.getByPlaceholderText('Enter Password')
  await userEvent.type(passwordInput, 'testpassword')

  expect(handlePasswordChange).toHaveBeenCalledTimes(12)
  expect(handlePasswordChange).toHaveBeenCalledWith(expect.any(Object))
})

test('calls handleLogin when the form is submitted', async () => {
  const handleLogin = jest.fn(e => e.preventDefault())
  render(<Login handleLogin={handleLogin} />, { wrapper: BrowserRouter })

  const loginButton = screen.getByRole('button', { name: 'Login' })
  await userEvent.click(loginButton)

  expect(handleLogin).toHaveBeenCalledTimes(1)
})

test('renders the notification message correctly', () => {
  const message = 'Test message'
  render(<Login message={message} />, { wrapper: BrowserRouter })

  const notification = screen.getByText(message)
  expect(notification).toBeInTheDocument()
})

test('renders the sign up button correctly', () => {
  render(<Login />, { wrapper: BrowserRouter })

  const signUpButton = screen.getByRole('button', { name: 'Sign Up' })
  expect(signUpButton).toBeInTheDocument()
})

test('navigates to the signup page when the sign up button is clicked', async () => {
  const route = '/login'
  render(
    <MemoryRouter initialEntries={[route]}>
      <Login />
      <LocationDisplay />
    </MemoryRouter>
  )

  const signUpButton = screen.getByRole('button', { name: 'Sign Up' })
  await userEvent.click(signUpButton)
  expect(screen.getByTestId('location-display')).toHaveTextContent('/signup')
})