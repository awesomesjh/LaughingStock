import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import LocationDisplay from './LocationDisplay'
import Welcome from './Welcome'

test('renders the header correctly', () => {
  render(<Welcome />, { wrapper: BrowserRouter })

  const header = screen.getByText('Welcome to Laughing Stock')
  expect(header).toBeInTheDocument()
})

test('renders the Login button correctly', () => {
  render(<Welcome />, { wrapper: BrowserRouter })

  const loginButton = screen.getByRole('button', { name: 'Login' })
  expect(loginButton).toBeInTheDocument()
})

test('navigates to the login page when the Login button is clicked', async () => {
  const route = '/'
  render(
    <MemoryRouter initialEntries={[route]}>
      <Welcome />
      <LocationDisplay />
    </MemoryRouter>
  )

  const loginButton = screen.getByRole('button', { name: 'Login' })
  await userEvent.click(loginButton)
  expect(screen.getByTestId('location-display')).toHaveTextContent('/login')
})