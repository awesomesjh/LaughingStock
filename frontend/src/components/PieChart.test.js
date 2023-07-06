import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import PieChart from './PieChart'

import ResizeObserver from 'resize-observer-polyfill'
window.ResizeObserver = ResizeObserver

test('renders loading caption when trades have not been loaded', () => {
  const stocks = [
    { symbol: 'AAPL', quantity: 10 },
    { symbol: 'GOOGL', quantity: 5 }
  ]
  const trades = {}
  render(<PieChart stocks={stocks} trades={trades} />)

  const loadingCaption = screen.getByText('Loading...')
  expect(loadingCaption).toBeInTheDocument()
})

test('renders pie chart when stocks exist and trades have been loaded', () => {
  const stocks = [
    { symbol: 'AAPL', quantity: 10 },
    { symbol: 'GOOGL', quantity: 5 }
  ]
  const trades = {
    AAPL: { Price: 135 },
    GOOGL: { Price: 2500 }
  }
  render(<PieChart stocks={stocks} trades={trades} />)

  const pieChart = screen.getByRole('img')
  expect(pieChart).toBeInTheDocument()
})

test('renders "No stocks found" message when stocks array is empty', () => {
  const stocks = []
  render(<PieChart stocks={stocks} />)

  const noStocksMessage = screen.getByText('No stocks found. Add some stocks to view pie chart.')
  expect(noStocksMessage).toBeInTheDocument()
})