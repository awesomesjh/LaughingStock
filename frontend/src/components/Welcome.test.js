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

test('renders features', () => {
  render(<Welcome />, { wrapper: BrowserRouter })

  // Test for Login Functionality
  const loginImg = screen.getByAltText('login')
  expect(loginImg).toBeInTheDocument()
  const loginTitle = screen.getByText('Login Functionality')
  expect(loginTitle).toBeInTheDocument()
  const loginExplanation = screen.getByText('Users can create an account and login.')
  expect(loginExplanation).toBeInTheDocument()

  // Test for Telegram Bot
  const telegramImg = screen.getByAltText('telegram bot')
  expect(telegramImg).toBeInTheDocument()
  const telegramTitle = screen.getByText('Telegram Bot')
  expect(telegramTitle).toBeInTheDocument()
  const telegramExplanation = screen.getByText('Provides a convenient way for the user to view their stock portfolio on mobile devices.')
  expect(telegramExplanation).toBeInTheDocument()

  // Test for Dashboard
  const dashboardImg = screen.getByAltText('dashboard')
  expect(dashboardImg).toBeInTheDocument()
  const dashboardTitle = screen.getByText('Dashboard')
  expect(dashboardTitle).toBeInTheDocument()
  const dashboardExplanation = screen.getByText('Basic CRUD functionality for users to modify their stock portfolio.')
  expect(dashboardExplanation).toBeInTheDocument()

  // Test for Line Chart
  const linechartImg = screen.getByAltText('linechart')
  expect(linechartImg).toBeInTheDocument()
  const linechartTitle = screen.getByText('Line Chart')
  expect(linechartTitle).toBeInTheDocument()
  const linechartExplanation = screen.getByText('View change in portfolio value over time. React ECharts was used to implement the line chart.')
  expect(linechartExplanation).toBeInTheDocument()

  // Test for Candlestick Chart
  const candlestickImg = screen.getByAltText('candlestick')
  expect(candlestickImg).toBeInTheDocument()
  const candlestickTitle = screen.getByText('Candlestick Chart')
  expect(candlestickTitle).toBeInTheDocument()
  const candlestickExplanation = screen.getByText('View change in price of a selected stock. Bar data is obtained from Alpaca Market data API, and plotted into a candlestick chart using React ECharts.')
  expect(candlestickExplanation).toBeInTheDocument()

  // Test for Pie Chart
  const piechartImg = screen.getByAltText('piechart')
  expect(piechartImg).toBeInTheDocument()
  const piechartTitle = screen.getByText('Pie Chart')
  expect(piechartTitle).toBeInTheDocument()
  const piechartExplanation = screen.getByText('View composition of portfolio. Chart.js was used to implement the pie chart.')
  expect(piechartExplanation).toBeInTheDocument()

  // Test for Latest News
  const newsImg = screen.getByAltText('news')
  expect(newsImg).toBeInTheDocument()
  const newsTitle = screen.getByText('Latest News')
  expect(newsTitle).toBeInTheDocument()
  const newsExplanation = screen.getByText('A list of links to relevant news articles. News articles are scraped from Google News using Playwright.')
  expect(newsExplanation).toBeInTheDocument()
})