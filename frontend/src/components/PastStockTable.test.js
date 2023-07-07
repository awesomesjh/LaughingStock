import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import PastStockTable from './PastStockTable'

const pastStocks = [
  {
    symbol: 'AAPL',
    quantity: 10,
    price: 135.5,
    total: 1355
  },
  {
    symbol: 'GOOGL',
    quantity: 5,
    price: 2500,
    total: 12500
  }
]

const captionTimestamp = '2022-01-01'

beforeEach(() => {
  render(<PastStockTable pastStocks={pastStocks} captionTimestamp={captionTimestamp} />)
})

test('renders the table with past stocks correctly', () => {
  const tableCaption = screen.getByText('Portfolio on 2022-01-01')
  const symbolHeader = screen.getByText('Symbol')
  const quantityHeader = screen.getByText('Quantity')
  const priceHeader = screen.getByText('Price')
  const totalHeader = screen.getByText('Total')
  const stock1 = screen.getByText('AAPL')
  const stock2 = screen.getByText('GOOGL')

  expect(tableCaption).toBeInTheDocument()
  expect(symbolHeader).toBeInTheDocument()
  expect(quantityHeader).toBeInTheDocument()
  expect(priceHeader).toBeInTheDocument()
  expect(totalHeader).toBeInTheDocument()
  expect(stock1).toBeInTheDocument()
  expect(stock2).toBeInTheDocument()
})

test('renders the stock rows', () => {
  const stockRows = screen.getAllByRole('row')
  expect(stockRows).toHaveLength(pastStocks.length + 1) // +1 for the header row
})