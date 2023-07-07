import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import LocationDisplay from './LocationDisplay'
import NotFound from './NotFound'

test('renders correctly', () => {
  render(<NotFound />, { wrapper: BrowserRouter })

  const pageTitle = screen.getByText('Oops!')
  expect(pageTitle).toBeInTheDocument()

  const pageStatus = screen.getByText('404 - Page Not Found')
  expect(pageStatus).toBeInTheDocument()

  const pageDescription = screen.getByText('This page does not exist.')
  expect(pageDescription).toBeInTheDocument()

  const backLink = screen.getByRole('link', { name: 'Go back to the home page' })
  expect(backLink).toBeInTheDocument()
  expect(backLink).toHaveAttribute('href', '/')

  const backButton = screen.getByRole('button', { name: 'Go back to the home page' })
  expect(backButton).toBeInTheDocument()
  expect(backButton.tagName).toBe('BUTTON')
})

test('navigates to the home page when the go back to home page button is clicked', async () => {
  const route = '/error'
  render(
    <MemoryRouter initialEntries={[route]}>
      <NotFound />
      <LocationDisplay />
    </MemoryRouter>
  )

  const backButton = screen.getByRole('button', { name: 'Go back to the home page' })
  await userEvent.click(backButton)
  expect(screen.getByTestId('location-display')).toHaveTextContent(/^\/$/)
})