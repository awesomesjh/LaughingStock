import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Stock from './Stock'

const stock = {
  id: 1,
  symbol: 'AAPL',
  quantity: 10
}

const price = 100

const deleteStock = jest.fn()
const handleQuantityChange = jest.fn()
const updateQuantity = jest.fn()

beforeEach(() => {
  render(
    <table>
      <tbody>
        <Stock
          stock={stock}
          price={price}
          deleteStock={deleteStock}
          handleQuantityChange={handleQuantityChange}
          updateQuantity={updateQuantity}
          loading={false}
        />
      </tbody>
    </table>
  )
})

test('renders stock symbol', () => {
  const symbolElement = screen.getByText(stock.symbol)
  expect(symbolElement).toBeInTheDocument()
})

test('renders stock quantity input', () => {
  const quantityInput = screen.getByPlaceholderText('Enter Quantity')
  expect(quantityInput).toBeInTheDocument()
  expect(quantityInput).toHaveValue(stock.quantity)
})

test('calls handleQuantityChange when quantity input is changed', async () => {
  const quantityInput = screen.getByPlaceholderText('Enter Quantity')
  await userEvent.type(quantityInput, '20')
  expect(handleQuantityChange).toHaveBeenCalledTimes(2)
  expect(handleQuantityChange).toHaveBeenCalledWith(expect.any(Object), stock.id)
})

test('renders stock price', () => {
  const priceElement = screen.getByText(`$${price.toFixed(2)}`)
  expect(priceElement).toBeInTheDocument()
})

test('renders stock total', () => {
  const totalElement = screen.getByText(`$${(price * stock.quantity).toFixed(2)}`)
  expect(totalElement).toBeInTheDocument()
})

test('calls deleteStock when delete button is clicked', async () => {
  const deleteButton = screen.getByTestId('delete')
  await userEvent.click(deleteButton)
  expect(deleteStock).toHaveBeenCalledTimes(1)
  expect(deleteStock).toHaveBeenCalledWith(stock.id)
})

test('calls updateQuantity when save button is clicked', async () => {
  const saveButton = screen.getByText('Save')
  await userEvent.click(saveButton)
  expect(updateQuantity).toHaveBeenCalledTimes(1)
  expect(updateQuantity).toHaveBeenCalledWith(stock.id)
})