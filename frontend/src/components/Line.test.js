import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Line from './Line'

const stocks = [{ symbol: 'AAPL', quantity: 10 }, { symbol: 'TSLA', quantity: 20 }]
const trades = { AAPL: { Price: 10 }, TSLA: { Price: 20 } }

test('should render loading caption when timestamps are null', () => {
  render(<Line timestamps={null} stocks={stocks} trades={trades} />)

  const loadingCaption = screen.getByText('Loading...')
  expect(loadingCaption).toBeInTheDocument()
})

test('should render "not enough data" message when timestamps are "not enough data"', () => {
  render(<Line timestamps='not enough data' stocks={stocks} trades={trades} />)

  const notEnoughDataMessage = screen.getByText('Account must be at least 5 working days old to begin using line graph.')
  expect(notEnoughDataMessage).toBeInTheDocument()
})