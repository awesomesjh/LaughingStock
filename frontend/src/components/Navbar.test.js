import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import LocationDisplay from './LocationDisplay'
import Navbar from './Navbar'

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    }
  }
})

const user = { username: 'testuser' }
const handleLogout = jest.fn()

test('renders the welcome message with the username', () => {
  render(<Navbar user={user} />, { wrapper: BrowserRouter })

  const welcomeMessage = screen.getByText('Welcome to Laughing Stock, testuser!')
  expect(welcomeMessage).toBeInTheDocument()
})

test('renders the navigation links', () => {
  render(<Navbar user={user} />, { wrapper: BrowserRouter })

  const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
  const pieChartLink = screen.getByRole('link', { name: 'Pie Chart' })
  const lineLink = screen.getByRole('link', { name: 'Line' })
  const candlestickLink = screen.getByRole('link', { name: 'Candlestick' })
  const newsLink = screen.getByRole('link', { name: 'News' })

  expect(dashboardLink).toBeInTheDocument()
  expect(pieChartLink).toBeInTheDocument()
  expect(lineLink).toBeInTheDocument()
  expect(candlestickLink).toBeInTheDocument()
  expect(newsLink).toBeInTheDocument()
})

test('calls the handleLogout function when the Logout button is clicked', async () => {
  render(<Navbar user={user} handleLogout={handleLogout} />, { wrapper: BrowserRouter })

  const logoutButton = screen.getByRole('button', { name: 'Logout' })
  await userEvent.click(logoutButton)

  expect(handleLogout).toHaveBeenCalledTimes(1)
})

test('does not render anything if user is not provided', () => {
  render(<Navbar />, { wrapper: BrowserRouter })

  const welcomeMessage = screen.queryByText('Welcome to Laughing Stock')
  expect(welcomeMessage).not.toBeInTheDocument()
})

describe('navigation tests', () => {
  beforeEach(() => {
    const route = ''
    render(
      <MemoryRouter initialEntries={[route]}>
        <Navbar user={user} />
        <LocationDisplay />
      </MemoryRouter>
    )
  })

  test('navigates to the main page when dashboard link is clicked', async () => { 
    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
    await userEvent.click(dashboardLink)
    expect(screen.getByTestId('location-display')).toHaveTextContent(/^\/$/)
  })

  test('navigates to the piechart page when piechart link is clicked', async () => { 
    const pieChartLink = screen.getByRole('link', { name: 'Pie Chart' })
    await userEvent.click(pieChartLink)
    expect(screen.getByTestId('location-display')).toHaveTextContent('/piechart')
  })

  test('navigates to the line page when line link is clicked', async () => { 
    const lineLink = screen.getByRole('link', { name: 'Line' })
    await userEvent.click(lineLink)
    expect(screen.getByTestId('location-display')).toHaveTextContent('/line')
  })

  test('navigates to the candlestick page when candlestick link is clicked', async () => { 
    const candlestickLink = screen.getByRole('link', { name: 'Candlestick' })
    await userEvent.click(candlestickLink)
    expect(screen.getByTestId('location-display')).toHaveTextContent('/candlestick')
  })

  test('navigates to the news page when news link is clicked', async () => { 
    const newsLink = screen.getByRole('link', { name: 'News' })
    await userEvent.click(newsLink)
    expect(screen.getByTestId('location-display')).toHaveTextContent('/news')
  })
})