import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StockTable from './StockTable'

const stocks = [
  { id: 1, symbol: 'AAPL', quantity: 10 },
  { id: 2, symbol: 'GOOG', quantity: 5 }
]

const trades = {
  AAPL: { Price: 150 },
  GOOG: { Price: 250 }
}

const sortStocksAndUpdate = jest.fn()

beforeEach(() => {
  render(
    <StockTable
      stocks={stocks}
      trades={trades}
      sortStocksAndUpdate={sortStocksAndUpdate}
    />
  )
})

test('renders the table headers', () => {
  const symbolHeader = screen.getByText('Symbol')
  expect(symbolHeader).toBeInTheDocument()

  const quantityHeader = screen.getByText('Quantity')
  expect(quantityHeader).toBeInTheDocument()

  const priceHeader = screen.getByText('Price')
  expect(priceHeader).toBeInTheDocument()

  const totalHeader = screen.getByText('Total')
  expect(totalHeader).toBeInTheDocument()

  const deleteHeader = screen.getByText('Delete')
  expect(deleteHeader).toBeInTheDocument()
})

test('renders the stock rows', () => {
  const stockRows = screen.getAllByRole('row')
  expect(stockRows).toHaveLength(stocks.length + 1) // +1 for the header row
})

test('calls sortStocksAndUpdate function when sort icons are clicked', async () => {
  const symbolDescending = screen.getByTestId('symbol-descending')
  await userEvent.click(symbolDescending)
  expect(sortStocksAndUpdate).toHaveBeenCalledWith('symbol descending')

  const symbolAscending = screen.getByTestId('symbol-ascending')
  await userEvent.click(symbolAscending)
  expect(sortStocksAndUpdate).toHaveBeenCalledWith('symbol ascending')
})