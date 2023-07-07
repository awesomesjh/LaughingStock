import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import PastStock from './PastStock'

test('renders the past stock data correctly', () => {
  const pastStock = {
    symbol: 'AAPL',
    quantity: 10,
    price: 135.5,
    total: 1355
  }

  render(<PastStock pastStock={pastStock} />)

  const symbolCell = screen.getByText('AAPL')
  const quantityCell = screen.getByText('10')
  const priceCell = screen.getByText('$135.50')
  const totalCell = screen.getByText('$1355.00')

  expect(symbolCell).toBeInTheDocument()
  expect(quantityCell).toBeInTheDocument()
  expect(priceCell).toBeInTheDocument()
  expect(totalCell).toBeInTheDocument()
})

test('formats the price and total with two decimal places', () => {
  const pastStock = {
    symbol: 'AAPL',
    quantity: 10,
    price: 135.555,
    total: 1355.555
  }

  render(<PastStock pastStock={pastStock} />)

  const priceCell = screen.getByText('$135.56')
  const totalCell = screen.getByText('$1355.56')

  expect(priceCell).toBeInTheDocument()
  expect(totalCell).toBeInTheDocument()
})