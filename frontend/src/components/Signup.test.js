import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import userService from '../services/users'
import LocationDisplay from './LocationDisplay'
import Signup from './Signup'

jest.mock('../services/users')

test('renders the header correctly', () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const header = screen.getByText('Sign up for Laughing Stock')
  expect(header).toBeInTheDocument()
})

test('renders the form inputs correctly', () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const usernameInput = screen.getByPlaceholderText('Enter Username')
  const passwordInput = screen.getByPlaceholderText('Enter Password')

  expect(usernameInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
})

test('calls handleUsernameChange when the username input changes', async () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const usernameInput = screen.getByPlaceholderText('Enter Username')
  await userEvent.type(usernameInput, 'testuser')
  expect(usernameInput.value).toBe('testuser')
})

test('calls handlePasswordChange when the password input changes', async () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const passwordInput = screen.getByPlaceholderText('Enter Password')
  await userEvent.type(passwordInput, 'testpassword')
  expect(passwordInput.value).toBe('testpassword')
})

test('calls handleSignup when the form is submitted', async () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const usernameInput = screen.getByPlaceholderText('Enter Username')
  const passwordInput = screen.getByPlaceholderText('Enter Password')
  const signUpButton = screen.getByRole('button', { name: 'Sign Up' })

  userService.create.mockResolvedValueOnce({})
  await userEvent.type(usernameInput, 'testuser')
  await userEvent.type(passwordInput, 'testpassword')
  await userEvent.click(signUpButton)

  expect(userService.create).toHaveBeenCalledTimes(1)
  expect(userService.create).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'testpassword',
  })
})

test('renders the notification message correctly after successful signup', async () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const usernameInput = screen.getByPlaceholderText('Enter Username')
  const passwordInput = screen.getByPlaceholderText('Enter Password')
  const signUpButton = screen.getByRole('button', { name: 'Sign Up' })

  userService.create.mockResolvedValueOnce({})
  await userEvent.type(usernameInput, 'testuser')
  await userEvent.type(passwordInput, 'testpassword')
  await userEvent.click(signUpButton)

  const notification = await screen.findByText('Account successfully created')
  expect(notification).toBeInTheDocument()
})

test('renders the notification message correctly for empty field error', async () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const signUpButton = screen.getByRole('button', { name: 'Sign Up' })
  await userEvent.click(signUpButton)

  const notification = await screen.findByText('Username and password cannot be empty')
  expect(notification).toBeInTheDocument()
})

test('renders the notification message correctly for taken username error', async () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const usernameInput = screen.getByPlaceholderText('Enter Username')
  const passwordInput = screen.getByPlaceholderText('Enter Password')
  const signUpButton = screen.getByRole('button', { name: 'Sign Up' })

  userService.create.mockRejectedValueOnce({ message: 'Username has been taken' })
  await userEvent.type(usernameInput, 'testuser')
  await userEvent.type(passwordInput, 'testpassword')
  await userEvent.click(signUpButton)

  const notification = await screen.findByText('Username has been taken')
  expect(notification).toBeInTheDocument()
})

test('renders the login button correctly', () => {
  render(<Signup />, { wrapper: BrowserRouter })

  const signInButton = screen.getByRole('button', { name: 'Login' })
  expect(signInButton).toBeInTheDocument()
})

test('navigates to the login page when the Login button is clicked', async () => {
  const route = '/signup'
  render(
    <MemoryRouter initialEntries={[route]}>
      <Signup />
      <LocationDisplay />
    </MemoryRouter>
  )

  const loginButton = screen.getByRole('button', { name: 'Login' })
  await userEvent.click(loginButton)
  expect(screen.getByTestId('location-display')).toHaveTextContent('/login')
})